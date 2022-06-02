import {Salle} from './salle';
import {User} from './user';

export class Reservation{
  id! : number;
  typeresrv! : string;
  dateresrv !: string;
  periode!:string;
  salle!:Salle;
  utilisateur!:User;
  disabled!:boolean;
  discription!:string;
}
