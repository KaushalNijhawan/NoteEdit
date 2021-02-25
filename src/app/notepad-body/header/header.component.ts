import { Component, OnInit, Output , EventEmitter, Input} from '@angular/core';
import { Router } from '@angular/router';
import { NotepadAPI } from '../NotepadApi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()popup : boolean = false;
  constructor(private notepadService : NotepadAPI, private route : Router) { }
  popupType:string = "";
  randomStr: string = "";
  currentURL : string = "";
  isLoggedInPopup : boolean ;
  ngOnInit(): void {
    this.currentURL = window.location.pathname.split("/")[1];
    console.log(this.popup);
  }

  toggleLockPopup(){
      this.popup = true;  
      this.notepadService.showPopup = this.popup;
      this.popupType = "lock";
      
  }
  toggleURLPopup(){
    this.popup = true;  
    this.notepadService.showPopup = this.popup;
    this.popupType = "URL";
  }
  getpopup(){
    this.popup = false;
  }
  generateRandomString(){
    const result = Math.random().toString(36).substring(2,7);
    this.randomStr = result;
    window.location.href = "http://localhost:4200/" + this.randomStr;
  }
  
  updatePopup(event){
    this.popup = event.popup;
    console.log(event)
  }
  
  getLoggedInStatus(event){
    this.isLoggedInPopup = event.isLoggedIn;
    console.log(this.isLoggedInPopup);
    
  }

  GoToSpeechToText(){
    this.route.navigate(['/voice-text/' + this.currentURL
    ]);
  }
  GoToUploadComp(){
    this.route.navigate(['/file-text/'+this.currentURL]);
  }
}
