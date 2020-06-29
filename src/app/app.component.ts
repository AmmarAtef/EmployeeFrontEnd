import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { EmployeeService } from "./service/employee.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}
  loggedIn: boolean ;
  ngOnInit() {
    this.employeeService.user.subscribe((val) => {
      if (val != null){
        this.loggedIn = true;
      }
    });
    if (localStorage.getItem("token")) {
      this.employeeService.autoLogIn();
    }
  }

  onLogOut() {
    this.loggedIn = false;
    this.employeeService.logOut();
  }
}
