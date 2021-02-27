export interface Env {
    isTest: boolean;
    isDevelopment: boolean;
    isIntegration: boolean;
    isStaging: boolean;
    isProduction: boolean;
    isLive: boolean;
}
declare const getEnv: () => Env;
declare const isTest: boolean;
declare const isDevelopment: boolean;
declare const isIntegration: boolean;
declare const isStaging: boolean;
declare const isProduction: boolean;
declare const isLive: boolean;
export { isTest, isDevelopment, isIntegration, isStaging, isProduction, isLive, getEnv };
