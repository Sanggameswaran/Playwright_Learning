import { expect, Locator, test } from '@playwright/test'


test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section4 = page.locator('.mb-8').getByText('Dropdowns')
    await section4.click()
})

test('DropDown', async ({ page }) => {
    const value: string = "green"
    const StandardDropDown = page.locator('#section-4').getByRole('combobox', { name: 'Standard select' })
    await StandardDropDown.selectOption(value)
    await expect(StandardDropDown).toHaveValue(value)

    const value1: string = "Playwright"
    const StandardDropDownarray = page.locator('#section-4').getByRole('combobox', { name: 'Dynamic options select' })
    await StandardDropDownarray.selectOption('Playwright')
    await expect(StandardDropDownarray).toHaveValue(value1)

    const customDropdown = page.locator('#section-4 #custom-dropdown-toggle')
    await customDropdown.click()
    const getValues = page.locator('#section-4').getByRole('list').getByText('Alpha')
    await getValues.click()

    await customDropdown.click()
    const AllItems = await page.locator('#section-4').getByRole('listitem').allTextContents()
    for (const items of AllItems) {
        console.log(items)
    }
    expect(AllItems).toContain('Alpha')
})

test('multipleValueselect', async ({ page }) => {
    const multiSelect = page.locator('#section-4').getByLabel('Multi select')
    const firstValue = multiSelect.getByText('Java' , {exact:true})
    await firstValue.click()
    const secondValue = multiSelect.getByText('Python')
    await secondValue.click({modifiers:['Control']})

    await expect(page.getByTestId('multi-select-result')).toHaveText('Selected: java, python')
})