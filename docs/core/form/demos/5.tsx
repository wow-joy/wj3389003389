import { Button, Form, Input, useForm } from '@wowjoy/core';
import { Radio } from 'antd';
import React from 'react';

export default () => {
  const form = useForm({ defaultValues: { layout: 'horizontal' } });
  const layout = form.watch('layout');

  return (
    <>
      <Form
        colon
        form={form}
        layout={layout}
        onSubmit={values => {
          console.log(values);
        }}
        labelBoxProps={{ width: layout === 'horizontal' ? 1 / 6 : 'unset' }}
      >
        <Form.Item name="layout" label="layout" defaultValue="vertical">
          <Radio.Group>
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="a" label="Field A" required>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="b" label="Field B" required>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item>
          <Button type="submit">submit</Button>
        </Form.Item>
      </Form>
    </>
  );
};
