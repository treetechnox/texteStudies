import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Notification} from "../notification";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../service/user.service";
import {AppComponent} from "../app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddUserComponent} from "../add-user/add-user.component";
import {NotificationService} from "../service/notification.service";
import {interval, map, startWith, Subscription, switchMap} from "rxjs";
import {AddNotificationComponent} from "../add-notification/add-notification.component";

@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.component.html',
  styleUrls: ['./list-notifications.component.css']
})
export class ListNotificationsComponent implements OnInit,OnDestroy {


  public notifications!: Notification[];
  private timerSubscription: Subscription | undefined;

  displayedColumns: string[] = ['id','sender', 'recipient', 'message', 'checkedNumber','remainingTime', 'createdDate'];//
  dataSource!: MatTableDataSource<Notification>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  panelOpenState = false;

  constructor(private notificationService: NotificationService,
              public app: AppComponent,
              private router: Router, private route: ActivatedRoute,
              private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) {}




  ngOnInit() {
    this.fetchNotifications();
    this.startTimer();
  }

  ngOnDestroy(){
    this.stopTimer();
  }

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

  fetchNotifications(){
    this.notificationService.getAllNotifications().subscribe((value) => {
        console.log(value)
        this.notifications = value;
        this.dataSource = new MatTableDataSource(this.notifications);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      (error) => {
        console.error('Erreur : --> notifications', error);
      },() => {
        console.log('operation complited')})
  }
  onAddMessageToASpecificUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // @ts-ignore
    dialogConfig.width = '50%';
    dialogConfig.height = '50%';
    this.dialog.open(AddNotificationComponent, dialogConfig).afterClosed().subscribe(value => {
      this.fetchNotifications();
    });;
  }


  calculateRemainingTime() {
    const currentTime = new Date();

    // Filter out expired notifications from the list
    this.notifications = this.notifications.filter((notification) => {
      const expirationTime = new Date(notification.createdDate);
      expirationTime.setMinutes(expirationTime.getMinutes() + 1); // Assuming 1 hour is the expiration time
      // Check if the notification has expired
      if (expirationTime.getTime() <= currentTime.getTime()) {
        this.fetchNotifications();
        return false;
      }

      const remainingTimeInMillis = expirationTime.getTime() - currentTime.getTime();
      const remainingTimeInSeconds = Math.floor(remainingTimeInMillis / 1000);

      // Separate the calculation for minutes and seconds to handle the one-minute case correctly
      const minutes = Math.floor(remainingTimeInSeconds / 60);
      const seconds = remainingTimeInSeconds % 60;

      // Format the remaining time nicely (e.g., "MM:SS")
      notification.remainingTime = `${this.padNumber(minutes)}:${this.padNumber(seconds)}`;

      return true; // Include non-expired notifications in the list
    });
  }


  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  private startTimer() {
    this.timerSubscription = interval(1000).pipe(
      map(() => {
        this.calculateRemainingTime();
      })
    ).subscribe();
  }

  private stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
