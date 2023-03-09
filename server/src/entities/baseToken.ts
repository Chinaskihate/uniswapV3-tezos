import { DomainObject } from "./domainObject";

export class BaseToken extends DomainObject {
  constructor(address: string,
              private readonly _fullName: string,
              private readonly _shortName: string) {
    super(address);
  }

  get fullName(): string {
    return this._fullName
  }

  get shortName(): string {
    return this._shortName
  }
}