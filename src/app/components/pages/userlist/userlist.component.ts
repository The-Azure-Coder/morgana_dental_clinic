import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/models/user';
import { UserService } from 'src/app/services/users/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  users: Users[] = [];
  userDataSource!: MatTableDataSource<Users>;
  userColumns: string[] = [
    'username',
    'email',
    'role',
    'action',
  ];

  constructor(private userService: UserService) { }

  getUserList() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.userDataSource = new MatTableDataSource(res.data);
        this.userDataSource.sort = this.sort;
        this.userDataSource.paginator = this.paginator;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error While fetching results!',
        })
      },
    });
  }



  deleteUser(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        this.userService.deleteUser(id).subscribe({
          next: (res) => {
            this.getUserList();
          },
          error: () => {
            Swal.fire('Error while deleting User');
          },
        });
      }

    })
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDataSource.filter = filterValue.trim().toLowerCase();
    if (this.userDataSource.paginator) {
      this.userDataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getUserList()
  }

}
