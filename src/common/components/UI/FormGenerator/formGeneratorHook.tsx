/* Glossary:
* FieldConfig[] - data describing several form groups as a collection of ControlledInput elements
* FormData, FormFieldData - transformed and flattened FieldConfig partial stored in state
**/

import cloneDeep from "lodash/fp/cloneDeep";
import React, {useRef, useState} from "react";
import {FieldConfig, FormData, FormDataHookProps} from "./FormGeneratorTypes";
import {FieldValidators} from "./validators";


function useFormData(props: FormDataHookProps) {
    const [ formData, setFormData ] = useState(getFormDataFromConfig(props.formConfig));
    const validationRef = useRef<FieldValidators>();
    const validators = obtainFieldValidatorsConstant(props.formConfig, validationRef);

    const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(updateFormDataOnChange(formData, validators, e));
    };

    const config = updateFormConfig(props.formConfig, formData);

    return { config, updateFormData, formData };
}

function getFormDataFromConfig(formConfig: FieldConfig[]): FormData {
    return formConfig.reduce((acc, curr) => ({...acc, ...generateFormDataPerFieldFromConfig(curr)}), {});
}

function obtainFieldValidatorsConstant(formConfig: FieldConfig[], validationRef: React.MutableRefObject<FieldValidators|undefined>) {
    const validation = validationRef.current;
    if (validation) {
        return validation;
    }

    const validationData = generateFieldValidatorsFromConfig(formConfig);
    validationRef.current = validationData;
    return validationRef.current;
}

function generateFieldValidatorsFromConfig(formConfig: FieldConfig[]): FieldValidators {
  return formConfig.reduce( (acc, curr) => ({...acc, ...generateValidatorsPerFieldFromConfig(curr)}), {});
}

function updateFormDataOnChange (prevFormData: FormData, validators: FieldValidators, e: React.ChangeEvent<HTMLInputElement>): FormData {
    const formData = cloneDeep(prevFormData);
    const currentValidators = validators[e.target.name];
    const firstFailedValidation = currentValidators.find(validator => !validator.validator(e.target.value, validator.params));

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

function updateFormConfig(prevFormConfig: FieldConfig[], formData: FormData ): FieldConfig[] {
    const formConfig = cloneDeep(prevFormConfig);
    const fieldNames = Object.keys(formData);
    fieldNames.forEach(fieldName => updateCurrentFieldConfig(fieldName, formConfig, formData));
    return formConfig;
}

function generateFormDataPerFieldFromConfig(fieldConfig: FieldConfig): FormData {
    const name = fieldConfig.inputParams.common.name;
    const values = {...fieldConfig.inputData, hint: ''};
    return {
        [name]: values
    }
}

function generateValidatorsPerFieldFromConfig(fieldConfig: FieldConfig): FieldValidators {
    const name = fieldConfig.inputParams.common.name;
    return {
        [name]: fieldConfig.validators
    }
}

function updateCurrentFieldConfig (fieldName: string, formGroupConfig: FieldConfig[], formGroupData: FormData) {
    const currentFieldConfig = formGroupConfig.find(formConfig => formConfig.inputParams.common.name === fieldName);
    if (currentFieldConfig) {
        currentFieldConfig.inputData.value = formGroupData[fieldName].value;
        currentFieldConfig.inputData.valid = formGroupData[fieldName].valid;
        currentFieldConfig.inputData.touched = formGroupData[fieldName].touched;
        currentFieldConfig.inputData.hint = formGroupData[fieldName].hint;
    }
}

export {
    useFormData,
};
