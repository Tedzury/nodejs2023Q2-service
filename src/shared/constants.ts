const ERR_MSG = {
  INVALID_ID: 'Provided ID is not valid. Provide ID in UUID format',
  USER_NOT_FOUND:
    'There is no such user with provided ID in database. Check your user ID one more time.',
  WRONG_PASS:
    "Current password doesn't match with provided password. Check field oldPassword, it must match with current password.",
};

export { ERR_MSG };