import { Level, MetadataKey } from "./base";

export function AutoLogBypass<T>(
  target: any,
  propertyKey: string,
  _descriptor: TypedPropertyDescriptor<T>
) {
  Reflect.defineMetadata(MetadataKey.BYPASS_LOGGING, true, target, propertyKey);
}

export function AutoLogLevel(level: Level) {
  return function _loglevel<T>(
    target: any,
    propertyKey: string,
    _descriptor: TypedPropertyDescriptor<T>
  ) {
    Reflect.defineMetadata(MetadataKey.LOG_LEVEL, level, target, propertyKey);
  };
}
