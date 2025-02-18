export type ApiSuccessResponse<Data> = {
  message: string;
  data: Data;
};

export type ApiErrorResponse<Error = never> = {
  response: {
    data: {
      message: string;
      error: Error;
    };
  };
};
