export class EmployeeState {
  constructor(
    public ID: number,
    public EmployeeName: string,
    public EmployeeBirthdate: Date,
    public EmployeeGender: string,
    public EmployeeSalary: number,
    public EmployeeDepartment: string,
    public BriefOfExperience: string,
    public ProfileURL: string,
    public Description: string
  ) {}
}
