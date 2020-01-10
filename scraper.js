const puppeteer = require('puppeteer');
const csv = require('csv-parser');
const fs = require('fs');
const results = [];

/*
fs.createReadStream('data.csv')
  .pipe(csv({
    separator: '\t'
    })
  )
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });
 */

const getScreenshot = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
        'Accept': 'application/json, text/plain, */*',
        'Authorization': `Bearer 8qdu140mj28acpo2ikko4vfabd0noor4c8q3pnpk`
    });
    await page.goto('https://societeinfo.com/app/recherche/societe/353381981');
    const selector = "#phone";
    // const email = "email";
    /*try {
        await page.waitForSelector(selector);
        const textContent = await page.evaluate(() =>
            document.querySelector(selector).textContent
        );
        console.log('Phone number = ' + textContent);
    } catch (error) {
        console.log("The element didn't appear. " + error)
    }*/

    await page.screenshot({ path: "screenshot.png" });
    await browser.close()
};

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://societeinfo.com/app/recherche/societe/316265016');

    const loginButton = "div.login > p";
    try {
        await page.waitForSelector(loginButton);
        await page.click(loginButton);

    } catch (e) {
        console.log(`ERROR LoginButton ------- ${e} --------`);
    }

    try {
        await page.waitFor('#mat-input-3');
        await page.type('#mat-input-3', 'rouman_s@etna-alternance.net');
        await page.waitFor('#mat-input-4');
        await page.type('#mat-input-4', 'Azerty01');
        await page.click('app-modal-login > div.modal-login.tac > form > button');
    } catch (e) {
        console.log(`ERROR Login ------- ${e} --------`);
    }

    try {
        await page.waitForSelector('#email');
        if (await page.$('#email') !== null) {
            const element = await page.$("#email");
            const text = await (await element.getProperty('textContent')).jsonValue();
            // Ici email récupéré du coup formatter un csv avec chaque pour que ce soit prêt à l'emploi
            console.log("Voici l'email: " + text);
        }
        else
            console.log('not found');
    } catch (e) {
        console.log(`ERROR Recupération Email ------- ${e} --------`);
    }

})();
