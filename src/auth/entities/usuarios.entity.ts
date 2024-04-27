import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
//las entidades son las tablas en la base de datos
//con el decorador schema, vas a poder grabar asi en la base 

@Schema()
export class Usuarios {

    _id?: string;

    @Prop({ maxlength: 50, required: true })
    nombre: string;

    @Prop({ maxlength: 50 })
    apellido: string;

    //aqui se puede grabar varios roles
    @Prop({ type: [String], default: ['Vendedor'] })
    roles: string[];

    @Prop({ unique: true, required: true })
    correo: string;

    @Prop({ minlength: 8, required: true })
    contrasena?: string;

    //valor que se asigna por defecto
    @Prop({ default: true })
    es_activo: boolean;

}
export const UsuariosSchema = SchemaFactory.createForClass(Usuarios);