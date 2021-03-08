import { ConstructorType, Level, LogFunction, MetadataKey } from "./base";

export function AutoLogBypass<T>(
  target: Object,
  propertyKey: string | symbol,
  _descriptor: TypedPropertyDescriptor<T>
) {
  Reflect.defineMetadata(MetadataKey.BYPASS_LOGGING, true, target, propertyKey);
}

export function AutoLogLevel(level: Level) {
  return function _loglevel<T>(
    target: Object,
    propertyKey: string | symbol,
    _descriptor: TypedPropertyDescriptor<T>
  ) {
    Reflect.defineMetadata(MetadataKey.LOG_LEVEL, level, target, propertyKey);
  };
}

export function AutoLogMe(logger: LogFunction, level: Level = "info") {
  return function _AutoLogMe(
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      logger(target.constructor as ConstructorType, key, args, level);

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
