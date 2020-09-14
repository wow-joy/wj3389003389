import React from 'react';
import { Form, Button, Input } from '@wowjoy/core';

export default () => (
  <>
    <Form
      onSubmit={values => {
        console.log(values);
      }}
      // defaultValues={{ b: 'b', c: 'c' }}
    >
      <Form.Item name="a" label="A" refKey="inputRef" control required>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="b" label="B" refKey="inputRef" control required="必须输入B!">
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="c" label="C" refKey="inputRef" control rules={{ required: '漏了 C 了' }}>
        <Input autoComplete="off" />
      </Form.Item>
      <Button type="submit">submit</Button>
    </Form>
  </>
);
