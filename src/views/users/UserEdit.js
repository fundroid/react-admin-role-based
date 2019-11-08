import React from 'react';
import { hasAccess } from 'ra-auth-acl';

import {
    Edit,
    TextInput,
    DisabledInput,
    SimpleForm,
    required,
    SelectInput,
    ReferenceInput
} from 'react-admin';

const UserEdit = ({ permissions, onCancel, ...props }) => (
    <Edit title=" " { ...props}>
        <SimpleForm>
            <DisabledInput source = "id" />
            <TextInput source="name" validate={required()} />
            <TextInput source="username" validate={required()} />
            <TextInput source="password" type="password" validate={required()} />
            <TextInput source="phone" validate={required()} />
            <TextInput source="email" validate={required()} />
            {hasAccess(permissions, 'users.editRole') && 
                <ReferenceInput label="Role" source="role" reference="roles"
                    sort={{ field: 'name', order: 'ASC' }} perPage={10000}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
            }
        </SimpleForm>
    </Edit>
);

export default UserEdit;