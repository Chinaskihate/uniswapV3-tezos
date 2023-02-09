import { Controller, Get, Inject, Param, ParseIntPipe, UseFilters, UseInterceptors } from "@nestjs/common";
import { ITokenService } from "../services/ITokenService";
import { TokenService } from "../services/tokenService";
import { LoggerInterceptor } from "../proxy_logic/interceptors/loggerInterceptor";
import { ResponseFormatterInterceptor } from "../proxy_logic/interceptors/responseFormatterInterceptor";

@UseFilters()
@UseInterceptors(LoggerInterceptor, ResponseFormatterInterceptor)
@Controller('api/Token/v1')
export class TokenController {
  constructor(@Inject(TokenService) private tokenService: ITokenService) { }

  @Get('names')
  async getAllTokensNames(): Promise<string> {
    return new Promise<string>((resolve) =>
      resolve(JSON.stringify(this.tokenService.getAllTokens()))
    )
  }

  @Get(':id')
  async getTokenInfoById(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return new Promise<string>((resolve) =>
     resolve(JSON.stringify(this.tokenService.getTokenById(id)))
    )
  }

  @Get('names/:name')
  async getAllTokensByNamePattern(@Param('name') name: string): Promise<string> {
    return new Promise<string>((resolve) =>
     resolve(JSON.stringify(this.tokenService.getAllTokensByNamePattern(name)))
    )
  }

  @Get(':id/stamps/hour')
  async getAllPriceStampsInHour(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return new Promise<string>((resolve) =>
      resolve(JSON.stringify(this.tokenService.getAllPriceStampsInHour(id)))
    )
  }

  @Get(':id/stamps/day')
  async getAllPriceStampsInDay(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return new Promise<string>((resolve) =>
        resolve(JSON.stringify(this.tokenService.getAllPriceStampsInDay(id)))
    )
  }

  @Get(':id/stamps/week')
  async getAllPriceStampsInWeek(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return new Promise<string>((resolve) =>
      resolve(JSON.stringify(this.tokenService.getAllPriceStampsInWeek(id)))
    )
  }

  @Get(':id/stamps/year')
  async getAllPriceStampsInYear(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return new Promise<string>((resolve) =>
      resolve(JSON.stringify(this.tokenService.getAllPriceStampsInYear(id)))
    )
  }

  @Get(':id/stamps')
  async getAllPriceStampsInAllTime(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return new Promise<string>((resolve) =>
      resolve(JSON.stringify(this.tokenService.getAllPriceStamps(id)))
    )
  }
}
