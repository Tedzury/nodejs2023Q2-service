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

const formatUser = (user) => {
  return {
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: new Date(user.createdAt).getTime(),
    updatedAt: new Date(user.updatedAt).getTime(),
  };
};

export { getTimeStamp, buildValidationErrMsg, formatUser };
