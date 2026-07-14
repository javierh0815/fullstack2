export interface Usuario {
    id: number;
    nombre: string,
    username: string,
    email: string,
    password: string,
    confirmPassword?: string,
    fechaNacimiento: string,
    direccion: string
}
