import { Router } from 'express';
import { container } from 'tsyringe';
import { ControladorPapel } from '../Controladores/ControladorPapel';
import { AutorizacaoMiddleware } from '../Middlewares/AutorizacaoMiddleware';

const RotasPapeis = Router();

const controladorPapel = container.resolve(ControladorPapel);

RotasPapeis.get('/papeis', 

  /*
    #swagger.tags = ['papeis']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Obtem todos os papéis'
    #swagger.description = 'Obtem todos os papéis cadastrados na aplicação'
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/ObterPapelResultProcessed' }
    }

    #swagger.responses[401] = {
      description: 'Unauthorized',
      schema: { $ref: '#/definitions/ErroResult' }
    }
  */

  AutorizacaoMiddleware,
  controladorPapel.ObterPapeis);

RotasPapeis.get('/papeis/:idPapel', 

  /*
    #swagger.tags = ['papeis']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Obtem o papel pelo id'
    #swagger.description = 'Obtem o papel pelo id informado'
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/ObterPapelPorIdResultProcessed' }
    }

    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: { $ref: '#/definitions/ErroResult' }
    }

    #swagger.responses[401] = {
      description: 'Unauthorized',
      schema: { $ref: '#/definitions/ErroResult' }
    }

    #swagger.responses[404] = {
      description: 'Not Found',
      schema: { $ref: '#/definitions/ErroResult' }
    }
  */

  AutorizacaoMiddleware,
  controladorPapel.ObterPapelPorId);

export { RotasPapeis };
