import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs/operators';
import { NotepadAPI } from '../notepad-body/NotepadApi.service';

@Component({
  selector: 'app-lock-screen-notepad',
  templateUrl: './lock-screen-notepad.component.html',
  styleUrls: ['./lock-screen-notepad.component.css']
})
export class LockScreenNotepadComponent implements OnInit {
  passwordNote : string = "";
  textURL : string = "";
  response : string;
  passwordMatched: boolean;
  errorMessage : string = "";
  loggedIn : boolean = false;
  constructor( private route : Router, private notepadService : NotepadAPI) { }

  ngOnInit(): void {
    this.passwordMatched = false;
    this.errorMessage = "";
    this.textURL = window.location.pathname.split("/")[2];
    
  }
  
  reachedDown(){
    const result = Math.random().toString(36).substring(2,7);
    this.route.navigate(['/'+ result]);
  }

  validatePassword(){
    this.notepadService.validatePasswordForNote(this.passwordNote, this.textURL).subscribe(Response=>{
      this.response = Response[0];
      this.navigateOrNot();
    })
  }
  navigateOrNot(){

    if(this.response === 'Password Matched!'){
      this.route.navigate(['/'+this.textURL]);
      this.passwordMatched = true;
      
  }else {
    this.passwordMatched = true;
    this.errorMessage = "Invalid Password!";
    this.loggedIn = false;
  }
  }
}
