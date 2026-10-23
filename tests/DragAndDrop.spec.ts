import { expect, Locator, test } from '@playwright/test'

let parent: Locator
test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section13 = page.locator('.mb-8').getByText('Drag & Drop')
    await section13.click()
    parent = page.locator('#section-13')
})

test('Drag and Drop', async ({ page }) => {
    const dragElement = parent.getByLabel('Draggable item')
    const dropElement = parent.getByLabel('Drop zone')

    const dropBox = await dropElement.boundingBox()
    if (dropBox===null) throw new Error('Drop zone not found')

    await dragElement.hover()
    await page.mouse.down()

    const x = dropBox.x + dropBox.width/2
    const y = dropBox.y + dropBox.height/2
    await page.mouse.move(x,y)
    await page.waitForTimeout(100)
    await page.mouse.up()

    await expect(parent.getByTestId('drop-result')).toHaveText('Item dropped successfully')
})