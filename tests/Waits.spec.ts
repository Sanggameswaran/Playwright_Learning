import { expect, Locator, test } from '@playwright/test'

let parent: Locator
test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section7 = page.locator('.mb-8').getByText('Waits & Synchronisation')
    await section7.click()
    parent = page.locator('#section-7')
})

test('Waits', async({page})=>{
      const loadSpinner = parent.getByTestId('loaded-message')
      await loadSpinner.waitFor({state:'visible',timeout:2000})
      await expect(loadSpinner).toHaveText(/Loaded/)

      await page.waitForTimeout(3000)
      await expect(parent.locator('[data-testid="delayed-text"]')).toBeVisible()

      const ajaxButton = parent.getByRole('button',{name:'AJAX button'})
      await ajaxButton.click()
      await page.waitForTimeout(2000)
      await expect(parent.locator('[data-testid="ajax-result"]')).toBeVisible()
      

})