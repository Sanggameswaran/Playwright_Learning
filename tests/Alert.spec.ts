import { Locator, test ,expect} from '@playwright/test'

let parent: Locator
test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section9 = page.locator('.mb-8').getByText('Alerts')
    await section9.click()
    parent = page.locator('#section-9')
})

test('Alert', async ({ page }) => {
    const alert = parent.getByLabel('Show alert')
    const confirm = parent.getByLabel('Show confirm')
    const prompt = parent.getByLabel('Show prompt')
    const alertResult:Locator = page.getByTestId('alert-result')
    const promtValue:string = 'Accept this prompt' 
    page.on('dialog', async (dialog) => {
        console.log('Alert Type:', dialog.type())
        console.log('Dialog says:', dialog.message());
        dialog.accept(promtValue)

    })

    await alert.click()
    await expect(alertResult).toHaveText('Alert was shown and dismissed')

    await confirm.click()
    await expect(alertResult).toHaveText('Confirm result: OK')

    await prompt.click()
    await expect(alertResult).toHaveText(`Prompt value: ${promtValue}`)

    
})