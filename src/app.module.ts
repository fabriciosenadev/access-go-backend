import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { DbModule } from './db/db.module';
import { GuestModule } from './guest/guest.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    EventModule, 
    DbModule, 
    GuestModule, 
    EmailModule
  ],
})
export class AppModule {}
