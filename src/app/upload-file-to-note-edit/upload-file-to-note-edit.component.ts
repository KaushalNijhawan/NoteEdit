import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotepadAPI } from '../notepad-body/NotepadApi.service';

@Component({
  selector: 'app-upload-file-to-note-edit',
  templateUrl: './upload-file-to-note-edit.component.html',
  styleUrls: ['./upload-file-to-note-edit.component.css']
})
export class UploadFileToNoteEditComponent implements OnInit {
  showUploadedFileLink : boolean = false;
  constructor(private notepadService : NotepadAPI , private route : ActivatedRoute , private router : Router) { }
  currentURL : string = "";
  fileContent : string;
  linkText : string = "http://localhost:4200/";
  ngOnInit(): void {
    this.showUploadedFileLink = false;
    this.currentURL = window.location.pathname.split("/")[2];
    this.linkText = this.linkText + this.currentURL;
    
  }

  onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result.toString();
    }
    fileReader.readAsText(file);
    this.showUploadedFileLink = true;
   
  }

  saveTheNoteEdit(){
    if(this.fileContent .length  > 0){
      this.notepadService.saveTheText({textContent : this.fileContent , textURL : this.currentURL});
    }
    window.location.href = "http://localhost:4200/" + this.currentURL;
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.saveTheNoteEdit();
  }

  cancelTheUpload(){
    location.reload();
  }

  GoToHomePage(){
    let r = Math.random().toString(36).substring(7);
    this.router.navigate(['/'+r]);
  }
}
