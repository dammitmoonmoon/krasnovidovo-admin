export type ValidatorCB<T=any, U=any> = (value: T, props?: U) => boolean;

export interface FieldValidators {
    [key: string]: Validator[],
}

export interface Validator {
    validator: ValidatorCB,
    params?: any;
    hint: string;
}

const isRequired: ValidatorCB<string|number> = (value): boolean => !!value;

const isNumeric: ValidatorCB<any> = (value): boolean => !!value && !isNaN(Number(value));

const isInRange: ValidatorCB<any, {min: number, max: number}> = (value, range) => {
    if (isNaN(value) || !range) {
        return false;
    }
    return value >= range.min && value <= range.max;
};

enum ValidatorHints {
    REQUIRED = "Введите значение",
    NUMERIC = "Введите число",
}

export {
    isRequired,
    isNumeric,
    isInRange,
    ValidatorHints,
};
