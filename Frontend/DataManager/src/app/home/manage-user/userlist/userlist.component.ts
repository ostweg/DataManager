import { Component, OnInit,ViewChild } from '@angular/core';
import {ConfigService} from '../../../config.service';
import {UserService} from '../../../user.service';
import {MatTableDataSource, Sort, MatSort, MatPaginator, MatDialog,MatSnackBar, MatDialogRef} from '@angular/material';
import {CreateuserComponent} from '../createuser/createuser.component';
import {Observable, Subject} from 'rxjs';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})

export class UserlistComponent implements OnInit {
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild('paginator') paginator:MatPaginator;
  IsAdmin:boolean;
  SortedData:UserService[] = [];

  constructor(public configs: ConfigService, public dialogs:MatDialog, private snack:MatSnackBar) { 
    this.SortedData = this.UserList.slice();
  }

  listData:MatTableDataSource<any>;
  UserList:UserService[] = [];
  OrgName:string;
  UsersInSameOrg:UserService[];
  SearchKey:string;
  UserRight:string;
  public dataSource: MatTableDataSource<any>;
  CurrentUserName:string;


  ngOnInit() {
    var tokenuser = JSON.parse(localStorage.getItem('currentuser'));
    this.CurrentUserName = tokenuser.username;
    this.Getusers();
    this.GetOrgName();
    this.ShowUsers();
    this.GetCurrentRight();
    
  }
 
 
  Getusers():Observable<UserService>{
    let subject: Subject<UserService> = new Subject();
    this.configs.GetUsers().subscribe(data1 => {
      subject.next(data1.find(x => x.username == this.CurrentUserName));
    });
    return subject.asObservable();

  }
  GetOrgName(){
    this.Getusers().subscribe((us)=> {
      this.OrgName = us.organisationName;
      localStorage.setItem('currentOrgName',JSON.stringify({orgname:us.organisationName}));

    });
  }
  GetCurrentRight(){
      this.Getusers().subscribe((right) => {
        this.UserRight = right.rights;

      });
  }
  ShowUsers(){
    this.configs.GetUsers().subscribe(data => {
      this.UsersInSameOrg = data.filter(w => w.organisationName == this.OrgName);
      this.dataSource = new MatTableDataSource(this.UsersInSameOrg);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  sortData(sort: Sort){
    const data = this.UserList.slice();
    if(!sort.active || sort.direction === ''){
      this.SortedData = data;
      return;
    }


    this.SortedData = data.sort((a,b) => {
      const IsAsc = sort.direction === 'asc';
      switch (sort.active){
        case 'id': return this.compare(a.personId, b.personId, IsAsc);
        case 'username': return this.compare(a.username, b.username, IsAsc);
        case 'email' : return this.compare(a.Email, b.Email, IsAsc);
        case 'org' : return this.compare(a.organisationName, b.organisationName, IsAsc);
        default:return 0;
      }
    })
  }
  OnSearchClear(){
    this.SearchKey = '';
  }
  ApplyFilter(e){
    this.GetFilteredList();
  }
  GetFilteredList(){

  }
  compare(a:number| string, b:number|string, isAsc:boolean){
    return (a<b ? -1:1)*(isAsc ? 1: -1);
  }
  dialog(){
    const dia = this.dialogs.open(CreateuserComponent, {
      width: '250px',
    });
  }
  onNoClick() {
    this.dialogs.closeAll();
  }
  onDelete($key:any){
    this.configs.DeleteUser($key).subscribe(dat => {
      this.configs.GlobalData();
      this.Getusers();
      this.snack.open(`User deleted`, "!", {duration:2000})
    });
    
  }
  displayedColumns: string[] = ['personid','username','email','organisation','actions'];
 
}
