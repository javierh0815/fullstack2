export interface Producto {
    id: number;
    categoriaId: number;
    nombre: string;
    descripcion: string;
    precio: number;
    precioAnterior?: number;
    imagen: string;
}
