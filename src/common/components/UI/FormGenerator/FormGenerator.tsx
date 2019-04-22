import React from 'react';
import {Button, Form, FormGroup} from "reactstrap";
import {ControlledInput} from "../ControlledInput/ControlledInput";
import {useFormData} from "./formGeneratorHook";
import {FormGeneratorProps} from "./FormGeneratorTypes";

const FormGenerator: React.FC<FormGeneratorProps> = (props: FormGeneratorProps) => {
  const {config, updateFormData, formData} = useFormData(props);
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
      <Button onClick={() => props.submitHandler(formData)}>
        {props.buttonName}
      </Button>
    </Form>
  );
};


export {
  FormGenerator
};
