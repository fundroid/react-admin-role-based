import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { push } from 'react-router-redux';
import { withStyles } from '@material-ui/core';
import MyUrlField from '../customFields/MyUriField';
import { hasAccess } from 'ra-auth-acl';
import UserEditEmbedded from './UserEditEmbedded';


import {
    Datagrid,
    List,
    TextField,
    Filter,
    TextInput,
    SimpleList,
    Responsive,
} from 'react-admin';

const styles = {
    drawerContent: {
        width: 1000
    }
};

const UserFilter = ({ permissions, ...props }) =>
    <Filter {...props}>
        <TextInput
            label="user.list.search"
            source="q"
            alwaysOn
        />
        <TextInput source="name" />
        {permissions === 'admin' ? <TextInput source="role" /> : null}
    </Filter>;

class UserList extends React.Component {
    render() {
        const { permissions, push, classes, ...props } = this.props;
        return (
            <List
                {...props}
                filters={<UserFilter permissions={permissions} />}
                sort={{ field: 'name', order: 'ASC' }}
            >
                <Responsive
                    small={
                        <SimpleList
                            primaryText={record => record.name}
                            secondaryText={record =>
                                permissions === 'admin' ? record.role : null}
                        />
                    }
                    medium={
                        // <Datagrid>
                        //     <TextField source="id" />
                        //     <TextField source="name" />
                        //     {permissions === 'admin' && <TextField source="role" />}
                        //     {permissions === 'admin' && <EditButton />}
                        //     <ShowButton />
                        // </Datagrid>
                        // <Datagrid rowClick={hasAccess(permissions, 'users.edit') ? 'edit' : 'show'} expand={<UserEditEmbedded />}>
                        <Datagrid rowClick={hasAccess(permissions, 'users.edit') ? 'edit' : 'show'}>
                            <TextField source="id" />
                            <TextField source="name" />
                            {hasAccess(permissions, 'users.editRole') && <TextField source="role" />}
                        </Datagrid>
                    }
                />
            </List>
        );
    }
}

export default compose(
    connect(
        undefined,
        { push }
    ),
    withStyles(styles)
)(UserList);