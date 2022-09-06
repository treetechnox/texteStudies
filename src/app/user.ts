import {Secteur} from './Secteur';
import {Ministere} from "./Ministere";

export class User {
  id!: number;
  nom!:string;
  prenom!:string;
  username!: string;
  password!: string;
  role!: string;
  secteur!: Secteur;
  ministere!: Ministere;
}
