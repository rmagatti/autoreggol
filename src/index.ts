/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";
import { MetadataKey, AutoLogOptions, ConstructorType, Level } from "./base";

function AutoLog({
  logger,
  level = "info",
  enablePropertyLoging = false,
  enableLogging = true,
}: AutoLogOptions) {
  return function _autolog<T extends ConstructorType>(constructor: T) {
    const shouldBypass =
      Reflect.getMetadata(MetadataKey.BYPASS_LOGGING, constructor) ?? false;

    if (!shouldBypass) {
      const proxy = new Proxy(constructor, {
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

                /** :facepalm: This is awful.
                * The reason this is needed is because _something_ in jest-mock _really_ doesn't like it when a wrapper on the function is returned. With Vitest's `spyOn` this doesn't seem to be a problem.
                */
                if (targetValue._isMockFunction) {
                  return targetValue;
                }

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

      if (enableLogging) {
        return proxy;
      }

      return constructor;
    }

    return constructor;
  };
}

export { AutoLog };

export * from "./base";
export * from "./class-decorators";
export * from "./method-decorators";
export * from "./property-decorators";
