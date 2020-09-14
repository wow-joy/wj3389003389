import React from 'react';
import { Form, Button, Input } from '@wowjoy/core';

export default () => {
  return (
    <>
      <Form
        colon
        onSubmit={async values => {
          console.log(values);
        }}
        labelBoxProps={{ width: 150 }}
        valueBoxProps={{ width: 250 }}
      >
        <Form.Item name="user.name" label="Name" required>
          <Input />
        </Form.Item>
        <Form.Item name="user.email" label="Email" required="邮箱必填">
          <Input />
        </Form.Item>
        <Form.Item name="user.age" label="Age" rules={{ required: '年龄不能忘' }}>
          <Input />
        </Form.Item>
        <Form.Item name="phones[0]" label="Phone 1">
          <Input />
        </Form.Item>
        <Form.Item name="phones[1]" label="Phone 2">
          <Input />
        </Form.Item>
        <Form.Item name="children[0].name" label="Child 1 name">
          <Input />
        </Form.Item>
        <Form.Item name="children[1].name" label="Child 2 name">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="submit" color="primary">
            submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
