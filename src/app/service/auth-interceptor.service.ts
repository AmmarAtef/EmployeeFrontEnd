import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmployeeService } from "../service/employee.service";
import { Router } from "@angular/router";
import { map, take, exhaustMap } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private employeeService: EmployeeService) {}
  useToken: Boolean = false;
  // interceptor to add common param
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf("Authenticate") === -1) {
      const modifiedReq = req.clone({
        headers: req.headers.append(
          "Authorization",
          `Bearer ${this.employeeService.user.value.token}`
        ),
      });
      console.log(modifiedReq);
      return next.handle(modifiedReq);
    }

    return next.handle(req);
  }
}
