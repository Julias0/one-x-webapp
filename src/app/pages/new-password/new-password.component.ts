import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  validateForm!: FormGroup;
  isSuccess = false;
  isLoading = false;
  accessToken = '';
  passwordVisible = false;

  lengthValidationDisplay$!: Observable<boolean>;
  uppercaseValidationDisplay$!: Observable<boolean>;
  numberValidationDisplay$!: Observable<boolean>;
  specialCharValidationDisplay$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService
  ) { }



  ngOnInit(): void {
    this.accessToken = this.activatedRoute.snapshot.queryParams.access_token
    console.log(this.accessToken);
    this.tokenService.setAccessToken(this.accessToken);

    this.validateForm = this.fb.group({
      password: ['',
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(24),
            Validators.pattern(/[A-Z]/),
            Validators.pattern(/[0-9]/),
            Validators.pattern(/[!@#$%^&*()+\-:;<=>{}|~?]/)]
        )]
    });

    this.lengthValidationDisplay$ = this.validateForm.controls.password.valueChanges.pipe(
      map(
        password => password && password.length >= 8 && password.length <= 24
      )
    );

    this.uppercaseValidationDisplay$ = this.validateForm.controls.password.valueChanges.pipe(
      map(
        password => (/[A-Z]/.test(password))
      )
    );

    this.numberValidationDisplay$ = this.validateForm.controls.password.valueChanges.pipe(
      map(
        password => (/[0-9]/.test(password))
      )
    );
    this.specialCharValidationDisplay$ = this.validateForm.controls.password.valueChanges.pipe(
      map(
        password => (/[!@#$%^&*()+\-:;<=>{}|~?]/.test(password))
      )
    );

  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      console.log(this.validateForm.value);
      const value = this.validateForm.value;
      this.authService.resetPassword(value.password).pipe(
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(() => {
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/', 'app', 'meetings']);
        }, 3000);
      });
    } else {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
