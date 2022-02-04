import { Injectable } from '@nestjs/common';
import * as capnp from "capnp-ts";
import { Person } from 'src/capnproto/contact.capnp';

@Injectable()
export class DatasService {

    // add monitoring here ...
    
    public deserialize(data: Array<number>): void {
        const typedArr = Uint8Array.from(data);
        const message = new capnp.Message(typedArr.buffer, false, false);
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
}
