import { defaults as tsjPreset } from 'ts-jest/presets'

const config = {
  verbose: true,
  preset: 'ts-jest',
  transform: {
    ...tsjPreset.transform
  },
  testMatch: ['**/test/jest/**/*.test.ts'],
};

export default config;
