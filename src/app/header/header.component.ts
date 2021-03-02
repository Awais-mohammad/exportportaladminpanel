import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private firebaseauth: AngularFireAuth,

  ) { }

  width = window.innerWidth;
  activePath: string;
  menuOpen: boolean;
  showOptions: boolean = false;
  openLoginForm: boolean = false;
  email: string;
  password: string;
  currentUserID: string;
  pages: any[] = ['home', 'manage-exporters', 'contactformrespond'];
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }
  async checkRoute() {
    setInterval(() => {
      this.activePath = this.router.url.slice(1, this.router.url.length);
    }, 100)
  }

  goToPage(path: string) {
    this.router.navigate([path]).then(() => {
      this.activePath = this.router.url.slice(1, this.router.url.length);
      console.log(this.activePath);
    });
  }
  currentUID: string;
  userdata: any;

  getuser() {
    const authsub = this.firebaseauth.authState.subscribe(cuser => {
      this.currentUID = cuser.uid

      this.firestore.collection('admins').doc(this.currentUID).get().subscribe(res => {
        this.userdata = res
        console.log(this.userdata);

      })
    })
  }

  logOut() {
    this.firebaseauth.auth.signOut()
    this.goToPage('authentication')
  }

  ngOnInit() {
    this.checkRoute();
    this.getuser()
  }

}
