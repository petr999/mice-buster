/**
 * ABSTRACT: Reply with id supplied as a number after random delay
 * thus jump for lure
 */

import {get, param, response, ResponseObject} from '@loopback/rest';

// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/core';

/**
 * Constants
 */
// Maximum number of seconds to delay the jump for lure
const DELAY_SECONDS_MAX = 100

/**
 * OpenAPI response for lure()
 */
const LureResponse: ResponseObject = {
  description: 'Lure Response: jump!',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'LureResponse',
        properties: {
          delay: {type: 'number'},
          date: {type: 'string'},
          lureId: {type: 'number'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export class MouseController {
  constructor() { }

  @get('/lure/{lureId}')
  @response(200, LureResponse)
  async lure(
    @param.path.integer('lureId') lureId: number,
  ): Promise<object> {
    const delay: number = Math.round(DELAY_SECONDS_MAX * Math.random())
    const date = new Date()
    const rv = {
      delay, date, lureId,
    }
    await new Promise(resolve =>
      setTimeout(resolve, 1000 * delay)
    )
    return rv
  }
}
