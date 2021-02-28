import { AutoLog } from "../src";
import { LogFunction } from "../src/base";
import { AutoLogLevel, AutoLogBypass } from "../src/method-decorators";
import { AutoLogPropBypass, AutoLogPropLevel } from "../src/propery-decorators";

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

const adapter = new Example();

adapter.run({ a: "Hello", b: "World" });
