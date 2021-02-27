import { Level, MetadataKey } from "./base";

export function AutoLogPropBypass(target: any, propertyKey: string) {
  Reflect.defineMetadata(MetadataKey.BYPASS_LOGGING, true, target, propertyKey);
}

export function AutoLogPropLevel(level: Level) {
  return function _loglevel(target: any, propertyKey: string) {
    Reflect.defineMetadata(MetadataKey.LOG_LEVEL, level, target, propertyKey);
  };
}
