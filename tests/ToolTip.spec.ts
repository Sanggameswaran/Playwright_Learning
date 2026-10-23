import { expect, test } from '@playwright/test'


test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section15 = page.locator('.mb-8').getByText('Tooltip')
    await section15.click()
})

test('tooltip', async({page})=>{
    await page.locator('#section-15').getByLabel('Tooltip trigger').hover()
    const toolTip = page.getByRole('tooltip')
    await expect(toolTip).toHaveText('This is the tooltip text')
})
