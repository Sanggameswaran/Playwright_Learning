import { expect, test } from '@playwright/test'
import ArticleData from '../testdata/articleData.json'

test.beforeEach('Open Url', async ({ page }) => {

    await page.route('*/**/api/articles**', async (route) => {
        await route.fulfill({
            //body: JSON.stringify(article) - one method
            json: ArticleData
        })
    })
    await page.goto('https://conduit.bondaracademy.com/')
})

test('Validations', async ({ page }) => {
    const titles = ([ArticleData.articles[0].title, ArticleData.articles[1].title])
    await expect(page.locator('a.navbar-brand')).toHaveText(/conduit/)
    await expect(page.locator('app-article-list h1')).
        toContainText(titles)
    console.log(titles)
})