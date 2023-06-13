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

  RotasPlanos.post('/planos', 

  /*
    #swagger.tags = ['planos']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Adiciona um novo plano'
    #swagger.description = 'Adiciona um novo plano na aplicação'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Novo Plano',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/AdicionarPlanoInput'
      }
    }
    #swagger.responses[201] = {
      description: 'Created',
      schema: { $ref: '#/definitions/AdicionarPlanoResultProcessed' }
    }

    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: { $ref: '#/definitions/ErroResult' }
    }

    #swagger.responses[401] = {
      description: 'Unauthorized',
      schema: { $ref: '#/definitions/ErroResult' }
    }
  */

  AutorizacaoMiddleware,
  controladorPlano.adicionarPlano);

  RotasPlanos.put('/planos/:idPlano', 

  /*
    #swagger.tags = ['planos']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Atualiza um plano existente'
    #swagger.description = 'Atualiza um plano existente na aplicação'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Plano Atualizado',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/AtualizarPlanoInput'
      }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/AtualizarPlanoResultProcessed' }
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
  controladorPlano.atualizarPlano);

  RotasPlanos.patch('/planos/:idPlano', 

  /*
    #swagger.tags = ['planos']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Atualiza status do plano'
    #swagger.description = 'Atualiza status do plano na aplicação'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Status Atualizado',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/PlanoStatusInput'
      }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/PlanoStatusResultProcessed' }
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

    #swagger.responses[409] = {
      description: 'Conflict',
      schema: { $ref: '#/definitions/ErroResult' }
    }
  */

  AutorizacaoMiddleware,
  controladorPlano.atualizarStatusAtivoPlano);

export { RotasPlanos };
