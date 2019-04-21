import {InputType} from "reactstrap/lib/Input";

export interface FieldConfig  {
    inputData: {
        value: string;
        valid: boolean;
        touched: boolean;
    },
    inputParams: {
        common: {
            [key: string]: string;
            name: string;
            placeholder: string;
            label: string;
            type: InputType;
        };
        options?: {
            value: string;
            displayValue: string;
        }[];
    };
    validation: {
        validators: string[];
        hints: string[];
    };
 }

 const login: FieldConfig = {
    inputData: {
        value: '',
        valid: false,
        touched: false,
    },
    inputParams: {
        common: {
            type: 'text',
            name: 'login',
            placeholder: 'Введите логин',
            label: 'Логин',
        },
    },
    validation: {
        validators: ['required'],
        hints: ['Это обязательное поле'],
    },
 };

 const password: FieldConfig = {
     inputData: {
         value: '',
         valid: false,
         touched: false,
     },
     inputParams: {
         common: {
             type: 'password',
             name: 'password',
             placeholder: 'Введите пароль',
             label: 'Пароль',
         },
     },
     validation: {
         validators: ['required'],
         hints: ['Это обязательное поле'],
     },
 };


export {
    login,
    password,
};

