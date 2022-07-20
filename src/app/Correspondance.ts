import {Texte} from "./Texte";
import {Ministere} from "./Ministere";

export class Correspondance{
  id!:number;
  details!:string;
  dateCorrespond!:Date;
  texte!:Texte ;
  ministere!:Ministere;
}
