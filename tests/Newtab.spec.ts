import { test, expect } from '@playwright/test'

test.beforeEach('Open URL', async ({ page }) => {
    await page.goto('')
    const section20 = page.locator('.mb-8').getByText('Multiple Windows')
    await section20.click()
})

test('Open new Window', async ({ page }) => {

    const newTab = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('#open-window-btn').click()
    ])
    expect(newTab).not.toBeNull()
})