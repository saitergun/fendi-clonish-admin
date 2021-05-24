import { Children } from 'react';

const getChildByTypeName = (children, typeName) => {
  return Children.map(children, (child) => {
    if (child?.type?.name === typeName) {
      return child;
    }

    return null;
  });
};

export default getChildByTypeName;
