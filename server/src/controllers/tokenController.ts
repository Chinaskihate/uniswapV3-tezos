import { Controller, Get, Inject, Param, ParseIntPipe, UseFilters, UseInterceptors, UsePipes } from "@nestjs/common";
import { ITokenService } from "../services/ITokenService";
import { TokenService } from "../services/tokenService";
import { LoggerInterceptor } from "../proxy_logic/interceptors/loggerInterceptor";
import { ResponseFormatterInterceptor } from "../proxy_logic/interceptors/responseFormatterInterceptor";
import { UnitOfTime } from "../utils/time_converter/unitOfTime";
import { UnitOfTimeValidationPipe } from "../proxy_logic/validators/unifOfTimeValidator";

@UseFilters()
@UseInterceptors(LoggerInterceptor, ResponseFormatterInterceptor)
@UsePipes(UnitOfTimeValidationPipe)
@Controller('api/Token/v1')
export class TokenController {
  constructor(@Inject(TokenService)
              private _tokenService: ITokenService) { }

  @Get('names')
  async getAllTokensNames(): Promise<string> {
    return this._tokenService.getAllTokens()
      .then(result => JSON.stringify(result))
  }

  @Get(':id')
  async getTokenById(@Param('id', ParseIntPipe)
                         id: number): Promise<string> {
    return this._tokenService.getTokenById(id)
      .then(result => JSON.stringify(result))
  }

  @Get('names/:name_pattern')
  async getTokensByNamePattern(@Param('name_pattern')
                                   name_pattern: string): Promise<string> {
    return this._tokenService
      .getAllTokensByNamePattern(name_pattern)
      .then(result => JSON.stringify(result))
  }

  @Get(':id/stamps/:unitOfTime')
  async getPriceStamps(@Param('id', ParseIntPipe) id: number,
                       @Param('unitOfTime', UnitOfTimeValidationPipe)
                         unitOfTime: string): Promise<string> {
    return this._tokenService
      .getAllPriceStampsInRange(id, UnitOfTime[unitOfTime.toUpperCase()])
      .then(result => JSON.stringify(result))
  }
}
