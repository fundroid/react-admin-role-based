import './App.css';

import React from 'react';
import { ResourceWithPermissions } from 'ra-auth-acl';
import { fetchUtils, Admin } from 'react-admin';
import CustomDataProvider from "./dataProvider/CustomDataProvider";
import authProvider from './auth/authProvider';
//layouts
import Dashboard from './views/layout/Dashboard';

//resources
import Roles from './views/roles';
import UserPermissions from './views/permissions';
import Users from './views/users';
import Posts from './views/posts';

// import UserList from './views/users/UserList';
// import UserCreate from './views/users/UserCreate';
// import UserShow from './views/users/UserShow';
// import UserEdit from './views/users/UserEdit';
// import UserIcon from '@material-ui/icons/Person';


// import jsonServerProvider from 'ra-data-json-server';
// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

const httpClient = (url, options = {}) => {
    console.log("url", url);
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    const token = localStorage.getItem("token");
    if (token) {
        options.headers.set("Authorization", `Bearer ${token}`);
        options.headers.set("access_token", token);
    }

    return fetchUtils.fetchJson(url, options);
};

const dataProvider = CustomDataProvider(process.env.REACT_APP_API_URL, httpClient);

const App = () => (
    <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}>
        {permissions => [
            <ResourceWithPermissions name="posts" permissions={permissions} {...Posts}/>,
            <ResourceWithPermissions name="users" permissions={permissions} {...Users} />,
            <ResourceWithPermissions name="roles" permissions={permissions} {...Roles}  />,
            <ResourceWithPermissions name="permissions" permissions={permissions} {...UserPermissions}  />
        ]}

    </Admin>
);

export default App;