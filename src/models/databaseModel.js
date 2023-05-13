import bcrypt from 'bcrypt';

import DataBaseMongo from '../schema/databaseSchema.js';
import User from '../schema/userModel.js';

import { compareHash, encrypt, genToken } from '../utils/validPassword.js';

export default class Admin {
  constructor(databaseData) {
    let token = databaseData.DBToken
    this.data = {
      DBName: databaseData.DBName,
      DBPassword: encrypt(databaseData.DBPassword),
      DBPasswordBase: databaseData.DBPassword,
      DBToken: token || genToken(),
      CreateBy: databaseData.CreateBy
    };

  }

  async login() {
    try{
      const DBInfo = await DataBaseMongo.findOne({DBToken: this.data.DBToken})
      const DBPasswordInfo = DBInfo.DBPassword;
      if(bcrypt.compareSync(this.data.DBPasswordBase, DBPasswordInfo)) return [true, DBInfo]
      return [false, DBInfo]
    } catch(err) {

      return [false, err];
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
      if (DataBaseExist.length > 1 ) return false
      return true;
    } catch (err) {
      return false
    }
  }

  async createDataBase() {
    try{
      if(this.userHaveDatabase()) throw new Error('limit has been exceeded')
      const newDatabaseInfo = await DataBaseMongo.create(this.data);
      return {isOk: true, data: newDatabaseInfo};;
    } catch(err) {
      return {isOk: false, data: err};
    }
  }

}
