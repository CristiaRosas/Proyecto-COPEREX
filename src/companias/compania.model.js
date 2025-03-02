import { Schema, model } from "mongoose";

const CompaniaSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Se necesita el nombre de la empresa!'],
            maxLength: [25, 'No se pueden superar los 25 caracteres.'],
        },
        impacto: {
            type: String,
            required: [true, 'Se necesita el nivel de impacto de la empresa!'],
            enum: ['bajo', 'medio', 'alto'],
        },
        nivel: {
            type: String,
            required: [true, "Se necesita saber a que escala es la empresa!"],
            enum: ['local', 'mundial'],
        },
        año: {
            type: Number, // Corregido a Number
            required: [true, 'Se necesita saber cuanto tiempo lleva en la industria!'],
            min: [1900, "El año debe ser mayor o igual a 1900"], // Rango de años válido
            max: [new Date().getFullYear(), "El año no puede ser mayor al año actual"], // Rango de años válido
        },
        categoria: { // Corregido el nombre del campo
            type: String,
            required: [true, 'Se necesita la categoría de la empresa!'],
            minLength: 8,
        },
        admin: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

CompaniaSchema.methods.toJSON = function () {
    const { __v, password, _id, ...company } = this.toObject();
    company.uid = _id;
    return company;
};

export default model('Compania', CompaniaSchema);