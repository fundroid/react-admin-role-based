// in src/authProvider.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';
import {getJwtKey} from "../config/security"
import { buildFullAccessFor } from 'ra-auth-acl';

const permissions = {
    admin: {
        ...buildFullAccessFor(['posts', 'users', 'roles', 'permissions']),
    },
    sales: {
        ...buildFullAccessFor(['posts']),
        users: {enabled: true, list:true, show:true, editRole: false}
    },
};

export default (type, params) => {
    var jwt = require('jsonwebtoken');

    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const base_url = process.env.REACT_APP_API_URL
        const request = new Request(base_url + '/users/authenticate', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })

        return fetch(request)
            .then((res) => {
                if (res.status < 200 || res.status >= 300) {
                    localStorage.removeItem('token');
                    return Promise.reject();
                }
                return res.json()
            })
            .then((json) => {
                if (json.success) {
                    let data = jwt.verify(json.token, getJwtKey())
                    console.log(data)
                    if(data) {
                        localStorage.setItem('token', json.token);
                        return Promise.resolve();
                    } else {
                        return Promise.reject();
                    }
                } else {
                    return Promise.reject();
                }
            });
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        // const { resource } = params;
        // if (resource === 'users') {
        //     // check credentials for the comments resource
            // return localStorage.getItem('role') === 'admin'
            // ? Promise.resolve()
            // : Promise.reject({ redirectTo: '/no-access' });
        // } else {
            return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject({ redirectTo: '/login' });
        // }
    }
    if (type === AUTH_GET_PERMISSIONS) {
        console.log("------=====-------permissions--------========-------")
        console.log(permissions)
        const token = localStorage.getItem('token');
        let decodedToken = jwt.verify(token, getJwtKey())
        const role = decodedToken.role
        return role ? Promise.resolve(permissions[role]) : Promise.reject();
        // return decodedToken.role ? Promise.resolve(decodedToken.role) : Promise.reject();
    }
    return Promise.reject('Unknown method');
};