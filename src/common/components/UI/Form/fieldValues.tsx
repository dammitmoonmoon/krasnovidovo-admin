import {InputType} from "reactstrap/lib/Input";

export interface FieldConfig  {
    inputData: {
        common: {
            [key: string]: string;
            name: string;
            value: string;
            placeholder: string;
            label: string;
        };
        custom: {
            options?: {
                value: string;
                displayValue: string;
            }[];
        }
    };
    inputConfig: {
        inputType: InputType;
    };
    inputControl: {
        validation: {
            validators: string[];
            valid: boolean;
            hint?: string;
        };
    };
 }

 const login: FieldConfig = {
    inputData: {
        common: {
            name: 'login',
            value: '',
            placeholder: 'Введите логин',
            label: 'Логин',
        },
        custom: {},
    },
    inputConfig: {
        inputType: 'text',
    },
    inputControl: {
        validation: {
            validators: ['required'],
            valid: false,
        },
    },
 };

 const password: FieldConfig = {
     inputData: {
         common: {
             name: 'password',
             value: '',
             placeholder: 'Введите пароль',
             label: 'Пароль',
         },
         custom: {},
     },
     inputConfig: {
         inputType: 'password',
     },
     inputControl: {
         validation: {
             validators: ['required'],
             valid: false,
         },
     },
 };


export {
    login,
    password,
};

