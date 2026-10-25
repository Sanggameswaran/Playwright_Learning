import { test, expect } from '@playwright/test'

test('New article', async ({ page, request }) => {
    const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {
                "email": "sanggames77@gmail.com",
                "password": "Sangga1234"
            }
        }
    })

    const loginResponseBody = await loginResponse.json()
    const token = loginResponseBody.user.token

    expect(loginResponse.status()).toBe(200)
    console.log(token)
    
    const title = `New Article ${Date.now()}`
    const cretearticle = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            "article": {
                "title": title,
                "description": "Testing Article",
                "body": "Test Markdown",
                "tagList": [
                    "no tags"
                ]
            }
        },
        headers: {
            Authorization: `Token ${token}`
        }
    })

    expect(cretearticle.status()).toBe(201)
    await page.screenshot({path:'screenshot/articleCreation.png'})

    await page.goto('https://conduit.bondaracademy.com/')

    await expect(page.locator('app-article-list h1').filter({ hasText: 'New Article2' })
    ).toBeVisible()

})