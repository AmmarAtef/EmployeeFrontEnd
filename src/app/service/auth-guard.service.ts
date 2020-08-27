import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from "@angular/router";
import { promise } from "protractor";
import { Observable } from "rxjs";
import { Employee } from "../shared/models/employee.model";
import { EmployeeService } from "./employee.service";
import { Injectable } from "@angular/core";
import * as fromApp from "../store/app.store";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private store:Store<fromApp.AppState>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean |UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    console.log(this.router.url);
    const token = this.store.select('auth').pipe(map((val)=>{return val.user.token}));
    if (
      token !== null &&
      token !== undefined
    ) {
      return true;
    } else {
      return this.router.createUrlTree(['/logIn']);
    }
  }
}
