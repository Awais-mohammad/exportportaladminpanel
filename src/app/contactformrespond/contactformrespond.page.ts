import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactformrespond',
  templateUrl: './contactformrespond.page.html',
  styleUrls: ['./contactformrespond.page.scss'],
})
export class ContactformrespondPage implements OnInit {

  constructor(
    private firestore: AngularFirestore,

  ) { }

  data: any;

  getData() {
    this.firestore.collection('contactform').get().subscribe(data => {
      console.log(data.docs);
      this.data = data.docs
    })
  }

  ngOnInit() {
    this.getData()
  }

}
