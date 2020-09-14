```tsx
import React from 'react';
import { Input, Form, Button } from '@wowjoy/core';
import { CloseFillCircle } from '@wowjoy/icons';

export default function App() {
  return (
    <Form
      onSubmit={e => {
        console.log(e);
      }}
      labelBoxProps={{ width: 100 }}
      valueBoxProps={{ width: 200 }}
    >
      <Form.Item name="a" label="A" required="Should be combination of numbers & alphabets">
        <Input autoComplete="off" />
      </Form.Item>

      <Button type="submit">submit</Button>
    </Form>
  );
}
```
