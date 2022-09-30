import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from "src/app/services/usuario.service";
import Swal from "sweetalert2";
import { Router } from '@angular/router';

declare const google: any ;
declare const gapi: any ;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    styles: []
  })
  export class LoginComponent implements OnInit {

    public formSubmitted = false;
    public auth2: any;

    @ViewChild('googleBtn') googleBtn!: ElementRef;

    public loginDataForm = this.fb.group({
        email: [localStorage.getItem('email') || '',[Validators.required, Validators.email]],
        password: ['', Validators.required],
        remember: [false]
    })

    constructor(private fb: FormBuilder,
                private userServic: UsuarioService,
                private router: Router,
                private ngZone: NgZone){}

    ngOnInit(): void {
    }
    
    
    ngAfterViewInit(): void {
        this.googleInit();
    }

    googleInit() {
        
        google.accounts.id.initialize({
            client_id: "978808574961-6lvugbc2qslb1j84mcvr9ad849kbnkrc.apps.googleusercontent.com",
            callback: (response: any) =>  this.handleCredentialResponse(response)
        });

        google.accounts.id.renderButton(
            this.googleBtn.nativeElement,
            //document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
    }

    handleCredentialResponse(response: any){
        this.userServic.loginGoogle(response.credential)
            .subscribe(resp => {
                //Navegar al dashboard
                this.ngZone.run( () => {
                    this.router.navigateByUrl('/');
                });
            })
    }

    login(){

        this.userServic.login(this.loginDataForm.value)
            .subscribe(resp => {

                if (this.loginDataForm.get('remember')?.value) {
                    localStorage.setItem('email', this.loginDataForm.get('email')?.value!);
                }
                else
                {
                    localStorage.removeItem('email');
                }
                
                //Navegar al DashBoard
                this.ngZone.run( () => {                    
                    this.router.navigateByUrl('/');
                })

            },(err) => {
                //Si sucede un error
                Swal.fire('Error', err.error.msg, 'error');
              })
    }

    /*
    renderButton() {
        gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark'
        });

        this.startApp();
    }

    async startApp() {
        await this.userServic.googleInit();
        this.auth2 = this.userServic.auth2;
        this.attachSignin(document.getElementById('my-signin2'));
    }

    attachSignin(element: any) {
        this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
            const id_token = googleUser.getAuthResponse().id_token;
            this.userServic.loginGoogle(id_token)
                .subscribe( resp => {
                    this.ngZone.run( () => {
                        this.router.navigateByUrl('/');
                    });                    
                })
        }, (error:any) => {
            alert(JSON.stringify(error, undefined,2));
        } 
        );
    }*/


  }