import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { EmployeeService } from "../service/employee.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"],
})
export class AddEmployeeComponent implements OnInit {

  genders = ["Male", "Female"];
  departments = [];
  addEmployee: FormGroup;
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

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

    this.employeeService
      .getFieldValues("EmployeeDepartment")
      .subscribe((value) => {
        console.log(value);
        this.departments = value;
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
        .createAndStoreEmployee(
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
            this.router.navigate(['employees']);
            this.addEmployee.reset();
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
