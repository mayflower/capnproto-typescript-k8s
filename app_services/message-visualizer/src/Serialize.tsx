import * as capnp from "capnp-ts";
import { Person_PhoneNumber_Type } from "./contact.capnp.js";
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
    console.log(values.phones[j].number);
    console.log(values.phones[j].type);
});

  const date = person.initBirthdate();
  date.setDay(5); 
  date.setMonth(5);
  date.setYear(1964);
  person.setBirthdate(date);
  
  console.log(message.dump());

  return message.toArrayBuffer();
}

// for local testing purpose only
export const deserialize = (data:ArrayBuffer): void  => {
      const message = new capnp.Message(data, false, false);
      const person = message.getRoot(Person);
      const phoneNumbers = person.getPhones();
      const date = person.getBirthdate();
      person.getPhones().toArray().forEach(elekament => {
        
      });

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