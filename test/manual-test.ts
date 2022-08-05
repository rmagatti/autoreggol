import { AutoLog } from "../src";
import { LogFunction } from "../src/base";
import {
  AutoLogLevel,
  AutoLogBypass,
  AutoLogMe,
} from "../src/method-decorators";
import {
  AutoLogPropBypass,
  AutoLogPropLevel,
} from "../src/property-decorators";

const logger: LogFunction = (ctr, targetKey, targetValue, level) => {
  console.log(`${level}: ${ctr.name}.${targetKey.toString()}`, targetValue);
};

@AutoLog({ logger, level: "debug", enablePropertyLoging: true })
class Example {
  private a = "foo";
  private b = "bar";
  @AutoLogPropLevel("warn")
  private c = "baz";

  private d = "qux";
  private e = "quuz";

  @AutoLogPropBypass
  private f = "corge";

  @AutoLogLevel("info")
  private sanitize(str: string): string {
    this.d;
    this.e;
    this.f;

    return `A String ${str}`;
  }

  @AutoLogBypass
  private doSomething(str: string): string {
    this.d;
    this.e;
    this.f;

    return `A String ${str}`;
  }

  run(args: { a: string; b: string }): string {
    this.a;
    this.b;
    this.c;

    this.doSomething("something");

    return this.sanitize(args.a);
  }
}

const example = new Example();

example.run({ a: "Hello", b: "World" });

class NonLoggedClass {
  iDontLog() {
    return "not me";
  }

  @AutoLogMe(logger)
  iDoLog(argument: string) {
    return `me please ${argument}`;
  }
}

const nonLoggedClass = new NonLoggedClass();

nonLoggedClass.iDontLog();
nonLoggedClass.iDoLog("arg1");


@AutoLog({ logger, level: "debug", enableLogging: false })
class DisabledLoggedClass {
  iDontLog() {
    return "not me";
  }
}

const disabledLoggedClass = new DisabledLoggedClass();

disabledLoggedClass.iDontLog();
