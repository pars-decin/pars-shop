import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import addCategoriesToShopItems from './helpers/addCategoriesToShopItems';
import convertLevelsToArray from './helpers/convertLevelsToArray';
import makeTreeFromCategories from './helpers/makeTreeFromCategories';

import { database } from './config';
import { ResponseError } from './types/responseError';
import pug from 'pug';
import { sendEmail } from './helpers/sendEmail';
import { genCSV } from './mailer/genCSV';

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

app.post(`/api/send-demand`, async (req, res, next) => {
  if (!req.body.values) return next(new Error('No values provided'));

  const {
    company,
    dic,
    email,
    ico,
    items,
    name,
    note,
    phone,
  } = req.body.values;

  const paragon_id = `NAB-${Date.now()}`;
  const stringTemplate = pug.renderFile(`templates/order.pug`, {
    name,
    company,
    phone,
    email,
    note,
    dic,
    ico,
  });

  try {
    await sendEmail({
      to: [`dominik.tomcik23@gmail.com`],
      subject: `Nová objednávka z PARS Shop`,
      html: stringTemplate,
      attachments: [
        genCSV(
          [
            {
              CISLO_DOKLADU: paragon_id,
              DATUM: new Date().toLocaleString(`cs-cz`, {
                day: `numeric`,
                month: `numeric`,
                year: `numeric`,
              }),
              NAZEV: name,
              ADRESA: company,
              ICO: ico,
              DIC: dic,
              TELEFON: phone,
              EMAIL: email,
            },
          ],
          `_hlavicka.csv`
        ),
        genCSV(
          items.map(({ varioId, dimensions, no, unit }) => ({
            CISLO_DOKLADU: paragon_id,
            PRODUKT: varioId,
            MNOZSTVI: no,
            ROZMER: dimensions,
            JEDNOTKY: unit,
          })),
          `_polozky.csv`
        ),
      ],
    });
    res.json({ status: 200 });
  } catch (err) {
    console.log(err.response.body);
    next(err);
  }
});

app.get('/api', withDatabase, async (req, res) => {
  const db = req.body.database.val();
  const categories = convertLevelsToArray(db.categories.data);

  const categoriesByMaterial = makeTreeFromCategories(
    categories,
    1,
    `byMaterial`
  );
  const categoriesByProffesion = makeTreeFromCategories(
    categories,
    0,
    `byProffesion`
  );

  const categoriesTree = { categoriesByMaterial, categoriesByProffesion };

  const shopItems = addCategoriesToShopItems(db.shopItems.data, categories);
  const shopItemsVariants = db.shopItemsVariants.data;

  res.json({
    categories,
    categoriesTree,
    shopItems,
    shopItemsVariants,
  });
});

app.use(`*`, (req, res, next) => {
  const error: ResponseError = new Error(`Not found`);
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500);
  console.log(error);
  res.send(error.message || `Server error.`);
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server is listening on port: ${port}`);
});
