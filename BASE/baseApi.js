import axios from 'axios';
import logger from '@wdio/logger'
import config from '../config.json'
import FormData from 'form-data'

let data = new FormData();
const log = logger(config.projectName)


class BaseApi {
    POST = "post"
    GET = "get"

    async postRequest(url) {
        try {
            let config = {
                method: this.POST,
                url: url,
                headers: {
                    'Cookie': 'remixlang=114',
                    ...data.getHeaders()
                }
            }
            return await axios(config)
        } catch(err) {
            log.info(err)
        }
    }

}
export default new BaseApi();
