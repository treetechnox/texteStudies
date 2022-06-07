import {Component, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort, Sort} from '@angular/material/sort';
import {UserService} from '../service/user.service';
import {User} from '../user';
import {AddUserComponent} from '../add-user/add-user.component';
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
/*import {error} from "util";
import {Salle} from "../salle";
import {SalleService} from "../service/salle.service";
import {AddSalleComponent} from "../add-salle/add-salle.component";*/
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public users!: User[];

  /*public sizes = [5, 10, 20, 100];
  public size = 5;
  public currentPage = 0;
  public totalPages: number;
  public totalElements: number;
  public pages: Array<number>;*/

  /*usernameSearch = '';
  p = 1;
  sortedData: User[];
  direction = 'asc';
  field = 'nomfr';*/
  /*salles: Salle[];
  salle: Salle = new Salle();
  //organisme: Organisme = new Organisme();*/

  displayedColumns: string[] = ['id', 'role', 'nom', 'prenom', 'pseudo', 'operations'];
  dataSource!: MatTableDataSource<User>;
  //organismes : Organisme[]= new Array();

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;

  panelOpenState = false;

  /*  constructor(private salleService: SalleService,
                private dialog: MatDialog,
                private router: Router) {
    }*/

  constructor(private userService: UserService,
              private router: Router, private route: ActivatedRoute,
              private dialog: MatDialog) {

    this.userService.getAllUsers().subscribe(value => {
      this.users = value;
      //console.log(this.organismes);
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }


  ngOnInit() {
    //this.reloadData();
  }


  /*
    reloadData() {
      // @ts-ignore
      this.userService.getUsersList(this.currentPage, this.size)
        .subscribe(value => {
          //console.log(value);
          this.totalPages = value.totalPages;
          //console.log('total pages on surffing = ' + this.totalPages);
          this.pages = new Array<number>(this.totalPages);
          this.users = value;
          this.sortedData = this.users.slice();
          //console.log(this.users);
      }, error1 => console.log('Erreur ...'), () => console.log(' Chargement terminé '));
    }
   /!* reloadSearchData(f: any) {
      console.log('salutttt')
    }*!/
    reloadSearchData(f: any) {
      this.usernameSearch = f.username;
      // console.log(this.firstNameSearch + ' - ' + this.lastNameSearch);
      // @ts-ignore
      this.users = this.usernameSearch.length > 0 ?
        this.userService.getSearchUsersList(this.usernameSearch, this.currentPage, this.size)
          .subscribe(value => {
            this.totalPages = value.page.totalPages;
            //console.log('total pages for searching = ' + this.totalPages);
            this.pages = new Array<number>(this.totalPages);
            this.users = value.content;
            this.sortedData = this.users.slice();
            //console.log(this.users);
          }, error1 => console.log('Erreur ...'), () => console.log(' Chargement de la liste de recherche des utilisateurs terminé '))
        : this.userService.getUsersList(this.currentPage, this.size)
          .subscribe(value => {
            //console.log(value);
            this.totalPages = value.totalPages;
            //console.log('total pages on surffing = ' + this.totalPages);
            this.pages = new Array<number>(this.totalPages);
            this.users = value.content;
            this.sortedData = this.users.slice();
            //console.log(this.users);
          }, error1 => console.log('Erreur ...'), () => console.log(' Chargement de la liste des utilisateurs terminé '));
    }
    onAddUser() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      // @ts-ignore
      dialogConfig.width = '70%';
      dialogConfig.height = '70%';
      this.dialog.open(AddUserComponent, dialogConfig);
    }
    onEditUser(c: User) {
      this.router.navigateByUrl('leuser/' + c.id );
    }
    onDeleteUser(userId: number) {
      const conf = confirm('Etes vous sur de supprimer L\'utilisateur ?' + userId);
      if (conf) {
        this.userService.deleteUser(userId).subscribe(value => {
          console.log(value);
        },error => console.log('Erreur au niveau suppression L\'utilisateur: ' + userId));
        window.location.reload();
      }
      // @ts-ignore
    }
    /!*deleteCandidat(id: number) {
      const conf = confirm('Etes vous sur de supprimer le candidat?' + id);
      if (conf) {
        this.candidatService.deleteCandidat(id)
          .subscribe(
            data => {
              console.log(data);
              this.reloadData();
            },
            error => console.log('Erreur au niveau de suppression candidat ' + error));
      }
    }*!/
    onPageUser(i: number) {
      if (i<0) {
        i=0
      }else if (i>= this.totalPages) {
        i=i-1;
      }
      this.currentPage = i;
      //console.log(this.currentPage);
      this.reloadSearchData({username: this.usernameSearch});
    }
    /!*sortData(sort: Sort) {
      // @ts-ignore
      let data= this.candidats.slice();
      console.log('voir cette fonction de slice() ... ' + JSON.stringify(data));
      if (!sort.active || sort.direction === '') {
        this.sortedData = data;
        return;
      }*!/
    sortData(sort: Sort) {
      const data = this.users.slice();
      //console.log(sort);
      if (!sort.active || sort.direction === '') {
        this.sortedData = data;
        return;
      }
      this.sortedData = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'username': return compare(a.username, b.username, isAsc);
          case 'role': return compare(a.role, b.role, isAsc);
          default: return 0;
        }
      });
    }
  }
  function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  */



  public localStorageItem(id: string): string {
    // @ts-ignore
    return localStorage.getItem(id);
  }


  ngAfterViewInit() {
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditUser(id: any) {
    this.router.navigateByUrl(`leuser/${id}` );
  }

  onAddUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // @ts-ignore
    dialogConfig.width = '50%';
    dialogConfig.height = '50%';
    this.dialog.open(AddUserComponent, dialogConfig);
  }
}
