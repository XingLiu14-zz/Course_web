export class User {
  constructor(
    public id: number,
    public accountName: string,
    public phoneNumber: string,
    public zip: string,
    public email: string,
    public psw: string,
    public repsw: string,
    public dateOfBirth: Date,
    public status: string,
    public img: string,
    public following: number[],
    public articles: number[],
    public displayName?: string
  ) {  }

}
