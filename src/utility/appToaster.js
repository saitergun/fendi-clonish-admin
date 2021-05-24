import {
  Position,
  Toaster,
} from '@blueprintjs/core';

const appToaster = Toaster.create({
  position: Position.TOP,
  timeout: 3000,
  maxToasts: 3,
});

export default appToaster;
