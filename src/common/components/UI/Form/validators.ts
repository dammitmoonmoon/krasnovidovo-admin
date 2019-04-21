export type ValidatorCB<T=any, U=(string|number)[]> = (value: T, props?: U) => boolean;

export interface ValidatorCollection {
    [key: string]: Validator
}

export interface Validators {
    [key: string]: Validator[]
}

export interface Validator {
    cb: ValidatorCB;
    hint: string;
    params?: (string|number)[];
}

const isRequired: ValidatorCB = (value) => !!value;

const isNumeric: ValidatorCB = (value) => !isNaN(value);

const validators: ValidatorCollection = {
    isRequired: {
        cb: isRequired,
        hint: 'Это обязательное поле',
    },
    isNumber: {
        cb: isNumeric,
        hint: 'Требуется ввести числовое значение',
    },
};

export {
    validators,
};
