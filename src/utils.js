// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';


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
import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      `mongodb+srv://${process.env.mongo_user}:${process.env.mongo_pass}@jpcluster.4kxbuid.mongodb.net/ecommerce?retryWrites=true&w=majority`
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

/* *****************  FAKER *************************** */
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export function generateFakerProducts() {
  let fakerProducts = [];
  for (let i=0;i<20;i++){
    const fakerProduct={
      id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 100, max: 1000 }),
      thumbnail: faker.image.url(),
      code: uuidv4(),
      stock: faker.number.int({ min: 10, max: 100 }),
      category: faker.helpers.arrayElements(['cats', 'dogs']),
      status: true
    }
    fakerProducts.push(fakerProduct);
  }
  return fakerProducts;
}
