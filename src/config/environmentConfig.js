import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();
program.option('--mode <mode>', 'Modo de trabajo', 'DEVELOPMENT');
program.parse();

dotenv.config({
  path: program.opts().mode === 'DEVELOPMENT' ? './.development.env' : './.production.env',
});

const config = {
  // ENVIRONMENT
  environment: process.env.environment,

  // MONGO
  mongo_user: process.env.mongo_user,
  mongo_pass: process.env.mongo_pass,
  mongo_string: process.env.mongo_string,

  // PASSPORT
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL
};
  
export default config;
