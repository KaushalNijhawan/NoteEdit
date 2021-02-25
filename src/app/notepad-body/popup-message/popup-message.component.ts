import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotepadAPI } from '../NotepadApi.service';
@Component({
  selector: 'app-popup',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.css']
})
export class PopupMessageComponent implements OnInit {
  currentURL: string= "";
  changedURL: string ="";
  passwordNote : string="";
  popup : boolean ;
  @Input() popupType: string ;
  popupText : string ="";
  passwordSet : boolean ;
  passwordButton : boolean ;
  @Output() updatepopup = new EventEmitter<{popup : boolean }>()
  isLoggedIn : boolean ;
  constructor(private notepadService : NotepadAPI , private route : Router, private currentRoute : ActivatedRoute) {}
  
 ngOnInit(): void {

       this.currentURL = window.location.pathname.split("/")[1];
       
       if(this.popupType === 'lock'){
        this.popupText = "Set Lock For NoteEdit";
        this.passwordSet =  true;
       }else {
        this.popupText = "Change URL";
        this.passwordSet = false;
      }
  }
  
  closePopup(){
      
      if(this.passwordSet === true){
        this.passwordButton = true;
      }else if(this.passwordSet === false){
        this.notepadService.updatingNoteURL(this.currentURL, this.changedURL);
        this.popup =  false;
        this.updatepopup.emit({popup : this.popup});
        this.notepadService.showPopup = false;
        this.route.navigate(['/'+this.changedURL]);
      }
      
      
  }
  navigateToGivenURL(){
    this.route.navigate(['/'+this.changedURL]);
   
  }
  logoutNoteEdit(){
    var textObject = {textURL : this.currentURL , password : this.passwordSet}
    this.notepadService.addPasswordFieldForURL(this.currentURL, this.passwordNote);
    
    this.route.navigate([
      '/lock/' , this.currentURL
    ])
    
  }
  crossButton(){
    this.popup = false;
    this.updatepopup.emit({popup : this.popup});
    this.notepadService.showPopup = false;
  }
  removePassword(){
    
    this.popup = false;
    this.updatepopup.emit({popup : this.popup});
    this.notepadService.showPopup = false;
  }
  
}
