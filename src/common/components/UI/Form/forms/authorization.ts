import {FieldConfigMarker, FieldConfigPartial} from "../FieldConfigMaker";
import {validators} from "../validators";

const login: FieldConfigPartial = {
    inputParams: {
        common: {
            type: 'text',
            name: 'login',
            placeholder: 'Введите логин',
            label: 'Логин',
        },
    },
    validators: [validators.isRequired],
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
     validators: [validators.isRequired, validators.isNumber],
 };

const authForm = [login, password].map(config => new FieldConfigMarker(config));

export {
    authForm
};

