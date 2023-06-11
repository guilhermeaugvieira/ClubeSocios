import { Router } from 'express';
import { container } from 'tsyringe';
import { ControladorSocio } from '../Controladores/ControladorSocio';
import { AutorizacaoMiddleware } from '../Middlewares/AutorizacaoMiddleware';

const RotasSocios = Router();

const controladorSocio = container.resolve(ControladorSocio);

RotasSocios.post('/socios', 

  /*
    #swagger.tags = ['socios']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Adiciona um novo sócio'
    #swagger.description = 'Adiciona um novo sócio na aplicação'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Novo Sócio',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/AdicionarSocioInput'
      }
    }
    #swagger.responses[201] = {
      description: 'Created',
      schema: { $ref: '#/definitions/AdicionarSocioResultProcessed' }
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
  controladorSocio.AdicionarSocio);

RotasSocios.put('/socios/:idSocio', 

  /*
    #swagger.tags = ['socios']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Atualiza um sócio'
    #swagger.description = 'Atualiza um sócio na aplicação'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Sócio atualizado',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/AtualizarSocioInput'
      }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/AtualizarSocioResultProcessed' }
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
  controladorSocio.AtualizarSocio);

RotasSocios.patch('/socios/:idSocio', 

  /*
    #swagger.tags = ['socios']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Ativa/Inativa um sócio'
    #swagger.description = 'Faz a ativação e inativação do sócio da aplicação'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Sócio atualizado',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/SocioStatusInput'
      }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/SocioStatusResultProcessed' }
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
  controladorSocio.AtualizarStatusSocio);

RotasSocios.get('/socios', 

  /*
    #swagger.tags = ['socios']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Obtem todos os sócios'
    #swagger.description = 'Obtem todos os sócios cadastrados na aplicação'
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/ObterSocioResultProcessed' }
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
  controladorSocio.ObterSocios);

RotasSocios.get('/socios/:idSocio', 

  /*
    #swagger.tags = ['socios']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Obtem o sócio pelo id'
    #swagger.description = 'Obtem todos os sócios cadastrados na aplicação'
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/ObterSocioPorIdResultProcessed' }
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
  controladorSocio.ObterSocioPorId);

export { RotasSocios };
