import { Router } from 'express';
import { container } from 'tsyringe';
import { ControladorPlano } from '../Controladores/ControladorPlano';
import { AutorizacaoMiddleware } from '../Middlewares/AutorizacaoMiddleware';

const RotasPlanos = Router();

const controladorPlano = container.resolve(ControladorPlano);

RotasPlanos.get('/planos', 

  /*
    #swagger.tags = ['planos']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Obtem todos os planos'
    #swagger.description = 'Obtem todos os planos cadastrados na aplicação'
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/ObterPlanoResultProcessed' }
    }

    #swagger.responses[204] = {
      description: 'No Content',
    }

    #swagger.responses[401] = {
      description: 'Unauthorized',
      schema: { $ref: '#/definitions/ErroResult' }
    }
  */

  AutorizacaoMiddleware,
  controladorPlano.obterPlanos);

RotasPlanos.get('/planos/:idPlano', 

  /*
    #swagger.tags = ['planos']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Obtem o plano pelo id'
    #swagger.description = 'Obtém o plano pelo id informado'
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/ObterPlanoResultProcessed' }
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
  controladorPlano.obterPlanoPorId);

export { RotasPlanos };
