import { Usuarios } from "../entities/usuarios.entity";

export interface LoginResponse {
    usuario: Usuarios;
    token: string;
}