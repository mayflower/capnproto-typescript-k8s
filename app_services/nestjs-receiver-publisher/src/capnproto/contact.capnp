@0xb517f58004a64978;

struct Person {
  name @0 :Text;
  email @1 :Text;
  phones @2 :List(PhoneNumber);
  birthdate @3 :Date;
  
  struct PhoneNumber {
    number @0 :Text;
    type @1 :Type;
    
    enum Type {
      mobile @0;
      home @1;
      work @2;
    }
  }

  struct Date {
  year @0 :Int16;
  month @1 :UInt8;
  day @2 :UInt8;
  }
}