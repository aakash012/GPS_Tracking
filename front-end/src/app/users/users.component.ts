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
  userList: User[];
  userForm: any;
  userUpdate = null;

  constructor(private formbulider: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {

    this.userForm = this.formbulider.group({
      UserId: ['0', [Validators.required]],
      UserName: ['', [Validators.required]],
      UserPassword: ['', [Validators.required]],
      UserType: ['', [Validators.required]]

    });

    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getAllUser().subscribe((data: User[]) => {
      this.userList = data;
    });
  }

  onFormSubmit() {
    const user = this.userForm.value;
    alert(user);
    this.CreateUser(user);
    this.getUserDetails();
  }

  FillUserFormToEdit(UserId: number) {
    this.userService.getUserById(UserId).subscribe(User => {
      this.userUpdate = User.UserId;
      this.userForm.controls['UserId'].setValue(User.UserId);
      this.userForm.controls['UserName'].setValue(User.UserName);
      this.userForm.controls['UserPassword'].setValue(User.UserPassword);
      this.userForm.controls['UserType'].setValue(User.UserType);
      
    });

  }

  CreateUser(user: User) {
    if (this.userUpdate == null) {
      this.userService.saveUser(user).subscribe(() => {
        this.userUpdate = null;
        this.ResetForm();
      });
    }
    else{
      this.userService.updateUser(user).subscribe(() => {
        this.userUpdate = null;
        this.ResetForm();
      });
    }


  }

  DeleteUser(UserId: number) {
    if (confirm("Are you sure you want to delete this ?")) {

      this.userService.deleteUserById(UserId).subscribe(() => {
        this.userUpdate = null;
        this.getUserDetails();
      });
    }

  }
  
ResetForm() {
  this.userForm.reset();
  
}
}
