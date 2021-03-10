import "reflect-metadata";
import { MetadataKey, AutoLogOptions, ConstructorType, Level } from "./base";

function AutoLog({
  logger,
  level = "info",
  enablePropertyLoging = false,
}: AutoLogOptions) {
  return function _autolog<T extends ConstructorType>(constructor: T) {
    return new Proxy(constructor, {
      construct(clz, args) {
        return new Proxy(Reflect.construct(clz, args), {
          get(target: any, propKey: any, receiver: any) {
            const targetValue = Reflect.get(target, propKey, receiver);
            const bypassLogging = Reflect.getMetadata(
              MetadataKey.BYPASS_LOGGING,
              target,
              propKey
            );
            const logLevel = Reflect.getMetadata(
              MetadataKey.LOG_LEVEL,
              target,
              propKey
            ) as Level | undefined;

            const LEVEL = logLevel ?? level;

            if (typeof targetValue === "function" && !bypassLogging) {
              return function _function(...args: any): typeof target {
                logger(constructor, propKey, args, LEVEL);

                return targetValue.apply(receiver, args);
              };
            } else {
              if (enablePropertyLoging && !bypassLogging) {
                logger(constructor, propKey, targetValue, LEVEL);
              }

              return targetValue;
            }
          },
        });
      },
    });
  };
}

export { AutoLog };

export * from "./base";
export * from "./method-decorators";
export * from "./propery-decorators";
