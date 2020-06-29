import { Injectable } from "@angular/core";
import { Employee } from "../shared/models/employee.model";
import { Subject, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { EmployeeUpdated } from "../shared/models/update-employee.model";
import { environment } from "src/environments/environment";
import { User } from "../shared/models/user.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class EmployeeService {
  error = new Subject<string>();
  user = new BehaviorSubject<User>(null);
  private logOutTimer: any;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
    private router: Router
  ) {}

  createAndStoreEmployee(
    employeeName: string,
    employeeBirthdate: Date,
    employeeDepartment: string,
    employeeGender: string,
    employeeSalary: number,
    briefOfExperience: string,
    profileUrl: string,
    description: string
  ) {
    const employeeData: Employee = {
      EmployeeName: employeeName,
      EmployeeBirthdate: employeeBirthdate,
      EmployeeDepartment: employeeDepartment,
      EmployeeGender: employeeGender,
      BriefOfExperience: briefOfExperience,
      ProfileURL: profileUrl,
      Description: description,
      EmployeeSalary: employeeSalary,
    };
    let searchParams = new HttpParams();

    return this.http.post(
      environment.employeeServiceUrl + "/api/Employee/AddEmployee",
      employeeData,
      {
        observe: "response",
        params: searchParams,
      }
    );
  }

  updateEmployee(
    Id: number,
    employeeName: string,
    employeeBirthdate: Date,
    employeeDepartment: string,
    employeeGender: string,
    employeeSalary: number,
    briefOfExperience: string,
    profileUrl: string,
    description: string
  ) {
    let searchParams = new HttpParams();

    const employeeData: EmployeeUpdated = {
      ID: Id,
      EmployeeName: employeeName,
      EmployeeBirthdate: employeeBirthdate,
      EmployeeDepartment: employeeDepartment,
      EmployeeGender: employeeGender,
      BriefOfExperience: briefOfExperience,
      ProfileURL: profileUrl,
      Description: description,
      EmployeeSalary: employeeSalary,
    };

    return this.http.put(
      environment.employeeServiceUrl + "/api/Employee/UpdateEmployee",
      employeeData,
      {
        observe: "response",
        params: searchParams,
      }
    );
  }

  getEmployee(Id) {
    let searchParams = new HttpParams();
    return this.http.get<EmployeeUpdated>(
      environment.employeeServiceUrl + "/api/Employee/GetEmployee/" + Id,
      {
        params: searchParams,
        responseType: "json",
      }
    );
  }

  getEmployees() {
    let searchParams = new HttpParams();
    return this.http.get<EmployeeUpdated[]>(
      environment.employeeServiceUrl + "/api/Employee/GetEmployees",
      {
        params: searchParams,
        responseType: "json",
      }
    );
  }

  deleteEmployee(Id) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("Id", Id);
    return this.http.delete(
      environment.employeeServiceUrl + "/api/Employee/DeleteEmployee",
      {
        params: searchParams,
        responseType: "json",
      }
    );
  }

  getFieldValues(fieldName) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("fieldName", fieldName);
    return this.http.get<string[]>(
      environment.employeeServiceUrl + "/api/Employee/GetFieldsValues",
      {
        params: searchParams,
        responseType: "json",
      }
    );
  }

  logIn(userLoginName, password) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("userLoginName", userLoginName);
    searchParams = searchParams.append("password", password);
    return this.http
      .get<any>(environment.employeeServiceUrl + "/api/Auth/Authenticate", {
        params: searchParams,
        responseType: "json",
      })
      .pipe(
        tap((value) => {
          localStorage.setItem("token", value);
          this.handleAuthentication(value);
        })
      );
  }

  ping() {
    let searchParams = new HttpParams();

    return this.http.get(environment.employeeServiceUrl + "/api/Home/Get", {
      params: searchParams,
      responseType: "json",
    });
  }

  private handleAuthentication(token: any) {
    // decode JWT
    const decodeToken = this.jwtHelperService.decodeToken(token);
    console.log(decodeToken);
    const expirationDate = new Date(decodeToken.exp * 1000);
    const userLoaded = new User(token, expirationDate, decodeToken.role);
    this.user.next(userLoaded);
    if (this.logOutTimer) {
      clearTimeout(this.logOutTimer);
    }
    this.logOutTimer = null;
    this.autoLogOut(new Date(decodeToken.exp).getTime() - new Date().getTime());
  }

  autoLogOut(timeLogOut: number) {
    this.logOutTimer = setTimeout(() => {
      this.logOut();
    }, timeLogOut);
  }

  autoLogIn() {
    this.handleAuthentication(localStorage.getItem("token"));
  }

  logOut() {
    this.logOutTimer = null;
    this.user.next(null);
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }


}
