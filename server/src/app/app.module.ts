import { Module } from '@nestjs/common';
import { TokenController } from '../controllers/tokenController';
import { TokenService } from "../services/tokenService";
import { MockTokenProvider } from "../repo/mockTokenProvider";

@Module({
  imports: [],
  controllers: [TokenController],
  providers: [TokenService, MockTokenProvider],
})
export class AppModule {}
