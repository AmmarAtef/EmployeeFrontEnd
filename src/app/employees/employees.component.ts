import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router, Data } from "@angular/router";
import { EmployeeService } from "../service/employee.service";
import { EmployeeUpdated } from "../shared/models/update-employee.model";
import { take, map } from "rxjs/operators";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"],
})
export class EmployeesComponent implements OnInit {
  fullControl = false;
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
            this.employees = employees;
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

  employees: EmployeeUpdated[];
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.user
      .pipe(
        take(1),
        map((val) => {
          console.log(val.role);
          return val.role;
        })
      )
      .subscribe((val) => {
        if (val === "FullControl") this.fullControl = true;
      });
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.employees = employees;
        console.log(employees);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDelete(Id) {
    this.deletedId = Id;
    this.deleteConf = true;
  }
}
