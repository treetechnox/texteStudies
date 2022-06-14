import {Texte} from "./Texte";
import {Ministere} from "./Ministere";

export class Avis{
  id!:number;
  detail!:string;
  texte!:Texte ;
  ministere!:Ministere;
}
