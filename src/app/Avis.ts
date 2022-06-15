import {Texte} from "./Texte";
import {Ministere} from "./Ministere";

export class Avis{
  id!:number;
  details!:string;
  texte!:Texte ;
  ministere!:Ministere;
}
