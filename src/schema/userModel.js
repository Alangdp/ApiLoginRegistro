import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: 'string',
      required: 'Name is required!'
    },

    email: {
      type: 'string',
      required: 'Email is required!',
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email!'],
    },

    password: {
      type: 'string',
      required: true,
      trim: true,
      minlength:5
    },

    cpf: {
      type: 'string',
      required: false,
      trim: true,
      unique: true,
      match: [/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/, 'Invalid CPF!'],
    },

    endereco: {
      type: 'string',
      required: false,
      trim: true,
      default: ''
    },

    telefone: {
      type: 'string',
      required: false,
      trim: true,
      match: [/^[1-9]{2}[0-9]{4,5}-?[0-9]{4}$/, 'Invalid Number Phone'],
      default: ''
    },

    bornDate: {
      type: Date,
      required: false,
      default: ''
    },

    genero: {
      type: 'string',
      trim: true,
      required: false,
      default: ''
    },

    type: {
      type: 'string',
      trim: true,
      required: true,
    },

    dataBase: {
      type: 'string',
      trim: true,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)

export default User
