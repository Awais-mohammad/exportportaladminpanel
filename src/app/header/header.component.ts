
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,

  ) { }

  width = window.innerWidth;
  activePath: string;
  menuOpen: boolean;
  showOptions: boolean = false;
  openLoginForm: boolean = false;
  email: string;
  password: string;
  currentUserID: string;

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


  ngOnInit() {
    this.checkRoute();
  }

}
