import { NatsClient } from '@alexy4744/nestjs-nats-jetstream-transporter';
import { Controller, Post } from '@nestjs/common';
import { DatasService } from './datas.service';

@Controller('datas')
export class DatasController {

    private natsClient = new NatsClient();

    constructor(
        private datasService: DatasService) {}


    @Post()
    public create(): void {
        this.publishMessage();
    }


    public publishMessage(): void {
        this.natsClient.emit("contact-person", [].slice.call(this.datasService.createPayload()));
    }
}
