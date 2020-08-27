import * as fromEmployeeList from "./employees.reducer";
import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from "../login/store/auth.reducer";

export interface AppState {
  employeeList: fromEmployeeList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  employeeList: fromEmployeeList.employeeReducer,
  auth: fromAuth.authReducer
};
