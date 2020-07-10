import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import addCategoriesToShopItems from './helpers/addCategoriesToShopItems';
import convertLevelsToArray from './helpers/convertLevelsToArray';
import makeTreeFromCategories from './helpers/makeTreeFromCategories';

import { database } from './config';
import { sendEmail } from './mailer';

const app = express();
const port = 9999;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function withDatabase(req, res, next) {
  try {
    req.body.database = await database.ref().once('value');
  } catch (e) {
    const error = new Error(`Failed to fetch data`);
    res.json(error);
  }
  next();
}

app.post('/send', withDatabase, (req, res) => {
  sendEmail(req.body.values, req.body.database).catch(console.error);
  res.end();
});

app.get('/api', withDatabase, async (req, res) => {
  // const data = await database.ref().once('value');
  const db = req.body.database.val();
  const categories = convertLevelsToArray(db.categories.data);
  const categoriesTree = makeTreeFromCategories(categories);
  const shopItems = addCategoriesToShopItems(db.shopItems.data, categories);
  const shopItemsVariants = db.shopItemsVariants.data;
  res.json({
    categories,
    categoriesTree,
    shopItems,
    shopItemsVariants,
  });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server is listening on port: ${port}`);
});
