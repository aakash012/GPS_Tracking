import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  dataSaved = false;
  userForm: any;
  allUsers: Observable<User[]>;
  userIdUpdate = null;
  message = null;
  constructor(
    private formbulider: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formbulider.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      UserType: ['', [Validators.required]],
    });

    this.allUsers = this.userService.getAllUser();
  }

  onFormSubmit() {
    debugger;
    this.dataSaved = false;
    const user = this.userForm.value;
    this.CreateUser(user);
    this.userForm.reset();
  }

  loadUserToEdit(userId: string) {
    this.userService.getUserById(userId).subscribe((user) => {
      debugger;
      this.message = null;
      this.dataSaved = false;
      this.userIdUpdate = user.UserId;
      this.userForm.controls['Username'].setValue(user.UserName);
      this.userForm.controls['Password'].setValue(user.Password);
      this.userForm.controls['UserType'].setValue(user.UserType, {
        onlySelf: true,
      });
    });
  }
  CreateUser(user: User) {
    if (this.userIdUpdate == null) {
      this.userService.createUser(user).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record saved Successfully';
        //this.loadAllEmployees();
        this.userIdUpdate = null;
        this.userForm.reset();
      });
    } else {
      user.UserId = this.userIdUpdate;
      this.userService.updateUser(user).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record Updated Successfully';
        //this.loadAllEmployees();
        this.userIdUpdate = null;
        this.userForm.reset();
      });
    }
  }
  deleteUser(userId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      debugger;
    this.userService.deleteUserById(userId).subscribe(() => {
      this.dataSaved = true;
      this.message = 'Record Deleted Succefully';
      //this.loadAllEmployees();
      this.userIdUpdate = null;
      this.userForm.reset();

    });
  }
}

resetForm() {
  this.userForm.reset();
  this.message = null;
  this.dataSaved = false;
}
}
