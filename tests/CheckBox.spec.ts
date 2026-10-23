import { expect, Locator, test } from '@playwright/test'


test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section3 = page.locator('.mb-8').getByText('Checkboxes & Radio Buttons')
    await section3.click()
})

test('CheckBox', async ({ page }) => {
    const checkbox = page.locator('.mt-4').getByText('Option B')
    await checkbox.check()
    await expect(checkbox).toBeChecked()
})

test('SelectAll', async ({ page }) => {
    const selectall = page.locator('.mt-4').getByRole('checkbox', { name: 'Select all' })
    await selectall.check()
    const Allchkboxtest = page.locator('.mt-4').getByRole('checkbox')

    for (const allchk of await Allchkboxtest.all()) {
        await allchk.check()
        expect(allchk).toBeChecked()
    }

    const hiddenText = await page.getByText('Hidden text is now visible!').textContent()
    console.log(hiddenText)
})

test('RadioGroup', async ({ page }) => {
    const radioGroup = page.locator('.border-t', { hasText: 'Radio group:' }).getByText('Choice One')
    await radioGroup.check()
    await expect(page.getByTestId('radio-result')).toHaveText('Selected: one')
})  

