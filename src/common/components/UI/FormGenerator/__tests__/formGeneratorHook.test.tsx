import {configure, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import * as React from "react";
import {ConfigMarker} from "../ConfigMaker";
import {extractFormDataFromFieldConfig, FormDataHookResult, useFormData} from "../formGeneratorHook";
import {FieldConfig} from "../FormGeneratorTypes";
import {
  fieldConfigBrief,
  fieldConfigLong,
  fieldConfigPartialBrief,
  fieldConfigPartialLong, formConfig, formEvent,
  generateFormDataFromConfig, updatedFormConfig, UseFormDataWrapper
} from "./testData";

configure({ adapter: new Adapter() });

describe('formGeneratorHook functions', () => {
  test('extractFormDataFromFieldConfig provides correct FormData for the given field', () => {
    expect(extractFormDataFromFieldConfig(fieldConfigLong)).toEqual({
      [fieldConfigLong.inputParams.common.name]: {
        ...fieldConfigLong.inputData
      }
    });
    expect(extractFormDataFromFieldConfig(fieldConfigBrief)).toEqual({
      [fieldConfigBrief.inputParams.common.name]: {
        ...fieldConfigBrief.inputData
      }
    });
  });
  test('generateFormDataFromConfig aggregates FormData for multiple fields into a single FormData object', () => {
    const formConfig = ConfigMarker.makeForm([fieldConfigPartialLong, fieldConfigPartialBrief]);
    expect(generateFormDataFromConfig(formConfig)).toEqual({
      [fieldConfigLong.inputParams.common.name]: fieldConfigLong.inputData,
      [fieldConfigBrief.inputParams.common.name]: fieldConfigBrief.inputData,
    });
  });

});

describe('useFormData', () => {
  it('should render', () => {
    const wrapper = shallow(<UseFormDataWrapper hook={useFormData} inititalData={{formConfig: [] as FieldConfig[]}}/>);
    expect(wrapper.exists()).toBe(true);
  });
  it('should return the initial config', () => {
    const wrapper = shallow(<UseFormDataWrapper hook={useFormData} inititalData={{formConfig}}/>);
    const { config } = wrapper.find('div').prop('data-hook');
    expect(config).toEqual(formConfig);
  });
  it('should generate the form data from the config', () => {
    const wrapper = shallow(<UseFormDataWrapper hook={useFormData} inititalData={{formConfig}}/>);
    const { formData, config } = wrapper.find('div').prop('data-hook');
    expect(formData).toEqual(generateFormDataFromConfig(config));
  });
  it('should modify the initial config when updateFormData is called', () => {
    const wrapper = shallow(<UseFormDataWrapper hook={useFormData} inititalData={{formConfig}}/>);
    const { updateFormData } = wrapper.find('div').prop('data-hook');
    updateFormData(formEvent);
    const hook = wrapper.find('div').prop('data-hook') as FormDataHookResult;
    expect(hook.config).toEqual(updatedFormConfig);
  });
  it('should modify the form data when updateFormData is called', () => {
    const wrapper = shallow(<UseFormDataWrapper hook={useFormData} inititalData={{formConfig}}/>);
    const { updateFormData } = wrapper.find('div').prop('data-hook');
    updateFormData(formEvent);
    const { formData } = wrapper.find('div').prop('data-hook');
    expect(formData).toEqual(generateFormDataFromConfig(updatedFormConfig));
  });
});
