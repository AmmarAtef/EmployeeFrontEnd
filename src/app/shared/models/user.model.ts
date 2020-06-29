export class User{

  constructor(
    private _token:string,
    private _expireDate?: Date,
    public role?:String
    ){}

  get token(){
    if(new Date() > this._expireDate || !this._expireDate){
      return null;
    }
    return this._token;
  }

}
