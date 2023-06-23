export class HttpError extends Error {
  constructor(public statusCode: number, body: Record<string, unknown> = {}) {
    super(JSON.stringify(body));
  }
}

export const handleError = (e): { status: number; message: string } => {
  if (e instanceof HttpError) {
    return {
      status: e.statusCode,
      message: e.message,
    };
  }
  return {
    status: 500,
    message: e,
  };
};
