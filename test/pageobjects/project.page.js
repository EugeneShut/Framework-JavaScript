import Page from './page'
import config from '../../config'
import Element from "../../BASE/Element"


const DEFAULTTIMEOUT = config.defaultTimeoutTime


class ProjectPage extends Page {
    projectsPage = "div.panel-heading"

    async waitForTest(testName) {
        let link = await new Element(`=${testName}`)
        await link.waitForDisplayed(DEFAULTTIMEOUT)
    }

    async projectsPannelHeader() {
        let elem = await new Element(this.projectsPage)
        return await elem.getText()
    }

}

module.exports = new ProjectPage();
