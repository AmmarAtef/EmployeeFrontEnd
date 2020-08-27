import { Action } from "@ngrx/store";
import { User } from "src/app/shared/models/user.model";

export const LOGIN_START = "[Auth] LOGIN_START";
export const LOGIN_EMPLOYEE = "[Auth] LOGIN_EMPLOYEE";
export const LOGOUT_EMPLOYEE = "[Auth] LOGOUT_EMPLOYEE";
export const LOGIN_FAIL = "[Auth] LOGIN_FAIL";
export const AUTO_LOGIN = "[Auth] AUTO_LOGIN";

export class LogInFail implements Action {
  readonly type: string = LOGIN_FAIL;
  constructor(public payload: string) {}
}

export class LogIn implements Action {
  readonly type: string = LOGIN_EMPLOYEE;
  constructor(
    public payload: { token: string; expireDate: Date; role: string }
  ) {}
}

export class LogOut implements Action {
  readonly type: string = LOGOUT_EMPLOYEE;
}

export class LogInStart implements Action {
  readonly type: string = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AutoLogIn implements Action {
  readonly type: string = AUTO_LOGIN;
}

export type AuthActions = LogIn | LogOut | LogInFail | LogInStart | AutoLogIn;
