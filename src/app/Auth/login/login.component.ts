import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide: boolean = true;
  isLoading: boolean;
  AuthSub: Subscription;
  Animations = {
    bg1ani: '',
    signintext: '',
    leftanime: '',
    loginform: '',
    left2text: '',
    mobimganimation: '',
    formanimation: '',
  };

  @HostListener('window:keyup', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      document.getElementById('loginBtn').click();
    } else {
      return;
    }
  }
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.AuthSub = this.authService
      .AuthStatusSubscription()
      .subscribe((result) => {
        this.isLoading = false;
      });
  }
  login(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    } else {
      this.isLoading = true;
      this.authService.login(form.value.username, form.value.password);
    }
  }
  mobileform(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.isLoading = true;
      this.authService.login(form.value.mobusername, form.value.mobpassword);
    }
  }
  start() {
    this.Animations.bg1ani = 'bg1ani 1.5s forwards';
    this.Animations.signintext = 'signintext 1s forwards';
    this.Animations.leftanime = 'leftanime 1.5s forwards';
    this.Animations.loginform = 'loginform 1s forwards';
    this.Animations.left2text = 'left2text 2.5s forwards';
    this.Animations.mobimganimation = 'mob-img-animation 1.5s forwards';
    this.Animations.formanimation = 'form-animation 2s forwards';
  }
  ngOnDestroy() {
    this.AuthSub.unsubscribe();
  }
}
