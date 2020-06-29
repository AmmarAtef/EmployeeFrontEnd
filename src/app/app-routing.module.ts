import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { AppComponent } from "./app.component";
import { EditEmployeeComponentComponent } from "./edit-employee.component.ts/edit-employee.component";
import { EmployeesComponent } from "./employees/employees.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./service/auth-guard.service";
import { CanDeactivateGuard } from "./service/can-deactivate-guard.service";

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "AddEmployee",canActivate: [AuthGuard], component: AddEmployeeComponent },
  { path: "employee/:id",canActivate: [AuthGuard],canDeactivate: [CanDeactivateGuard],  component: EditEmployeeComponentComponent },
  { path: "employees",canActivate: [AuthGuard], component: EmployeesComponent },
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
