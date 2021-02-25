import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
@Injectable({providedIn:"root"})
export class NotepadAPI{
    showPopup = false;
    constructor(private noteHttp : HttpClient){

    }
    
    saveTheText(textNote:{textContent:string , textURL:string}){
        this.noteHttp.post("http://localhost:8080/saveNote" , textNote).subscribe(ResponseData=>{
            console.log("");
        })
        
    }

    fetchTheText(textURL){
        return this.noteHttp.get("http://localhost:8080/getRequiredNote/" + textURL ).pipe(map(responseData=>{
            const textArray = [];
            for(const key in responseData){
                console.log(key);
                textArray.push(responseData[key]);
            }
            return textArray;
        })
        )}
    addPasswordFieldForURL(textURL: string, password: string){
        this.noteHttp.get("http://localhost:8080/addPassword/"+textURL , {
            headers : new HttpHeaders({"password" : password})
        }).subscribe(Response=>{
            console.log(Response);
        })
    }

    validatePasswordForNote(passwordNote : string , textURL:string){
        return this.noteHttp.get("http://localhost:8080/validatePassword/"+textURL ,{
            headers : new HttpHeaders({"password" : passwordNote, responseType:'blob'})
        }).pipe(map(response=>{
            const resArr =[];
            for(const key in response){
                resArr.push(response[key]);
            }
            return resArr;
        }))
    }

    updatingNoteURL(textURL:string, updatedURL:string){
        this.noteHttp.get('http://localhost:8080/updateURL/'+textURL,{
            headers: new HttpHeaders({"updatedURL" : updatedURL}) 
        }).subscribe(response=>{
            console.log(response);
        })
    }

    updateLoggedStatus(textURL:string){
        this.noteHttp.get("http://localhost:8080/changeLoggedIn/" + textURL).subscribe(Response=>{
            console.log(Response);
        })
    }

    removePasswordForNote(textURL:string){
        this.noteHttp.get("http://localhost:8080/removeNotePassword/"+textURL).subscribe(response=>{
            console.log(response);
        })
    }
}