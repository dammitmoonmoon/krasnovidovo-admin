import {FieldConfigMarker, FieldConfigPartial} from "../FieldConfigMaker";
import {isInRange, isNumeric, isRequired, ValidatorHints } from "../validators";

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
         {
             validator: isNumeric,
             hint: ValidatorHints.NUMERIC
         },
         {
             validator: isInRange,
             hint: `Введите число в диапазоне от 0 до 10`,
             params: {min: 0, max: 10}
         },
     ],
 };

const authForm = [login, password].map(config => new FieldConfigMarker(config));

export {
    authForm
};

