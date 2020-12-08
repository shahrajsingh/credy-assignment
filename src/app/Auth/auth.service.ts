import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthData } from './authData.model';

const BackendUrl = environment.apiUrl + 'usermodule/';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  private AuthStatusListener = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  login(username: string, password: string) {
    const authData: AuthData = {
      username: username,
      password: password,
    };
    this.http
      .post<{ is_success: string; data }>(BackendUrl + 'login/', authData)
      .subscribe(
        (result) => {
          if (result.is_success) {
            this.saveAuthData(result.data.token);
            this.isAuthenticated = true;
            this.AuthStatusListener.next(true);
            this.router.navigate(['/movies']);
          }
        },
        (error) => {
          this.snackBar.open(error.error.error.message, 'OK', {
            duration: 1500,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.isAuthenticated = false;
          this.AuthStatusListener.next(false);
        }
      );
  }
  logout() {
    this.clearAuthData();
    this.router.navigate(['/']);
  }
  AuthStatusSubscription() {
    return this.AuthStatusListener.asObservable();
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }
  private clearAuthData() {
    localStorage.removeItem('token');
  }
  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
}
