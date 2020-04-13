const puppeteer = require('puppeteer');
const fs = require('fs');

const spider = async () => {
    const browser = await puppeteer.launch(); //{headless: false}
    const page = await browser.newPage();
    await page.goto('https://biggeek.ru/');
    let refs = await page.evaluate(() => {
        let refs = [...document.querySelectorAll('#nav_left>li>a')];
        refs = refs.filter(it => it.href.includes('catalog'));
        refs = refs.map(it => it.href)
        return refs;
        });
    console.log(refs);
    let data = [];
    for(let i = 0; i < refs.length; i++) {
        await page.goto(refs[i]);
        await page.waitForSelector('#catalog-product-list');
        let nextPage = false;
        let numOfPage = 1;
        do {
            let pageData = await page.evaluate(() => {
                return {data: [...document.querySelectorAll('#catalog-product-list>.product-list>.item>.item-wrap>.item-info')].map(it => it.querySelector('div.price>del') ?
                    {
                        name: it.querySelector('a.title').innerText,
                        href: it.querySelector('a.title').href,
                        oldPrice: it.querySelector('div.price>del').innerText,
                        newPrice: it.querySelector('div.price>ins').innerText
                    }
                    : false
                    ).filter(it => it), nextPage: !!document.querySelector('#catalog-product-list>.product-list>.item')};
            });
            data = [...data, ...pageData.data];
            nextPage = pageData.nextPage;
            if (!pageData.nextPage) {
                break;
            }
            numOfPage++;
            await page.goto(refs[i] + '?page=' + numOfPage);
            await page.waitForSelector('#catalog-product-list');
        } while (nextPage)
    }

    await browser.close();
    return data;
}

spider().then( res => res ? fs.writeFile('./pages/api/data/biggeek.json', JSON.stringify(res, null, 2), err => err ? console.error(err) : console.log('success!!!')) : null)

