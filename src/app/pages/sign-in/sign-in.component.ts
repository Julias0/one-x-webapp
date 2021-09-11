import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

enum ERRORMESSAGE {
  isPasswordWrong,
  isNonExistingEmail,
  isAccountDisabled,
  isError500
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  validateForm!: FormGroup;
  isLoading = false;
  passwordVisible = false;
  attempts = 0;

  errorMessage: ERRORMESSAGE | null | undefined = null;
  get errorMessageEnum() {
    return ERRORMESSAGE;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.compose([Validators.required, Validators.email])]],
      password: [null, [Validators.required]]
    });

    if (this.authService.getUser()) {
      this.router.navigate(['/', 'app', 'meetings']);
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      const value = this.validateForm.value;

      this.authService.signIn(value.email, value.password)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }))
        .subscribe(
          () => {
            this.router.navigate(['/', 'app', 'meetings']);
          },
          (err: { error: { message: string; attempts: number; }; status: number; }) => {
            console.log(err)
            if (err.error.message === 'Password is incorrect') {
              this.errorMessage = ERRORMESSAGE.isPasswordWrong
              this.attempts = 5 - err.error.attempts;
            } else if (err.error.message === 'User does not exist') {
              this.errorMessage = ERRORMESSAGE.isNonExistingEmail
            } else if (err.error.message === 'LOCKED') {
              this.errorMessage = ERRORMESSAGE.isAccountDisabled
            } else if (err.status == 500) {
              this.errorMessage = ERRORMESSAGE.isError500
            }

          }
        );
    } else {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
