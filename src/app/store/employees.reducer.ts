import * as fromEmployeeActions from "./employees.action";
import { Employee } from "../shared/models/employee.model";
import { EmployeeUpdated } from "../shared/models/update-employee.model";
import { EmployeeState } from "../shared/models/employee.store.model";

export interface State {
  employees: EmployeeState[];
}

const initialState: State = {
  employees: [],
};

export function employeeReducer(
  state: State = initialState,
  action: fromEmployeeActions.EmployeeActions
) {
  switch (action.type) {
    case fromEmployeeActions.ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case fromEmployeeActions.START_ADD_EMPLOYEE:
      return state;
    case fromEmployeeActions.SET_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, ...action.payload],
      };
    case fromEmployeeActions.UPDATE_EMPLOYEE:
      const updatedEmployees: EmployeeState[] = [...state.employees];
      console.log(updatedEmployees[action.payload.ID]);
      const shouldUpdated = updatedEmployees.find(
        (c) => c.ID == action.payload.ID
      );
      const num = updatedEmployees.indexOf(shouldUpdated);
      updatedEmployees[num] = action.payload;
      console.log(updatedEmployees);
      return {
        ...state,
        employees: updatedEmployees,
      };
    case fromEmployeeActions.DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((emp, index) => {
          return emp.ID !== action.payload;
        }),
      };
    case fromEmployeeActions.GET_EMPLOYEES:
      return {
        ...state,
        employees: [...action.payload],
      };
    default:
      return state;
  }
}
