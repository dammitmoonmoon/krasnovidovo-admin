import {FieldConfig, FieldConfigPartial} from "./FormGeneratorTypes";

export class ConfigMarker {
    public static makeForm(fieldConfigPartials: FieldConfigPartial[]): FieldConfig[] {
        return fieldConfigPartials.map(config => new ConfigMarker(config));
    }

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
