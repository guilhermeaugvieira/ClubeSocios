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
  controladorPapel.obterPapeis);

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
  controladorPapel.obterPapelPorId);

  RotasPapeis.post('/papeis', 

  /*
    #swagger.tags = ['papeis']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Adiciona um novo papel'
    #swagger.description = 'Adiciona um novo papel na aplicação'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Novo Papel',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/AdicionarPapelInput'
      }
    }
    #swagger.responses[201] = {
      description: 'Created',
      schema: { $ref: '#/definitions/AdicionarPapelResultProcessed' }
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
  controladorPapel.adicionarPapel);

  RotasPapeis.put('/papeis/:idPapel', 

  /*
    #swagger.tags = ['papeis']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Atualiza um papel existente'
    #swagger.description = 'Atualiza um papel existente na aplicação'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Papel Atualizado',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/AdicionarPapelInput'
      }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/AtualizarPapelResultProcessed' }
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
  controladorPapel.atualizarPapel);

  RotasPapeis.patch('/papeis/:idPapel', 

  /*
    #swagger.tags = ['papeis']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Atualiza status do papel'
    #swagger.description = 'Atualiza status do papel na aplicação'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Status Atualizado',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/PapelStatusInput'
      }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/PapelStatusResultProcessed' }
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
  controladorPapel.atualizarStatusAtivoPapel);

export { RotasPapeis };
