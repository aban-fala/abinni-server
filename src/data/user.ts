export class User {
  constructor(
    public readonly uid: string,
    public readonly name: string,
    public readonly email: string
  ) {}

  copyWith(data: Partial<Record<keyof User, any>>) {
    return new User(
      data.uid ?? this.uid,
      data.name ?? this.name,
      data.email ?? this.email
    );
  }
}

