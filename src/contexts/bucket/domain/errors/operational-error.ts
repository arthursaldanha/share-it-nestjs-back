export class OperationalError extends Error {
  constructor(
    message: string,
    public code?: number,
    public data?: number,
  ) {
    super(message);
    this.code = code ?? 10000;
  }
}
