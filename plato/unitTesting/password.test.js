function testPasswords(password, confirmPassword) {
  let passwordRequirementsError = false;
  let passwordLengthError = false;
  let passwordMatchError = false;
  let minPasswordLength = 8;

  if (password === confirmPassword) {
    if (password.length >= minPasswordLength) {
      if (password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)) {
      } else {
        passwordRequirementsError = true;
      }
    } else {
      passwordLengthError = true;
    }
  } else {
    passwordMatchError = true;
  }

  return {
    passwordRequirementsError,
    passwordLengthError,
    passwordMatchError,
  };
}

test('Valid password', () => {
  const result = testPasswords('StrongPassword123@', 'StrongPassword123@');
  expect(result).toEqual({ passwordRequirementsError: false, passwordLengthError: false, passwordMatchError: false });
});

test('Weak password', () => {
  const result = testPasswords('weakpassword', 'weakpassword');
  expect(result).toEqual({ passwordRequirementsError: true, passwordLengthError: false, passwordMatchError: false });
});

test('Short password', () => {
  const result = testPasswords('2Short@', '2Short@');
  expect(result).toEqual({ passwordRequirementsError: false, passwordLengthError: true, passwordMatchError: false });
});

test('Mismatched password', () => {
  const result = testPasswords('Password123@', 'MismatchedPassword');
  expect(result).toEqual({ passwordRequirementsError: false, passwordLengthError: false, passwordMatchError: true });
});