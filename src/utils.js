// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import { connect } from "mongoose";
import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import CustomError from "./errors/custom-error.js";
import EErros from "./errors/enums.js";
import winston from 'winston';


export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


/* ************* MULTER****************** */
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
export async function connectMongo() {
  try {
    logger.error("Connecting to the MongoDB...");
    await connect(
      `mongodb+srv://${process.env.mongo_user}:${process.env.mongo_pass}@jpcluster.4kxbuid.mongodb.net/ecommerce?retryWrites=true&w=majority`
      );
      logger.error("plug to mongo!");
    } catch (error) {
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

/* ****************  LOGGER  ********************** */

const logLevels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
};

const logColors = {
  fatal: 'red',
  error: 'red',
  warning: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'gray',
};

winston.addColors(logColors);

const getLogger = () => {
  if (process.env.enviroment === 'DEVELOPMENT') {
    return winston.createLogger({
      levels: logLevels,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
        ),
        transports: [
          new winston.transports.Console()
        ],
        level: 'debug'
      });
    } else {
    return winston.createLogger({
      levels: logLevels,
      transports: [
        new winston.transports.File({ filename: 'errors.log', level: 'error' })
      ],
      level: 'info'
    });
  }
};

const logger = getLogger(); // Llama a la función para obtener el logger correcto

export { logger };
