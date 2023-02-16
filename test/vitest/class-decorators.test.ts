import { AutoLog, AutoLogBypassClass, LogFunction } from "../../src";

describe("Class Decorators", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const logger: LogFunction = vi.fn();
  const level = "debug";

  describe("@AutoLogBypassClass", () => {
    test("does not call the log function when accessing a method even if enableLogging is true", async () => {
      @AutoLog({ logger, level, enableLogging: true })
      @AutoLogBypassClass
      class MyClass {
        public property = "aProperty";

        myMethod(myArg: string) {
          return `my return ${myArg}`;
        }
      }

      const myClass = new MyClass();

      myClass.myMethod("anArg");

      expect(logger).not.toHaveBeenCalled();
    });
  });
});
