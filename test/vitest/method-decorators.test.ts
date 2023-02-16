import {
  AutoLog,
  AutoLogBypass,
  AutoLogLevel,
  AutoLogMe,
  LogFunction,
} from "../../src";

describe("Method Decorators", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const logger: LogFunction = vi.fn();
  const level = "debug";

  describe("@AutoLogBypass", () => {
    test("does not call the log function when accessing a method even if enableLogging is true", async () => {
      @AutoLog({ logger, level })
      class MyClass {
        public property = "aProperty";

        @AutoLogBypass
        myMethod(myArg: string) {
          return `my return ${myArg}`;
        }
      }

      const myClass = new MyClass();

      myClass.myMethod("anArg");

      expect(logger).not.toHaveBeenCalled();
    });
  });

  describe("@AutoLogLevel", () => {
    test("changes the log level of a particular method to a particular level when calling the logger function", async () => {
      @AutoLog({ logger, level })
      class MyClass {
        public property = "aProperty";

        myMethod(myArg: string) {
          return `my return ${myArg}`;
        }

        @AutoLogLevel("info")
        myOtherMethod(myOtherArg: string) {
          return `my return ${myOtherArg}`;
        }
      }

      const myClass = new MyClass();

      myClass.myMethod("anArg");

      expect(logger).toHaveBeenCalledWith(
        expect.anything(), // Comparing `MyClass` with `MyClass` here doesn' really work since `@AutoLog` wraps the class in a proxy?
        "myMethod",
        ["anArg"],
        "debug"
      );

      vi.resetAllMocks();

      myClass.myOtherMethod("anOtherArg");

      expect(logger).toHaveBeenCalledWith(
        expect.anything(),
        "myOtherMethod",
        ["anOtherArg"],
        "info"
      );
    });
  });

  describe("@AutoLogMe", () => {
    test("calls the logger function when method is accessed even when the class is not an auto logged class", async () => {
      class MyClass {
        public property = "aProperty";

        myMethod(myArg: string) {
          return `my return ${myArg}`;
        }

        @AutoLogMe(logger)
        myOtherMethod(myOtherArg: string) {
          return `my return ${myOtherArg}`;
        }
      }

      const myClass = new MyClass();

      myClass.myMethod("anArg");

      expect(logger).not.toHaveBeenCalled();

      vi.resetAllMocks();

      myClass.myOtherMethod("anOtherArg");

      expect(logger).toHaveBeenCalledWith(
        expect.anything(),
        "myOtherMethod",
        ["anOtherArg"],
        "info"
      );
    });
  });
});
