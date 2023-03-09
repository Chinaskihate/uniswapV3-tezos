import { BaseToken } from "./baseToken";
import { ExtendedStatistics } from "./extendedStatistics";

export class TokenWithExtendedStatistics extends BaseToken {
  constructor(fullName: string, shortName: string, address: string,
              private _statistics: ExtendedStatistics) {
    super(address, fullName, shortName);
  }

  get statistics(): ExtendedStatistics {
    return this._statistics
  }

  set statistics(statistics: ExtendedStatistics) {
    this._statistics = statistics;
  }
}