import { Actions, ofType, Effect } from "@ngrx/effects";
import * as authActions from "./auth.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { HttpParams, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { of } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "src/app/shared/models/user.model";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.store";
import { EmployeeService } from "src/app/service/employee.service";
import { EmployeeState } from "src/app/shared/models/employee.store.model";
import * as fromEmployee from "../../store/employees.action";

@Injectable()
export class AuthEffect {
  private logOutTimer: any;

  private handleAuthentication(token: any): User {
    // decode JWT
    const decodeToken = this.jwtHelperService.decodeToken(token);
    console.log(decodeToken);
    const expirationDate = new Date(decodeToken.exp * 1000);
    const user = new User(token, expirationDate, decodeToken.role);
    localStorage.removeItem("token");
    localStorage.setItem("token", user.token);
    return user;
  }

  private handleAuthenticationFromToken(token: any) {
    // decode JWT
    const decodeToken = this.jwtHelperService.decodeToken(token);
    console.log(decodeToken);
    const expirationDate = new Date(decodeToken.exp * 1000);
    const userLoaded = new User(token, expirationDate, decodeToken.role);
    this.store.dispatch(
      new authActions.LogIn({
        expireDate: expirationDate,
        token: decodeToken,
        role: decodeToken.role,
      })
    );
    // this.user.next(userLoaded);
    if (this.logOutTimer) {
      clearTimeout(this.logOutTimer);
    }
    this.logOutTimer = null;
    this.employeeService.autoLogOut(
      new Date(decodeToken.exp).getTime() - new Date().getTime()
    );
  }

  @Effect()
  authLogIn = this.actions.pipe(
    ofType(authActions.LOGIN_START),
    switchMap((authData: authActions.LogInStart) => {
      let searchParams = new HttpParams();
      searchParams = searchParams.append(
        "userLoginName",
        authData.payload.email
      );
      searchParams = searchParams.append("password", authData.payload.password);
      return this.http
        .get<any>(environment.employeeServiceUrl + "/api/Auth/Authenticate", {
          params: searchParams,
          responseType: "json",
        })
        .pipe(
          map((autCred) => {
            const user = this.handleAuthentication(autCred);

            return new authActions.LogIn({
              token: user.token,
              expireDate: user._expireDate,
              role: user.role,
            });
          }),
          catchError((error) => {
            return of(new authActions.LogInFail(error));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authLogInSucces = this.actions.pipe(
    ofType(authActions.LOGIN_EMPLOYEE),
    tap(() => {
      this.router.navigate(["/employees"]);
    })
  );

  @Effect({ dispatch: false })
  autoLogIn = this.actions.pipe(
    ofType(authActions.AUTO_LOGIN),
    tap(() => {
      this.handleAuthenticationFromToken(localStorage.getItem("token"));
    })
  );

  @Effect({dispatch:false})
  logOut = this.actions.pipe(
    ofType(authActions.LOGOUT_EMPLOYEE),
    tap(() => {
      this.logOutTimer = null;
      //this.user.next(null);
      localStorage.removeItem("token");
      this.router.navigate(["/"]);
    })
  );




  constructor(
    private actions: Actions,
    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private employeeService: EmployeeService
  ) {}
}
