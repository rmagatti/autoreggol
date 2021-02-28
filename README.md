# Auto Reggol

A collection of handy auto logging decorators.

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
import { AutoLogPropBypass } from "../src/propery-decorators";

const logger: LogFunction = (ctr, targetKey, targetValue, level) => {
  console.log(`${level}: ${ctr.name}.${targetKey.toString()}`, targetValue);
};

@AutoLog({ logger, level: "debug", enablePropertyLoging: true })
class Example {
  private a = "foo";
  private b = "bar";
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

```

Result
```
debug: Example.run [ { a: 'Hello', b: 'World' } ]
debug: Example.a foo
debug: Example.b bar
debug: Example.c baz
debug: Example.d qux
debug: Example.e quuz
info: Example.sanitize [ 'Hello' ]
debug: Example.d qux
debug: Example.e quuz
```


### Installation

1. `yarn add autoreggol`

## Development

1. Clone this repo
2. `yarn`
3. `yarn link`
4. In the package you want to test in run `yarn link autoreggol`
5. Build package with `yarn build` or turn on watch mode with `yarn watch`

## Testing

### `yarn test`

## Building

### `yarn build`
If you need to clear the build cache run `yarn clean`
