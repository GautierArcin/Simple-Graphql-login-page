// Simple regex to check for email correctness
export const validateEmail = (email: string): boolean => {
  // We could use a better regex, see https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp("^[^\s@]+@[^\s@]+\\.[^\s@]{2,}$", "gm");
  const test = regex.test(email);
  // console.log("email : ", email, ", test : ", test);
  return test;
};
