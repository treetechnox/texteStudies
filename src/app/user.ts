import {Secteur} from './Secteur';

export class User {
  id!: number;
  nom!:string;
  prenom!:string;
  username!: string;
  password!: string;
  role!: string;
  secteur!: Secteur;
}
