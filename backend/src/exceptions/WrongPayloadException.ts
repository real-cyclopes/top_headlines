import HttpException from './HttpException';

class WrongPayloadException extends HttpException {
  constructor(fieldName: string, fieldValue: string) {
    super(400, `${fieldValue} for ${fieldName} is invalid`);
  }
}

export default WrongPayloadException;
