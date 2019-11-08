import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin'; // eslint-disable-line import/no-unresolved

const PermissionShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <TextField source="password" />
            <TextField source="role" />
        </SimpleShowLayout>
    </Show>
);

export default PermissionShow;
