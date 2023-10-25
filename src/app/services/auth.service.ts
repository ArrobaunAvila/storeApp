import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment  } from '../../environments/environment';
import { Auth  } from '../models/Auth.model';
import { TokenService }  from './token.service';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = `${environment.API_URL}/api/auth`;
  public user$ =  new BehaviorSubject<User | null>(null);


  constructor(
    private http:HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string){
   return this.http.post<Auth>(`${this.apiUrl}/login`,{email,password})
   .pipe(
    tap(response => {
      return this.tokenService.saveToken(response.access_token);
    })
   );
  }

  getProfile(){
    return this.http.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      tap(user => this.user$.next(user))
    )
  }

  loginAndGet(email:string, password: string){
       return this.login(email, password)
       .pipe(
        switchMap(()=> this.getProfile())
       )
  }

  logout(){
    this.tokenService.removeToken();
  }



}
