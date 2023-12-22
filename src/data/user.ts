export class User {
  constructor(public readonly uid: string, public readonly email: string) {}

  copyWith(data: Partial<Record<keyof User, any>>) {
    return new User(data.uid ?? this.uid, data.email ?? this.email);
  }
}

