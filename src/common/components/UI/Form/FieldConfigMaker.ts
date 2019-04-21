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

export class FieldConfigMarker {
    public inputData: FieldConfig['inputData'];
    public inputParams: FieldConfig['inputParams'];
    public validators: FieldConfig['validators'];

    public constructor(props: FieldConfigPartial) {
        this.inputData = {
            value: '',
            valid: false,
            touched: false,
            hint: '',
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
        this.validators = props.validators || void 0;
    }
}
