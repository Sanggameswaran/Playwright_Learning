import { test,expect } from "@playwright/test";
import { keyboardSection } from "../pageObjects/KeyboardPage";

let keyboardsec:keyboardSection

test.beforeEach('Open URL',async({page})=>{
    keyboardsec = new keyboardSection(page) 
    await keyboardsec.navigationToKeyboardSection()
})

test('Validating keyboad Actions',async({page})=>{
    await keyboardsec.pressKey('Enter')
    expect(keyboardsec.lastKeyValidation).toHaveText(/Enter/)

    await keyboardsec.arrowFunc('ArrowUp',3)
    expect(keyboardsec.arrowCounter).toHaveText(/3/)

    await keyboardsec.typeText('hello')
    expect(keyboardsec.lastKeyValidation).toHaveText(/o/)
})