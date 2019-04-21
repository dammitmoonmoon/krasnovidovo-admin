import React from 'react';
import { FormGroup } from "reactstrap";
import {ControlledInput} from "../Input/Input";
import {FieldConfig} from "./FieldConfigMaker";
import {useFormData} from "./formGeneratorHook";

interface Props {
    formConfig: FieldConfig[]
}

const FormGenerator: React.FC<Props>  = (props: Props) => {
    const {config, updateFormData} = useFormData(props);
    return (
        <FormGroup>
            {
                config.map((item, index) =>(
                    <ControlledInput
                        {...item} changeHandler={updateFormData} key={index}
                    />
                ))
            }
        </FormGroup>
    );
};


export {
    FormGenerator
};
