import { test as setup, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const authFilePath = path.join(__dirname, '../.playwright/.auth/user.json')

setup.skip('Authenticate State', async ({ page, request }) => {

    if (fs.existsSync(authFilePath)) {

        const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: {
                "user": {
                    "email": "sanggames77@gmail.com",
                    "password": "Sangga1234"
                }
            }
        })

        const loginResponseBody = await loginResponse.json()
        const token = loginResponseBody.user.token

        const storageState = JSON.parse(fs.readFileSync(authFilePath, 'utf-8'))
        storageState.origins[0].localStorage[0].value = token
        fs.writeFileSync(authFilePath, JSON.stringify(storageState, null, 2))

    } else {
        await page.goto('https://conduit.bondaracademy.com/')
        await page.getByText('Sign in').click()
        await page.getByPlaceholder('Email').fill('sanggames77@gmail.com')
        await page.getByPlaceholder('Password').fill('Sangga1234')
        await page.getByRole('button', { name: 'Sign in' }).click()

        await page.waitForURL('https://conduit.bondaracademy.com/')

        await page.context().storageState({ path: authFilePath })

    }
})