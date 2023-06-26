import React from 'react';

import Loader from './Loader';

export default {
  title: 'Loader',
};

function Template(args: any) {
  return <Loader {...args} />;
}

export const Default = Template.bind({});
