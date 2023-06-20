const dotenv = require('dotenv');

dotenv.config();

const swaggerAutogen = require("swagger-autogen");

const doc = {
  swagger: '2.0',
  info: {
    version: "1.0.0",
    title: "API Clube de Sócios",
    description: "Documentação da API do Clube de Sócios",
    contact: {
      name: "Guilherme Vieira",
      email: "guilherme.dino@unifei.edu.br"
    }
  },
  host: `${process.env.ENDERECO_API_SWAGGER}`,
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: "colaboradores",
      description: "Gerencia os colaboradores que acessam a aplicação"
    },
    {
      name: "socios",
      description: "Gerencia os sócios da aplicação"
    },
    {
      name: "papeis",
      description: "Gerencia os papéis da aplicação"
    },
    {
      name: "planos",
      description: "Gerencia os planos da aplicação",
    }
  ],
  securityDefinitions: {
    apiKeyAuth:{
      type: "apiKey",
      in: "header",       // can be "header", "query" or "cookie"
      name: "authorization",  // name of the header, query parameter or cookie
      description: "Insira o token seguido de 'Bearer '"
    }
  },
  definitions: {
    ObterPapelPorIdResultProcessed: {
      sucesso: true,
      dados: {
        $ref: '#/definitions/ObterPapelResult'
      }
    },
    ObterPapelResultProcessed: {
      sucesso: true,
      dados: [{
        $ref: '#/definitions/ObterPapelResult'
      }]
    },
    ObterPapelResult: {
      id: '',
      nome: '',
      ativo: false,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    },
    ObterPlanoResultProcessed: {
      sucesso: true,
      dados: [{
        $ref: '#/definitions/ObterPlanoResult'
      }],
    },
    ObterPlanoPorIdResultProcessed: {
      sucesso: true,
      dados: {
        $ref: '#/definitions/ObterPlanoResult'
      },
    },
    ObterSocioPorIdResultProcessed: {
      sucesso: true,
      dados: {
        $ref: '#/definitions/ObterSocioResult'
      },
    },
    ObterSocioResultProcessed: {
      sucesso: true,
      dados: [{
        $ref: '#/definitions/ObterSocioResult'
      }],
    },
    ObterClienteResult: {
      id: '',
      nome: '',
      documento: '',
      login: '',
      email: '',
      ativo: false,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    },
    ObterPlanoResult: {
      id: '',
      nome: '',
      descricao: '',
      tipoRecorrencia: '',
      valorMensalidade: 0,
      modalidade: '',
      ativo: false,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    },
    ObterEnderecoResult: {
      id: '',
      pais: '',
      cidade: '',
      cep: '',
      bairro: '',
      rua: '',
      numero: 1,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    },
    ObterSocioResult: {
      id: '',
      apelido: null,
      diaVencimentoPagamento: 10,
      contato: '',
      cliente: {
        $ref: '#/definitions/ObterClienteResult',
      },
      plano: {
        $ref: '#/definitions/ObterPlanoResult'
      },
      endereco: {
        $ref: '#/definitions/ObterEnderecoResult',
      },
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    },
    SocioStatusInput: {
      status: false,
    },
    PlanoStatusInput: {
      status: false,
    },
    PapelStatusInput: {
      status: false,
    },
    SocioStatusResultProcessed: {
      sucesso: true,
      dados: {
        $ref: '#/definitions/SocioStatusResult'
      },
    },
    SocioStatusResult: {
      id: '',
      status: false,
    },
    PlanoStatusResultProcessed: {
      sucesso: true,
      dados: {
        $ref: '#/definitions/PlanoStatusResult'
      },
    },
    PlanoStatusResult: {
      id: '',
      status: false,
    },
    PapelStatusResultProcessed: {
      sucesso: true,
      dados: {
        $ref: '#/definitions/PapelStatusResult'
      },
    },
    PapelStatusResult: {
      id: '',
      status: false,
    },
    AdicionarClienteResult: {
      nome: '',
      login: '',
    },
    AdicionarPlanoResult: {
      nome: '',
      descricao: '',
      tipoRecorrencia: '',
      modalidade: '',
      id: '',
    },
    AdicionarEnderecoResult: {
      pais: '',
      cidade: '',
      cep: '',
    },
    AdicionarSocioResult: {
      apelido: '',
      diaVencimentoPagamento: 3,
      contato: '',
      cliente: {
        $ref: '#/definitions/AdicionarClienteResult'
      },
      plano: {
        $ref: '#/definitions/AdicionarPlanoResult'
      },
      endereco: {
        $ref: '#/definitions/AdicionarEnderecoResult'
      },
      id: '',
    },
    AtualizarClienteResult: {
      nome: '',
      login: '',
    },
    AtualizarPlanoResult: {
      nome: '',
      descricao: '',
      tipoRecorrencia: '',
      modalidade: '',
    },
    AtualizarPapelResult: {
      nome: '',
    },
    AtualizarEnderecoResult: {
      pais: '',
      cidade: '',
      cep: '',
    },
    AtualizarSocioResult: {
      apelido: '',
      diaVencimentoPagamento: 0,
      contato: '',
      cliente: {
        $ref: '#/definitions/AtualizarClienteResult',
      },    
      plano: {
        $ref: '#/definitions/AtualizarPlanoResult',
      },
      endereco: {
        $ref: '#/definitions/AtualizarEnderecoResult'
      },
      id: '',
    },
    AtualizarSocioResultProcessed: {
      sucesso: true,
      dados: {
        $ref: '#/definitions/AtualizarSocioResult'
      },
    },
    AtualizarStatusSocioInput: {
      status: 'false',
    },
    AtualizarSocioInput: {
      apelido: '',
      diaVencimentoPagamento: 1,
      contato: '',    
      nomePlano: '',      
      cliente: {
        $ref: '#/definitions/AtualizarClienteInput',
      },    
      endereco: {
        $ref: '#/definitions/AtualizarEnderecoInput',
      },
    },
    AtualizarClienteInput: {
      nome: '',
      documento: '',
      login: '',
      email: '',
    },
    AtualizarEnderecoInput: {
      pais: '',
      cidade: '',
      cep: '',
      bairro: '',
      rua: '',
      numero: 0 
    },
    AdicionarEnderecoInput: {
      pais: '',
      cidade: '',
      cep: '',
      bairro: '',
      rua: '',
      numero: 0,
    },
    AdicionarPlanoInput: {
      nome: '',
      descricao: '',
      tipoRecorrencia: '',
      valorMensalidade: 0,
      modalidade: '',
    },
    AtualizarPlanoInput: {
      nome: '',
      descricao: '',
      tipoRecorrencia: '',
      valorMensalidade: 0,
      modalidade: '',
    },
    AdicionarSocioInput: {
      apelido: '',
      diaVencimentoPagamento: 1,
      contato: '',    
      idPlano: '',
      plano: {
        $ref: '#/definitions/AdicionarPlanoInput'
      },      
      idCliente: '',
      cliente: {
        $ref: '#/definitions/AdicionarClienteInput'
      },    
      endereco: {
        $ref: '#/definitions/AdicionarEnderecoInput'
      },
    },
    AdicionarClienteInput: {
      nome: '',
      documento: '',
      login: '',
      senha: '',
      email: '',
    },
    AdicionarPapelInput: {
      nome: '',
    },
    AtualizarPapelInput: {
      nome: '',
    },
    AdicionarColaboradorInput: {
      idCliente: '',
      cliente: {
        $ref: '#/definitions/AdicionarClienteInput'
      },
      idPapel: '',
      papel: {
        $ref: '#/definitions/AdicionarPapelInput'
      },
    },
    LoginInput: {
      login: '',
      senha: '',
    },
    AdicionarClienteResult: {
      nome: '',
      login: '',
    },
    AdicionarPapelResultProcessed: {
      sucesso: true,
      dados: {
        $ref: '#/definitions/AdicionarPapelResult'
      }
    },
    AdicionarPapelResult: {
      nome: '',
      id: '',
    },
    AtualizarPapelResultProcessed: {
      sucesso: true,
      dados: {
        $ref: '#/definitions/AdicionarPapelResult'
      }
    },
    AtualizarPapelResult: {
      nome: '',
      id: '',
    },
    AdicionarColaboradorResult: {
      cliente: {
        $ref: '#/definitions/AdicionarClienteResult'
      },
      papel: {
        $ref: '#/definitions/AdicionarPapelResult'
      }
    },
    LoginResult: '',
    AdicionarEnderecoResult: {
      pais: '',
      cidade: '',
      cep: '',
    },
    AdicionarPlanoResultProcessed: {
      sucesso: true,
      dados: {
        $ref: '#/definitions/AdicionarPlanoResult'
      }
    },
    AdicionarPlanoResult: {
      nome: '',
      descricao: '',
      tipoRecorrencia: '',
      modalidade: '',
      valorMensalidade: 0,
      id: '',
    },
    AtualizarPlanoResultProcessed: {
      sucesso: true,
      dados: {
        $ref: '#/definitions/AtualizarPlanoResult'
      }
    },
    AtualizarPlanoResult: {
      nome: '',
      descricao: '',
      tipoRecorrencia: '',
      modalidade: '',
      valorMensalidade: 0,
      id: '',
    },
    AdicionarSocioResult: {
      apelido: '',
      diaVencimentoPagamento: 1,
      cliente: {
        $ref: '#/definitions/AdicionarClienteResult'
      },
      plano: {
        $ref: '#/definitions/AdicionarPlanoResult'
      },
      endereco:{
        $ref: '#/definitions/AdicionarEnderecoResult'
      },
    },
    AdicionarSocioResultProcessed: {
      sucesso: true,
      dados: {
        $ref: '#/definitions/AdicionarSocioResult'
      }
    },
    AdicionarColaboradorResultProcessed: {
      sucesso: true,
      dados: {
        $ref: '#/definitions/AdicionarColaboradorResult'
      }
    },
    LoginResultProcessed: {
      sucesso: true,
      dados: {
        $ref: '#/definitions/LoginResult'
      }
    },
    ErroResult: {
      sucesso: false,
      erros: [
        ''
      ]
    },
  }
}

const outputFile = './src/Apresentacao/Swagger/apiClube.json';
const endpointsFiles = ['./src/Apresentacao/Configuracoes/Rotas.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);