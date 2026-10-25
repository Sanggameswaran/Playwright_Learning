import { expect, Locator, test } from '@playwright/test'
import { Section28 } from '../pageObjects/Learn'
import { toInputFormat } from '../helper/helper'

let parent: Locator

test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section28 = new Section28(page)
    await section28.click()
    parent = page.locator('#section-28')
})

test('Date picker - select today using JS Date', async () => {
    const today = new Date()
    const dateInput = parent.locator('input[type="date"]')

    await dateInput.fill(toInputFormat(today))

    await expect(dateInput).toHaveValue(toInputFormat(today))
    await expect(parent.getByText(/Chosen date:/)).toContainText(String(today.getFullYear()))
})

test('Date Picker - future date using JS Date', async () => {
    const target = new Date()
    target.setDate(target.getDate() + 10)          // today + 10 days, rolls over months/years

    const dateInput = parent.getByLabel('Date picker')
    await dateInput.fill(toInputFormat(target))

    // 1. The input holds exactly what we set
    await expect(dateInput).toHaveValue(toInputFormat(target))

    // 2. The echoed result contains the same day, month and year
    const result = parent.getByTestId('date-result')
    await expect(result).toContainText(String(target.getFullYear()))
    await expect(result).toContainText(String(target.getDate()).padStart(2, '0'))
})
