const config = {
  verbose: true,
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testMatch: ['**/test/jest/**/*.test.ts'],
};

export default config;
