import { query } from 'express';
import User from '../schema/userModel.js'

import { encrypt } from '../utils/validPassword.js'

class userController {

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    console.log(data)
    try{
      const updatedUser = await User.updateOne({_id: id}, data, {new:true})
      res.status(200).json({status: 'ok', user: updatedUser})
    } catch(err) {
      console.log(err)
      res.status(400).json({status: 'error', error: err});
    }
  }

  async delete(req, res) {
    const {dataBaseName, id} = req.params;
    try{
      const deletedUser = await User.deleteOne({dataBase: dataBaseName, _id: id});
      if (deletedUser.deletedCount === 0) res.status(200).json({status: 'error', error: 'Not Found Id or dataBaseId'});
      res.status(200).json({status: 'ok', user: deletedUser});
    } catch (err) {
      res.status(400).json({status: 'error', error: err});
    }
  }

  async show(req, res) {
    const {dataBaseName, id} = req.params;
    const users = await User.find({dataBase: dataBaseName, _id: id});
    if(users.length === 0) res.status(404).json({status: 'error', error:'Not Found'});
    res.status(200).json(users);
  }

  async index(req, res) {
    const { dataBaseName } = req.params;
    const users = await User.find({dataBase: dataBaseName});
    if(users.length === 0) res.status(404).json({status: 'error', error:'Not Found'});
    res.json(users);
  }

  async register(req, res) {
    try{

      req.body.password = encrypt(req.body.password);
      const user = await User.create(req.body);
      res.status(200).json({status: 'ok', user});

    } catch(err) {
      let errorResponse = {}
      for (const field in err.errors) {
        const { message, path, value, code } = err.errors[field].properties;
        errorResponse[field] = { message, label:path, value };
      }

      res.status(500).send({status: 'error', errorResponse, code: err.code,keyValue: err.keyValue});
    }
  }

}

export default new userController();
