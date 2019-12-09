import React from 'react';
import renderer from 'react-test-renderer';
import Notification from '../Notification';

it('Notification render top 200', () => {
  expect(<Notification top={200} />).toMatchSnapshot();
});

it('Notification test', () => {
  const notification = renderer.create(<Notification top={200} />);
  const instance = notification.getInstance();
  instance.add({ key: 1, content: <div key={1}>1</div> });
  instance.add({ key: 2, content: <div key={2}>2</div> });
  expect(instance.state.notices.length).toBe(2);
  expect(instance.state.notices[0].content).toEqual(<div key={1}>1</div>);
  instance.remove(3);
  expect(instance.state.notices.length).toBe(2);
  instance.remove(1);
  expect(instance.state.notices.length).toBe(1);
  instance.destroy();
  expect(instance.state.notices.length).toBe(0);
});
