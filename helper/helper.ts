
import { faker } from '@faker-js/faker'
export const randomName = faker.person.fullName()
export const randomPassword = faker.string.alpha({ length: 1, casing: 'upper' }) +
    faker.string.alpha({ length: 1, casing: 'lower' }) +
    faker.string.numeric(1) +
    faker.helpers.arrayElement(['!', '@', '#', '$']) +
    faker.internet.password({ length: 5 });
export const randomEmail = faker.internet.email({ provider: "test.com" })
export const randomPhoneNumber = faker.phone.number({ style: "mobile" })
export const randomBio = faker.person.bio()