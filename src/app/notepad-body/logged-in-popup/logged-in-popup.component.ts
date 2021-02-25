import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { NotepadAPI } from '../NotepadApi.service';

@Component({
  selector: 'app-logged-in-popup',
  templateUrl: './logged-in-popup.component.html',
  styleUrls: ['./logged-in-popup.component.css']
})
export class LoggedInPopupComponent implements OnInit {
  isLoggedIn : boolean  = true;
  currentURL : string = "";
  constructor(private notepadService : NotepadAPI , private route :Router) { }


  ngOnInit(): void {
    this.currentURL = window.location.pathname.split("/")[1];
  }

  pressCrossIcon(){
    window.location.href = "http://localhost:4200/" + this.currentURL;
  }

  removePasswordForNote(){
      this.notepadService.removePasswordForNote(this.currentURL);
      this.isLoggedIn = false;
      window.location.href = "http://localhost:4200/" + this.currentURL;
  }

  logOutButtonPressed(){
      this.notepadService.updateLoggedStatus(this.currentURL);
      this.route.navigate(['/lock/'+this.currentURL]);
  }
}
