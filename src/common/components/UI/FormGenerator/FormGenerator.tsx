import React from 'react';
import {Button, Form, FormGroup} from "reactstrap";
import {ControlledInput} from "../ControlledInput/ControlledInput";
import {useFormData} from "./formGeneratorHook";
import {FieldValuePairs, FormData, FormGeneratorProps} from "./FormGeneratorTypes";

const FormGenerator: React.FC<FormGeneratorProps> = (props: FormGeneratorProps) => {
  const {config, updateFormData, formData} = useFormData(props);
  const extractFiledValuesPairs = (formData: FormData) => {
    const fields = Object.keys(formData);
    const fieldValuePairs: FieldValuePairs = fields.reduce((acc, key) => {
        acc[key] = formData[key].value;
        return acc;
      }, {} as FieldValuePairs)
    return fieldValuePairs;
  };
  return (
    <Form>
      <FormGroup>
        {
          config.map((item, index) => (
            <ControlledInput
              {...item} changeHandler={updateFormData} key={index}
            />
          ))
        }
      </FormGroup>
      <Button onClick={() => props.submitHandler(extractFiledValuesPairs(formData))}>
        {props.buttonName}
      </Button>
    </Form>
  );
};


export {
  FormGenerator
};
