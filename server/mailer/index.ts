import { genCSV } from './genCSV';
import sgTransport from 'nodemailer-sendgrid-transport';
const nodemailer = require('nodemailer');

export type Items = {
  [key: string]: {
    no: string;
    length: string;
  };
};

interface sendEmailProps {
  name: string;
  company: string;
  email: string;
  phone: string;
  ico: string;
  dic: string;
  note: string;
  items: Items;
}

export async function sendEmail(
  { company, dic, email, ico, items, name, note, phone }: sendEmailProps,
  database
) {
  const id = `NAB-${Date.now()}`;
  const { shopItems, shopItemsVariants } = database.val();

  const transporter = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_user: 'pars-shop-2',
        api_key: process.env.SG_TRANSPORT,
      },
    })
  );

  const markupRow = (name, value) => `<p><b>${name}:\u2002</b>\n${value}</p>`;

  const info = await transporter.sendMail(
    {
      from: `"PARS SHOP" <dominik.tomcik@steezy.studio>`,
      to: `dominik.tomcik23@gmail.com`,
      subject: `POPTÁVKA PARS SHOP`,
      html: `
        ${markupRow(`Jméno`, name)}
        ${markupRow(`Firma`, company)}
        ${markupRow(`E-mail`, email)}
        ${markupRow(`Telefon`, phone)}
        ${markupRow(`DIČ`, dic)}
        ${markupRow(`IČO`, ico)}
        ${markupRow(`Poznámka`, note)}
    `,
      attachments: [
        genCSV(
          [
            {
              CISLO_DOKLADU: id,
              DATUM: new Date().toLocaleString(),
              NAZEV: name,
              ADRESA: company,
              ICO: ico,
              DIC: dic,
              TELEFON: phone,
              EMAIL: email,
            },
          ],
          id + '_hlavicka.csv'
        ),
        genCSV(
          Object.keys(items).map((varioId) => {
            const shopItemVariant = shopItemsVariants.data.find(
              (x) => x.varioId === varioId
            );
            return {
              CISLO_DOKLADU: id,
              PRODUKT: shopItems.data.find(
                (x) => x.shopItemId === shopItemVariant.shopItemId
              ).name,
              MNOZSTVI: items[varioId].no,
              JEDNOTKY: items[varioId].length,
              POPIS: shopItemVariant.dimensions,
              KATALOGOVE_CISLO: varioId,
            };
          }),
          id + '_polozky.csv'
        ),
      ],
    },
    (err, info) => {
      console.log(err, info);
    }
  );

  console.log(`message send ${info.messageId}`);
}
