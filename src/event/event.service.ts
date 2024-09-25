import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    console.log('incluindo convidado no evento!');
    await this.prismaService.event.create({
      data: eventCandidate
    });

    let bodyDto = {
      Email: createEventDto.GuestEmail,
      FullName: createEventDto.GuestFullName,
      SourceBarcode: createEventDto.SourceBarcode
    };
    console.log('Obtendo corpo do e-mail!');
    let emailBody = this.emailService.getEmailBody(bodyDto);
    let subject = "Aqui está seu convite";

    console.log('Enviando e-mail!');
    this.emailService.sendEmail(createEventDto.GuestEmail, subject, emailBody);

    console.log('Convidado incluso no evento!');
  }

  async doCheckIn(sourceBarcode: string) {
    const checkInDate = new Date();

    const event = await this.prismaService.event.findFirst({
      where: { SourceBarcode: sourceBarcode }
    });

    if(!event)
    {
      let failResult = {
        error: "Código não encontrado",
        data: { sourceBarcode }
      }
      throw new HttpException(failResult, HttpStatus.NOT_FOUND);
    }

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

    if(!event)
    {
      let failResult = {
        error: "Código não encontrado",
        data: { sourceBarcode }
      }
      throw new HttpException(failResult, HttpStatus.NOT_FOUND);
    }

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

  findAll() {
    return this.prismaService.event.findMany({
      include: { Guest: true }
    });
  }
}
