'use strict'

const jwt = require('jsonwebtoken');
const axios = require('axios');
const {dataStore} = require('./observable/store');

let getCookie = (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

module.exports.getCookie = () => {
    try {
        let banhjiCookie = getCookie('banhji-token');
        if (banhjiCookie !== '') {
            const cookie = jwt.verify(banhjiCookie, process.env.VUE_APP_JWT_SESCRET);

            /* Apply token to global axios defaults */
            const AUTH_TOKEN = cookie.accessToken;

            // Request interceptor for API calls
            axios.interceptors.request.use(function (config) {
                // Do something before request is sent
                config.headers = {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                }

                return config;
            }, function (error) {
                // Do something with request error
                return Promise.reject(error);
            });

            // Response interceptor for API calls
            axios.interceptors.response.use((response) => {
                return response
            }, async function (error) {
                const originalRequest = error.config;
                if (error.response.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;

                    return axios(originalRequest);
                }

                return Promise.reject(error);
            });

            // axios.defaults.baseURL = 'https://dev-apis.banhji.com';
            // Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
            // See below for an example using Custom instance defaults instead.
            // axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
            // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

            return cookie;
        } else {
            dataStore.isValidUser = false
            return {
                instituteId: '',
                creator: '',
                user: '',
                name: '',
                email: '',
                plan: '',
                accessToken: '',
            }
        }
    } catch (error) {
        window.console.error(error);
        return false; /* For auth validation */
    }
}