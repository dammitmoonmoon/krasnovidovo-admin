import React from 'react';
import {Input, InputProps, Label} from "reactstrap";
import {FieldConfig} from "../Form/fieldValues";

const ControlledInput: React.FC<FieldConfig> = (props: FieldConfig) => {
    const inputElement = inputTypeSelector(props);
    const label = props.inputData.common.label;
    return (
        <div>
            <Label>{label}</Label>
            {inputElement}
        </div>
    );
};


function inputTypeSelector(props: FieldConfig): JSX.Element {
    let InputElement: JSX.Element = <></>;
    const inputProps = getInputProps(props);
    const selectorOptions = props.inputData.custom.options || [];
    switch (props.inputConfig.inputType) {
        case ('select'):
            InputElement = (<Input
                type="select"
                {...inputProps}
            >
                {
                    selectorOptions.map(item =>
                        <option
                            key={item.displayValue}
                            value={item.value}
                        >
                            {item.displayValue}
                        </option>
                    )
                }
            </Input>);
            break;
        default:
            InputElement = <Input
                {...inputProps}
            />;
            break;
    }
    return InputElement;
}

function getInputProps ({ inputData, inputControl, inputConfig}: FieldConfig): InputProps {
    const validation = inputControl.validation;
    const commonInputData = inputData.common;

    const hasValidators = validation.validators.length > 0;
    const valid = hasValidators ? validation.valid : void 0;
    const invalid = hasValidators ? !validation.valid : void 0;

    return {
        valid,
        invalid,
        type: inputConfig.inputType,
        key: commonInputData.name,
        ...commonInputData,
    }
}

export {
    ControlledInput
};
