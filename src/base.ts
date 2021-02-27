export type Level = "fatal" | "error" | "warn" | "info" | "debug" | "trace";

export type ConstructorType = { new (...args: any[]): {} };

export const enum MetadataKey {
  BYPASS_LOGGING = "BYPASS_LOGGING",
  LOG_LEVEL = "LOG_LEVEL",
}

export interface AutoLogOptions {
  logger: LogFunction;
  level?: Level;
  enablePropertyLoging?: boolean;
}

export type LogFunction = (
  ctr: ConstructorType,
  targetKey: any,
  targetValue: any,
  level: Level
) => void;
