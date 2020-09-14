---
group:
  title: Form 表单
title: debug
---

```tsx
/**
 * title: 多表单联动
 * desc: 通过 Form.Provider 在表单间处理数据。本例子中，Modal 的确认按钮在 Form 之外，通过 form.handleSubmit 方法调用表单提交功能。反之，则推荐使用 `<Button type="submit" />` 调用 web 原生提交逻辑。
 */
import { Form, Button, Input, Box, Dialog, useForm2 } from '@wowjoy/core';
import React, { useState } from 'react';
import { FormProvider, useFormContext, useForm } from 'react-hook-form';
import { useToggle } from '@wowjoy/hooks';
import { Upset, UserAvatar } from '@wowjoy/icons';
import { useForkRef } from '@wowjoy/hooks';

const ModalForm = ({ open, onClose }) => {
  const form = Form.useForm();
  const formRef = React.useRef();

  return (
    <Dialog title="Basic Drawer" open={open} onClose={onClose}>
      <Form form={form} layout="vertical" name="userForm" onSubmit={() => onClose()}>
        <Form.Item name="name" label="User Name" required>
          <Input />
        </Form.Item>
        <Form.Item name="age" label="User Age" required>
          <Input />
        </Form.Item>
        <Form.Item></Form.Item>
      </Form>
      <Button
        onClick={() => {
          form.submit();
          onClose();
        }}
      >
        Submit
      </Button>
    </Dialog>
  );
};

export default () => {
  const [open, toggle] = useToggle(false);
  const form = useForm();
  const onSubmit = values => {
    console.log('onSubmit: ', values);
  };

  React.useEffect(() => {
    form.register('users');
  }, []);

  return (
    <Form.Provider
      onFormSubmit={(name, { form, forms }) => {
        if (name === 'userForm') {
          const { basicForm } = forms;
          const users = basicForm.getValues('users') || [];
          basicForm.setValue('users', [...users, form.getValues()]);
        }
      }}
    >
      <Form colon form={form} name="basicForm" onSubmit={onSubmit} labelBoxProps={{ width: 100 }}>
        <Form.Item name="group" label="Group Name">
          <Input />
        </Form.Item>
        <Form.Item label="User List">
          {({ watch, getValues }) => {
            const users = watch('users');
            return users?.length ? (
              <Box>
                {users.map((user, i) => (
                  <Box key={i} display="flex" alignItems="center" height={32}>
                    <UserAvatar style={{ marginRight: 4 }} />
                    {user.name} - {user.age}
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                flexCenter
                css={`
                  > svg {
                    margin: 0 8px;
                  }
                `}
              >
                (<Upset />
                No user yet.)
              </Box>
            );
          }}
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
          <Button style={{ margin: '0 8px' }} onClick={() => toggle(true)}>
            Add User
          </Button>
        </Form.Item>
      </Form>
      <ModalForm open={open} onClose={() => toggle(false)} />
    </Form.Provider>
  );
};
```
