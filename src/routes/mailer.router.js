import express from 'express';
import nodemailer from 'nodemailer';
import 'dotenv/config';

export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: `${process.env.mailer_email}`,
        pass: `${process.env.mailer_pass}`
    },
    tls: {
        rejectUnauthorized: false
    }
})

export const mailerRouter = express.Router();

mailerRouter.get('/', async(req, res)=>{
    let sendMail = await transport.sendMail({
        from: `${process.env.mailer_email}`,
        to: 'juanpablogm3@hotmail.com',
        subject: 'Usuario ELIMINADO',
        html:`
            <h1>ESTEO ES UNA PRUEBA DE MAILER</h1>
        `,
        attachments:[]
    })
});


