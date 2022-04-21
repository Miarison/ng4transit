import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninModel } from '../model/signin-model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(signinForm: NgForm){
    const signinData = new SigninModel(signinForm.value.email, signinForm.value.password);
    this.authenticationService.authenticate(signinData).subscribe(data=>{
      if(data.success){
        AuthenticationService.setUserData(data.data);
        this.router.navigate(['']);
      }
    });
  }

}
