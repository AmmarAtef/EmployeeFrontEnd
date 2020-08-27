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
import * as fromApp from "../store/app.store";
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
 token : Observable<string>;

  constructor(private employeeService: EmployeeService,private store:Store<fromApp.AppState>) {}
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
          `Bearer ${localStorage.getItem("token")}`
        ),
      });
      console.log(modifiedReq);
      return next.handle(modifiedReq);
    }

    return next.handle(req);
  }
}
