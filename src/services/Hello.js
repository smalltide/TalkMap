import _ from 'lodash';

export const sayHelloAsync = (message) => {
  return new Promise((resolve) => {
    _.delay(resolve, 2000, message);
  });
};
