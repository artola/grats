/** @gqlType */
type Query = unknown;

/** @gqlField */
export function me(_: Query): User {
  return new User();
}

/** @gqlType */
class User {
  constructor(
    /** @gqlField hello */
    public NOT_THIS: string = "world",
  ) {}
}

export const query = `
  query {
    me {
      hello
    }
  }
`;
