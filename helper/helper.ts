
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


// Date -> yyyy-mm-dd (the format a date input accepts)
export function toInputFormat(d: Date): string {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
}