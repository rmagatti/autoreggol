# Auto Reggol

A collection of handy decorators for auto logging class methods and properties based on es6 proxies and reflect-metadata.

## Usage
Provide a `LogFunction` for auto reggol to call.
```typescript
const logger: LogFunction = (ctr, targetKey, targetValue, level) => {
  console.log(`${level}: ${ctr.name}.${targetKey.toString()}`, targetValue);
};
```

Pass the logger function into the `@AutoLog` decorator.
```typescript
@AutoLog({ logger, level: "debug", enablePropertyLoging: true })
class Example {}
```

Full example
```typescript
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
```

Result
```
debug: Example.run [ { a: 'Hello', b: 'World' } ]
debug: Example.a foo
debug: Example.b bar
warn: Example.c baz
debug: Example.d qux
debug: Example.e quuz
info: Example.sanitize [ 'Hello' ]
debug: Example.d qux
debug: Example.e quuz
info: NonLoggedClass.iDoLog [ 'arg1' ]
```
