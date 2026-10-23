import { test, expect } from '@playwright/test'

test.beforeEach('Open URL', async ({ page }) => {
    await page.goto('')
    const section16 = page.locator('.mb-8').getByText('File Upload')
    await section16.click()
})

test('Upload form project folder', async ({ page }) => {
    const fileInput = page.locator('[type="file"]');
    await fileInput.setInputFiles('testdata/lion.jpg');
    await expect(fileInput).toBeAttached()

})

test('Upload from local', async ({ page }) => {
    
    //[filehoose] -- This is called destructuring
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.getByLabel('File upload').click()
    ])

    await fileChooser.setFiles('C:/Users/THINKPAD/Pictures/reference.jfif')
    await expect(page.locator('[type="file"]')).toBeAttached()

})