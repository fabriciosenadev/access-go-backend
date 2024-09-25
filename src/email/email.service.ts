import { Injectable } from '@nestjs/common';
import { BodyDto } from './dto/BodyDto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE, // Use o serviço de email desejado (Gmail, Outlook etc.)
          auth: {
            user: process.env.EMAIL_ADDRESS, // Seu email
            pass: process.env.EMAIL_PASS, // Sua senha
          },
        });
      }
 
      async sendEmail(to: string, subject: string, html: string) {
        try {
          await this.transporter.sendMail({
            to,
            subject,
            html,
          });
          console.log('Email enviado com sucesso!');
        } catch (error) {
          console.error('Erro ao enviar email:', error);
        }
      }


    getEmailBody(bodyDto: BodyDto) {
        const html = `
        <h1>Bem-vindo! ${bodyDto.FullName}</h1>
        <p>Aqui está seu convite.</p>
        <p>
            <img src="https://barcodeapi.org/api/auto/${bodyDto.SourceBarcode}" alt="" srcset="">
        </p>
        <p>Obrigado por se registrar.</p>
      `;

      return html;
    }
}
