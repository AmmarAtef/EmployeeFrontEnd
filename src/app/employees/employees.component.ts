import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router, Data } from "@angular/router";
import { EmployeeService } from "../service/employee.service";
import { EmployeeUpdated } from "../shared/models/update-employee.model";
import { take, map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Employee } from "../shared/models/employee.model";
import { Observable } from "rxjs";
import { EmployeeState } from "../shared/models/employee.store.model";
import * as fromEmployees  from "../store/employees.action";
import * as fromApp from "../store/app.store";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"],
})
export class EmployeesComponent implements OnInit {
  fullControl: Observable<boolean>;
  deleteConf = false;
  deletedId: number;
  // close the popup
  onClose() {
    this.deleteConf = false;
  }

  onDeletePopUp() {
    this.employeeService.deleteEmployee(this.deletedId).subscribe(
      (result) => {
        this.employeeService.getEmployees().subscribe(
          (employees) => {
            // this.employees = employees;
            console.log(employees);
            this.deleteConf = false;
          },
          (error) => {
            console.log(error);
          }
        );
        console.log(result);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  employees: Observable<{ employees: EmployeeState[] }>;
  constructor(
    private employeeService: EmployeeService,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.employees = this.store.select('employeeList');

    this.fullControl = this.store.select("auth").pipe(
      map((val) => {
        if (val.user.role === "FullControl") {
          return true;
        } else {
          return false;
        }
      })
    );

    

    // this.employeeService.user
    //   .pipe(
    //     take(1),
    //     map((val) => {
    //       console.log(val.role);
    //       return val.role;
    //     })
    //   )
    //   .subscribe((val) => {
    //     if (val === "FullControl") this.fullControl = true;
    //   });
    // this.employeeService.getEmployees().subscribe(
    //   (employees) => {
    //     this.employees = employees;
    //     console.log(employees);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );

  }

  onDelete(Id) {
    this.deletedId = Id;
    this.deleteConf = true;
  }
}
