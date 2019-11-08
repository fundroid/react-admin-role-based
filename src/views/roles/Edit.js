import React from 'react';
import {
    Edit,
    TextInput,
    DisabledInput,
    SimpleForm,
    required,
} from 'react-admin';

const RoleEdit = ({ onCancel, ...props }) => (
    <Edit title=" " {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <TextInput source="name" validate={required()} />
            <TextInput source="role" validate={required()} />
            {/* <TextInput source="role" /> */}
        </SimpleForm>
    </Edit>
);

export default RoleEdit;