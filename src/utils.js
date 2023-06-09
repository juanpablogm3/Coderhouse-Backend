// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


/* ************* MULTER****************** */
import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
export default __dirname;
export const uploader = multer({ storage });


/* **************MONGO ATLAS ************** */
// ATLAS user: juanpablogm3 pass: XiCzZNy60lfaLajA
// mongodb+srv://juanpablogm3:XiCzZNy60lfaLajA@jpcluster.4kxbuid.mongodb.net/ecommerce?retryWrites=true&w=majority
import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://juanpablogm3:XiCzZNy60lfaLajA@jpcluster.4kxbuid.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}

/* ***************** bcrypt ************************** */
import bcrypt from 'bcrypt';
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);
