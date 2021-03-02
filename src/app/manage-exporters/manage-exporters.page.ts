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
  selector: 'app-manage-exporters',
  templateUrl: './manage-exporters.page.html',
  styleUrls: ['./manage-exporters.page.scss'],
})
export class ManageExportersPage implements OnInit {

  constructor(
    private fireStore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
    private router: Router,
    private http: HttpClient,
    public loadingController: LoadingController,
    public toastControll: ToastController,
    public titleService: Title,

  ) {
    this.getCats();
    setTimeout(() => {
      this.getVendors();
    }, 2000);
    this.getTopVendors()
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }
  temp: any;

  getexporter(category: string) {
    console.log('category for exporter:', category);
    this.fireStore.collection('products').doc(category).valueChanges().subscribe((data: any) => {

      if (data) {
        if (data.vendors) {
          console.log(data.vendors);
          this.temp = data.vendors
        }
        else {

        }
      }
      else {

      }
    })
  }

  searchFound: any[] = [];
  width = window.innerWidth;
  signup: boolean = false;
  email: string;
  password: string;
  username: string;
  showLogin: boolean = false;
  companyAdress: string;
  companyPhone: number;
  registersection: boolean = false;
  webURL: string;
  loadermsg: string;
  loaderID: string;



  vendors: any[] = []
  categories: any;

  getVendors() {
    const vendors = this.fireStore.collection('vendors').get().subscribe((data: any) => {
      for (var i = 0; i < data.docs.length; i++) {
        this.vendors.push(data.docs[i].Df.sn.proto.mapValue.fields);
      }
      console.log(this.vendors);
      vendors.unsubscribe();
    })
  }

  getCats() {
    const cats = this.fireStore.collection('appData').doc('categories').get().subscribe((data: any) => {
      this.categories = data.Df.sn.proto.mapValue.fields;
      console.log('categories are', this.categories);
      cats.unsubscribe();
    })
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
  cat;
  showMore() {

  }

  choosecat(selected: string) {
    this.selectedcat = selected
    alert(this.selectedcat)
    if (this.selectedcat) {
      this.cates.push(this.selectedcat)
    }
    else {
      alert('lol')
    }
  }
  selectedFiles: any;
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: this.loadermsg,
      spinner: 'dots',
      id: this.loaderID,
      mode: "ios",

    });
    await loading.present();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.loaderID = 'upimg'
    this.loadermsg = 'FETCHING!!!!!'
    this.presentLoading()
    console.log(this.selectedFiles[0].name);
    this.imageURL = 'https://134.122.2.23/vendors/' + this.selectedFiles[0].name
    console.log(this.imageURL);
    this.upload()
  }

  currentFile: any;
  msg;

  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'https://134.122.2.23/uploadimage.php', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }


  upload() {

    this.currentFile = this.selectedFiles.item(0);
    this.uploadFile(this.currentFile,).subscribe(response => {
      if (response instanceof HttpResponse) {
        alert(response.body);
        this.loadingController.dismiss('upimg')
      }
    });
    return;
  }


  delete(index) {
    alert('cliecked' + index)
    this.cates.splice(index, 1)
  }

  topvendors: any;

  getTopVendors() {
    this.fireStore.collection('vendors', querry => querry.where('top', '==', true).orderBy('timestamp', 'asc')).get().subscribe(res => {
      if (res.empty) {


      }
      else {

        this.topvendors = res.docs
        console.log('vendors on top', this.topvendors);
      }
    })
  }
  products: any[]
  async openProfilePage(profileID: string) {

    //  console.log('current userID', profileID);

    //  const model = await this.modalController.create({
    //    component: ExporterPage,
    //    cssClass: "my-custom-modal-css",
    //    id: "displayshop",
    //    componentProps: {
    //      ExporterID: profileID
    //    },
    //  });
    //  return await model.present();
  }

  changeCat(cat: string) {
    this.products = [];
    this.cat = cat;
    this.getexporter(cat);
  }
  search(event) {
    console.log(event.detail.value);
    this.searchFound = [];
    var found = 0;
    if (event.detail.value != undefined && event.detail.value != "") {
      for (var i = 0; i < this.vendors.length; i++) {
        const currentCat = this.vendors[i].name.stringValue;
        console.log(this.vendors[i].userID, "test");

        if (currentCat) {
          found = found + 1;
          if (found < 7) {
            this.searchFound.push({
              name: currentCat,
              type: "exporter",
              ID: this.vendors[i].userID.stringValue,
            })
          }
        }
      }

    }
  }

  addtotop(id: string) {
    const top = true;

    this.fireStore.collection('vendors').doc(id).update({
      top
    }).then(() => {
      alert('exporter listed in top category')
    })
  }
  imageURL: string;


  register() {
    if (!this.username) {
      alert('empty field')
    }
    else if (!this.email) [
      alert('empty field')
    ]
    else if (!this.password) {
      alert('empty field')
    }
    else if (!this.companyAdress) {
      alert('empty field')
    }
    else if (!this.companyPhone) {
      alert('empty field')
    }
    else if (!this.selectedcat) {
      alert('select a category')
    }
    else if (!this.imageURL) {
      alert('bharway image daal')
    }
    else if (!this.webURL) {
      alert('website cannot be ledt blank')
    }
    else {

      this.email = this.email.toLocaleLowerCase()

      this.firebaseauth.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {


        const userID = user.user.uid;
        //      const userID = this.currentUserID;
        const timestamp = new Date()
        const name = this.username.toLocaleLowerCase()
        const phone = this.companyPhone
        const adress = this.companyAdress.toLocaleLowerCase()
        const accountstatus = 'approved'
        const category = this.cates;
        const companyEmail = this.email.toLocaleLowerCase()
        const imageURL = this.imageURL
        const websiteURL = this.webURL
        this.fireStore.collection('vendors').doc(userID).set({
          userID,
          timestamp,
          name,
          phone,
          adress,
          accountstatus,
          category,
          companyEmail,
          imageURL,
          websiteURL
        }).then(() => {
          alert('user created')

        }).catch(err => {
          alert(JSON.stringify(err.message))
        })


      })
    }
  }

  approveAccount(id: string) {
    const accountstatus = 'approved'
    this.fireStore.collection('vendors').doc(id).update({
      accountstatus
    }).then(() => {
      alert('account approved')
    }).catch(err => {
      alert(JSON.stringify(err.message))
    })
  }

  cateegories: any;
  selectedcat;
  cates: any = [];

  ionViewWillEnter() {
    this.titleService.setTitle("Exporters list - Export Portal");
    try {
      document.querySelector("meta[name='description']").remove();
    } catch (e) {
    }
    try {
      document.querySelector("meta[name='keywords']").remove();
    } catch (e) {

    }

    var keywords = document.createElement('meta');
    keywords.name = "keywords";
    keywords.content = "export portal, export portal pakistan, exportportal pk, exporters list pakistan, pakistan exporters ";
    document.getElementsByTagName('head')[0].appendChild(keywords);
  }



  ngOnInit() {
  }

}
