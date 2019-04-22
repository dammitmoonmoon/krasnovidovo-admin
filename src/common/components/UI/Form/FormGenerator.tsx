import React from 'react';
import {Button, Form, FormGroup} from "reactstrap";
import {ControlledInput} from "../Input/Input";
import {FieldConfig} from "./FieldConfigMaker";
import {FormData, useFormData} from "./formGeneratorHook";

interface Props {
    formConfig: FieldConfig[],
    submitHandler: (props: FormData) => void;
}

const FormGenerator: React.FC<Props>  = (props: Props) => {
    const {config, updateFormData, formData} = useFormData(props);
    return (
        <Form>
            <FormGroup>
                {
                    config.map((item, index) =>(
                        <ControlledInput
                            {...item} changeHandler={updateFormData} key={index}
                        />
                    ))
                }
            </FormGroup>
            <Button onClick={() => props.submitHandler(formData)}>Войти</Button>
        </Form>
    );
};


export {
    FormGenerator
};
