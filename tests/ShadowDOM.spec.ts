import { expect, Locator, test } from '@playwright/test'

let parent: Locator
test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section12 = page.locator('.mb-8').getByText('Shadow DOM')
    await section12.click()
    parent = page.locator('#section-12')
})

test('ShadowBox',async()=>{
    const input:any = 'Hi there!!..'
    
    const shadowBox = parent.getByTestId('shadow-host-wrapper')
    const res = shadowBox.locator('#shadow-result')

    const typeArea = shadowBox.getByPlaceholder('type inside shadow root')
    await typeArea.fill(input)
    const submitButton = shadowBox.getByRole('button',{name:'Shadow Submit'})
    await submitButton.click()
    await expect(res).toHaveText(`Submitted: ${input}`)

})