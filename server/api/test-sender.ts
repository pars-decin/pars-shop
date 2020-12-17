import allowCors from '../helpers/allowCors';
import nodemailer from 'nodemailer';

const wedosSettings = {
  host: 'smtp-197158.m58.wedos.net',
  port: 587,
  secure: false,
  auth: {
    user: 'dominik@tomczik.cz',
    pass: 'Fa2f7wi9-',
  },
};
const parsSettings = {
  host: 'mail2.parsdecin.cz',
  port: 587,
  secure: false,
  auth: {
    user: 'kopirka@parsdecin.local',
    pass: 'ParsDecin01',
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
};

const message = {
  from: 'kopirka@parsdecin.cz',
  to: `pars@abc.cz`,
  subject: `New message`,
  text: 'Lorem ipsum',
};

const transporter = nodemailer.createTransport(parsSettings);

const mailer = (message) => {
  return new Promise((res, rej) =>
    transporter.sendMail(message, (err, info) =>
      err ? rej({ err }) : res({ info })
    )
  );
};

const testSender = async (req, res, next) => {
  try {
    const mailRes = await mailer(message);
    res.json(mailRes);
  } catch (e) {
    res.json(e);
  }
};

module.exports = allowCors(testSender);
