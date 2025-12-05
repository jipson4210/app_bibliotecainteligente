import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../models/user.model';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, FormsModule, PaginatorModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  searchTerm = '';
  
  // Paginación
  currentPage = 0;
  itemsPerPage = 10;
  totalRecords = 0;
  paginatedUsers: User[] = [];

  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.registrationService.getUsers()
      .then((response: any) => {
        // Maneja tanto array directo como objeto con users
        this.users = Array.isArray(response) ? response : (response.data || response.users || response);
        this.filteredUsers = this.users;
        this.totalRecords = this.users.length;
        this.updatePaginatedUsers();
        this.loading = false;
        this.successMessage = `Se cargaron ${this.users.length} usuarios correctamente.`;
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      })
      .catch((error: any) => {
        this.errorMessage = error?.error?.message || 'Error al cargar usuarios. Intente de nuevo.';
        this.loading = false;
      });
  }

  searchUsers(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = this.users;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(user =>
        user.nombre?.toLowerCase().includes(term) ||
        user.apellido?.toLowerCase().includes(term) ||
        user.correoElectronico?.toLowerCase().includes(term) ||
        user.numeroCelular?.includes(term)
      );
    }
    this.totalRecords = this.filteredUsers.length;
    this.currentPage = 0;
    this.updatePaginatedUsers();
  }

  onPageChange(event: any): void {
    this.currentPage = event.page;
    this.updatePaginatedUsers();
  }

  private updatePaginatedUsers(): void {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  deleteUser(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      this.registrationService.deleteUser(id)
        .then(() => {
          this.users = this.users.filter(user => user.id !== id);
          this.filteredUsers = this.filteredUsers.filter(user => user.id !== id);
          this.totalRecords = this.filteredUsers.length;
          this.updatePaginatedUsers();
          this.successMessage = 'Usuario eliminado correctamente.';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        })
        .catch((error: any) => {
          this.errorMessage = error?.error?.message || 'Error al eliminar usuario.';
        });
    }
  }

  exportToCSV(): void {
    if (this.filteredUsers.length === 0) {
      this.errorMessage = 'No hay usuarios para exportar.';
      return;
    }

    const headers = ['ID', 'Nombre', 'Apellido', 'Correo', 'Celular', 'Fecha de Nacimiento'];
    const rows = this.filteredUsers.map(user => [
      user.id || '',
      user.nombre || '',
      user.apellido || '',
      user.correoElectronico || '',
      user.numeroCelular || '',
      user.fechaNacimiento ? new Date(user.fechaNacimiento).toLocaleDateString('es-ES') : ''
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    csvContent += rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `usuarios_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.successMessage = 'Usuarios exportados correctamente.';
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchUsers();
  }

  refreshUsers(): void {
    this.loadUsers();
  }

  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
}
