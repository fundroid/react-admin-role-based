import React from 'react';
import { hasAccess } from 'ra-auth-acl';

import {
    Create,
    TextInput,
    SimpleForm,
    required,
    SelectInput,
    ReferenceInput,
} from 'react-admin';

const CreateForm = ({ onCancel, ...props }) => (
    <Create title=" " {...props}>
        <SimpleForm >
            <TextInput source="name" validate={required()} />
            <TextInput source="username" validate={required()} />
            <TextInput source="password" type="password" validate={required()} />
            <TextInput source="phone" validate={required()} />
            <TextInput source="email" validate={required()} />
            <ReferenceInput label="Role" source="role" reference="roles"
                sort={{ field: 'name', order: 'ASC' }} perPage={10000}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export default CreateForm;