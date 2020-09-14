import React from 'react';
import { Form, Button, Input, useForm, useWatch } from '@wowjoy/core';

const Child = ({ control }) => {
  const a = useWatch({ control, name: 'a', defaultValue: 'default' });
  return <div>{a}</div>;
};

export default () => {
  const form = useForm();

  console.log('render when a changed', form.watch('a'));

  return (
    <>
      <Form
        form={form}
        onSubmit={values => {
          console.log(values);
        }}
      >
        <Form.Item name="a" label="A">
          <Input autoComplete="off" />
        </Form.Item>
        <Child control={form.control} />
        <Button type="submit">submit</Button>
      </Form>
    </>
  );
};
