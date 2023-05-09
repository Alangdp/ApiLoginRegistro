import { query } from 'express';
import User from '../schema/userModel.js'

import { encrypt } from '../utils/validPassword.js'

class userController {

  async deleteAll(req, res) {
    await User.deleteMany({})
    res.json('ALL DELETED');
  }

  async show(req, res) {
    const id = req.params.id;
    const users = await User.find();
    res.json(users);
  }

  async index(req, res) {
    const users = await User.find();
    res.json(users);
  }

  async register(req, res) {
    try{

      req.body.password = encrypt(req.body.password);
      const user = await User.create(req.body);
      res.status(200).json({status: 'ok', user});

    } catch(err) {
      let errorResponse = {}
      console.log(err)
      for (const field in err.errors) {
        const { message, path, value, code } = err.errors[field].properties;
        errorResponse[field] = { message, label:path, value };
      }

      res.status(500).send({status: 'error', errorResponse, code: err.code});
    }
  }

}

export default new userController();
