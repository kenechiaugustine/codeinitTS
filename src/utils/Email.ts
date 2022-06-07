
// @ts-ignore
import nodemailer from 'nodemailer'

export class Email {

    // @ts-ignore
    constructor(obj, url) {
        // @ts-ignore
        this.to = obj.email;
        // @ts-ignore
        this.firstName = obj.firstName
        // @ts-ignore
        this.url = url;
        // @ts-ignore
        this.from = process.env.MAIL_FROM;
    }


    private newTransport() {
        return nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            maxMessages: Infinity,
            debug: true,
            secure: true,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    // @ts-ignore
    async send(template, subject) {

        //
        const mailOptions = {
            // @ts-ignore
            from: this.from,
            // @ts-ignore
            to: this.to,
            subject,
            text: "Simple Email Message..."
            // html,
        }

        // @ts-ignore
        await this.newTransport().sendMail(mailOptions, (err, info) => {
            if(err){
                //
            }
        })

    }



}