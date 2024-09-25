import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { DbModule } from 'src/db/db.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [DbModule, EmailModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService]
})
export class EventModule {}
