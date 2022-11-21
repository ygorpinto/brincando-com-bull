import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user/create-user.controller';
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigModule } from '@nestjs/config'
import { BullModule } from '@nestjs/bull';
import { MailerServiceProducer } from './mailer/mailer-producer.service';
import { MailerServiceConsumer } from './mailer/mailer-consumer.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'mailer',
    }),
    MailerModule.forRoot({  
      transport: {
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    },})
  ],
  controllers: [CreateUserController],
  providers: [MailerServiceProducer, MailerServiceConsumer],
})
export class AppModule {}
