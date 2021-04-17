import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  users: User[];
  selectedUser;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loading = true;
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => {
        this.loading = false;
        this.users = users;
      });
  }

  onSelect(user: any) {
    this.selectedUser = user;
  }

  deleteRow(userInfo: any) {
    this.userService
      .deleteOne(userInfo)
      .pipe(first())
      .subscribe((users) => {
        location.reload();
      });
  }
  deleteAll(userInfo: any) {
    this.userService
      .deleteAll(userInfo)
      .pipe(first())
      .subscribe((users) => {
        location.reload();
      });
  }
}
