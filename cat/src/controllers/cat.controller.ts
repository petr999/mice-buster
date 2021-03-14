import {inject} from '@loopback/core';
import {AnyObject} from '@loopback/repository';
import {get, param} from '@loopback/rest';
import {Mouse, MouseService} from '../services';

/**
 * Constants
 */
// Maximum number of seconds to delay the jump for lure
const DELAY_SECONDS_MAX = 3

export const MouseSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    queueId: {type: 'number'},
    body: {type: 'object', partial: true, },
  },
};

export type MouseResponse = {
  queueId: number;
  body?: Mouse;
}

export class CatController {
  constructor(
    @inject('services.MouseService')
    protected mouseService: MouseService
  ) { }

  @get('/mouse/{mouseId}', {
    responses: {
      '200': {
        description: 'lure mouse till jump or timeout',
        //        schema: MouseSchema,
        content: {'application/json': {schema: MouseSchema}},
      },
    },
  })
  async getMouseById(@param.path.number('mouseId') mouseId: number): Promise<MouseResponse> {
    const mouseResponsePromise = this.mouseService.lure({lureId: mouseId})
    const timeoutPromise = this.getTimeoutPromise()
    const mouseResponse = await Promise.race([mouseResponsePromise, timeoutPromise])
    const body = mouseResponse.body
    const queueId = await this.getQueueId()
    const response: MouseResponse = {queueId}
    if ('object' == typeof (body)) {response.body = body}
    return response
  }

  // Mock one
  async getQueueId() {
    let rv = Math.random()
    rv *= 1000000
    rv = Math.floor(rv)

    return rv
  }

  // Mock one
  async getTimeoutPromise(): Promise<AnyObject> {
    return new Promise(resolve => setTimeout(() => {resolve({});}, 1000 * DELAY_SECONDS_MAX))

  }

}
