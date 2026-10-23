import { expect, Locator, test } from '@playwright/test'

let parent: Locator
test.beforeEach('Open_URL', async ({ page }) => {
    await page.goto('')
    const section6 = page.locator('.mb-8').getByText('Dynamic Content')
    await section6.click()
    parent = page.locator('#section-6')
})

test('Dynamic content',async({page})=>{
       const delayTextElement = parent.getByTestId('appears-later')
       await delayTextElement.waitFor({state:'visible' ,timeout:2500})
       const delayedtext = await delayTextElement.textContent()
       expect(delayedtext).toContain('I appeared after 2 seconds')

       const disapperElement = page.getByRole('button',{name:'Disappear button'})
       await disapperElement.click({force:true})

       await expect(disapperElement).not.toBeVisible()
       
       const incrementButton = page.getByRole('button',{name:'Increment counter'})
       incrementButton.waitFor({state:'visible',timeout:1000})
       await incrementButton.click({clickCount:3})
       
       await expect(parent.getByTestId('counter-result')).toHaveText(/3/)

       const loadButton = parent.getByRole('button',{name:'Load content button'})
       await loadButton.click()

       const list = await parent.locator('ul li').allTextContents()
       console.log(list)
       expect(list).toContain('Injected item 1')


})