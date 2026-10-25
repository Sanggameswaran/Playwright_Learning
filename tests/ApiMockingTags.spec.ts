import { test, expect } from '@playwright/test'
import tags from '../testdata/tags.json'

test.beforeEach('Open URL', async ({ page }) => {

    await page.route('*/**/api/tags**', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(tags)
        })
    })
    await page.goto('https://conduit.bondaracademy.com/')

})
test('Validations', async ({ page }) => {
    await expect(page.locator('a.navbar-brand')).toHaveText(/conduit/)
    const tagBox = page.locator('.tag-list .tag-pill')
    await expect(tagBox).toHaveCount(3)
    await expect(tagBox).toContainText(['Go Slow', 'In bike', 'Be safe'])
    console.log(await tagBox.allTextContents())
})