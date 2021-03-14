import {inject} from '@loopback/core';
import {get, param} from '@loopback/rest';
import {Mouse, MouseService} from '../services';

export const MouseSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {type: 'number'},
    date: {type: 'string'},
    delay: {type: 'number'},
  },
};

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
  async getMouseById(@param.path.number('mouseId') mouseId: number): Promise<Mouse> {
    const response = await this.mouseService.lure({lureId: mouseId});
    return response.body;
  }

}
