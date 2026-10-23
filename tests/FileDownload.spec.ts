import { test, expect } from '@playwright/test'
import fs from 'fs'

test.beforeEach('Open URL', async ({ page }) => {
    await page.goto('')
    const section17 = page.locator('.mb-8').getByText('Download')
    await section17.click()
})

test('File Download', async({page})=>{
    
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('#download-btn').click()
    ])
    const filename = download.suggestedFilename()
    //await download.saveAs(filename) - save in root folder
    const filePath = `downloads/${filename}`
    await download.saveAs(filePath)
    
    const fileCheck =  fs.existsSync(filePath)
    expect(fileCheck).toBeTruthy()

    

})