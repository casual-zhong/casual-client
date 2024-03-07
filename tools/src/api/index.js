import { httpGet, httpPost } from '@/utils/request.js'

const mail = data => httpPost('/mail', data)

const test = data => httpGet('/test', data)

export default {
    mail,test
}