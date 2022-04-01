import { NatsClient } from '@alexy4744/nestjs-nats-jetstream-transporter';
import { Controller, Post, Body, Param } from '@nestjs/common';
import { DatasService } from './datas.service';

interface AnotherDude {
    dude: Array<number>
}

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

    @Post('dude')
    public createMessage(@Body() messageValues: AnotherDude): void {        
        this.datasService.deserialize(messageValues.dude);
        this.natsClient.emit("contact-person", messageValues.dude);
    }
}
