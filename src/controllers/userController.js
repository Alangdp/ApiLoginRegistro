import { query } from 'express';
import User from '../schema/userSchema.js';
import DatabaseMongo from '../schema/databaseSchema.js';

import UserModel from '../models/userModel.js';

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

  async firstRegister(req, res) {
    try {
      const userData = req.body;
      userData.dataBase = "Null"
      const userModel = new UserModel(userData, true)
      const newUser = await userModel.registerFirst()

      console.log(newUser, 12312)
      // if (newUser.data === undefined) return res.status(200).json({"status": "error", "error": "Error while creating user!"})

      return res.status(200).json({"status": "ok", "User": newUser.userData, "Database": newUser.databaseData})
    } catch(err) {
      console.log(err)
      return res.status(500).send({'erro': err})
    }

  }

  async register(req, res) {
    try {
      const userData = req.body;

      const userModel = new UserModel(userData, true)
      const user = await userModel.register()
      console.log(user)

      console.log(req.body, 13213123)

      return res.status(200).json({"status": "ok", "User": user.data})
    } catch(err) {
      console.log(err)
      return res.status(500).send({'erro': err})
    }
  }
}

export default new userController();
