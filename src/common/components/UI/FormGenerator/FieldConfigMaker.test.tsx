import { ConfigMarker } from './ConfigMaker';
import {
  fieldConfigBrief,
  fieldConfigLong,
  fieldConfigPartialBrief,
  fieldConfigPartialLong
} from "./testData";

describe('formGeneratorHook', () => {
  it('formGeneratorHook constructor completes a field config partial', () => {
    const fieldConfigFull = new ConfigMarker(fieldConfigPartialLong);
    expect(fieldConfigFull).toEqual(fieldConfigLong);
    const fieldConfigPartial = new ConfigMarker(fieldConfigPartialBrief);
    expect(fieldConfigPartial).toEqual(fieldConfigBrief);
  });
  it('makeForm function transforms several field config partials into a single form config', () => {
    expect(ConfigMarker.makeForm([fieldConfigPartialLong, fieldConfigPartialBrief])).toEqual([fieldConfigLong, fieldConfigBrief]);
  });
});


