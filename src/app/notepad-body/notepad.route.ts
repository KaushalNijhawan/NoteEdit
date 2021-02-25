import { Routes, RouterModule } from '@angular/router';
import {NgModule} from "@angular/core";
import { NotepadBodyComponent } from './notepad-body.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LockScreenNotepadComponent } from '../lock-screen-notepad/lock-screen-notepad.component';
import { SpeechToTextComponent } from '../speech-to-text/speech-to-text.component';
import { UploadFileToNoteEditComponent } from '../upload-file-to-note-edit/upload-file-to-note-edit.component';

const routes = [
        {path:":anyUrl" , component : NotepadBodyComponent },
        {path:"" , redirectTo:Math.random().toString(36).substring(7) , pathMatch:"full"},
        {path:"lock/:anyUrl" , component: LockScreenNotepadComponent},
        {path:'voice-text/:anyURl' , component: SpeechToTextComponent},
        {path:"file-text/:anyURl", component : UploadFileToNoteEditComponent},
        {path:"**" , component:PageNotFoundComponent}
        
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class NotepadRouteModule {

    generateString(){
        let r = Math.random().toString(36).substring(7);
        return r;
    }
}