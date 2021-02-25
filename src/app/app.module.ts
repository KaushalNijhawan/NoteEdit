import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NotepadBodyComponent } from './notepad-body/notepad-body.component';
import { HeaderComponent } from './notepad-body/header/header.component';
import { BodyNoteComponent } from './notepad-body/body-note/body-note.component';
import {FormsModule} from "@angular/forms";
import {NotepadRouteModule} from "./notepad-body/notepad.route";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HttpClientModule} from "@angular/common/http";
import { PopupMessageComponent } from './notepad-body/popup-message/popup-message.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LockScreenNotepadComponent } from './lock-screen-notepad/lock-screen-notepad.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoggedInPopupComponent } from './notepad-body/logged-in-popup/logged-in-popup.component';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';
import { UploadFileToNoteEditComponent } from './upload-file-to-note-edit/upload-file-to-note-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    NotepadBodyComponent,
    HeaderComponent,
    BodyNoteComponent,
    PageNotFoundComponent,
    PopupMessageComponent,
    LockScreenNotepadComponent,
    LoggedInPopupComponent,
    SpeechToTextComponent,
    UploadFileToNoteEditComponent
  ],
  imports: [
    BrowserModule,FormsModule,NotepadRouteModule,HttpClientModule, BrowserAnimationsModule,MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
