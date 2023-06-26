import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import dataBaseModel from '../models/databaseModel.js'

const secret = process.env.TOKEN_SECRET;

class userController {
  async register(req, res) {
    try {
      const { DBPassword, DBToken } = req.body;
      if(!DBPassword || !DBToken) return res.status(401).json({stauts: 'error', error: 'Invalid data'})

      const userDataBase = new dataBaseModel({DBPassword, DBToken});

      const login = await userDataBase.login();
      const { CreateBy } = login.data;
      const { isOK } = login;

      const token = jwt.sign({ CreateBy }, secret, { expiresIn: '9999 years' });

      return res.status(200).json({ token });
    } catch(err) {
      res.status(500).json({status: 'error', error: err})
    }
  }
}

export default new userController();


// const data = req.body;
// const userDataBase = new dataBaseModel(data);
// const login = await userDataBase.login();
// console.log(login.data.CreateBy)
// if(!login.isOk === true) return res.status(401).json({status: 'Error', error: 'Invalid login'});
// var id = login.data.CreateBy;
// const token = jwt.sign({ id }, secret , {
//   expiresIn: 300
// });
// return res.status(200).json({token});
