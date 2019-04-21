import {FieldConfigMarker, FieldConfigPartial} from "../FieldConfigMaker";

const login: FieldConfigPartial = {
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

 const password: FieldConfigPartial = {
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

const authForm = [[login, password].map(config => new FieldConfigMarker(config))];

export {
    authForm
};

