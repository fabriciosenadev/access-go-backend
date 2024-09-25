import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { EventModule } from 'src/event/event.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [EventModule, DbModule],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule {}
