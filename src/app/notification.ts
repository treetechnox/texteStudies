import {User} from "./user";

export class Notification{
   id!:number;
   message!:string;
   isRead!:boolean;
   checkedNumber!:number;
   createdNate!:Date;
   sender!:User;
   recipient!:User;
}
