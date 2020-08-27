import { User } from "src/app/shared/models/user.model";
import { Action } from "@ngrx/store";
import * as authActions from "./auth.actions";

export interface State {
  user: User;
  messgaeError: string;
  loading: false;
}

const initialState: State = {
  user: null,
  messgaeError: null,
  loading: false,
}

export function authReducer(
  state: State = initialState,
  action: authActions.AuthActions
) {
  switch (action.type) {
    case authActions.LOGIN_EMPLOYEE:
      const user: User = new User(
        action.payload.token,
        action.payload.expireDate,
        action.payload.role
      );
      return {
        ...state,
        messgaeError: null,
        user: user,
        loading: false
      };
    case authActions.LOGOUT_EMPLOYEE:
      return {
        ...state,
        messgaeError: null,
        user: null,
        loading: false
      };
    case authActions.LOGIN_FAIL:
      return {
        ...state,
        messgaeError: action.payload,
        user: null,
        loading: false
      };
    case authActions.LOGIN_START:
      return {
        ...state,
        messgaeError: null,
        user:null,
        loading: true
      };
    default:
      return state;
  }
}
