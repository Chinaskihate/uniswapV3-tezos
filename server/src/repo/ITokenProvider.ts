import { BaseToken } from "../entities/tokens/baseToken";
import { ExtendedToken } from "../entities/tokens/extendedToken";
import { TokenWithBaseStatistics } from "../entities/tokens/tokenWithBaseStatistics";
import { TokenWithExtendedStatistics } from "../entities/tokens/tokenWithExtendedStatistics";

export interface ITokenProvider {
  get baseTokensList(): BaseToken[]

  get extendedTokensList(): ExtendedToken[]

  get tokensWithBaseStatistics(): TokenWithBaseStatistics[]

  get tokensWithExtendedStatistics(): TokenWithExtendedStatistics[]
}