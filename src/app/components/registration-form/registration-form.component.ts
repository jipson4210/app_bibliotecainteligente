import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../models/user.model';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, CalendarModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  submitted = false;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {
    this.registrationForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      numeroCelular: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      fechaNacimiento: ['', Validators.required]
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;
    const user: User = this.registrationForm.value;

    this.registrationService.registerUser(user)
      .then((response: any) => {
        this.successMessage = response.message || '¡Registro exitoso! Bienvenido a Biblioteca Inteligente.';
        this.registrationForm.reset();
        this.submitted = false;
        this.loading = false;
      })
      .catch((error: any) => {
        this.errorMessage = error?.error?.message || 'Error al registrar usuario. Intente de nuevo.';
        this.loading = false;
      });
  }

  reset(): void {
    this.registrationForm.reset();
    this.submitted = false;
    this.successMessage = '';
    this.errorMessage = '';
  }

  printForm(): void {
    window.print();
  }
}
