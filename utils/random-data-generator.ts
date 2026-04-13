import { faker, Faker } from '@faker-js/faker';

export class RandomDataUtil{


static getFirstName = () => faker.person.firstName();
static getLastName = () => faker.person.lastName();
static getFullName = () => faker.person.fullName();
static getEmail = () => faker.internet.email();
static getPhoneNumber = () => faker.string.numeric(10);
static getPassword = () => faker.internet.password();
static getRandomCountry = () => faker.location.country();
static getRandomState = () => faker.location.state();
static getRandomCity = () => faker.location.city();
static getRandomPin = () => faker.location.zipCode();
static getRandomStreetAddress = () => faker.location.streetAddress();
static getRandomUUID = () => faker.string.uuid();
static getRandomNumber = () => faker.number.int({min: 1, max: 1000});

}
