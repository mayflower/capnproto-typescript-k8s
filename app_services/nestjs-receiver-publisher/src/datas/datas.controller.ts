import { NatsClient } from '@alexy4744/nestjs-nats-jetstream-transporter';
import { Controller, Post, Body, Param } from '@nestjs/common';
import { DatasService } from './datas.service';

interface DudeNumberArray {
    dude: Array<number>
}

interface DudeTypedArray {
    dude: Uint8Array;
}

@Controller('datas')
export class DatasController {

    private readonly natsClient = new NatsClient(
        {connection: {
            servers: ['nats://nats.messaging:4222']
        }}
    );

    constructor(
        private datasService: DatasService) {}


    @Post()
    public create(): void {
        this.publishMessage();
    }


    public publishMessage(): void {
        this.natsClient.emit("contact-person", [].slice.call(this.datasService.createPayload()));
    }

    @Post('number')
    public createMessageFromNumberArray(@Body() messageValues: DudeNumberArray): void {        
        this.datasService.deserializeNumberArray(messageValues.dude);
        this.publish(messageValues.dude);
    }

    @Post('typed')
    public createMessageFromTypedArray(@Body() messageValues: DudeTypedArray): void {        
        console.log("Values");
        console.log(messageValues);
        this.datasService.deserializeTypedArray(messageValues.dude);
        this.publish(messageValues.dude);
        
    }

    private publish(data: Array<number> | Uint8Array): void {
        this.natsClient.emit("contact-person",  [].slice.call(data));
    }
}
