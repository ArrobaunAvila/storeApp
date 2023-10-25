import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User | null = null;

  constructor(
    private service: AuthService
    ) { }

  ngOnInit(): void {
    this.service.user$.subscribe(user => this.user = user);
  }

}
