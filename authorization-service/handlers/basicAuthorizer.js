'use strict';
import { constants as httpConstants } from 'http2';
import { createResponse } from '../common/common';

export const handler = async event => {
  try {
    return createResponse(httpConstants.HTTP_STATUS_OK, '');
  } catch (error) {
    return createResponse(error.statusCode || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR, { error: error.message });
  }
};
