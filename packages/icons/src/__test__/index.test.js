import * as Icons from '../index';
import React from 'react';
import renderer from 'react-test-renderer';

it('render all icons', () => {
  Object.values(Icons).forEach(Icon => {
    const IconJSON = renderer.create(<Icon />).toJSON();
    expect(IconJSON).toMatchSnapshot();
  });
});
