/* Glossary:
* FieldConfig[][] - data describing several form groups as a collection of Input elements
* FormData, FormGroupData, FormFieldData - transformed and flattened FieldConfig stored in state
**/

import cloneDeep from "lodash/fp/cloneDeep";
import React, {useRef, useState} from "react";
import {FieldConfig} from "./FieldConfigMaker";
import {Validators} from "./validators";

interface Props {
    formConfig: FieldConfig[]
}

interface FormData {
    [key: string]: FormFieldData
}

interface FormFieldData {
    value: string;
    valid: boolean;
    touched: boolean;
    hint: string;
}


function useFormData(props: Props) {
    const [ formData, setFormData ] = useState(getFormDataFromConfig(props.formConfig));
    const validationRef = useRef<Validators>();
    const validator = createValidation(props.formConfig, validationRef);

    const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(updateFormDataOnChange(formData, validator, e));
    };
    const config = getNewFormConfig(props.formConfig, formData);
    return { config, updateFormData, validator };
}

function getFormDataFromConfig(formConfig: FieldConfig[]): FormData {
    return formConfig.reduce((acc, curr) => ({...acc, ...getFormFromConfig(curr)}), {});
}

function getFormValidationFromConfig(formConfig: FieldConfig[]): Validators {
    return formConfig.reduce( (acc, curr) => ({...acc, ...getValidationFromConfig(curr)}), {});
}

function createValidation(formConfig: FieldConfig[], validationRef: React.MutableRefObject<Validators|undefined>) {
    const validation = validationRef.current;
    if (validation) {
        return validation;
    }

    const validationData = getFormValidationFromConfig(formConfig);
    validationRef.current = validationData;
    return validationRef.current;
}

function updateFormDataOnChange (prevFormData: FormData, validation: Validators, e: React.ChangeEvent<HTMLInputElement>): FormData {
    const formData = cloneDeep(prevFormData);
    const currentValidators = validation[e.target.name];
    const firstFailedValidation = currentValidators.find(validator => !validator.cb(e.target.value, validator.params));

    const updatedField = {
        ...formData[e.target.name],
        value: e.target.value,
        touched: true,
        hint: firstFailedValidation ? firstFailedValidation.hint : '',
        valid: !firstFailedValidation,
    };
    formData[e.target.name] = updatedField;
    return formData;
}

function getNewFormConfig(prevFormConfig: FieldConfig[], formData: FormData ): FieldConfig[] {
    const formConfig = cloneDeep(prevFormConfig);
    const fieldNames = Object.keys(formConfig);
    fieldNames.forEach(fieldName => changeCurrentFieldData(fieldName, formConfig, formData));
    updateConfigByState(formConfig, formData);
    return formConfig;
}

function getFormFromConfig(fieldConfig: FieldConfig): FormData {
    const name = fieldConfig.inputParams.common.name;
    const values = {...fieldConfig.inputData, hint: ''};
    return {
        [name]: values
    }
}

function getValidationFromConfig(fieldConfig: FieldConfig): Validators {
    const name = fieldConfig.inputParams.common.name;
    const validation = <any>[...fieldConfig.validators];
    return {
        [name]: validation
    }
}

function changeCurrentFieldData (fieldName: string, formGroupConfig: FieldConfig[], formGroupData: FormData) {
    const currentFieldConfig = formGroupConfig.find(formConfig => formConfig.inputParams.common.name === fieldName);
    if (currentFieldConfig) {
        currentFieldConfig.inputData.value = formGroupData[fieldName].value;
        currentFieldConfig.inputData.valid = formGroupData[fieldName].valid;
        currentFieldConfig.inputData.touched = formGroupData[fieldName].touched;
        currentFieldConfig.inputData.hint = formGroupData[fieldName].hint;
    }
}

function updateConfigByState(formGroupConfig: FieldConfig[], formGroupData: FormData) {
    const fieldNames = Object.keys(formGroupData);
    fieldNames.forEach(fieldName => changeCurrentFieldData(fieldName, formGroupConfig, formGroupData));
}

export {
    useFormData
};
