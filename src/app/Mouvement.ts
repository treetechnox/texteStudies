import {Phase} from './phase';
import {Secteur} from './Secteur';
import {Texte} from './Texte';
import {Reunion} from './Reunion';

export class Mouvement{
  id!:number;
  phase!:Phase;
  secteur!:Secteur;
  texte!:Texte;
  reunion!:Reunion;
  datePhase!:string;
  details!:string;
  scanpdf!:string;
  mouvementMinistere!:any;
}
