import Page from './page'
import config from '../../config'
import Element from "../../BASE/Element"


const DEFAULTTIMEOUT = config.defaultTimeoutTime
const TOKEN = "token"


class MainPage extends Page {
    mainPagePath = "/projects"
    addProjectButton = "body > div > div.panel.panel-default > div.panel-heading > a"
    projectNameField = "#projectName"
    submitProjectButton = "#addProjectForm > button.btn.btn-primary"
    footerVersion = "body > footer > div > p > span"
    alertSuccess = "#addProjectForm > div > div"
    closePopUp = "close()"
    tableDates = "td:nth-child(4)"

    async provideToken(token) {
        return browser.setCookies({name: TOKEN, value: token})
    }

    async openProject(project) {
        let button = await new Element(`=${project}`)
        let projectLink = await button.getAttribute("href")
        let idIndex = projectLink.match(/\d+/)[0]
        await button.click()
        return idIndex
    }

    async clickNewProjectButton() {
        let button = await new Element(this.addProjectButton)
        await button.waitForClickable(DEFAULTTIMEOUT)
        await button.click()
    }

    async addProject(projectName) {
        await this.clickNewProjectButton()
        let handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
        let field = await new Element(this.projectNameField)
        await field.click()
        await field.setValue(projectName)
        await new Element(this.submitProjectButton).click()
        await this.successProjectAddMessage()
        await this.closeTabViaJs()
        await browser.switchToWindow(handles[0])
    }

    async successProjectAddMessage() {
        let label = await new Element(this.alertSuccess)
        await label.waitForDisplayed(DEFAULTTIMEOUT)
    }

    async closeTabViaJs() {
        await browser.execute(this.closePopUp)
    }

    async footerPortalVersion() {
        return new Element(this.footerVersion).getText()
    }

    async getTestDates() {
        let dates = []
        await new Element(this.tableDates).waitForDisplayed()
        let elements = await new Element(this.tableDates).finds()
        await elements.map(async (result) => {
            dates.push(await result.getText())
        })
        return dates

    }

    open() {
        return super.open(this.mainPagePath);
    }

}

module.exports = new MainPage();
