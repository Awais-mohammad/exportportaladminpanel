
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Title } from '@angular/platform-browser';
import * as firebase from 'firebase/app';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private fireStore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
    private router: Router,
    private http: HttpClient,
    public loadingController: LoadingController,
    public toastControll: ToastController,
    public titleService: Title,

  ) { }

  //variables
  width = window.innerWidth;
  email: string;
  password: string;
  name: string;
  phone: string;
  createvendor: boolean = false;

  addvendor() {
    this.createvendor = !this.createvendor;
  }
  create() {
    if (!this.email) {
      alert('empty field')
    }
    else if (!this.password) {
      alert('empty field')
    }
    else if (!this.phone) {
      alert('empty field')
    }
    else if (!this.name) {
      alert('empty field')
    }
    else {
      this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.toLocaleLowerCase(), this.password).then(user => {
        const userID = user.user.uid
        const name = this.name.toLocaleLowerCase();
        const email = this.email.toLocaleLowerCase();
        const password = this.password
        const phone = this.phone
        this.fireStore.collection('admins').doc(userID).set({
          userID,
          name,
          email,
          password,
          phone,

        }).then(() => {
          alert('Admin created successfully')
        }).catch(err => {
          alert(JSON.stringify(err.message))
        })

      })
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }

  gotopage(name) {
    this.router.navigate([name])
  }
}
