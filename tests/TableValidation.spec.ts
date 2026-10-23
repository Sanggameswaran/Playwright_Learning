import { expect, Locator, test } from '@playwright/test'

let parent: Locator
test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section8 = page.locator('.mb-8').getByText('Table Automation')
    await section8.click()
    parent = page.locator('#section-8')
})

test('WebTable', async ({ page }) => {
    const tableRow = await page.getByRole('row', { name: 'QA' }).allTextContents()
    for (const row of tableRow) {
        expect(tableRow).toContain(row)
    }

    const fieldValidation = page.getByRole('row', { name: 'Bharath' }).locator('td').nth(2)
    await fieldValidation.textContent()
    await expect(fieldValidation).toHaveText('Backend')


})

test('FilterValidation', async () => {
    const stringValue: string = 'an'
    const SearchArea = parent.getByPlaceholder('Filter by name')
    await SearchArea.fill(stringValue)

    const nameValidation = await parent.locator('tbody tr td:first-child').allTextContents()

    if (nameValidation.length === 0 || nameValidation[0].toLowerCase().includes('no matching rows')) {
        const noRows = await parent.locator('tbody', { hasText: 'No matching rows' }).textContent()
        console.log(noRows)
        test.skip()
        return
    }

    for (const name of nameValidation) {
        expect(name?.toLowerCase()).toContain(stringValue)
        console.log(name)
    }
})

async function allNamesFunction() {

    let allNames: string[] = []
    while (true) {
        const names = await parent.locator('tbody tr td:first-child').allTextContents()
        allNames = allNames.concat(names)
        const nextButton = parent.getByRole('button', { name: 'Next' })
        if (await nextButton.isDisabled()) {
            break
        }

        await nextButton.click()

    }
    return allNames

}

test('AscendingValidation', async () => {

    const sortAsc = parent.getByRole('button', { name: 'Sort by name' })
    expect(sortAsc).toHaveText('Sort Name (asc)')
    const allNames = await allNamesFunction()
    console.log(allNames)
    const sortedNamesAsc = [...allNames].sort()
    expect(allNames).toEqual(sortedNamesAsc)


})

test('DescendingValidation', async () => {

    const sortDesc = parent.getByRole('button', { name: 'Sort by name' })
    await sortDesc.click()
    expect(sortDesc).toHaveText('Sort Name (desc)')
    const allNames = await allNamesFunction()
    console.log(allNames)
    const sortedNamesDesc = [...allNames].sort().reverse()
    expect(allNames).toEqual(sortedNamesDesc)

})
