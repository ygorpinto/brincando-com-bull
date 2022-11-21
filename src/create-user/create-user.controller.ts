import { Body, Controller, Post, Version } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer'
import { MailerServiceProducer } from 'src/mailer/mailer-producer.service';

@Controller('createUser')
export class CreateUserController {
  constructor(private mailerProducerService:MailerServiceProducer) {}
  @Version('1')
  @Post('/')
  async createUser(@Body() createUser:CreateUserDTO) {
    this.mailerProducerService.sendMail(createUser);
    return createUser;
  }
}
