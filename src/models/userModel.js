import bcrypt from 'bcrypt';

import DataBaseSchema from '../schema/databaseSchema.js';
import DataBaseMongo from '../models/databaseModel.js'
import UserSchema from '../schema/userSchema.js';

import { compareHash, encrypt, genToken } from '../utils/validPassword.js';

export default class UserModel {
  constructor(userData = null, first = false) {
    this.userData = userData
    let { type, password} = userData;

    this.userData.password = encrypt(password)
    if (type === undefined || type !== 'user' && type !== 'admin') userData.type = "user";
    if (first) {
      userData.type = "admin"
      this.dataBaseData = {
        'DBName': userData.DBName,
        'DBPassword': userData.DBPassword,
        'CreateBy': null
      }

      this.DataBaseModel = new DataBaseMongo(this.dataBaseData);
    }
  }

  async dataBaseExist(token = null) {
    if(token === null) throw new Error("Invalid DBToken!");

  }

  async registerFirst() {
    try {
      this.userData.dataBase = "null"
      const userData = await UserSchema.create(this.userData);
      const databaseData = (await this.DataBaseModel.createDataBase()).data;

      await UserSchema.findOneAndUpdate({_id: userData._id}, {dataBase: databaseData.DBToken})
      await DataBaseSchema.findOneAndUpdate({token: databaseData.token}, {CreateBy: userData._id})

      databaseData.CreateBy = userData._id
      userData.dataBase = databaseData.DBToken
      return {isOk: true, userData: userData, databaseData: databaseData}
    } catch (err) {
      return {isOk: false, error: err}
    }
  }

  async register() {
    try {
      const userData = await UserSchema.create(this.userData);
      return {isOk: true, data: userData}
    } catch (err) {
      return {isOk: false, error: err}
    }
  }



}
