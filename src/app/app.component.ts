import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private firebaseauth: AngularFireAuth,

  ) {
    this.checkLogin()
  }

  checkLogin() {
    const authSub = this.firebaseauth.authState.subscribe(user => {
      if (user) {
        if (user && user.uid) {
          this.router.navigate(['home'])
        }
        else {
          this.router.navigate(['authentication'])
        }
      } else {

        this.router.navigate(['authentication'])
      }


    })
  }
}
