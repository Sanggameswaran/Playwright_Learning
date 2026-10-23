import { expect, Locator, test } from '@playwright/test'

let parent: Locator
test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section11 = page.locator('.mb-8').getByText('iFrame')
    await section11.click()
    parent = page.locator('#section-11')
})

test('iframe', async () => {

    const inputValue: string = 'Hi I am learning Playwright'
    const iframe = parent.frameLocator('[title="practice-iframe"]')
    const frameInput = iframe.locator('#iframe-input')
    const result = iframe.locator('#iframe-result')
    await frameInput.fill(inputValue)
    const submitButton = iframe.getByRole('button', { name: 'Submit' })
    await submitButton.click()

    await expect(result)
        .toHaveText(`Iframe button clicked: ${inputValue}`)

})