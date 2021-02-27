"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = exports.isLive = exports.isProduction = exports.isStaging = exports.isIntegration = exports.isDevelopment = exports.isTest = void 0;
const getEnv = () => {
    const isTest = process.env.APP_ENV === 'test' || process.env.NODE_ENV === 'test';
    const isDevelopment = !isTest && (process.env.APP_ENV === 'development' || process.env.APP_ENV === undefined);
    const isIntegration = !isTest && process.env.APP_ENV === 'integration';
    const isStaging = !isTest && process.env.APP_ENV === 'staging';
    const isProduction = !isTest && process.env.APP_ENV === 'production';
    const isLive = isIntegration || isStaging || isProduction;
    return {
        isTest,
        isDevelopment,
        isIntegration,
        isStaging,
        isProduction,
        isLive
    };
};
exports.getEnv = getEnv;
const env = getEnv();
const isTest = env.isTest;
exports.isTest = isTest;
const isDevelopment = env.isDevelopment;
exports.isDevelopment = isDevelopment;
const isIntegration = env.isIntegration;
exports.isIntegration = isIntegration;
const isStaging = env.isStaging;
exports.isStaging = isStaging;
const isProduction = env.isProduction;
exports.isProduction = isProduction;
const isLive = env.isIntegration || env.isStaging || env.isProduction;
exports.isLive = isLive;
//# sourceMappingURL=index.js.map