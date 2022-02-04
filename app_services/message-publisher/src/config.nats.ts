import { NatsTransportStrategy} from '@alexy4744/nestjs-nats-jetstream-transporter';

export const natsStreamConfig = {
    strategy: new NatsTransportStrategy({
        connection: {
          servers: ["nats://localhost:4222"],
        },
        streams: [
            {
                name: 'stream',
                subjects: [ 'contact-person' ]
            }
        ]
    })

};