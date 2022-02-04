import { NatsClient, NatsContext } from '@alexy4744/nestjs-nats-jetstream-transporter';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx } from '@nestjs/microservices';
import { DatasService } from './datas.service';

@Controller('datas')
export class DatasController {
    private natsClient = new NatsClient();

    constructor(private datasService: DatasService) {}

    @EventPattern('contact-person')
    public subscribeMessage(@Payload() data: Array<number>, @Ctx() context: NatsContext): void {
        console.log(`Subscribed message subject: ${context.getSubject()}`);
        this.datasService.deserialize(data);
    }
}
