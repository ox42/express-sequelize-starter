module.exports = {
    'App is online' : function (browser) {

        browser
            .url(browser.launch_url)
            .waitForElementVisible('body', 30000)
            .assert.containsText('body', 'Welcome')
            .end();
    }
};