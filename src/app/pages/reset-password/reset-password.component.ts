import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  validateForm!: FormGroup;
  isSuccess = false;
  isLoading = false;
  userEmail = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userEmail = this.activatedRoute.snapshot.queryParams.user_email
    this.validateForm = this.fb.group({
      email: [this.userEmail, [Validators.compose([Validators.required, Validators.email])]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      console.log(this.validateForm.value);
      const value = this.validateForm.value;
      this.authService.requestResetPassword(value.email).pipe(
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(() => {
        this.isSuccess = true;
      });
    } else {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
