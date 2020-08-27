import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { switchMap, map, tap, take, exhaustMap, catchError } from "rxjs/operators";
import * as fromEmployee from "./employees.action";
import { environment } from "src/environments/environment";
import { EmployeeUpdated } from "../shared/models/update-employee.model";
import { Employee } from "../shared/models/employee.model";
import { Router } from "@angular/router";
import { EmployeeState } from "../shared/models/employee.store.model";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.store";

@Injectable()
export class EmployeeEffect {
  constructor(
    private action$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  @Effect({ dispatch: false })
  addEmpSuccess = this.action$.pipe(
    ofType(fromEmployee.ADD_EMPLOYEE),
    tap(() => {
      this.router.navigate(["/employees"]);
    })
  );

  @Effect()
  addEmp = this.action$.pipe(
    ofType(fromEmployee.START_ADD_EMPLOYEE),
    switchMap((empData: fromEmployee.StartAddEmployee) => {
      let searchParams = new HttpParams();
      return this.http
        .post<any>(
          environment.employeeServiceUrl + "/api/Employee/AddEmployee",
          empData.payload,
          {
            observe: "response",
            params: searchParams,
          }
        )
        .pipe(
          map((val) => {
            const newEmp = new EmployeeState(
              val.body,
              empData.payload.EmployeeName,
              empData.payload.EmployeeBirthdate,
              empData.payload.EmployeeGender,
              empData.payload.EmployeeSalary,
              empData.payload.EmployeeDepartment,
              empData.payload.BriefOfExperience,
              empData.payload.ProfileURL,
              empData.payload.Description
            );
            return new fromEmployee.AddEmployee(newEmp);
          })
        );
    })
  );

  @Effect()
  startGetEmployees = this.action$.pipe(
    ofType(fromEmployee.START_GET_EMPLOYEES),
    switchMap(()=>{
      let searchParams = new HttpParams();
        return this.http.get<EmployeeState[]>(
          environment.employeeServiceUrl + "/api/Employee/GetEmployees",
          {
            params: searchParams,
            responseType: "json",
          }
        );
    }),
    map((employees)=>{
     return new fromEmployee.SetEmployees(employees);
    })
  );




}
