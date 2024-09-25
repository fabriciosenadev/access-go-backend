import { Injectable } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { PrismaService } from 'src/db/prisma.service';
import { EventService } from 'src/event/event.service';
import { CreateEventDto } from 'src/event/dto/create-event.dto';

@Injectable()
export class GuestService {
  constructor(private readonly prismaService: PrismaService,
    private readonly eventService: EventService
  ) { }

  async create(createGuestDto: CreateGuestDto) {
    let newGuest = await this.prismaService.guest.create({
      data: createGuestDto,
    });

    var eventDto = new CreateEventDto();
    eventDto.GuestId = newGuest.Id;
    eventDto.GuestEmail = newGuest.Email;
    eventDto.SourceBarcode = newGuest.PhoneNumber;
    eventDto.GuestFullName = newGuest.FullName;

    await this.eventService.create(eventDto);
    
    return newGuest;
  }

  findAll() {
    return this.prismaService.guest.findMany();
  }
}
