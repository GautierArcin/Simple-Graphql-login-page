import { clearCache } from "../src/database/database";

export const beforeEachHelperJest = () => {
  clearCache();
};

export const afterEachHelperJest = () => {
  clearCache();
};

//  Error wrapper for error thrown
//  https://stackoverflow.com/questions/46042613/how-to-test-the-type-of-a-thrown-exception-in-jest
export class NoErrorThrownError extends Error {}
export const getError = async <TError>(
  call: () => unknown
): Promise<TError> => {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};
