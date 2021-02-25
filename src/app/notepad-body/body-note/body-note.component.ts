import { Component, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotepadAPI } from '../NotepadApi.service';

@Component({
  selector: 'app-body-note',
  templateUrl: './body-note.component.html',
  styleUrls: ['./body-note.component.css']
})
export class BodyNoteComponent implements OnInit {
  wordsString : string = "";
  wordCount : string = "0";
  charsCount : string = "0";
  currentURL:string = "";
  password : string = "";
  isloggedIn : boolean;
  @Output() sendLoggedIn = new EventEmitter<{isLoggedIn : boolean}>();
  constructor(private notepadApiService : NotepadAPI , private route : ActivatedRoute, private router :Router)  { }

  ngOnInit(): void {
      this.wordsString = "";
      this.getNoteText();
      
      
  }
  

  calculateWordsAndChars(){
    this.charsCount = this.wordsString.length.toString();
    const a = this.wordsString.split(" ");
    var wordsFinal = a[a.length-1] === "" ? a.length-1 : a.length;
    this.wordCount = wordsFinal.toString();
    

  }

  saveTheInfo(){
      this.notepadApiService.saveTheText({textContent :this.wordsString , textURL : this.currentURL});
  }

  // event fired before clicking refresh in window !
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    console.log("Processing beforeunload...", this.wordsString);
    
    if(this.wordsString.length > 0){
      this.saveTheInfo();
    }
    
    
}

getNoteText(){
  var URL = "";
  this.route.paramMap.subscribe(params =>{
    this.currentURL = params.get('anyUrl');
})
console.log(this.currentURL);
URL = this.currentURL;
this.notepadApiService.fetchTheText(URL).subscribe(responseData=>{
  console.log(responseData);
  this.wordsString = responseData[0];
  this.password = responseData[2];
  this.isloggedIn = responseData[3];
  
  if(this.wordsString.length !=0){
    this.validateIfloginOrNot();
    this.navigateOrNot(this.password, this.isloggedIn);
  }
  // only here the func calls will work !!
})
}

validateIfloginOrNot(){
  this.charsCount = this.wordsString.length.toString();
  const a = this.wordsString.split(" ");
  var wordsFinal = a[a.length-1] === "" ? a.length-1 : a.length;
  this.wordCount = wordsFinal.toString(); 
 }
 
 navigateOrNot(password: string , isloggedIn : boolean){
  var checkCompleteLoggedIn = false; 
  //console.log(password.length);
   if(isloggedIn === true && password.length>0){  
      checkCompleteLoggedIn = true;
   }else{
     checkCompleteLoggedIn = false;
   }
   this.sendLoggedIn.emit({isLoggedIn: checkCompleteLoggedIn});
   if(password.length > 0  && isloggedIn === false){
    this.router.navigate(['/lock/'+this.currentURL]);
  }
 }
}
