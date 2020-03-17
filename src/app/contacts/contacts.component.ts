import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GoogleApiService, GoogleAuthService } from 'ng-gapi';
import { Contact } from './classes/contact';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
declare const gapi: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, AfterViewInit {
  isLoaded = false;
  allContacts: Array<Contact> = [];
  constructor() {

  }
  auth2: any;
  CLIENT_ID = '539469796403-14qfbolce42csbfouehpcvhupueev5u1.apps.googleusercontent.com';
  API_KEY = 'AIzaSyBWb-bZ_6lHtbAPM3JVXSzciqzfR_4enuo';

  // Array of API discovery doc URLs for APIs used by the quickstart
  DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  SCOPES = `profile email https://www.googleapis.com/auth/contacts`;
  state = this;
  element: any;
  gClient: any;
  contact = new FormControl();
  filterdContact: Array<Contact> = [];
  
  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.signIn(), 1000);
  }



  signIn() {
    if(localStorage.getItem('allContacts')){
      this.allContacts = JSON.parse(localStorage.getItem('allContacts'));
      console.log(this.allContacts);
      this.createFilter()
      this.isLoaded = true;
      return;
    }
    gapi.load('client:auth2', () => this.initClient());
  }
  createFilter(){
    this.filterdContact = this.allContacts.slice();
    this.contact.valueChanges.subscribe(value => {
      this.filterdContact = this.allContacts.filter(c => c.firstName.includes(value) || c.lastName.includes(value));
    });
  }

  initClient() {
    gapi.client.init({
      apiKey: 'AIzaSyBWb-bZ_6lHtbAPM3JVXSzciqzfR_4enuo',
      discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
      clientId: '539469796403-14qfbolce42csbfouehpcvhupueev5u1.apps.googleusercontent.com',
      scope: `profile email https://www.googleapis.com/auth/contacts`
    }).then(() => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
     
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());


    }, err => console.error(err));
  }


  fetchContacts() {
   
    gapi.client.init({
      apiKey: this.API_KEY,
      discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
      clientId: this.CLIENT_ID,
      scope: this.SCOPES
    })
      .then(() => {
        return gapi.client.people.people.connections.list({
          resourceName: 'people/me',
          personFields: 'names,phoneNumbers,emailAddresses'
        });
      })
      .then(
        (res) => {
          console.log("Res: " + JSON.stringify(res));
        },
        error => console.log("ERROR " + JSON.stringify(error))
      );
    console.log(this.gClient);
    // });
  }
  async updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      await this.getAllContacts();
      console.log(this.allContacts);
      setTimeout(() => {
        this.isLoaded = true;
        this.createFilter();
      }, 150);
      localStorage.setItem('allContacts',JSON.stringify(this.allContacts));
    }else{
      gapi.auth2.getAuthInstance().signIn();
    }
  }

  async getAllContacts() {
    const result = await gapi.client.people.people.connections.list({
      resourceName: 'people/me',
      personFields: 'names,phoneNumbers,emailAddresses',
      pageSize: 2000
    });
    if (result && result.result && result.result.connections && result.result.connections.length) {
      this.allContacts = result.result.connections.map(c => new Contact(c)).filter(c =>  (c.firstName || c.lastName) && (c.phone || c.celular || c.celular2));
      this.allContacts = this.allContacts.sort((a, b) => a.firstName !== b.firstName ? a.firstName > b.firstName ? 1 : -1 : 0);
      this.allContacts = this.allContacts.sort((a, b) => {
        const aFirstChar = a.firstName ? a.firstName.charAt(0) : '';
        const bFirstChar = b.firstName ? b.firstName.charAt(0) : '';
        if (aFirstChar > bFirstChar) {
          return 1;
        } else if (aFirstChar < bFirstChar) {
          return -1;
        } else {
          const aLastChar = a.lastName ? a.lastName.charAt(0) : '';
          const bLastChar = b.lastName ? b.lastName.charAt(0) : '';
          if (aLastChar > bLastChar) {
            return 1;
          } else if (aLastChar < bLastChar) {
            return -1;
          } else {
            return 0;
          }
        }
      });
    }
  }

}