import { expect, Locator, test } from '@playwright/test'
import { Section28 } from '../pageObjects/Learn'

let parent: Locator
test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section28 = new Section28(page)
    await section28.click()
    parent = page.locator('#section-28')
})

test('Date Picker', async ({ page }) => {
    const date = parent.getByLabel('Date picker')
    await date.fill('2026-10-21')
    const result = parent.getByTestId('date-result')
    await expect(result).toHaveText(/21/)

})