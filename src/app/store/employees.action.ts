import { Action } from "@ngrx/store";
import { Employee } from "../shared/models/employee.model";
import { EmployeeUpdated } from "../shared/models/update-employee.model";
import { EmployeeState } from "../shared/models/employee.store.model";

export const START_ADD_EMPLOYEE = "[employee] START_ADD_EMPLOYEE";
export const ADD_EMPLOYEE = "[employee] ADD_EMPLOYEE";
export const UPDATE_EMPLOYEE = "[employee] UPDATE_EMPLOYEE";
export const GET_EMPLOYEES = "[employee] GET_EMPLOYEES";
export const SET_EMPLOYEE = "[employee] SET_EMPLOYEE";
export const DELETE_EMPLOYEE = "[employee] DELETE_EMPLOYEE";
export const START_GET_EMPLOYEES = "[employee] StartGetEmployees";

export const PING ="PING";

export class AddEmployee implements Action {
  readonly type: string = ADD_EMPLOYEE;
  constructor(public payload: EmployeeState) {}
}

export class UpdateEmployee implements Action {
  readonly type: string = UPDATE_EMPLOYEE;
  constructor(public payload: Employee) {}
}

export class DeleteEmployee implements Action {
  readonly type: string = DELETE_EMPLOYEE;
  constructor(public payload: number) {}
}

export class StartAddEmployee implements Action {
  readonly type: string = START_ADD_EMPLOYEE;
  constructor(public payload: Employee) {}
}

export class SetEmployees implements Action {
  readonly type = SET_EMPLOYEE;

  constructor(public payload: EmployeeState[]) {}
}

export class GetEmployees implements Action {
  readonly type: string = START_GET_EMPLOYEES;
}

export class Ping implements Action {
  readonly type: string = PING;
}


export type EmployeeActions =
  | AddEmployee
  | UpdateEmployee
  | SetEmployees
  | DeleteEmployee
  | StartAddEmployee
  | GetEmployees;
