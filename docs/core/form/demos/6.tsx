import React from 'react';
import { Form, Button, Input, Box } from '@wowjoy/core';
import { MinusCircle } from '@wowjoy/icons';

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
        <Form.List name="person">
          {({ fields, append, remove }) => {
            return (
              <>
                {fields.map((item, index) => (
                  <Form.Item
                    key={item.id}
                    label={index === 0 ? 'person' : ''}
                    itemControlBoxProps={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Form.Item
                      required
                      noStyle
                      name={`person[${index}].firstName`}
                      defaultValue={item.firstName} // 必需
                    >
                      <Input autoComplete="off" style={{ width: 150 }} />
                    </Form.Item>
                    {index !== 0 && (
                      <Box
                        as={MinusCircle}
                        width={24}
                        height={24}
                        ml={2}
                        onClick={() => remove(index)}
                      />
                    )}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="button"
                    style={{ width: 200 }}
                    onClick={() => append({ firstName: '' })}
                  >
                    append
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button type="submit" color="primary">
            submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
