import bcrypt from 'bcrypt';

import DataBaseMongo from '../schema/databaseSchema.js';
import User from '../schema/userModel.js';

import { compareHash, encrypt, genToken } from '../utils/validPassword.js';

export default class Admin {
  constructor(databaseData) {
    let token = databaseData.DBToken;
    let actualPassword = databaseData.DBPassword;
    let newPassword = databaseData.DBNewPassword;
    if(actualPassword === newPassword) newPassword = '';
    // console.log(actualPassword, newPassword, databaseData)
    this.data = {
      DBName: databaseData.DBName,
      DBPassword: encrypt(actualPassword),
      DBPasswordBase: actualPassword,
      DBNewPassword: encrypt(newPassword),
      DBToken: token || genToken(),
      CreateBy: databaseData.CreateBy
    };

  }

  async update() {
    try{
      const login = await this.login();
      if(login.isOk !== true) return {isOk: false, data: 'DB Login invalid'};
      const UpdatedDB = await DataBaseMongo.updateOne({DBToken: this.data.DBToken}, {DBPassword: this.data.DBNewPassword, DBName: this.data.DBName})
      return {isOk: true, data: UpdatedDB};
    }catch(err) {
      console.log(err);
      return {isOk: false, data: err};
    }
  }

  async login() {
    try{
      const DBInfo = await DataBaseMongo.findOne({DBToken: this.data.DBToken})
      const DBPasswordInfo = DBInfo.DBPassword;
      if(bcrypt.compareSync(this.data.DBPasswordBase, DBPasswordInfo)) return {isOk: true, data: DBInfo};
      return {isOk: false, data: DBInfo};
    } catch(err) {
      console.log(err)
      return {isOk: false, data: err};
    }
  }

  async userExist() {
    try {
      const userExist = await User.findById(this.data.CreateBy);
      return [true, userExist];
    } catch (err) {
      return false
    }
  }

  async userHaveDatabase() {
    try {
      const DataBaseExist = await DataBaseMongo.find({CreateBy: this.data.CreateBy});
      if (DataBaseExist.length > 1 ) return true
      return false;;
    } catch (err) {
      return false
    }
  }

  async createDataBase() {
    try{
      const existInDB = await this.userHaveDatabase();
      if(existInDB) throw new Error('limit has been exceeded')
      const newDatabaseInfo = await DataBaseMongo.create(this.data);
      return {isOk: true, data: newDatabaseInfo};;
    } catch(err) {
      return {isOk: false, data: `code:${err.code} ${Object.keys(err.keyValue)}:${err.keyValue.CreateBy}`};
    }
  }

}
