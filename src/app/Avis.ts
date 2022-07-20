import {Texte} from "./Texte";
import {Ministere} from "./Ministere";

export class Avis{
  id!:number;
  details!:string;
  dateAvis!:Date;
  texte!:Texte ;
  ministere!:Ministere;
}
