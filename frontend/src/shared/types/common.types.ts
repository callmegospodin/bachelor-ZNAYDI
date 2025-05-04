type ErrorType = {
  errorCode: number;
  message: string;
};

export type ErrorContextType = {
  name: string;
  statusCode: number;
  errors: ErrorType[];
};
