import { getEnv } from '../src';

const setEnv = (appEnv?: string, nodeEnv?: string) => {
  if (appEnv) {
    process.env.APP_ENV = appEnv;
  } else {
    delete process.env.APP_ENV;
  }

  if (nodeEnv) {
    process.env.NODE_ENV = nodeEnv;
  } else {
    delete process.env.NODE_ENV;
  }
};

beforeAll(() => {
  delete process.env.APP_ENV;
  delete process.env.NODE_ENV;
});

afterAll(() => {
  delete process.env.APP_ENV;
  process.env.NODE_ENV = 'test';
});

describe('env', () => {
  test('APP_ENV: undefined, NODE_ENV: undefined = development', async () => {
    setEnv(undefined, undefined);

    const env = getEnv();

    expect(env).toStrictEqual({
      isTest: false,
      isDevelopment: true,
      isIntegration: false,
      isStaging: false,
      isProduction: false,
      isLive: false
    });
  });

  test('APP_ENV: undefined, NODE_ENV: test = test', async () => {
    setEnv(undefined, 'test');

    const env = getEnv();

    expect(env).toStrictEqual({
      isTest: true,
      isDevelopment: false,
      isIntegration: false,
      isStaging: false,
      isProduction: false,
      isLive: false
    });
  });

  test('APP_ENV: development, NODE_ENV: undefined = development', async () => {
    setEnv('development', undefined);

    const env = getEnv();

    expect(env).toStrictEqual({
      isTest: false,
      isDevelopment: true,
      isIntegration: false,
      isStaging: false,
      isProduction: false,
      isLive: false
    });
  });

  test('APP_ENV: development, NODE_ENV: production = development', async () => {
    setEnv('development', 'production');

    const env = getEnv();

    expect(env).toStrictEqual({
      isTest: false,
      isDevelopment: true,
      isIntegration: false,
      isStaging: false,
      isProduction: false,
      isLive: false
    });
  });

  test('APP_ENV: development, NODE_ENV: test = test', async () => {
    setEnv('development', 'test');

    const env = getEnv();

    expect(env).toStrictEqual({
      isTest: true,
      isDevelopment: false,
      isIntegration: false,
      isStaging: false,
      isProduction: false,
      isLive: false
    });
  });

  test('APP_ENV: production, NODE_ENV: test = test', async () => {
    setEnv('production', 'test');

    const env = getEnv();

    expect(env).toStrictEqual({
      isTest: true,
      isDevelopment: false,
      isIntegration: false,
      isStaging: false,
      isProduction: false,
      isLive: false
    });
  });

  test('APP_ENV: production, NODE_ENV: production = production', async () => {
    setEnv('production', 'production');

    const env = getEnv();

    expect(env).toStrictEqual({
      isTest: false,
      isDevelopment: false,
      isIntegration: false,
      isStaging: false,
      isProduction: true,
      isLive: true
    });
  });

  test('APP_ENV: staging, NODE_ENV: production = staging', async () => {
    setEnv('staging', 'production');

    const env = getEnv();

    expect(env).toStrictEqual({
      isTest: false,
      isDevelopment: false,
      isIntegration: false,
      isStaging: true,
      isProduction: false,
      isLive: true
    });
  });
});
