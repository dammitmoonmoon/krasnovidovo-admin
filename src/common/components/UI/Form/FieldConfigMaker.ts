import {InputType} from "reactstrap/lib/Input";

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
    validation?: {
        validators: string[];
        hints: string[];
    };
}

export interface FieldConfig {
    inputData: {
        value: string;
        valid: boolean;
        touched: boolean;
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
    validation?: {
        validators: string[];
        hints: string[];
    };
}

export class FieldConfigMarker implements FieldConfig {
    public inputData: FieldConfig['inputData'];
    public inputParams: FieldConfig['inputParams'];
    public validation: FieldConfig['validation'];

    public constructor(props: FieldConfigPartial) {
        this.inputData = {
            value: '',
            valid: false,
            touched: false,
        };

        this.inputParams = {
            ...props.inputParams,
            common: {
                placeholder: '',
                label: '',
                type: 'text',
                ...props.inputParams.common
            },
        };

        this.validation = props.validation ? {
            ...props.validation,
        } : void 0;
    }
}
