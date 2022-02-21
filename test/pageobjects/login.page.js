import Page from './page'
import config from '../../config'


class LoginPage extends Page {

    async auth() {
        return browser.url(`${config.UI.scheme}${config.UI.login}:${config.UI.password}@${config.UI.host}`)
    }

}

module.exports = new LoginPage();
