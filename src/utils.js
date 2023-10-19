// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import { connect } from "mongoose";
import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from 'path';
import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import CustomError from "./errors/custom-error.js";
import EErros from "./errors/enums.js";
import { logger }  from "./logger.js";


export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename).replace(/\/[^/]*$/,'/');
export const __dirnameBase = dirname(__filename).replace(/\/[^/]*$/,'/');

export default __dirnameBase;



/* ************* MULTER****************** */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,'/public'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
export const uploader = multer({ storage });


/* **************MONGO ATLAS ************** */
export async function connectMongo() {
  try {
    logger.info("Server mode ---> "+ process.env.environment);
    logger.info("Connecting to the MongoDB...");
    await connect(
      `${process.env.mongo_string}`
      );
      logger.info("Succesfully connected to MongoDB!");
    } catch (error) {
      logger.error("Connection to database error");
        CustomError.createError({
          name: "Connection to database error",
          cause: "The connection to the database has failed",
          message: "Error de conexión a MongoDB",
          code: EErros.MONGO_CONNECT_FAIL,
      })
    }
  }
  
  /* ***************** bcrypt ************************** */
  export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);
  
/* *****************  FAKER *************************** */

export function generateFakerProducts() {
  let fakerProducts = [];
  for (let i=0;i<100;i++){
    const fakerProduct={
      id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 100, max: 1000 }),
      thumbnail: faker.image.url(),
      code: uuidv4(),
      stock: faker.number.int({ min: 10, max: 100 }),
      category: faker.helpers.arrayElement(['cats', 'dogs']),
      status: true
    }
    fakerProducts.push(fakerProduct);
  }
  return fakerProducts;
}

