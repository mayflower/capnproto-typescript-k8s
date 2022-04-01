import { Injectable } from '@nestjs/common';
import * as capnp from "capnp-ts";
import { Person } from 'src/capnproto/contact.capnp';

@Injectable()
export class DatasService {

    //TODO: add monitoring here ...
    
    public deserialize(data: Array<number>): void {
        const typedArr = Uint8Array.from(data);
        const message = new capnp.Message(typedArr, false, false);
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
          console.log(i.getType());
        });
  
        console.log(
            date.getDay(),
            date.getMonth(),
            date.getYear()
        )
    }
}
