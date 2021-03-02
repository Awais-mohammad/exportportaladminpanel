import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;

  constructor(
    private firebaseauth: AngularFireAuth,
    private router: Router,
  ) { }

  login() {
    console.log(this.email.nativeElement.value);
    console.log(this.password.nativeElement.value);
    const email = this.email.nativeElement.value
    const password = this.password.nativeElement.value
    if (!email) {
      alert('email is blank')
    }
    else if (!password) {
      alert('password is blank')
    }
    else {
      this.firebaseauth.auth.signInWithEmailAndPassword(email, password).then(() => {
        alert('login sucess')
        this.router.navigate(['home'])
      }).catch(err => {
        alert(JSON.stringify(err.message))
      })
    }
  }
  ngOnInit() {
  }

}
