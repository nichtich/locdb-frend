import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// import { ImageUploadModule } from 'ng2-imageupload';
// exported to uploader

// ng2-bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';
// ng2-fileupload
// import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { ScanComponent } from './scan.component';
import { TodoComponent } from './todo.component';
import { DisplayComponent } from './display/display.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { LocdbService } from './locdb.service';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { ResourceFormComponent } from './resource-form/resource-form.component';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PopoverModule } from 'ngx-popover';

import { CredentialsService } from 'angular-with-credentials';


import * as d3 from 'd3';
import { LoginComponent } from './login/login.component';
import { VisualComponent } from './visual/visual.component';
import { CommitComponent } from './commit/commit.component';
import { FeedReaderComponent } from './feed-reader/feed-reader.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoLeafComponent } from './todo-leaf/todo-leaf.component';

@NgModule({
  imports: [
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    PopoverModule
    ],
  declarations: [
    AppComponent,
    ScanComponent,
    TodoComponent,
    DisplayComponent,
    EntryFormComponent,
    SuggestionComponent,
    ResourceFormComponent,
    LoginComponent,
    VisualComponent,
    CommitComponent,
    FeedReaderComponent,
    EntryListComponent,
    TodoDetailComponent,
    TodoListComponent,
    TodoLeafComponent,
    // LocdbService
  ],
  providers: [ LocdbService, CredentialsService ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
