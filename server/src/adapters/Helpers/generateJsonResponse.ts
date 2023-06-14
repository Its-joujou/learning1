export const sendJsonResponse = (
  status: string,
  message: string,
  accessToken: string
): { status: string; message: string; accessToken: string } => {
  return {
    status,
    message,
    accessToken,
  };
};

export const sendJsonResponseAdminRegister = (
  status: string,
  message: string,
) => {
  return {
    status,
    message,
  }
};