export interface IAuthService {
  validate(request: any): Promise<boolean>
}