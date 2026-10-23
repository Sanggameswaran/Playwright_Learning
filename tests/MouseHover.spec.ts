import { expect, Locator, test } from '@playwright/test'

let parent: Locator
test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section14 = page.locator('.mb-8').getByText('Hover Menu')
    await section14.click()
    parent = page.locator('#section-14')
})

test('Hover', async () => {
    const hoverButton = parent.locator('#hover-menu-trigger')
    await hoverButton.hover()
    const subMenu = parent.getByRole('list', { name: 'Hover submenu' })
    await expect(subMenu).toContainText('Submenu item 1')
    const listItems = await parent.locator('ul li').allTextContents()
    console.log(listItems)
})