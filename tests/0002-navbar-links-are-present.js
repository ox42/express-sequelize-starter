module.exports = {
    'Navbar links are present' : function (browser) {

        browser
            .url(browser.launch_url)
            .waitForElementVisible('body', 30000)

            .waitForElementVisible('ul', 5000)
            .assert.containsText('ul li', 'Home')

            .end();
    }
};
