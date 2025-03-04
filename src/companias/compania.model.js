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
        año: {
            type: Number, 
            required: [true, 'Se necesita saber cuanto tiempo lleva en la industria!'],
        },
        categoria: { 
            type: String,
            required: [true, 'Se necesita la categoría de la empresa!'],
            minLength: 8,
        },
        status: {
            type: Boolean,
            default: true
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