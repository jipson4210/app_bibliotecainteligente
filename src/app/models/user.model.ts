export interface User {
  id?: number;
  nombre: string;
  apellido: string;
  correoElectronico: string;
  numeroCelular: string;
  fechaNacimiento: string;
  contrasena?: string;
}
