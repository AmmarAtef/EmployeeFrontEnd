import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Employee } from '../shared/models/employee.model';
import * as fromStore from '../store/app.store';
import * as fromEmployees from '../store/employees.action';
import { EmployeeState } from '../shared/models/employee.store.model';



@Injectable({ providedIn: 'root' })
export class EmployeesResolverService implements Resolve<EmployeeState[]> {
  constructor(
    private store: Store<fromStore.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    return this.store.select('employeeList').pipe(
      take(1),
       map(emp=>{
         return emp.employees;
       }),
       switchMap(emps => {
        if (emps.length === 0) {
          this.store.dispatch(new fromEmployees.GetEmployees());
           return this.actions$.pipe(
            ofType(fromEmployees.SET_EMPLOYEE),
            take(1)
          );
        } else {
          return of(emps);
        }
      })
      );

  }
}
