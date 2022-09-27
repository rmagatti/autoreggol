import { AutoLog, LogFunction } from "../src";

describe("AutoLog", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const logger: LogFunction = vi.fn();
  const level = "debug";

  test("calls the log function when accessing a method", async () => {
    @AutoLog({ logger, level })
    class MyClass {
      public property = "aProperty";

      myMethod(myArg: string) {
        return `my return ${myArg}`;
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
  });

  test("calls the log function when accessing a property", async () => {
    @AutoLog({ logger, level, enablePropertyLoging: true })
    class MyPropertyLoggingClass {
      public property = "aProperty";

      myMethod(myArg: string) {
        return `my return ${myArg}`;
      }
    }

    const myPropertyLoggingClass = new MyPropertyLoggingClass();
    myPropertyLoggingClass.property;

    expect(logger).toHaveBeenCalledWith(
      expect.anything(), // Comparing `MyClass` with `MyClass` here doesn' really work since `@AutoLog` wraps the class in a proxy?
      "property",
      "aProperty",
      "debug"
    );
  });

  test("does not call the log function when enableLogging is false", async () => {
    @AutoLog({ logger, level, enableLogging: false })
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
