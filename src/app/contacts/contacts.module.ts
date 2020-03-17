import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { SharedModule } from '../shared/shared.module';
import { ContactsRoutingModule } from './contacts-routing.module';



@NgModule({
  declarations: [ContactsComponent],
  imports: [    
    SharedModule,
    ContactsRoutingModule
  ]
})
export class ContactsModule { }
