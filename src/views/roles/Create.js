import React from 'react';
import {
    Create,
    TextInput,
    SimpleForm,
    required,
} from 'react-admin';

const RoleCreate = ({ onCancel, ...props }) => (
    <Create title=" " {...props}>
        <SimpleForm >
        <TextInput source="name" validate={required()} />
        <TextInput source="role" validate={required()} />
        {/* <SelectInput source="role" validate={required()} choices={CATEGORIES} /> */}
        </SimpleForm>
    </Create>
);

export default RoleCreate;