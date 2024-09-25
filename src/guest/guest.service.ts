import { Injectable } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { PrismaService } from 'src/db/prisma.service';
import { EventService } from 'src/event/event.service';

@Injectable()
export class GuestService {
  constructor(private readonly prismaService: PrismaService,
    private readonly eventService: EventService
  ) { }

  async create(createGuestDto: CreateGuestDto) {

    let guest = await this.prismaService.guest.findFirst({
      where: { Email: createGuestDto.Email }
    });

    if(guest)
    {
      let failResult = {
        error: "Convidado já existe",
        guestData: createGuestDto
      };

      return failResult;
    }

    let newGuest = await this.prismaService.guest.create({
      data: createGuestDto,
    });

    var eventDto = {
      GuestId: newGuest.Id,
      GuestEmail: newGuest.Email,
      SourceBarcode: newGuest.PhoneNumber,
      GuestFullName: newGuest.FullName
    };

    await this.eventService.create(eventDto);
    
    return newGuest;
  }

  findAll() {
    return this.prismaService.guest.findMany();
  }
}
