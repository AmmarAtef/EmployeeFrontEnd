export class User{

  constructor(
    private _token:string,
    public _expireDate?: Date,
    public role?:string
    ){}

  get token(){
    if(new Date() > this._expireDate || !this._expireDate){
      return null;
    }
    return this._token;
  }

}
