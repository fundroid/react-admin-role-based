import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin'; // eslint-disable-line import/no-unresolved

const RoleShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="role" />
        </SimpleShowLayout>
    </Show>
);

export default RoleShow;
