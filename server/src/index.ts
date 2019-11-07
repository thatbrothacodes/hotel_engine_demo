import express from 'express';
import bodyParser from 'body-parser';
import controllers from './controllers';
import axios from 'axios';

const app = express();
const router = express.Router();
const port: number = parseInt(process.env.PORT) || 4000;
const environment: string = process.env.NODE_ENV || "development";

axios.defaults.baseURL = "https://api.github.com";
axios.defaults.headers.accept = 'application/vnd.github.mercy-preview+json';

// include error handling
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET");
  console.log(req.method, req.url);
  next();
});

app.use('/', controllers(router));

app.listen(port, () => {
    console.log("environment: " + environment);
    console.log(`App listening on port ${port}`);
});
