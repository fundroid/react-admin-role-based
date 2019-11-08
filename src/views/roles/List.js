import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { push } from 'react-router-redux';
import { withStyles } from '@material-ui/core';

import {
    Datagrid,
    List,
    TextField,
    ShowButton,
    EditButton
} from 'react-admin';

const styles = {
    drawerContent: {
        width: 1000
    }
};

class RoleList extends React.Component {
    render() {
        const { push, classes, ...props } = this.props;
        return (
            <Fragment>
                <List {...props}>
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" />
                        <TextField source="role" />
                        <EditButton /><ShowButton />
                    </Datagrid>
                </List>
            </Fragment>
        );
    }
}

export default compose(
    connect(
        undefined,
        { push }
    ),
    withStyles(styles)
)(RoleList);