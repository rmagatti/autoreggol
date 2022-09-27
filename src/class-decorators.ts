import { ConstructorType, MetadataKey } from "./base";

function AutoLogBypassClass<T extends ConstructorType>(constructor: T): T {
  Reflect.defineMetadata(MetadataKey.BYPASS_LOGGING, true, constructor);

  return constructor;
}

export { AutoLogBypassClass };
