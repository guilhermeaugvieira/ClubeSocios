import { Router } from 'express';
import { container } from 'tsyringe';
import { ControladorDependente } from '../Controladores/ControladorDependente';
import { AutorizacaoMiddleware } from '../Middlewares/AutorizacaoMiddleware';

const RotasDependentes = Router();

const controladorDependente = container.resolve(ControladorDependente);

RotasDependentes.post('/:idSocio/dependentes/', 

  /*    
    #swagger.tags = ['dependentes']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Adiciona um novo dependente ao sócio'
    #swagger.description = 'Adiciona um novo dependente ao sócio na aplicação'

    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Novo Dependente',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/AdicionarDependenteInput'
      }
    }

    #swagger.responses[201] = {
      description: 'Created',
      schema: { $ref: '#/definitions/AdicionarDependenteResultProcessed' }
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
  controladorDependente.adicionarDependente);

RotasDependentes.put('/:idSocio/dependentes/:idDependente', 

  /*    
    #swagger.tags = ['dependentes']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Atualiza um dependente do sócio'
    #swagger.description = 'Atualiza um dependente do sócio na aplicação'

    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Dependente Atualizado',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/AtualizarDependenteInput'
      }
    }

    #swagger.responses[200] = {
      description: 'Ok',
      schema: { $ref: '#/definitions/AtualizarDependenteResultProcessed' }
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
  controladorDependente.atualizarDependente);

RotasDependentes.patch('/:idSocio/dependentes/:idDependente', 

  /*    
    #swagger.tags = ['dependentes']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Atualiza o status do dependente associado ao sócio'
    #swagger.description = 'Atualiza o status do dependente associado ao sócio na aplicação'

    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Status Dependente',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/DependenteStatusInput'
      }
    }

    #swagger.responses[200] = {
      description: 'Ok',
      schema: { $ref: '#/definitions/DependenteStatusResultProcessed' }
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
  controladorDependente.atualizarStatusDependente);

RotasDependentes.get('/:idSocio/dependentes/', 

  /*    
    #swagger.tags = ['dependentes']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Obtém todos os dependentes associados ao sócio'
    #swagger.description = 'Obtém todos os dependentes associados ao sócio na aplicação'

    #swagger.responses[200] = {
      description: 'Ok',
      schema: { $ref: '#/definitions/ObterDependenteResultProcessed' }
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
  controladorDependente.obterDependentes);

RotasDependentes.get('/:idSocio/dependentes/:idDependente', 

  /*    
    #swagger.tags = ['dependentes']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Obtém um dependente específico associado ao sócio'
    #swagger.description = 'Obtém um dependente específico associado ao na aplicação'

    #swagger.responses[200] = {
      description: 'Ok',
      schema: { $ref: '#/definitions/ObterDependentePorIdResultProcessed' }
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
  controladorDependente.obterDependentePorId);

export { RotasDependentes };
