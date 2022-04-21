import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, AfterViewInit {

  constructor() { }
  
  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    AuthenticationService.logout();
  }

}
