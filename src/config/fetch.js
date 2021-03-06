import { geturl } from './env'
export default async(type = 'GET', url = '', data = {}, method = '', isFile = false, headers = false) => {

    type = type.toUpperCase();

    url = geturl() + url;

    if (type == 'GET') {

        let dataStr = ''; //数据拼接字符串

        Object.keys(data).forEach(key => {

            dataStr += key + '=' + data[key] + '&';

        })

        if (dataStr !== '') {

            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            //参数拼接
            url = url + '?' + dataStr;
        }
    }

    if (window.fetch && method == 'fetch') {

        let requestConfig = {
            credentials: 'include',
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },
            mode: "cors",
            cache: "default"
        }

        if (type == 'POST') {

            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }

        try {

            var response = await fetch(url, requestConfig);
            var responseJson = await response.json();

        } catch (error) {

            throw new Error(error)
        }

        return responseJson

    } else {

        return new Promise(function(resolve, reject) {
            let requestObj;

            if (window.XMLHttpRequest) {

                requestObj = new XMLHttpRequest();

            } else {

                requestObj = new ActiveXObject;

            }

            let sendData = '';
            if (type == 'POST') {
                if (isFile) {
                    sendData = data;
                } else {
                    if (headers) {
                        sendData = data;
                    } else {
                        Object.keys(data).forEach(key => {
                            sendData += key + '=' + data[key] + '&';
                        })
                    }
                }
            }
            requestObj.open(type, url, true);
            if (!isFile) {
                if (headers) {
                    requestObj.setRequestHeader("Content-type", "text/plain;charset=utf-8");
                } else {
                    requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                }
                //requestObj.setRequestHeader("Content-type", "application/json;charset=utf-8");
                //requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
            requestObj.send(sendData);
            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response;
                        if (typeof obj !== 'object') {
                            obj = (obj);
                        }
                        return resolve(obj)
                    } else {
                        return reject(url + "  接口请求出错");
                        throw new Error(requestObj)
                    }
                }
            }
        })
    }
}