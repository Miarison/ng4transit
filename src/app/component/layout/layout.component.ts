import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterContentChecked {
  isAuthenticated: boolean = false;
  
  constructor(public changeDetectorRef: ChangeDetectorRef) { }
  
  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.isAuthenticated = AuthenticationService.isLoggedIn();

    AuthenticationService.onLoggedIn.subscribe(data=>{
      this.isAuthenticated = AuthenticationService.isLoggedIn();
    });
    
    AuthenticationService.onLoggedOut.subscribe(data=>{
      this.isAuthenticated = AuthenticationService.isLoggedIn();
    });

  }

}
