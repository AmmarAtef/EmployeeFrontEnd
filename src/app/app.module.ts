import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { AppRoutingModule } from "./app-routing.module";
import { EditEmployeeComponentComponent } from "./edit-employee.component.ts/edit-employee.component";
import { RouterModule } from "@angular/router";
import { EmployeesComponent } from "./employees/employees.component";
import { AuthInterceptorService } from "./service/auth-interceptor.service";
import { AlertComponent } from "./shared/alert/alert.component";
import { LoginComponent } from "./login/login.component";
import { StoreModule } from "@ngrx/store";
import { employeeReducer } from "./store/employees.reducer";
import { StoreDevtools, StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { appReducer } from "./store/app.store";
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffect } from "./store/employee.effects";
import { AuthEffect } from "./login/store/auth.effects";

export function getToken() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    EditEmployeeComponentComponent,
    EmployeesComponent,
    AlertComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([EmployeeEffect, AuthEffect]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
