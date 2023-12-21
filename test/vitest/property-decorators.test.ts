import {
  AutoLog,
  AutoLogPropBypass,
  AutoLogPropLevel,
  LogFunction,
} from "../../src";

describe("Property Decorators", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const logger: LogFunction = vi.fn();
  const level = "debug";

  describe("@AutoLogPropBypass", () => {
    test("does not call the log function when accessing a property tagged with @AutoLogPropBypass", async () => {
      @AutoLog({ logger, level })
      class MyClass {
        @AutoLogPropBypass
        public myProperty = "aProperty";

        myMethod(myArg: string) {
          return `my return ${myArg}`;
        }
      }

      const myClass = new MyClass();

      myClass.myProperty;

      expect(logger).not.toHaveBeenCalled();
    });
  });

  describe("@AutoLogPropLevel", () => {
    test("changes the log level of a tagged property to a particular level when calling the logger function", async () => {
      @AutoLog({ logger, level, enablePropertyLogging: true })
      class MyClass {
        @AutoLogPropLevel("info")
        public property = "aProperty";

        myMethod(myArg: string) {
          return `my return ${myArg}`;
        }

        myOtherMethod(myOtherArg: string) {
          return `my return ${myOtherArg}`;
        }
      }

      const myClass = new MyClass();

      myClass.property;

      expect(logger).toHaveBeenCalledWith(
        expect.anything(), // Comparing `MyClass` with `MyClass` here doesn' really work since `@AutoLog` wraps the class in a proxy?
        "property",
        "aProperty",
        "info"
      );
    });
  });
});
