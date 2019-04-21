import React, {useState} from 'react';
import { FormGroup } from "reactstrap";
import {ControlledInput} from "../Input/Input";
import {FieldConfig} from "./fieldValues";

interface Props {
    formConfig: FieldConfig[][]
}


interface FormGroupData {
    [key: string]: {
        value: string;
        valid: boolean;
        touched: boolean;
    }
}

const FormGenerator: React.FC<Props>  = (props: Props) => {
    const initialState: FormGroupData[] = getStateFromConfig(props.formConfig);
    const [ formData, setFormData ] = useState(initialState);
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(formData.map(group => updateValueInState(group, e)));
    };
    props.formConfig.map((formGroupConfig, index) => updateConfigByState(formGroupConfig, formData[index]));
    return (
        <>
            {
                props.formConfig.map((group, index) =>(
                    <FormGroup key={index}>
                        {group.map((item, index) =>
                            <ControlledInput
                                {...item} changeHandler={changeHandler} key={index}
                            />
                        )}
                    </FormGroup>
                ))
            }
        </>
    );
};

function getDataFromConfig(fieldConfig: FieldConfig) {
    const name = fieldConfig.inputParams.common.name;
    const values = {...fieldConfig.inputData};
    return {
        [name]: values
    }
}

function updateValueInState(formData: FormGroupData, event: React.ChangeEvent<HTMLInputElement>) {
    const updatedField = {
        ...formData[event.target.name],
        value: event.target.value,
        touched: true,
    };
    formData[event.target.name] = updatedField;
    return formData;
}

function getStateFromConfig(formConfig: FieldConfig[][]): FormGroupData[] {
    return formConfig.map(group => group.reduce( (acc, curr) => ({...acc, ...getDataFromConfig(curr)}), {}));
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
};


export {
    FormGenerator
};
