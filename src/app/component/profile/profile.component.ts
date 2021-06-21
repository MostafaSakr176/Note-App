
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwt_decode from "jwt-decode";
import { NoteService } from '../../service/note.service';


declare let $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  allnots:any[] = [];
  token:string;
  decoded:any;
  noteId:string;

  addForm = new FormGroup({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
    });
    editForm = new FormGroup({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
    });

  
  
  constructor(private _NoteService:NoteService){
    this.token = localStorage.getItem('TOKEN');
    this.decoded=jwt_decode(this.token);

    this.getNotes();
  }


  getNotes(){
    let data = {
      token: this.token,
      userId:this.decoded._id
    }
    this._NoteService.getNotes(data).subscribe((res)=>{
      console.log(res);
      if(res.message == 'success'){
        this.allnots = res.Notes;
      }else{
        this.allnots = [];
      }
    })
  }
  
  

  addNotes() {
    if(this.addForm.valid){
      let data ={
        title: this.addForm.controls.title.value,
        desc:this.addForm.controls.desc.value,
        cetizenID:this.decoded._id,
        token:this.token
      }
      this._NoteService.addNotes(data).subscribe((res)=>{
        if(res.message == 'success'){
          this.getNotes();
          $('#addNote').modal('hide');
          this.addForm.reset()
        }
      })
    }
  }



  getId(id){
    this.noteId = id ;
    console.log(id);
  }


  deleteNote(){
    let options = {
      headers: new HttpHeaders ({}),
      body:{
        NoteID:this.noteId ,
        token: this.token
      }
    }

    this._NoteService.deleteNote(options).subscribe(res=>{
      console.log(res);
      if (res.message == "deleted") {
        this.getNotes();
        $('#deleteNote').modal('hide');
      }
      
    })
  }

setValue(){
  for (let index = 0; index < this.allnots.length; index++) {
    if (this.allnots[index]._id == this.noteId) {
      this.editForm.controls.title.setValue(this.allnots[index].title);
      this.editForm.controls.desc.setValue(this.allnots[index].desc);
    }
    
  }
}
  ubdateNotes() {
    if(this.editForm.valid){
      let data ={
        title: this.editForm.value.title,
        desc:this.editForm.value.desc,
        NoteID:this.noteId,
        token:this.token
      }
      this._NoteService.ubdateNotes(data).subscribe((res)=>{
        console.log(res);
        this.getNotes();
        $('#editNote').modal('hide');
      })
    }
  }
  
  

  ngOnInit(): void {
  }


}
