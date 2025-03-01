import {Schema, model} from "mongoose";

const CompaniaSchema = Schema({
    name : {
        type: String,
        required: [true, 'Se necesita el nombre de la empresa!'],
        maxLength: [25, 'No se pueden superar los 25 caracteres.']
    },
    impacto : {
        type: String,
        required: [true, 'Se necesita el nivel de impacto de la empresa!'],
        enum: ['bajo', 'medio', 'alto']
    },
    nivel : {
        type: String,
        required: [true, "Se necesita saber a que escala es la empresa!"],
        enum: ['local', 'mundial']
    },
    año: {
        type: String,
        required: [true, 'Se necesita saber el año en que se creo la empresa!'],
        min: [1980, "La empresa tiene tiempo en la industria"],
        max: [2020, "La empresa comienza en la insdustria"]
    },
    categoira: {
        type: String,
        required: [true, 'Se neecesita la categoria de la empresa!'],
        minLength: 8
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: User,
    }
},
    {
        timestamps: true,
        versionKey: false,
    }
);

UserSchema.methods.toJSON = function() {
    const {__v, password, _id, ...company} = this.toObject();
    company.uid = _id;
    return company;
}

export default model('Compania', CompaniaSchema);