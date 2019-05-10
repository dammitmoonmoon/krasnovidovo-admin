/* Glossary:
* FieldConfig[] - data describing several form groups as a collection of ControlledInput elements
* FormData, FormFieldData - transformed and flattened FieldConfig partial stored in state
**/

import cloneDeep from "lodash/fp/cloneDeep";
import React, {useRef, useState} from "react";
import {FieldConfig, FormData, FormDataHookProps} from "./FormGeneratorTypes";
import {FieldValidators} from "./validators";

export interface FormDataHookResult {
    config: FieldConfig[];
    updateFormData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: FormData;
}

export function useFormData(props: FormDataHookProps): FormDataHookResult {
    const [ formData, setFormData ] = useState(generateFormDataFromConfig(props.formConfig));
    const validationRef = useRef<FieldValidators>();
    const validators = obtainFieldValidatorsConstant(props.formConfig, validationRef);

    const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(updateFormDataOnChange(formData, validators, e));
    };

    const config = updateFormConfig(props.formConfig, formData);

    return { config, updateFormData, formData };
}

export function generateFormDataFromConfig(formConfig: FieldConfig[]): FormData {
    return formConfig.reduce((acc, curr) => ({...acc, ...extractFormDataFromFieldConfig(curr)}), {});
}

export function obtainFieldValidatorsConstant(formConfig: FieldConfig[], validationRef: React.MutableRefObject<FieldValidators|undefined>) {
    const validation = validationRef.current;
    if (validation) {
        return validation;
    }

    const validationData = generateFieldValidatorsFromConfig(formConfig);
    validationRef.current = validationData;
    return validationRef.current;
}

export function generateFieldValidatorsFromConfig(formConfig: FieldConfig[]): FieldValidators {
  return formConfig.reduce( (acc, curr) => ({...acc, ...generateValidatorsPerFieldFromConfig(curr)}), {});
}

export function updateFormDataOnChange (prevFormData: FormData, validators: FieldValidators, e: React.ChangeEvent<HTMLInputElement>): FormData {
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

export function updateFormConfig(prevFormConfig: FieldConfig[], formData: FormData ): FieldConfig[] {
    const formConfig = cloneDeep(prevFormConfig);
    const fieldNames = Object.keys(formData);
    fieldNames.forEach(fieldName => updateCurrentFieldConfig(fieldName, formConfig, formData));
    return formConfig;
}

export function extractFormDataFromFieldConfig(fieldConfig: FieldConfig): FormData {
    const name = fieldConfig.inputParams.common.name;
    const values = {...fieldConfig.inputData};
    return {
        [name]: values
    }
}

export function generateValidatorsPerFieldFromConfig(fieldConfig: FieldConfig): FieldValidators {
    const name = fieldConfig.inputParams.common.name;
    return {
        [name]: fieldConfig.validators || []
    }
}

export function updateCurrentFieldConfig (fieldName: string, formGroupConfig: FieldConfig[], formGroupData: FormData) {
    const currentFieldConfig = formGroupConfig.find(formConfig => formConfig.inputParams.common.name === fieldName);
    if (currentFieldConfig) {
        currentFieldConfig.inputData.value = formGroupData[fieldName].value;
        currentFieldConfig.inputData.valid = formGroupData[fieldName].valid;
        currentFieldConfig.inputData.touched = formGroupData[fieldName].touched;
        currentFieldConfig.inputData.hint = formGroupData[fieldName].hint;
    }
}
