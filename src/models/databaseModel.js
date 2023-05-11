import DataBaseMongo from '../schema/databaseSchema.js'
import User from '../schema/userModel.js'

import { compareHash, encrypt, genToken } from '../utils/validPassword.js'

export default class Admin {
  constructor(databaseData) {
    this.data = {
      DBName: databaseData.DBName,
      DBPassword: encrypt(databaseData.DBPassword),
      DBToken: genToken(),
      CreateBy: databaseData.CreateBy
    };

    this.isCreate()
  }

  async isCreate() {
    if(await !this.userExist() === true) this.data.CreateBy = '';
  }

  async userExist() {
    try {
      const userExist = await User.findOne({_id: this.data.CreateBy});
      return true;
    } catch (err) {
      return false
    }
  }

  async userHaveDatabase() {
    try {
      const userExist = await DataBaseMongo.findOne({CreateBy: this.data.CreateBy});
      return true;
    } catch (err) {
      return false
    }
  }

  async createDataBase() {
    try{
      if(this.userHaveDatabase) throw new Error('limit has been exceeded')
      const newDatabaseInfo = await DataBaseMongo.create(this.data);
      return {isOk: true, data: newDatabaseInfo};;
    } catch(err) {
      return {isOk: false, data: err};
    }
  }

}
