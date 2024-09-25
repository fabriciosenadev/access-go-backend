import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Put('check-in')
  public doCheckIn(@Body() updateEventDto: UpdateEventDto)
  {
      return this.eventService.doCheckIn(updateEventDto.SourceBarcode);
  }

  @Put('check-out')
  public doCheckOut(@Body() updateEventDto: UpdateEventDto)
  {
      return this.eventService.doCheckOut(updateEventDto.SourceBarcode);
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
