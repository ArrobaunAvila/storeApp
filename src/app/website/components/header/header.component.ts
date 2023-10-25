import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from 'src/app/models/Category.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public categories: Array<Category> = Array<Category>();

  profile: User | null = null;
  activeMenu: boolean = false;
  counter = 0;
  public token: string | null = null;
  constructor(
    private storeService: StoreService,
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private userService: UsersService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.authService.user$.subscribe(
      data => this.profile = data
      );

    this.storeService.myCart$.subscribe(products => {
     this.counter = products.length;
    })

    this.categoriesService.getAllCategories().subscribe(data => {
      this.categories = data;
    })
  }


  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }


  login(){
    this.authService.loginAndGet('lucas@mail.com', '1234')
    .subscribe(() => {
      this.router.navigate(['/profile']);
    });
   }

   logout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
   }

   createUser(){
    this.userService.create({
     name: 'lucas',
     email:'lucas@mail.com',
     password: '1234',
     role: 'admin'
    })
    .subscribe(response => {
     console.log(response);
    });
   }




}
