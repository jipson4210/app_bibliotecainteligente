import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string): Promise<any> {
    return firstValueFrom(
      this.http.post(`${this.apiUrl}/login`, {
        correoElectronico: email,
        contrasena: password
      })
    );
  }

  registerUser(user: User): Promise<any> {
    return firstValueFrom(
      this.http.post(`${this.apiUrl}/register`, user)
    );
  }

  getAllUsers(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.apiUrl}`));
  }

  getUsers(): Promise<any> {
    return this.getAllUsers().then(response => {
      if (response && response.users && Array.isArray(response.users)) {
        return response.users;
      }
      return response;
    });
  }

  getUserById(id: number): Promise<any> {
    return firstValueFrom(this.http.get(`${this.apiUrl}/${id}`));
  }

  updateUser(id: number, user: User): Promise<any> {
    return firstValueFrom(
      this.http.put(`${this.apiUrl}/${id}`, user)
    );
  }

  deleteUser(id: number): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
  }

  checkEmailAvailability(email: string, excludeId?: number): Promise<any> {
    let url = `${this.apiUrl}/check/email?email=${email}`;
    if (excludeId) {
      url += `&excludeId=${excludeId}`;
    }
    return firstValueFrom(this.http.get(url));
  }
}


