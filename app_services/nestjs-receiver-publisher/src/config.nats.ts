import { NatsTransportStrategy} from '@alexy4744/nestjs-nats-jetstream-transporter';

export const natsStreamConfig = {
    strategy: new NatsTransportStrategy({
        connection: {
          //servers: 'http://nats.messaging:4222', set in controller
          timeout: 1000
        },
        streams: [
            {
                name: 'stream',
                subjects: [ 'contact-person' ],    
            }
        ]
    })
};