import { Process,Processor } from '@nestjs/bull';
import {Job} from 'bull';
import { MailerService } from '@nestjs-modules/mailer'

@Processor('mailer')
export class MailerServiceConsumer {
  constructor(private mailService:MailerService){}
  @Process("mail")
  async sendMail(job:Job) {
    console.log("enviando email ...");
    await this.mailService.sendMail({
      from:job.data.email,
      to:"seila@seile.com.br",
      subject:"Parabens pela inscrição ...",
      text: `Olá ${job.data.name} seja bem vindo ao Tubafit...`
    })
  }
}