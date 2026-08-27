import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { CompanyDto } from '../companies/schemas/company.schema';
import 'dotenv/config';

@Injectable()
export class EmailSerivce {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail(payload: CompanyDto): Promise<void> {
    try {
      const { name, cnpj, fantasyName, address, createdAt } = payload;

      const { error } = await this.resend.emails.send({
        from: process.env.EMAIL_FROM || '',
        to: process.env.EMAIL_TO?.split(',') || [],
        subject: 'Empresa Cadastrada',
        html: `
        <p>Nome: ${name}<p>
        <p>CNPJ: ${cnpj}<p>
        <p>Nome Fantasia: ${fantasyName}<p>
        <p>Endereço: ${address}<p>
        <p>Criado em: ${createdAt.toLocaleDateString()}<p>
        `,
      });

      if (error) {
        console.error('Erro ao enviar email.', error);
      }
    } catch (error) {
      console.error('Erro ao enviar email.', error);
    }
  }
}
