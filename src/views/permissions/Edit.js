import React from 'react';
import {
    Edit,
    TextInput,
    DisabledInput,
    SimpleForm,
    required,
} from 'react-admin';

const PermissionEdit = ({ onCancel, ...props }) => (
    <Edit title=" " {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Edit>
);

export default PermissionEdit;