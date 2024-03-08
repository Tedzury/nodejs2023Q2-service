import { ValidationError } from 'class-validator';

const getTimeStamp = (): number => Date.now();

const buildValidationErrMsg = (errList: ValidationError[]) => {
  return errList.reduce((acc, curr, i) => {
    let str = Object.values(curr.constraints).join(', ');
    if (i < errList.length - 1) {
      str = str.concat(', ');
    } else {
      str = str.concat('.');
    }
    return acc.concat(str);
  }, 'You are trying to pass invalid object for such operation. Here is list of errors made: ');
};

export { getTimeStamp, buildValidationErrMsg };
