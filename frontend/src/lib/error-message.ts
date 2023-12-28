export const getErrorMessage = (error: any): string => {
  // error can be an array of error messages or single message so i need to check it first
  const errMsg =
    typeof error.response.data.message === "string"
      ? error.response.data.message
      : null;
  const err: string =
    errMsg ||
    error.response.data.message[0] ||
    error.message ||
    "Something`s wrong happen";

  return err;
};
