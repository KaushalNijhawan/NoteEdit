import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { NotepadAPI } from './NotepadApi.service';

@Component({
  selector: 'app-notepad-body',
  templateUrl: './notepad-body.component.html',
  styleUrls: ['./notepad-body.component.css']
})
export class NotepadBodyComponent implements OnInit {
  popup : boolean = false;
  constructor(private notepadSevice : NotepadAPI) { }

  ngOnInit(): void {
    console.log("fresh call");
  }
  shootPopup(){
    return this.popup;
  }
   
}
