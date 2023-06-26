import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  errorSession: boolean = false

  constructor(
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router
    ){}
  formLogin: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('',[
          Validators.required,
          Validators.email
        ]),
        password:new FormControl('',[
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12)
        ]),
      }
    )
  }

  sendLogin(): void{
    const {email, password} = this.formLogin.value
    this.authService.sendCredentials(email, password).subscribe(
      responseOk => {
        
        const { tokenSession, data } = responseOk
        this.cookie.set('token', tokenSession, 4, '/')

        alert('sesion iniciada')
        this.router.navigate(['/','tracks'])
      },
      err => {
        this.errorSession = true
        alert('Ocurrio error con tus datos')
        console.log('Ocurrio error con tus datos')
      }
    );
  }
}
