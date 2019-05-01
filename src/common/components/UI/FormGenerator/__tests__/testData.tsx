import * as React from "react";
import {ConfigMarker} from "../ConfigMaker";
import {extractFormDataFromFieldConfig, FormDataHookResult} from "../formGeneratorHook";
import {FieldConfig, FieldConfigPartial, FormData, FormDataHookProps} from "../FormGeneratorTypes";
import {isRequired, ValidatorHints} from "../validators";

interface HookWrapperProps {
  hook: (props: FormDataHookProps) => FormDataHookResult;
  inititalData: {
    formConfig: FieldConfig[];
  }
}

const fieldConfigPartialLong: FieldConfigPartial = {
  inputParams: {
    common: {
      type: 'text',
      name: 'username',
      placeholder: 'Введите имя пользователя',
      label: 'Имя пользователя',
    },
    options: [
      {
        value: '1',
        displayValue: 'Раз',
      },
      {
        value: '2',
        displayValue: 'Два',
      },
    ],
  },
  validators: [
    {
      validator: isRequired,
      hint: ValidatorHints.REQUIRED,
    },
  ],
};

const fieldConfigLong: FieldConfig = {
  inputData: {
    value: '',
    valid: false,
    touched: false,
    hint: '',
  },
  inputParams: {
    common: {
      type: 'text',
      name: 'username',
      placeholder: 'Введите имя пользователя',
      label: 'Имя пользователя',
    },
    options: [
      {
        value: '1',
        displayValue: 'Раз',
      },
      {
        value: '2',
        displayValue: 'Два',
      },
    ],
  },
  validators: [
    {
      validator: isRequired,
      hint: ValidatorHints.REQUIRED,
    },
  ],
};

const fieldConfigPartialBrief: FieldConfigPartial = {
  inputParams: {
    common: {
      name: 'password',
    },
  }
};

const fieldConfigBrief: FieldConfig = {
  inputData: {
    value: '',
    valid: false,
    touched: false,
    hint: '',
  },
  inputParams: {
    common: {
      type: 'text',
      name: 'password',
      placeholder: '',
      label: '',
    },
  },
  validators: undefined,
};

const formConfig = ConfigMarker.makeForm([fieldConfigLong, fieldConfigBrief]);

const UseFormDataWrapper = (props: HookWrapperProps) => {
  const hook = props.hook ? props.hook(props.inititalData) : undefined;
  return <div data-hook={hook} />;
};

const formEvent = {
  target: {
    value: 'new-value',
    name: fieldConfigBrief.inputParams.common.name,
  }
};

const updatedFormConfig = formConfig.map(fieldConfig => {
  if (fieldConfig.inputParams.common.name === fieldConfigBrief.inputParams.common.name) {
    fieldConfig.inputData = {
      ...fieldConfig.inputData,
      value: formEvent.target.value,
      touched: true,
      valid: true,
    }
  }
  return fieldConfig;
});

function generateFormDataFromConfig(formConfig: FieldConfig[]): FormData {
  return formConfig.reduce((acc, curr) => ({...acc, ...extractFormDataFromFieldConfig(curr)}), {});
}

export {
  fieldConfigPartialLong,
  fieldConfigLong,
  fieldConfigPartialBrief,
  fieldConfigBrief,
  formConfig,
  UseFormDataWrapper,
  formEvent,
  updatedFormConfig,
  generateFormDataFromConfig,
};
