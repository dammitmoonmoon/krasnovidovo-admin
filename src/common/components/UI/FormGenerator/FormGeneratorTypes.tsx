import {InputType} from "reactstrap/lib/Input";
import {Validator} from "./validators";

export interface FieldConfigPartial {
    inputParams: {
        common: {
            [key: string]: string;
            name: string;
        };
        options?: {
            value: string;
            displayValue: string;
        }[];
    };
    validators: Validator[];
}

export interface FieldConfig {
    inputData: {
        value: string;
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
    value: string;
    valid: boolean;
    touched: boolean;
    hint: string;
}

export interface FormGeneratorProps {
    formConfig: FieldConfig[],
    submitHandler: (props: FormData) => void;
    buttonName: string;
}
