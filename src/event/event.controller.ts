import { Controller, Get, Param, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Put('check-in/:sourceBarcode')
  public doCheckIn(@Param(':sourceBarcode') sourceBarcode: string)
  {
      return this.eventService.doCheckIn(sourceBarcode);
  }

  @Put('check-out/:sourceBarcode')
  public doCheckOut(@Param(':sourceBarcode') sourceBarcode: string)
  {
      return this.eventService.doCheckOut(sourceBarcode);
  }

  @Get(':guestId')
  public getEventByUserId(@Param('guestId') guestId: string) 
  {
    return this.eventService.getEventByGuestId(guestId);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }
}
