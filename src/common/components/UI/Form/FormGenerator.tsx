import React from 'react';
import { FormGroup } from "reactstrap";
import {ControlledInput} from "../Input/Input";
import {FieldConfig} from "./FieldConfigMaker";
import {useFormData} from "./formGeneratorHook";

interface Props {
    formConfig: FieldConfig[][]
}

const FormGenerator: React.FC<Props>  = (props: Props) => {
    const {config, updateFormData} = useFormData(props);
    return (
        <>
            {
                config.map((group, index) =>(
                    <FormGroup key={index}>
                        {group.map((item, index) =>
                            <ControlledInput
                                {...item} changeHandler={updateFormData} key={index}
                            />
                        )}
                    </FormGroup>
                ))
            }
        </>
    );
};


export {
    FormGenerator
};
