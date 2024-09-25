import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from 'src/db/prisma.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService,
    private readonly emailService: EmailService
  ) {}

  async create(createEventDto: CreateEventDto) {
    const eventCandidate = {
      GuestId: createEventDto.GuestId,
      SourceBarcode: createEventDto.SourceBarcode
    }

    await this.prismaService.event.create({
      data: eventCandidate
    });

    let bodyDto = {
      Email: createEventDto.GuestEmail,
      FullName: createEventDto.GuestFullName,
      SourceBarcode: createEventDto.SourceBarcode
    };

    let emailBody = this.emailService.getEmailBody(bodyDto);
    let subject = "Aqui está seu convite";

    this.emailService.sendEmail(createEventDto.GuestEmail, subject, emailBody);
  }

  async doCheckIn(sourceBarcode: string) {
    const checkInDate = new Date();

    const event = await this.prismaService.event.findFirst({
      where: { SourceBarcode: sourceBarcode }
    });

    event.CheckIn = checkInDate;

    await this.prismaService.event.update({
      where: { Id: event.Id },
      data: event
    });
  }

  async doCheckOut(sourceBarcode: string) {
    const checkOutDate = new Date();

    const event = await this.prismaService.event.findFirst({
      where: { AND: [
          { SourceBarcode: sourceBarcode },
          { CheckIn: { not: null }}
        ] 
      }
    });

    event.CheckOut = checkOutDate;

    await this.prismaService.event.update({
      where: { Id: event.Id },
      data: event
    });
  }

  async getEventByGuestId(guestId: string) {
    var event = await this.prismaService.event.findFirst({
      where: { GuestId: guestId }
    });

    return event;
  }
}
