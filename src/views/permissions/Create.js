import React from 'react';
import {
    Create,
    TextInput,
    SimpleForm,
    required,
    ReferenceInput,
    SelectInput,
    CheckboxGroupInput
} from 'react-admin';

const PermissionCreate = ({ onCancel, ...props }) => (
    <Create title=" " {...props}>
        <SimpleForm >
            <TextInput source="name" validate={required()} />
            <CheckboxGroupInput source="views" choices={[
                { id: 'list', name: 'List' },
                { id: 'show', name: 'Show' },
                { id: 'edit', name: 'Edit' },
                { id: 'create', name: 'Create' },
            ]} />
            <ReferenceInput label="Role" source="role" reference="roles"
                sort={{ field: 'name', order: 'ASC' }} perPage={10000}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export default PermissionCreate;