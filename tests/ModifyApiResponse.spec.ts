import { test, expect } from '@playwright/test'

test.beforeEach('API declarations', async ({ page }) => {
    await page.route('*/**/api/articles**', async (route) => {
        const response = await route.fetch()
        const responseJsonBody = await response.json()
        responseJsonBody.articles[0].title = "Mocking this title for testing"
        responseJsonBody.articles[1].title = "Mocking again for testing"

        await route.fulfill({
           body: JSON.stringify(responseJsonBody)
        })
    })
    await page.goto('https://conduit.bondaracademy.com/')
})

test('Validations', async ({ page }) => {
    await expect(page.locator('a.navbar-brand')).toHaveText(/conduit/)
    await expect(page.locator('app-article-list h1'))
        .toContainText(['Mocking this title for testing', 'Mocking again for testing'])
})