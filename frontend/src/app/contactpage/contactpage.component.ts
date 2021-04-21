import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { file_url } from '../global';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-contactpage',
  templateUrl: './contactpage.component.html',
  styleUrls: ['./contactpage.component.css']
})
export class ContactpageComponent implements OnInit {

  FILE_URL=file_url
  storage=window.sessionStorage
  isUserSubmit=false
  email_error_text=""

  constructor(public http : HttpService,public router : Router,private authService:SocialAuthService) { }

  ngOnInit(): void {
  }

  emailValidator(event){
    var email=event.target.value
    if(email==''){
      this.email_error_text=''
    }
    else if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
      this.email_error_text=''
    }
    else{
      this.email_error_text='Invalid Email'
    }
  }


  contactSubmit(form:NgForm){
    // console.log(form.value)
    let fname = form.value.fname
    let lname = form.value.lname
    let email = form.value.email
    let message = form.value.message
    this.http.savedData(fname,lname,email,message).subscribe(
      data => {
        if('email' in data){
          this.storage.setItem("isContactSubmit",'true')
          this.router.navigate(["/analytics"])
        }
        else{
          alert("Server Error")
        }
        }
      ,
      error => {

      });
  }

  logout(){
    this.authService.signOut()
    this.storage.setItem("isContactSubmit","")
    this.storage.setItem("isLogIn","")
  }

}
