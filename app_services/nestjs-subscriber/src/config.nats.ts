import { NatsTransportStrategy} from '@alexy4744/nestjs-nats-jetstream-transporter';
import { Options } from '@nestjs/common';

export const natsStreamConfig = {
    strategy: new NatsTransportStrategy({
        connection: {
            servers: 'http://nats.messaging:4222',
            timeout: 1000,
        },
        streams: [
            {
                name: 'stream',
                subjects: [ 'contact-person' ]
            }
        ]
    })
};