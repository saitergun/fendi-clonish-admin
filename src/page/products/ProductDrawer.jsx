import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { has, result } from 'lodash';
import { withRouter } from 'react-router-dom';

import {
  Button,
  FormGroup,
  InputGroup,
  NumericInput,
  TextArea,
} from '@blueprintjs/core';

import {
  Popover2,
} from '@blueprintjs/popover2';

import API from '../../utility/api';
import appToaster from '../../utility/appToaster';

import SelectFilterable from '../../component/SelectFilterable';

const INITIAL_FORM = {
  code: '',
  title: '',
  name: '',
  price: '',
  category: null,
  short_description: '',
};

const createForm = (product) => ({
  code: product.code,
  title: product.title,
  name: product.name,
  price: product.price,
  category: product.category?.id ?? null,
  short_description: product.short_description,
});

const DeletePopover = ({ deleting, onDelete }) => {
  return (
    <div className="w-80 p-4">
      <h3 className="font-700 text-16/16">Delete Confirmation</h3>

      <p className="mt-2">Product delete message will be here.</p>

      <div className="flex items-center gap-4 mt-4">
        <Button
          intent="danger"
          text="YES. DELETE IT."
          loading={deleting}
          disabled={deleting}
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

const FormItem = ({ label, property, errors, required, component: Component, componentProps }) => {
  return (
    <FormGroup
      label={label}
      labelInfo={required ? '*' : undefined}
      helperText={result(errors, property)}
      intent={has(errors, property) ? 'danger' : undefined}
    >
      <Component
        id={property}
        intent={has(errors, property) ? 'danger' : undefined}
        required={required}
        {...componentProps}
      />
    </FormGroup>
  );
};

const ProductDrawer = ({ product, categories, create, onClose, onCreate, onUpdate, onDelete }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState(null);

  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const selectedCategory = useMemo(() => {
    if (!form.category) {
      return null;
    }

    return categories.find((cat) => cat.id === form.category);
  }, [form.category]);

  // set form/formErrors
  useEffect(() => {
    if (product && !create) {
      setForm(createForm(product));
    } else {
      setForm(INITIAL_FORM);
    }

    setFormErrors(null);
  }, [product, create]);

  const handleCreate = useCallback((e) => {
    e.preventDefault();

    setCreating(true);
    setFormErrors(null);

    API.post('products', form).then((response) => {
      onCreate(response.data);

      appToaster.show({
        message: 'Product creating successful',
        intent: 'success',
        timeout: 1000,
      });
    }).catch((error) => {
      if (error?.response?.data?.data?.errors) {
        setFormErrors(error.response.data.data.errors);

        appToaster.show({
          message: 'An error occured',
          intent: 'danger',
        });
      } else {
        appToaster.show({
          message: 'Unexpected error occured',
          intent: 'danger',
        });
      }
    }).finally(() => setCreating(false));
  }, [product, form]);

  const handleUpdate = useCallback((e) => {
    e.preventDefault();

    setUpdating(true);
    setFormErrors(null);

    API.put(`products/${product.id}`, form).then((response) => {
      setForm(createForm(response.data));
      onUpdate(response.data);

      appToaster.show({
        message: 'Product updating successful',
        intent: 'success',
        timeout: 1000,
      });
    }).catch((error) => {
      if (error?.response?.data?.data?.errors) {
        setFormErrors(error.response.data.data.errors);

        appToaster.show({
          message: 'An error occured',
          intent: 'danger',
        });
      } else {
        appToaster.show({
          message: 'Unexpected error occured',
          intent: 'danger',
        });
      }
    }).finally(() => setUpdating(false));
  }, [product, form]);

  const handleDelete = useCallback((e) => {
    e.preventDefault();

    setDeleting(true);

    setTimeout(() => {
      setDeleting(false);

      appToaster.show({
        message: 'Product deleting successful',
        intent: 'success',
        timeout: 1000,
      });

      if (onDelete) {
        onDelete();
      }
    }, 500);
  }, [product]);

  return (
    <div className="w-96 h-full flex flex-col overflow-hidden">
      <nav className="w-full h-14 flex-shrink-0 flex items-center justify-between border-b overflow-hidden px-6">
        <div>
          <Button
            icon="drawer-left"
            onClick={onClose}
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          {!create && (
            <>
              <Button
                intent="success"
                text="UPDATE"
                disabled={updating}
                loading={updating}
                onClick={handleUpdate}
              />

              <Popover2
                placement="bottom-end"
                usePortal={false}
                content={<DeletePopover deleting={deleting} onDelete={handleDelete} />}
              >
                <Button
                  intent="danger"
                  icon="trash"
                />
              </Popover2>
            </>
          )}

          {create && (
            <>
              <Button
                intent="success"
                text="CREATE"
                disabled={creating}
                loading={creating}
                onClick={handleCreate}
              />
            </>
          )}
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto py-6 px-6">
        <FormItem
          property="code"
          label="Code"
          errors={formErrors}
          required

          component={InputGroup}
          componentProps={{
            value: result(form, 'code', ''),
            onChange: ({ currentTarget }) => setForm({ ...form, code: currentTarget.value }),
          }}
        />

        <FormItem
          property="title"
          label="Title"
          errors={formErrors}
          required

          component={InputGroup}
          componentProps={{
            value: result(form, 'title', ''),
            onChange: ({ currentTarget }) => setForm({ ...form, title: currentTarget.value }),
          }}
        />

        <FormItem
          property="name"
          label="Name"
          errors={formErrors}
          required

          component={InputGroup}
          componentProps={{
            value: result(form, 'name', ''),
            onChange: ({ currentTarget }) => setForm({ ...form, name: currentTarget.value }),
          }}
        />

        <FormItem
          property="price"
          label="Price"
          errors={formErrors}
          required

          component={NumericInput}
          componentProps={{
            value: result(form, 'price', ''),
            onValueChange: (_, price) => setForm({ ...form, price }),
            minorStepSize: 0.01,
          }}
        />

        <FormGroup
          label="Category"
        >
          <SelectFilterable
            items={categories.map((cat) => ({ key: cat.id, value: cat.name_full }))}
            selectedItem={selectedCategory ? { key: selectedCategory.id, value: selectedCategory.name_full } : null}
            onSelect={(item) => setForm({ ...form, category: item.key })}
          />
        </FormGroup>

        <FormItem
          property="short_description"
          label="Short Description"
          errors={formErrors}

          component={TextArea}
          componentProps={{
            value: result(form, 'short_description', ''),
            growVertically: true,
            fill: true,
            onChange: ({ currentTarget }) => setForm({ ...form, short_description: currentTarget.value }),
          }}
        />
      </main>
    </div>
  );
};

export default withRouter(ProductDrawer);
