import { Router } from 'express';
import { container } from 'tsyringe';
import { ControladorColaborador } from '../Controladores/ControladorColaborador';

const RotasColaboradores = Router();

const controladorColaborador = container.resolve(ControladorColaborador);

RotasColaboradores.post('/colaboradores', 

  /*
    #swagger.tags = ['colaboradores']
    #swagger.summary = 'Adiciona um novo colaborador'
    #swagger.description = 'Adiciona um novo colaborador na aplicação'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Novo Colaborador',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/AdicionarColaboradorInput'
      }
    }
    #swagger.responses[201] = {
      description: 'Created',
      schema: { $ref: '#/definitions/AdicionarColaboradorResultProcessed' }
    }

    #swagger.responses[400] = {
      description: 'Bad Request',
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

  controladorColaborador.AdicionarColaborador);

RotasColaboradores.post('/colaboradores/login',
  /*
    #swagger.tags = ['colaboradores']
    #swagger.summary = 'Login do colaborador'
    #swagger.description = 'Realiza o login do colaborador'
    swagger.security = [{ "apiKeyAuth": [] }],
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description': 'Dados do colaborador',
      'required': 'true',
      'schema': {
        '$ref': '#/definitions/LoginInput'
      }
    }
    #swagger.responses[200] = {
      description: 'Ok',
      schema: { $ref: '#/definitions/LoginResultProcessed' }
    }

    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: { $ref: '#/definitions/ErroResult' }
    }

    #swagger.responses[409] = {
      description: 'Conflict',
      schema: { $ref: '#/definitions/ErroResult' }
    }
  */

  controladorColaborador.LoginColaborador
);

export { RotasColaboradores };