import {InputType} from "reactstrap/lib/Input";
import {Validator} from "./validators";

export type Value = string;

export interface FieldConfigPartial {
    inputParams: {
        common: {
            [key: string]: string;
            name: string;
        };
        options?: {
            value: Value;
            displayValue: string;
        }[];
    };
    validators: Validator[];
}

export interface FieldConfig {
    inputData: {
        value: Value;
        valid: boolean;
        touched: boolean;
        hint: string;
    },
    inputParams: {
        common: {
            [key: string]: string;
            name: string;
            placeholder: string;
            label: string;
            type: InputType;
        };
        options?: {
            value: string;
            displayValue: string;
        }[];
    };
    validators: Validator[];
}

export interface FormDataHookProps {
    formConfig: FieldConfig[]
}

export interface FormData {
    [key: string]: FormFieldData
}

interface FormFieldData {
    value: Value;
    valid: boolean;
    touched: boolean;
    hint: string;
}

export interface FieldValuePairs {
    [key: string]: Value;
}

export interface FormGeneratorProps {
    formConfig: FieldConfig[],
    submitHandler: (props: FieldValuePairs) => void;
    buttonName: string;
}
