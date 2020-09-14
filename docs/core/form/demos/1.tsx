import React from 'react';
import { Form, Button, Input, Checkbox } from '@wowjoy/core';
import { Input as AntInput, Radio, Switch } from 'antd';
import { TextField } from '@material-ui/core';
import 'antd/dist/antd.css';

export default () => (
  <>
    <Form
      defaultValues={{ a: 'aa' }}
      onSubmit={values => {
        console.log(values);
      }}
    >
      <Form.Item name="a" label="A" rules={{ required: 'xxx' }}>
        <input autoComplete="off" />
      </Form.Item>
      <Form.Item name="b" label="wowInput" required refKey="inputRef" defaultValue="b">
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="bb" label="control wowInput" required control defaultValue="bb">
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="c" label="AntInput" required>
        <AntInput autoComplete="off" />
      </Form.Item>
      <Form.Item name="cc" label="control AntInput" required control>
        <AntInput autoComplete="off" />
      </Form.Item>
      <Form.Item name="d" label="TextField" required refKey="inputRef">
        <TextField />
      </Form.Item>
      <Form.Item name="dd" label="control TextField" required control>
        <TextField />
      </Form.Item>
      <Form.Item name="checkbox" label="Checkbox" required control valuePropName="checked">
        <Checkbox />
      </Form.Item>
      <Form.Item name="radio" label="Radio" required control>
        <Radio.Group>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="switch" label="Switch" control valuePropName="checked">
        <Switch />
      </Form.Item>
      <Button type="submit">submit</Button>
    </Form>
  </>
);
