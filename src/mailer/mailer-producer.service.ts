import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { CreateUserDTO } from 'src/create-user/dto/create-user.dto';

@Injectable()
export class MailerServiceProducer {
  constructor(@InjectQueue('mailer') private mailerQueue: Queue) {}

  async sendMail(createUser:CreateUserDTO) {
    await this.mailerQueue.add('mail', createUser);
  }
}