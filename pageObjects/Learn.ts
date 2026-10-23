import { Page } from "@playwright/test";


export class Section28 {

    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async click() {
        const section28 = this.page.locator('.mb-8').getByText('Date Picker')
        await section28.click()
    }

}