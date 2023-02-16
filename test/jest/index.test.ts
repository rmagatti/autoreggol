import { AutoLog, LogFunction } from "../../src";

describe("AutoLog", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const logger: LogFunction = jest.fn();
  const level = "debug";

  test("jest spy still works even on classes decorated with AutoLog", async () => {
    @AutoLog({ logger, level })
    class MyClass {
      public property = "aProperty";

      myMethod(myArg: string) {
        return `my return ${myArg}`;
      }
    }

    const myClass = new MyClass();

    jest.spyOn(myClass, "myMethod").mockReturnValue("aReturnValue");

    const ret = myClass.myMethod("anArg");

    expect(ret).toBe("aReturnValue");
  });
});
