import {CanActivate, ExecutionContext, Inject, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {IAuthService} from "./IAuthService";
import {AuthService} from "./authService";

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  private readonly _authService: IAuthService

  canActivate(context: ExecutionContext):
    boolean | Promise<boolean> | Observable<boolean> {
    return this._authService.validate(
      context.switchToHttp().getRequest()
    )
  }
}