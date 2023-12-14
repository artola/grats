/**
 * A registered user of the system.
 * @gqlType
 */
class User {
  /**
   * A friendly greeting for the user, intended for
   * their first visit.
   * @gqlField
   */
  hello(args: {
    /** The salutation to use */
    greeting: string;
  }): string {
    return `${args.greeting} World`;
  }
}
