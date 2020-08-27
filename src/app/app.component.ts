import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { EmployeeService } from "./service/employee.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Store } from "@ngrx/store";
import * as fromApp from "./store/app.store";
import * as authActions from "./login/store/auth.actions";
import { map } from "rxjs/operators";
import { observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private store: Store<fromApp.AppState>
  ) {}

  loggedIn:Observable<boolean> = new Observable<boolean>();

  ngOnInit() {


   this.loggedIn = this.store.select("auth").pipe(
      map((val) => {
        console.log("logged IN");
        if (val != null) {
         return true;
        }
        return false;
      })
    );

    // this.employeeService.user.subscribe((val) => {
    //   if (val != null) {
    //     this.loggedIn = true;
    //   }
    // });

    // if (localStorage.getItem("token")) {
    //   this.employeeService.autoLogIn();
    // }

    this.store.dispatch(new authActions.AutoLogIn());

  }

  onLogOut() {
    // this.loggedIn = false;
    this.store.dispatch(new authActions.LogOut());
    // this.employeeService.logOut();
  }
}
