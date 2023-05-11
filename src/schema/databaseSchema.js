import mongoose from "mongoose";

const dataBaseSchema = mongoose.Schema(
  {
    DBName: {
      type: 'string',
      required: 'DBName is required!',
      minlength: [4, 'Min DBName length is 3!']
    },

    DBToken: {
      type: 'string',
      required: 'DBName is required!',
      minlength: [4, 'Min DBName length is 3!'],
      unique: true
    },

    DBPassword: {
      type: 'string',
      required: 'DBPassword is required!',
      trim: true,
      minlength:5
    },

    CreateBy: {
      type: 'string',
      required: 'CreateBy is required!',
      trim: true,
      minlength: 24,
      maxlength: 24,
      unique: true
    }

  }
  ,{
    timestamps: true
  }
)

const dataBase = mongoose.model('dataBase', dataBaseSchema)

export default dataBase
