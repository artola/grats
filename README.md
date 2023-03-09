# -------  EXPERIMENTAL PRE ALPHA ------

**This is just a proof of concept right now. Everything is very thrown together and inefficient. If it encounters any AST nodes I haven't considered yet, it will simply error out.**

#  TypeScript First GraphQL (Name to be determined)

TypeScript First GraphQL is a library for deriving a GraphQL schema from
your lightly-annotated TypeScript code. The goal is to make your TypeScript
code, and its types, the source of truth for your GraphQL schema without
requiring decorators or other special syntax/APIs.

Opt classes and methods on your existing models into your GraphQL API by
annotating them with a simple comment. TypeScript First GraphQL will derive the 
GraphQL schema for you via static analysis.

## Example

```ts
/** @GQLType */
export default class Query {
  /** @GQLField */
  me(): User {
    return new User();
  }
}

/** @GQLType */
class User {
  /** @GQLField */
  name(): string {
    return "Alice";
  }
  /** @GQLField */
  greeting(args: { salutation: string }): string {
    return `${args.salutation}, ${this.name()}`;
  }
}
```

Extracts the following GraphQL schema:

```graphql
type Query {
  me: User
}

type User {
  name: String
  greeting(salutation: String!): String
}
```

## CLI Usage

Still very rough, but you can try it out with:

*Note:* Globs will be evaluated relative to the current working directory.

```bash
git clone ...
yarn
yarn cli <glob of files to analyze>
```

## API Usage

In order for TypeScript First GraphQL to be able to analyze your code, you need
to annotate your code with JSDoc docblocks. 

**Note that JSDocs must being with
`/**` (two asterix).** However, they may be consolidated into a single line.

### @GQLType

GraphQL types can be defined by placing a `@GQLType` docblock directly before a:

* Class declaration

```
/**
 * @GQLType
 * @name <name of the type, if different from class name> (optional)
 */
 class MyClass {}
 ```

### @GQLField

Within a `@GQLType` class, you can define GraphQL fields by placing a `@GQLField` directly before a:

* Method declaration
* Property declaration

```
/**
 * @GQLField
 * @name <name of the field, if different from property name> (optional)
 */
someField: string;

/**
 * @GQLField
 * @name <name of the field, if different from method name> (optional)
 */
 myField(): string {
   return "Hello World";
 }
 ```

## Example

See `example-server/` in the repo root for a working example. Here we run the static
analysis at startup time. Nice for development, but not ideal for production where you would want to cache the schema and write it to disk for other tools to see.


## Why not to use TypeScript First GraphQL?

Because TypeScript First GraphQL relies on static analysis to infer types, it
requires that your GraphQL fields explicitly, using types that can be statically
analyzed. This means that you can't use complex derived types in positions where
TypeScript First GraphQL needs to be able to infer the type. For example, field
arguments and return values. 