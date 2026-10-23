import { expect, test } from '@playwright/test'

test('Locators', async ({ page }) => {

    await page.goto('')
    const section5 = page.locator('.mb-8').getByText('Locator Practice')
    await section5.click()

    const sectionHeader = page.locator('#section-5').getByText('Section 5: Locator Practice')
    expect(sectionHeader).toContainText('Locator Practice')

    //By id
    const ID = await page.locator('#locator-by-id').textContent()
    expect(ID).toEqual('Find me by id')
    console.log('Validation 1:' + ID)

    //By class
    const byClass = await page.locator('.locator-by-class').textContent()
    expect(byClass).toContain('Find me by class')
    console.log('Validation 2:' + byClass)

    //By attribute
    const attributelocator = page.locator('[name="locator-name"]')
    await attributelocator.fill('Attribute Found')
    expect(attributelocator).toHaveValue('Attribute Found')
    const value = await attributelocator.inputValue()
    console.log("Validation 3:" + value)

    //Test-Data ID
    const testDataId = page.getByTestId('locator-by-testid')
    expect(testDataId).toHaveText('Find me by data-testid')
    const texttestData: (string | null) = await testDataId.textContent()
    console.log("Validation 4:" + texttestData)

    //By arial-label
    const label = await page.getByLabel('locator-by-aria').textContent()
    expect(label).toContain('Find me by aria-label')
    console.log(`Validation 5:${label}`)

    //By Placeholder
    const placeHolder = await page.getByPlaceholder('locator-by-placeholder').getAttribute('Placeholder')
    console.log("Validation 6:" + placeHolder)

    //Exact text
    const exactText = await page.locator(':text-is("ExactTextTarget")').textContent()
    expect(exactText).toHaveLength(15)
    console.log("Validation 7:" + exactText)

    //Partial text
    const partialText = await page.locator(':text("PartialMatch")').textContent()
    expect(partialText).toEqual('This contains PartialMatch inside it')
    console.log("Validation 8:" + partialText)

    //By Xpath[not recommanded]
    const xPath = await page.locator('xpath=//span[@class="text-sm" and contains(text(),"Reachable")]')
        .textContent()
    console.log("Validation 9:" + xPath)
    expect(xPath).toContain(`Reachable only via [data-css='css-only-target']`)

    //By parent
    const tree = await page.locator('#xpath-grandparent').allTextContents()
    tree.forEach((t) => {
        console.log(t)
    })
    const child =  page.locator('#xpath-grandparent').getByText('leaf node')
    await expect(child).toHaveText('leaf node', { timeout: 1000 })

})