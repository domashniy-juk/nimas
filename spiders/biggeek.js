const puppeteer = require('puppeteer');

const biggeek = async () => {
    const browser = await puppeteer.launch(); //{headless: false}
    const page = await browser.newPage();
    await page.goto('https://biggeek.ru/');
    let refs = await page.evaluate(() => {
        let refs = [...document.querySelectorAll('#nav_left>li>a')];
        refs = refs.filter(it => it.href.includes('catalog'));
        refs = refs.map(it => it.href)
        return refs;
        });
    let data = [];
    console.log(refs)
    for(let i = 0; i < refs.length; i++) {
        console.log(refs[i])
        await page.goto(refs[i]);
        await page.waitForSelector('#catalog-product-list');
        let nextPage = false;
        let numOfPage = 1;
        do {
            let pageData = await page.evaluate(() => {
                return {data: [...(document.querySelectorAll('#catalog-product-list>.product-list>.item>.item-wrap') || [])].map(it => it.querySelector('div.price>del') ?
                    {
                        name: (it.querySelector('a.title') || {innerText: ''}).innerText,
                        href: (it.querySelector('a.title') || {href: ''}).href,
                        oldPrice: (it.querySelector('div.price>del') || {innerText: ''}).innerText,
                        newPrice: (it.querySelector('div.price>ins') || {innerText: ''}).innerText,
                        img: (it.querySelector('img') || {src: ''}).src
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
    return data.map((it, index) => ({...it, id: index}));
}

export default biggeek;

