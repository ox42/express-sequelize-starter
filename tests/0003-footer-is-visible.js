module.exports = {
    'Footer is visible' : function (browser) {

        browser
            .url(browser.launch_url)
            .waitForElementVisible('body', 30000)

            .assert.visible('div.footer')
            .end();
    }
};
