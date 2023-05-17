import { query } from 'express';
import User from '../schema/userModel.js'

import { compareHash, encrypt } from '../utils/validPassword.js'

class userController {
  async login(req, res) {
    const { email, password, DBToken } = req.body;
    console.log(req.body)
    try {
      const user = await User.findOne({email: email, dataBase: DBToken})
      if(!compareHash(password, user.password)) return res.status(400).json({status: 'error', error: "Incorrect Password or Email", login: false});
      const userLogged = await User.findOne({email: email, password: user.password})
      return res.status(200).json({status: 'ok', user: userLogged, login: true})
    } catch(err) {
      return res.status(400).json({status: 'error', error: err, login: false});
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      const updatedUser = await User.updateOne({_id: id, dataBase: data.DBToken}, data, {new:true})
      return res.status(200).json({status: 'ok', user: updatedUser})
    } catch(err) {
      return res.status(400).json({status: 'error', error: err});
    }
  }

  async delete(req, res) {
    const { DBToken } = req.body;
    const { id } = req.params;

    try {
      const deletedUser = await User.deleteOne({dataBase: DBToken, _id: id});
      if (deletedUser.deletedCount === 0) return res.status(200).json({status: 'error', error: 'Not Found Id or dataBaseId'});
      return res.status(200).json({status: 'ok', user: deletedUser});
    } catch (err) {
      return res.status(400).json({status: 'error', error: err});
    }
  }

  async show(req, res) {
    try {
      const { DBToken } = req.body;
      const { id } = req.params;

      const users = await User.find({dataBase: DBToken, _id: id});
      if(users.length === 0) return res.status(404).json({status: 'error', error:'Not Found'});
      return res.status(200).json(users);
    } catch(err) {
      return res.status(200).json({status: 'error', error: err});
    }
  }

  async index(req, res) {
    try {
      const { DBToken } = req.body;
      const users = await User.find({dataBase: DBToken});

      if(users.length === 0) return res.status(404).json({status: 'error', error:'Not Found'});
      return res.status(200).json(users);
    } catch(err) {
      return res.status(200).json({status: 'error', error: err});
    }
  }

  async register(req, res) {
    try {

      req.body.password = encrypt(req.body.password);
      req.body.dataBase = req.body.DBToken;

      const user = await User.create(req.body);
      return res.status(200).json({status: 'ok', user});

    } catch(err) {
      let errorResponse = {}
      for (const field in err.errors) {
        const { message, path, value, code } = err.errors[field].properties;
        errorResponse[field] = { message, label:path, value };
      }

      return res.status(500).send({status: 'error', errorResponse, code: err.code,keyValue: err.keyValue});
    }
  }

}

export default new userController();
