import nodemailer from 'nodemailer';
import AppError from '../errors/AppError';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import htmlToText from 'html-to-text';

export class Email {
  // @ts-ignore
  constructor(obj, url) {
    // @ts-ignore
    this.to = obj.email;
    // @ts-ignore
    this.firstName = obj.firstName;
    // @ts-ignore
    this.url = url;
    // @ts-ignore
    this.from = process.env.MAIL_FROM;
  }

  private newTransport() {
    return nodemailer.createTransport({
      // @ts-ignore
      // service: process.env.SMTP_SERVICE,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      maxMessages: Infinity,
      debug: true,
      // secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // @ts-ignore
  async send(hbs_template, subject) {
    const source = fs.readFileSync(
      path.join(__dirname, `./email/${hbs_template}.hbs`),
      'utf8'
    );
    const template = Handlebars.compile(source);
    const htmlTemplate = template({
      // @ts-ignore
      firstName: this.firstName,
      // @ts-ignore
      url: this.url,
    });
    const mailOptions = {
      // @ts-ignore
      from: this.from,
      // @ts-ignore
      to: this.to,
      subject: subject,
      html: htmlTemplate,
      // @ts-ignore
      text: htmlToText.fromString(htmlTemplate),
    };
    // @ts-ignore
    await this.newTransport().sendMail(mailOptions, (err, info) => {
      if (err) {
        // Return an Error If Error Occurs
        console.log(err);
        throw new AppError('Email encountered some problems', 400);
      }
    });
  }
}
