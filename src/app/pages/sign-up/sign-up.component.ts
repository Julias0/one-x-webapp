import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  validateForm!: FormGroup;
  isLoading = false;
  isUserExisting = false;
  isSuccess = false;
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.compose([Validators.required, Validators.email])]],
      password: ['', [Validators.required]],
      // full_name: ['', [Validators.required]],
      // org_name: ['', [Validators.required]]
    });

    if (this.authService.getUser()) {
      this.router.navigate(['/', 'app', 'meetings']);
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      console.log(this.validateForm.value);
      const value = this.validateForm.value;
      this.authService.signUp(value.email, value.password).pipe(
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(
        () => {
          this.isUserExisting = false;
          this.isSuccess = true;
          this.validateForm.reset();
          this.router.navigate(['/', 'app', 'meetings']);
        },
        err => {
          if (err.error.message == 'User already exists') {
            this.isSuccess = false;
            this.isUserExisting = true;
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
