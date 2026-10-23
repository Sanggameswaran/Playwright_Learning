import { expect, Locator, test } from '@playwright/test'


let clickParent: Locator

test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section2 = page.locator('.mb-8').getByText('Button Interactions')
    await section2.click()
    clickParent = page.locator('.flex ')
})

test('Clicks', async ({ page }) => {
    const singleClick = clickParent.getByLabel('Single click button')
    await singleClick.click()

    const doubleClick = clickParent.getByLabel('Double click button')
    await doubleClick.dblclick()

    const rightClick = clickParent.getByLabel('Right click button')
    await rightClick.click({ button: 'right' })

    await expect(page.getByTestId('single-click-result')).toHaveText('Single clicked!')
    await expect(page.getByTestId('double-click-result')).toHaveText('Double clicked!')
    await expect(page.getByTestId('right-click-result')).toHaveText('Right click captured (context menu blocked)')
    await expect(page.getByText('Always Disabled')).toBeDisabled()

    const delayEnable = page.getByLabel('Delayed enable button')
    const stateofButtondelayEnable = await delayEnable.isDisabled()
    console.log(`isButton disabled: ${stateofButtondelayEnable}`)
    await expect(delayEnable).not.toBeEnabled()

    const timerButton = page.getByRole('button', { name: 'Start delay' })
    await expect(timerButton).toBeEnabled()
    await timerButton.click()

    await expect(delayEnable).toBeEnabled()

    const stateofButtondelayEnable1 = await delayEnable.isEnabled()
    console.log(`isButton enabled: ${stateofButtondelayEnable1}`)

})

test('Relable', async ({ page }) => {
    let n = 5
    const relableButton = clickParent.getByRole('button', { name: 'Relabel button' })

    for (let i = 1; i <= n; i++) {
        await relableButton.click();
        if (i % 2 == 0) {
            await expect(relableButton).toHaveText('Original Label')

        } else {
            await expect(relableButton).toHaveText('Clicked Label')

        }


    }
    const finalstate = await relableButton.textContent()
    console.log(finalstate)
    expect(finalstate).toBe('Clicked Label')
})
