import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { EmployeeService } from "../service/employee.service";
import { Router } from "@angular/router";
import * as fromApp from "../store/app.store";
import { Store } from "@ngrx/store";
import * as authActions from "../login/store/auth.actions";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  logIn: FormGroup;
  error: any;
  storeSub: Subscription;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select("auth").subscribe((authData) => {
      console.log(authData.messgaeError);
    });

    this.logIn = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    const newEmp = this.logIn.value;

    this.store.dispatch(
      new authActions.LogInStart({
        email: newEmp["userName"],
        password: newEmp["password"],
      })
    );

    // this.employeeService.ping().subscribe((value)=>{
    //   console.log(value);

    // });
    // this.employeeService
    //   .logIn(newEmp["userName"], newEmp["password"])
    //   .subscribe(
    //     (value) => {
    //       console.log(value);

    //       localStorage.removeItem("token");
    //       localStorage.setItem("token", value);
    //       this.router.navigate(["employees"]);
    //     },
    //     (error) => {
    //       this.error = error;
    //       this.error = error.statusText;
    //       localStorage.clear();
    //       console.log(error);
    //     }
    //   );
  }

  onDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
