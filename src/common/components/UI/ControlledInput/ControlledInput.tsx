import React from 'react';
import {Input, InputProps, Label} from "reactstrap";
import {FieldConfig} from "../FormGenerator/FormGeneratorTypes";
import {Hint} from "../misc";

interface Props extends FieldConfig {
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ControlledInput: React.FC<Props> = props => {
  const inputElement = inputTypeSelector(props);
  const label = props.inputParams.common.label;
  return (
    <div>
      <Label>{label}</Label>
      {inputElement}
      {
        props.inputData.touched && !props.inputData.valid
        && <Hint>{props.inputData.hint}</Hint>
      }
    </div>
  );
};

function inputTypeSelector(props: Props): JSX.Element {
  let InputElement: JSX.Element = <></>;
  const inputProps = getInputProps(props);
  const selectorOptions = props.inputParams.options || [];
  switch (props.inputParams.common.type) {
    case ('select'):
      InputElement = (<Input
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

function getInputProps({inputData, validators, inputParams, changeHandler}: Props): InputProps {
  const valid = validators ? (inputData.touched && inputData.valid) : void 0;
  const invalid = validators ? (inputData.touched && !inputData.valid) : void 0;

  return {
    valid,
    invalid,
    key: inputParams.common.name,
    value: inputData.value,
    onChange: changeHandler,
    ...inputParams.common,
  }
}

export {
  ControlledInput
};
