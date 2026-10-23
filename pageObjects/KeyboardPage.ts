import { Locator, Page } from "@playwright/test";


export class keyboardSection {

    readonly page: Page
    readonly inputBox: Locator
    readonly lastKeyValidation: Locator
    readonly arrowCounter: Locator

    constructor(page: Page) {
        this.page = page
        this.inputBox = page.locator('#keyboard-input')
        this.lastKeyValidation = page.getByTestId('keyboard-result')
        this.arrowCounter = page.getByTestId('arrow-counter')
    }

    async navigationToKeyboardSection() {
        await this.page.goto('')
        this.page.locator('.mb-8').getByText('Keyboard Actions').click()
    }

    async pressKey(key: string) {
        await this.inputBox.press(key)
    }
    async arrowFunc(key: string, no_of_times: number) {
        for (let i = 0; i < no_of_times; i++) {
            await this.inputBox.press(key)

        }
    }
    async typeText(text: string) {
        await this.inputBox.pressSequentially(text)
    }
}
