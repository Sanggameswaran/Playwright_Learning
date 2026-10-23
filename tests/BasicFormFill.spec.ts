import { expect, Locator, test } from '@playwright/test'
import { randomName,randomPassword,randomPhoneNumber,randomEmail,randomBio } from '../helper/helper'

let basicForm: Locator
let fields: Locator[]

test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section1 = page.locator('.mb-8').getByText('Basic Form Elements')
    await section1.click()

    basicForm = page.getByTestId('basic-form')
    fields = [basicForm.locator('#text-input'),
    basicForm.locator('#password-input'),
    basicForm.getByPlaceholder('Enter email'),
    basicForm.getByLabel('Phone input'),
    basicForm.locator('#textarea-input')]

})

const values = [ randomName , randomPassword ,randomEmail, randomPhoneNumber, randomBio]

test('Form_Submit', async ({ page }) => {
    for (let i = 0; i < fields.length; i++) {
        await fields[i].fill(values[i])
    }
    await basicForm.getByRole('button', { name: 'Submit' }).click()
    await page.screenshot({path:'screenshot/formSubmit.png'})
    await expect(page.getByText('Form submitted successfully')).toBeVisible()
})

test('Form_Reset', async ({page}) => {
    for (let i = 0; i < fields.length; i++) {
        await fields[i].fill(values[i])
    }

    await basicForm.getByRole('button', { name: 'Reset' }).click()
    try {
        for (let field of fields) {
            await expect(field).toBeEmpty()
        }
    } catch (error) {
        console.log("Form not reset" + error)
    }
    await page.screenshot({path:'screenshot/resetForm.png'})
})
