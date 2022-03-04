import { Injectable } from '@nestjs/common';
import * as capnp from "capnp-ts";
import { Person } from 'src/capnproto/contact.capnp';
import { PrometheusService } from 'src/prometheus/prometheus.service';

@Injectable()
export class DatasService {
    
    constructor(private promClientService: PrometheusService) {}

    // add monitoring here ...

    public serialize(): ArrayBuffer {
        const message = new capnp.Message();
        const person = message.initRoot(Person);

        person.setName("Christopher Titus"); //random name
        person.setEmail("ChristopherTitus@screwed.com") //random email
        
        const phoneNumber = person.initPhones(2);
        phoneNumber.get(0).setNumber("017011223344");
        phoneNumber.get(0).setType(Person.PhoneNumber.Type.MOBILE);
        phoneNumber.get(1).setNumber("05099887722");
        phoneNumber.get(1).setType(Person.PhoneNumber.Type.HOME);

        const date = person.initBirthdate();
        date.setDay(1); 
        date.setMonth(10);
        date.setYear(1964);
        person.setBirthdate(date);

        console.log("sheesh");
        
        return message.toArrayBuffer();
    }

    // for local testing purpose
    public deserialize(data:ArrayBuffer): void {
        const message = new capnp.Message(data, false, false);
        const person = message.getRoot(Person);
        const phoneNumbers = person.getPhones();
        const date = person.getBirthdate();
        console.log(
            person.getName(),
            person.getEmail(),
            phoneNumbers.get(0).getNumber(),
            phoneNumbers.get(0).getType(),
            phoneNumbers.get(1).getNumber(),
            phoneNumbers.get(1).getType(),
            date.getDay(),
            date.getMonth(),
            date.getYear()
        )
    }

    public createPayload(): Uint8Array {
        //this.deserialize(this.serialize());
        const contactPerson: ArrayBuffer = this.serialize();
        return new Uint8Array(contactPerson, 0, contactPerson.byteLength);
    }
}
