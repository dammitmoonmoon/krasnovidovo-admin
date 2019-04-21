/* Glossary:
* FieldConfig[][] - data describing several form groups as a collection of Input elements
* FormData, FormGroupData, FormFieldData - transformed and flattened FieldConfig stored in state
**/

import cloneDeep from "lodash/fp/cloneDeep";
import React, {useRef, useState} from "react";
import {FieldConfig} from "./FieldConfigMaker";

interface Props {
    formConfig: FieldConfig[][]
}

type FormData = FormGroupData[];

interface FormGroupData {
    [key: string]: FormFieldData
}

interface FormFieldData {
    value: string;
    valid: boolean;
    touched: boolean;
}

interface Validation {
    [key: string]: ValidationFields
}

interface ValidationFields {
    validators: string[],
    hints: string[],
}

function useFormData(props: Props) {
    const [ formData, setFormData ] = useState(getFormDataFromConfig(props.formConfig));
    const validationRef = useRef<Validation[]>();
    const validation = createValidation(props.formConfig, validationRef);

    const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(updateFormDataOnChange(formData, e));
    };
    const config = getNewFormConfig(props.formConfig, formData);
    return { config, updateFormData, validation };
}

function getFormDataFromConfig(formConfig: FieldConfig[][]): FormData {
    return formConfig.map(group => group.reduce( (acc, curr) => ({...acc, ...getFormGroupFromConfig(curr)}), {}));
}

function createValidation(formConfig: FieldConfig[][], validationRef: React.MutableRefObject<Validation[]|undefined>) {
    const validation = validationRef.current;
    if (validation) {
        return validation;
    }

    const validationData = getFormValidationFromConfig(formConfig);
    validationRef.current = validationData;
    return validationRef.current;
}

function updateFormDataOnChange (prevFormData: FormGroupData[], e: React.ChangeEvent<HTMLInputElement>): FormGroupData[] {
    const formData = cloneDeep(prevFormData);
    return formData.map(group => updateFormGroupDataInState(group, e));
}

function getNewFormConfig(prevFormConfig: FieldConfig[][], formData: FormData ): FieldConfig[][] {
    const formConfig = cloneDeep(prevFormConfig);
    formConfig.forEach((formGroupConfig, index) => updateConfigByState(formGroupConfig, formData[index]));
    return formConfig;
}

function getFormGroupFromConfig(fieldConfig: FieldConfig): FormGroupData {
    const name = fieldConfig.inputParams.common.name;
    const values = {...fieldConfig.inputData};
    return {
        [name]: values
    }
}

function updateFormGroupDataInState(
    prevFormGroupData: FormGroupData,
    event: React.ChangeEvent<HTMLInputElement>,
    ) {
    const formGroupData = cloneDeep(prevFormGroupData);
    const updatedField = {
        ...formGroupData[event.target.name],
        value: event.target.value,
        touched: true,
    };
    formGroupData[event.target.name] = updatedField;
    return formGroupData;
}

function updateConfigByState(formGroupConfig: FieldConfig[], formGroupData: FormGroupData) {
    const fieldNames = Object.keys(formGroupData);
    fieldNames.forEach(fieldName => changeCurrentFieldData(fieldName, formGroupConfig, formGroupData));
}

function changeCurrentFieldData (fieldName: string, formGroupConfig: FieldConfig[], formGroupData: FormGroupData) {
    const currentFieldConfig = formGroupConfig.find(formConfig => formConfig.inputParams.common.name === fieldName);
    if (currentFieldConfig) {
        currentFieldConfig.inputData.value = formGroupData[fieldName].value;
        currentFieldConfig.inputData.valid = formGroupData[fieldName].valid;
        currentFieldConfig.inputData.touched = formGroupData[fieldName].touched;
    }
}

function getFormValidationFromConfig(formConfig: FieldConfig[][]): Validation[] {
    return formConfig.map(group => group.reduce( (acc, curr) => ({...acc, ...getGroupValidationFromConfig(curr)}), {}));
}

function getGroupValidationFromConfig(fieldConfig: FieldConfig): Validation {
    const name = fieldConfig.inputParams.common.name;
    const validation = <ValidationFields>{...fieldConfig.validation};
    return {
        [name]: validation
    }
}


export {
    useFormData
};
