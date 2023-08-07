import {User} from "./user";

export class Notification{
   id!:number;
   message!:string;
   isRead!:boolean;
   expired!:boolean;
   checkedNumber!:number;
   createdDate!:Date;
   sender!:User;
   recipient!:User;
    remainingTime!: string;

}
