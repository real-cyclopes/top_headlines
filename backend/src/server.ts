import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from './utils/validateEnv';
import RecommendController from "./controllers/recommend.controller";

validateEnv();

const app = new App(
  [
    new RecommendController()
  ],
);

app.listen();