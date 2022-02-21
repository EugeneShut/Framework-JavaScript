import api from "../API/api";

import LoginPage from '../pageobjects/login.page'
import MainPage from '../pageobjects/main.page'
import ProjectPage from '../pageobjects/project.page'
import * as chai from 'chai';
let expectChai = chai.expect;
import config from '../../config'
import path from 'path'
import helper from '../../helpers/helper'


const EMPTY = ""
const PROJECT = "Nexage"
const AVAILABLEPROJECTS = "Available projects"


describe('UIAPITest', () => {

    it('UIAPITest', async () => {
        let SID = await helper.generate_string()
        let projectName = await helper.generate_string()
        let testName = await helper.generate_string()

        config.API.token = await api.getToken()
        await expectChai(config.API.token).to.not.equal(EMPTY, "API version is not as expected")

        await LoginPage.auth()
        await expectChai(await ProjectPage.projectsPannelHeader()).to.contain(AVAILABLEPROJECTS, "Main page is not opened")
        await MainPage.provideToken(config.API.token)
        await MainPage.open()
        await expectChai(await MainPage.footerPortalVersion()).to.contain(config.API.v, "API version is not as expected")

        let projectID = await MainPage.openProject(PROJECT)
        let jsonTests = await api.getTests(projectID)
        let dates = await MainPage.getTestDates()
        let apiDates = await helper.get_tests_start_dates(jsonTests)
        let arrInArr = await helper.array_in_another_array(dates, apiDates)
        await expectChai(dates).to.equal(await dates.sort(), "Elements are not sorted correctly on UI")
        await expectChai(arrInArr).to.equal(true, "Elements of UI is not connected to api response")

        await MainPage.open()
        await MainPage.addProject(projectName)
        await MainPage.open()

        await MainPage.openProject(projectName)
        let newTestId = await api.createNewTest(SID, projectName, testName, testName, true)
        let base64img = await browser.saveScreenshot(path.join(__dirname, config.image.path))
        await api.attachLog(newTestId, projectName)
        await api.attachTestScreenshot(newTestId, base64img, config.image.type)
        await ProjectPage.waitForTest(testName)

    });
});
