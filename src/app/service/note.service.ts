import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient:HttpClient) { }
  
  getNotes(data):Observable<any>{
    return this._HttpClient.post('https://routeegypt.herokuapp.com/getUserNotes',data)
  }
  addNotes(data):Observable<any>{
    return this._HttpClient.post('https://routeegypt.herokuapp.com/addNote',data)
  }
  ubdateNotes(data):Observable<any>{
    return this._HttpClient.put('https://routeegypt.herokuapp.com/updateNote',data)
  }
  deleteNote(data):Observable<any>{
    
    return this._HttpClient.delete('https://routeegypt.herokuapp.com/deleteNote',data)
  }


}
