import { BaseToken } from "./baseToken";
import { ExtendedStatistics } from "./extendedStatistics";

export class TokenWithExtendedStatistics extends BaseToken {
  constructor(id: number, fullName: string, shortName: string, address: string,
              private _statistics: ExtendedStatistics) {
    super(id, fullName, shortName, address);
  }

  get statistics(): ExtendedStatistics {
    return this._statistics
  }

  set statistics(statistics: ExtendedStatistics) {
    this._statistics = statistics;
  }
}