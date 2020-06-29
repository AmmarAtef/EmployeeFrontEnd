import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EmployeeService } from "../service/employee.service";
import { ActivatedRoute, Params, Router, Data } from "@angular/router";
import { CanComponentDeactivate } from "../service/can-deactivate-guard.service";

@Component({
  selector: "app-edit-employee",
  templateUrl: "./edit-employee.component.html",
  styleUrls: ["./edit-employee.component.css"],
})
export class EditEmployeeComponentComponent
  implements OnInit, CanComponentDeactivate {
  genders = ["Male", "Female"];
  saveChanges = false;
  addEmployee: FormGroup;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  canDeactivate(): boolean | Promise<boolean> {
    if (!this.saveChanges) {
      return confirm("Do you want to discard the Changes ??");
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.addEmployee = new FormGroup({
      EmployeeName: new FormControl(null, [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(100),
      ]),
      EmployeeBirthdate: new FormControl(null, [Validators.required]),
      EmployeeGender: new FormControl("Male", [Validators.required]),
      EmployeeSalary: new FormControl(null, [Validators.required]),
      EmployeeDepartment: new FormControl("HR", [Validators.required]),
      BriefOfExperience: new FormControl(null, [Validators.maxLength(1000)]),
      ProfileURL: new FormControl(null),
      Description: new FormControl(null),
    });
    // get employee by ID
    this.employeeService
      .getEmployee(+this.route.snapshot.params["id"])
      .subscribe((employee) => {
        this.addEmployee.setValue({
          EmployeeName: employee["EmployeeName"],
          EmployeeBirthdate: new Date(employee["EmployeeBirthdate"])
            .toISOString()
            .substring(0, 10),
          EmployeeGender: employee["EmployeeGender"],
          EmployeeSalary: employee["EmployeeSalary"],
          EmployeeDepartment: employee["EmployeeDepartment"],
          BriefOfExperience: employee["BriefOfExperience"],
          ProfileURL: employee["ProfileURL"],
          Description: employee["Description"],
        });
        console.log(employee);
      });

    //check the date less than today when it change
    this.addEmployee.valueChanges.subscribe((value) => {
      if (
        value["EmployeeBirthdate"] >= new Date().toISOString().substring(0, 10)
      ) {
        this.addEmployee.controls["EmployeeBirthdate"].setErrors({
          incorrect: true,
        });
      }
    });
  }

  onSubmit() {
    if (
      this.addEmployee.valid &&
      this.addEmployee.value["EmployeeBirthdate"] <
        new Date().toISOString().substring(0, 10)
    ) {
      const newEmp = this.addEmployee.value;
      this.employeeService
        .updateEmployee(
          +this.route.snapshot.params["id"],
          newEmp["EmployeeName"],
          newEmp["EmployeeBirthdate"],
          newEmp["EmployeeDepartment"],
          newEmp["EmployeeGender"],
          newEmp["EmployeeSalary"],
          newEmp["BriefOfExperience"],
          newEmp["ProfileURL"],
          newEmp["Description"]
        )
        .subscribe(
          (responseData) => {
            this.saveChanges = true;
            this.router.navigate(['/employees']);
            // this.router.navigate(["/employees"], { relativeTo: this.route });
            // this.addEmployee.reset();
            console.log(responseData);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.addEmployee.controls["EmployeeBirthdate"].setErrors({
        incorrect: true,
      });
    }
  }
}
