import * as capnp from "capnp-ts";
import { Person } from "./contact.capnp.js";

interface Values {
    fullname: string;
    email: string;
    phones: [
      {
        number: string,
        type: number,
      },
    ];
    birthdate: Date;
}

export const serializeToCapn = (values: Values): ArrayBuffer => {
  const message = new capnp.Message();
  const person = message.initRoot(Person);

  person.setName(values.fullname);
  person.setEmail(values.email);

  const phoneNumber = person.initPhones(values.phones.length);

  phoneNumber.forEach((i,j) => {
    i.setNumber(values.phones[j].number);
    i.setType(values.phones[j].type);
    // console.log(values.phones[j].number);
    // console.log(values.phones[j].type);
});

  const date = person.initBirthdate();
  date.setYear(new Date(values.birthdate).getUTCFullYear());
  date.setMonth(new Date(values.birthdate).getUTCMonth() +1);
  date.setDay(new Date(values.birthdate).getDate()); 
  
  // console.log(message.dump());

  return message.toArrayBuffer();
}

// for local testing purpose only
export const deserialize = (data:ArrayBuffer): void  => {
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
        console.log(i.getType());
      });

      console.log(
          date.getDay(),
          date.getMonth(),
          date.getYear()
      )
  }

export const createPayload = (values: Values): Array<number>  => {
    const contactPerson: ArrayBuffer = serializeToCapn(values);
    console.log(new Uint8Array(contactPerson, 0, contactPerson.byteLength));
    console.log([].slice.call(new Uint8Array(contactPerson, 0, contactPerson.byteLength)));
    
    return [].slice.call(new Uint8Array(contactPerson, 0, contactPerson.byteLength));
}