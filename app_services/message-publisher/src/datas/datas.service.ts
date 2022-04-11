import { Injectable } from '@nestjs/common';
import * as capnp from "capnp-ts";
import { Person } from 'src/capnproto/contact.capnp';
import { PrometheusService } from 'src/prometheus/prometheus.service';

@Injectable()
export class DatasService {
    
    constructor(private promClientService: PrometheusService) {}

    //TODO: add monitoring here ...
    
    // for local testing purpose
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
        
        return message.toArrayBuffer();
    }

    // for local testing purpose
    public deserializeNumberArray(data: Array<number>): void {
        const typedArr = Uint8Array.from(data);
        this.deserializeMessage(typedArr);
    }

    // for local testing purpose
    public deserializeTypedArray(data: Uint8Array): void {
        const typedArr = Uint8Array.from(Object.values(data));
        this.deserializeMessage(typedArr);
    }

    // for local testing purpose
    public deserializeDataView(data: DataView): void {
        this.deserializeMessage(data.buffer);
    }

    public deserializeMessage(data: any) {
        const message = new capnp.Message(data, false, false);
        const person = message.getRoot(Person);
        const phoneNumbers = person.getPhones();
        const date = person.getBirthdate();
          
        console.log(
            person.getName(),
            person.getEmail(),
        )
          
        phoneNumbers.forEach((i) => {
            i.getNumber();
            i.getType();
            console.log(i.getNumber());
            console.log(i.getType() == 0 ? 'MOBILE' : i.getType() == 1 ? 'HOME' : i.getType() == 2 ? 'WORK' : 'Undefined');
        });
          
        console.log(
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
