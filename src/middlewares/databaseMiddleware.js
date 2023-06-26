import DataBaseMongo from '../models/databaseModel.js'
// import User from '../schema/userModel.js';

export default async (req, res, next) => {
  const { DBToken, DBPassword} = req.body;
  const Database = new DataBaseMongo({DBToken, DBPassword});
  const login = await Database.login();

  if (!login.isOk === true) return res.status(401).json({status: 'ok', error: 'Invalid Login'});
  req.body.dataBase = login.data.DBToken;
  next();
};
