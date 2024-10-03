import HttpException from './HttpException';

class NotFoundException extends HttpException {
  constructor(fieldName: string, fieldValue: string) {
    super(404, `${fieldValue} for ${fieldName} not exist`);
  }
}

export default NotFoundException;
