export const getErrorMessage = (error: any): string => {
  // error can be an array of error messages or single message so i need to check it first
  var errMsg = null;
  console.log(error);
  if (error.response) {
    errMsg =
      typeof error.response.data.message === "string"
        ? error.response.data.message
        : error.response.data.message[0]
        ? error.response.data.message[0]
        : null;
  }
  const err: string = errMsg || error.message || "Something`s wrong happen";

  return err;
};
