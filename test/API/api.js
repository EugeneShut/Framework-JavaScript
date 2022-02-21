import config from '../../config'
import baseApi from '../../BASE/baseApi'
import logger from '@wdio/logger'
import FormData from 'form-data'


const log = logger(config.projectName)


const HOST = config.API.host
const VERSION = config.API.v

const VARIANT = "variant"
const PROJECTID = "projectId"
const SID = "SID"
const PROJECTNAME = "projectName"
const TESTNAME = "testName"
const METHODNAME = "methodName"
const ENV = "env"
const TESTID = "testId"
const CONTENT = "content"
const CONTENTTYPE = "contentType"


class API {

    getTokenEndpoint = "/token/get"
    getTestsJsonEndpoint = "/test/get/json"
    createNewTestEndpoint = "/test/put"
    screenshotAttachEndpoint = "/test/put/attachment"
    testPutLog = "/test/put/log"

    async getToken() {
        return browser.call(async () => {
            try {
                let response = await baseApi.postRequest(`${HOST}${this.getTokenEndpoint}?${VARIANT}=${VERSION}`)
                return response.data;
            } catch (err) {
                log.info(err)
            }
        })
    }

    async getTests(projectId) {
        return browser.call(async () => {
            try {
                let response = await baseApi.postRequest(`${HOST}${this.getTestsJsonEndpoint}?${PROJECTID}=${projectId}`)
                return response.data;
            } catch (err) {
                return err;
            }
        })
    }

    async createNewTest(sid, projectName, testName, methodName, env) {
        return browser.call(async() => {
            try {
                let response = await baseApi.postRequest(`${HOST}${this.createNewTestEndpoint}?${SID}=${sid}&${PROJECTNAME}=${projectName}&${TESTNAME}=${testName}&${METHODNAME}=${methodName}&${ENV}=${env}`)
                return response.data;
            } catch (err) {
                return err;
            }
        })
    }

    async attachTestScreenshot(testId, content, contentType) {
        return browser.call(async () => {
            try {
                let response = await baseApi.postRequest(`${HOST}${this.screenshotAttachEndpoint}?${TESTID}=${testId}&${CONTENT}=${content}&${CONTENTTYPE}=${contentType}`)
                return response.data;
            } catch (err) {
                return err;
            }
        })
    }


    async attachLog(testId, content) {
        return browser.call(async () => {
            try {
                let response = await baseApi.postRequest(`${HOST}${this.testPutLog}?${TESTID}=${testId}&${CONTENT}=${content}`)
                return response.data;
            } catch (err) {
                return err;
            }
        })
    }

}
export default new API();
