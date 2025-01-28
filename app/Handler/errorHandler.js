class ErrorHandler extends Error {
  /**
   * @param {{
   *  httpCode: number, statusCode: number | string, result?: object, message?: string
   * }} param0
   */
  constructor({httpCode = 500, statusCode = 5000, result = {}, message}) {
    super("");
    this.result     = result;
    this.message    = message ? message : "";
    this.httpCode   = httpCode;
    this.statusCode = statusCode;
  }
}
module.exports = ErrorHandler;