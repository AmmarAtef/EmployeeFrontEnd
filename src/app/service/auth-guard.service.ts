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

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean |UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    console.log(this.router.url);
    if (
      this.employeeService.user.value.token !== null &&
      this.employeeService.user.value.token !== undefined
    ) {
      return true;
    } else {
      return this.router.createUrlTree(['/logIn']);
    }
  }
}
