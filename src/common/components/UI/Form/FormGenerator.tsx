import React from 'react';
import { Form, FormGroup } from "reactstrap";
import {ControlledInput} from "../Input/Input";
import {FieldConfig} from "./fieldValues";

interface Props {
    formConfig: FieldConfig[][]
}

const FormGenerator: React.FC<Props>  = (props: Props) => {
    return (
        <Form>
            {
                props.formConfig.map(group => (<FormGroup>
                    {group.map(item =>
                        <ControlledInput
                            {...item}
                        />
                    )}
                </FormGroup>))
            }
        </Form>
    );
};


export {
    FormGenerator
};
