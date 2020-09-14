import React from 'react';
import { Form, Button, Input, useForm } from '@wowjoy/core';

export default () => {
  const form = useForm({ defaultValues: { a: 'aaa' } });

  return (
    <>
      <Form form={form}>
        <Form.Item name="a" label="A" refKey="inputRef" required>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="b" label="B" refKey="inputRef" required="必须输入B!">
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="c" label="C" refKey="inputRef" rules={{ required: '漏了 C 了' }}>
          <Input autoComplete="off" />
        </Form.Item>
        <Button type="submit">submit</Button>
      </Form>
    </>
  );
};
