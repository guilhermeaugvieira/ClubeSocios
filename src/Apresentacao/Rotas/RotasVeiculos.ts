import { Router } from 'express';
import { container } from 'tsyringe';
import { ControladorVeiculo } from '../Controladores/ControladorVeiculo';
import { AutorizacaoMiddleware } from '../Middlewares/AutorizacaoMiddleware';

const RotasVeiculos = Router();

const controladorVeiculos = container.resolve(ControladorVeiculo);

RotasVeiculos.post('/:idSocio/veiculos', 

  /*    
    #swagger.tags = ['veiculos']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Adiciona um novo veículo ao sócio'
    #swagger.description = 'Adiciona um novo veículo ao sócio na aplicação'

    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Novo Veiculo',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/AdicionarVeiculoSocioInput'
      }
    }

    #swagger.responses[201] = {
      description: 'Created',
      schema: { $ref: '#/definitions/AdicionarVeiculoSocioResultProcessed' }
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
  controladorVeiculos.adicionarVeiculo);

RotasVeiculos.put('/:idSocio/veiculos/:idVeiculo', 

  /*    
    #swagger.tags = ['veiculos']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Atualiza um veículo relacionado ao sócio'
    #swagger.description = 'Atualiza um veículo relacionado ao sócio na aplicação'

    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Veiculo atualizado',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/AtualizarVeiculoSocioInput'
      }
    }

    #swagger.responses[200] = {
      description: 'Ok',
      schema: { $ref: '#/definitions/AtualizarVeiculoSocioResultProcessed' }
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
  controladorVeiculos.atualizarVeiculo);

RotasVeiculos.patch('/:idSocio/veiculos/:idVeiculo', 

  /*    
    #swagger.tags = ['veiculos']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Atualiza o status do veículo do sócio'
    #swagger.description = 'Atualiza o status do veículo do sócio na aplicação'


    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Status Veiculo',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/VeiculoSocioStatusInput'
      }
    }

    #swagger.responses[200] = {
      description: 'Ok',
      schema: { $ref: '#/definitions/VeiculoSocioStatusResultProcessed' }
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
  controladorVeiculos.atualizarStatusVeiculo);

RotasVeiculos.get('/:idSocio/veiculos/', 

  /*    
    #swagger.tags = ['veiculos']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Obtém  os veículos associados ao sócio'
    #swagger.description = 'Obtém  os veículos associados ao sócio na aplicação'

    #swagger.responses[200] = {
      description: 'Ok',
      schema: { $ref: '#/definitions/ObterVeiculoSocioResultProcessed' }
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
  controladorVeiculos.obterVeiculos);

RotasVeiculos.get('/:idSocio/veiculos/:idVeiculo', 

  /*    
    #swagger.tags = ['veiculos']
    #swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.summary = 'Obtém um veículo específico associado ao sócio'
    #swagger.description = 'Obtém um veículo específico associado ao sócio na aplicação'

    #swagger.responses[200] = {
      description: 'Ok',
      schema: { $ref: '#/definitions/ObterVeiculoSocioPorIdResultProcessed' }
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
  controladorVeiculos.obterVeiculoPorId);

export { RotasVeiculos };
