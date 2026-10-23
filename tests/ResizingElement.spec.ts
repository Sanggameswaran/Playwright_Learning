import { test, expect, Locator } from '@playwright/test'

let testParent: Locator
test.beforeEach('Open URL', async ({ page }) => {
    await page.goto('')
    const section29 = page.locator('.mb-8').getByText('Resizable Element')
    await section29.click()
})

test('Resizing box', async ({ page }) => {

    const box = page.locator('#section-29 #resizable-box')
    await box.scrollIntoViewIfNeeded()
    const boundBox = await box.boundingBox()
    if (boundBox === null) throw new Error('Element not found')

    const x = boundBox.x + boundBox.width - 5
    const y = boundBox.y + boundBox.height - 5

    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x + 100, y + 90, { steps: 10 })
    await page.mouse.up()
    const boundBoxResized = await box.boundingBox()

    await page.waitForTimeout(1000)
    expect(boundBoxResized?.width).toBeGreaterThan(boundBox.width)
    expect(boundBoxResized?.height).toBeGreaterThan(boundBox.height)

})