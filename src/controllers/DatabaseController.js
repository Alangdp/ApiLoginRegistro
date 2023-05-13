import Database from '../models/databaseModel.js'

import { compareHash, encrypt } from '../utils/validPassword.js'

class userController {
  async login(req, res) {
    const data = req.body;

    try{
      const DataBase = new Database(data);
      const login = await DataBase.login()
      if(login[0]) return res.status(200).json({status: 'ok', database: login[1]})
      return res.status(401).json({status: 'error', error: 'DBPassword or DBToken invalid'});
    }catch(err) {
      return res.status(401).json({status: 'error', error: err.message});
    }
  }

  async update(req, res) {

  }

  async delete(req, res) {

  }

  async register(req, res) {
    const data = req.body;
    for(let key of ['DBName', 'DBPassword', 'CreateBy']){
      if(!Object.keys(data).includes(key)) {
        return res.status(401).json({status: 'error', error: 'missing one of the fields DBName or DBPassword'})
      }
    }

    try{
      const DataBase = new Database(data)
      const databaseInfo = await DataBase.createDataBase()
      if(databaseInfo.isOk !== true) throw new Error(databaseInfo.data)
      return res.status(200).json({status: 'ok', database: databaseInfo})
    } catch( err ) {
      return res.status(401).json({status: 'error', error: err.message});
    }

  }

}

export default new userController();
