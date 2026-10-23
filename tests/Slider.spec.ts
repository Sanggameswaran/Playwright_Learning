import { expect, Locator, test } from '@playwright/test'

let parent: Locator
test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section27 = page.locator('.mb-8').getByText('Slider')
    await section27.click()
    parent = page.locator('#section-27')
})

test('Slider', async ({ page }) => {
    const sliderBar = parent.getByLabel('Slider')
    await sliderBar.scrollIntoViewIfNeeded()
    const box = await sliderBar.boundingBox()
    if (box === null) throw new Error('Element not found')
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x + 95, y + 95, { steps: 15 })
    await page.mouse.up()
    await expect(parent.getByTestId('slider-result')).toHaveText(/75/)
})
