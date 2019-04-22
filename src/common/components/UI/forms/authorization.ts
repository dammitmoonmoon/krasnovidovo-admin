import {FieldConfigMarker} from "../FormGenerator/FieldConfigMaker";
import {FieldConfigPartial} from "../FormGenerator/FormGeneratorTypes";
import {isRequired, ValidatorHints } from "../FormGenerator/validators";

const login: FieldConfigPartial = {
    inputParams: {
        common: {
            type: 'text',
            name: 'login',
            placeholder: 'Введите логин',
            label: 'Логин',
        },

    },
    validators: [
        {
            validator: isRequired,
            hint: ValidatorHints.REQUIRED
        },
    ],
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
     validators: [
         {
             validator: isRequired,
             hint: ValidatorHints.REQUIRED
         },
     ],
 };

const authForm = [login, password].map(config => new FieldConfigMarker(config));

export {
    authForm
};

