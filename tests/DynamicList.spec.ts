import { test, expect, Locator } from '@playwright/test'

let testParent: Locator
let items: Locator
test.beforeEach('Open URL', async ({ page }) => {
    await page.goto('')
    const section23 = page.locator('.mb-8').getByText('Dynamic List')
    await section23.click()
    testParent = page.locator('#section-23')
    items = testParent.locator('ul li')
})

test('Add and validating list length', async ({ page }) => {

    const itemsCountBeforeAdding = await items.count()
    const inputField = page.locator('#list-input')
    await inputField.fill('Adding New Item')
    const addButton = page.getByRole('button', { name: 'Add list item' })
    await addButton.click()

    await expect(items).toHaveCount(itemsCountBeforeAdding + 1)
    await expect(items.last()).toContainText('Adding New Item')

})