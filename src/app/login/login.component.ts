import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { EmployeeService } from "../service/employee.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  logIn: FormGroup;
  error: any;
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logIn = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    const newEmp = this.logIn.value;
    // this.employeeService.ping().subscribe((value)=>{
    //   console.log(value);

    // });
    this.employeeService
      .logIn(newEmp["userName"], newEmp["password"])
      .subscribe(
        (value) => {
          console.log(value);
          
          localStorage.removeItem("token");
          localStorage.setItem("token", value);
          this.router.navigate(["employees"]);
        },
        (error) => {
          this.error = error;
          this.error = error.statusText;
          localStorage.clear();
          console.log(error);
        }
      );
  }
}
