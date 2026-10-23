import { test, expect } from '@playwright/test'
import { randomName, randomPassword } from '../helper/helper'
import { title } from 'node:process'

[
    { title:"Vlaid Credentials",userName: "admin", password: "admin123", isValid: true },
    { title:"Invlaid Credentials",userName: randomName, password: randomPassword, isValid: false }

].forEach(({ title,userName, password, isValid }) => {
    test(`Login Test ${title}`, async ({ page }) => {
        await page.locator('#auth-username').fill(userName)
        await page.locator('#auth-password').fill(password)
        await page.getByRole('button', { name: 'Login' }).click()
        if (isValid) {
            await expect(page.locator('#auth-dashboard'))
                .toHaveText(/successful/)

        }else{
             await expect(page.getByTestId('auth-error'))
                .toHaveText(/Invalid/)
        }
    })

})

test.beforeEach('Open URL', async ({ page }) => {
    await page.goto('')
    const section21 = page.locator('.mb-8').getByText('Authentication Simulation')
    await section21.click()
})

