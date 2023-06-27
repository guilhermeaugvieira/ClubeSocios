import { Lifecycle, container } from 'tsyringe';
import { INotificador } from '../../Core/INotificador';
import { Notificador } from '../../Core/Notificador';
import { PrismaClient } from '@prisma/client';
import PrismaInstance from '../../PrismaInstance';
import { IServicoColaborador } from '../../Aplicacao/Servicos/Interfaces/IServicoColaborador';
import { ServicoColaborador } from '../../Aplicacao/Servicos/Implementacao/ServicoColaborador';
import { IRepositorioCliente } from '../../Dados/Interfaces/IRepositorioCliente';
import { RepositorioCliente } from '../../Dados/Repositorios/RepositorioCliente';
import { IRepositorioPapel } from '../../Dados/Interfaces/IRepositorioPapel';
import { RepositorioPapel } from '../../Dados/Repositorios/RepositorioPapel';
import { IRepositorioColaborador } from '../../Dados/Interfaces/IRepositorioColaborador';
import { RepositorioColaborador } from '../../Dados/Repositorios/RepositorioColaborador';
import { IServicoSocio } from '../../Aplicacao/Servicos/Interfaces/IServicoSocio';
import { ServicoSocio } from '../../Aplicacao/Servicos/Implementacao/ServicoSocio';
import { IRepositorioPlano } from '../../Dados/Interfaces/IRepositorioPlano';
import { RepositorioPlano } from '../../Dados/Repositorios/RepositorioPlano';
import { IRepositorioSocio } from '../../Dados/Interfaces/IRepositorioSocio';
import { RepositorioSocio } from '../../Dados/Repositorios/RepositorioSocio';
import { IRepositorioEndereco } from '../../Dados/Interfaces/IRepositorioEndereco';
import { RepositorioEndereco } from '../../Dados/Repositorios/RepositorioEndereco';
import { IServicoPapel } from '../../Aplicacao/Servicos/Interfaces/IServicoPapel';
import { ServicoPapel } from '../../Aplicacao/Servicos/Implementacao/ServicoPapel';
import { IServicoPlano } from '../../Aplicacao/Servicos/Interfaces/IServicoPlano';
import { ServicoPlano } from '../../Aplicacao/Servicos/Implementacao/ServicoPlano';
import { IRepositorioDependente } from '../../Dados/Interfaces/IRepositorioDependente';
import { RepositorioDependente } from '../../Dados/Repositorios/RepositorioDependente';
import { IServicoDependente } from '../../Aplicacao/Servicos/Interfaces/IServicoDependente';
import { ServicoDependente } from '../../Aplicacao/Servicos/Implementacao/ServicoDependente';

container.registerInstance<PrismaClient>("Database", 
  PrismaInstance);

container.register<INotificador>("Notificador", 
  { useClass: Notificador }, 
  { lifecycle: Lifecycle.ResolutionScoped });

container.register<IRepositorioCliente>("RepositorioCliente", 
  { useClass: RepositorioCliente },
  { lifecycle: Lifecycle.ResolutionScoped });

container.register<IRepositorioColaborador>("RepositorioColaborador", 
  { useClass: RepositorioColaborador },
  { lifecycle: Lifecycle.ResolutionScoped });

container.register<IRepositorioEndereco>("RepositorioEndereco",
  { useClass: RepositorioEndereco },
  { lifecycle: Lifecycle.ResolutionScoped }
);

container.register<IRepositorioPapel>("RepositorioPapel", 
  { useClass: RepositorioPapel },
  { lifecycle: Lifecycle.ResolutionScoped });


container.register<IRepositorioPlano>("RepositorioPlano",
  { useClass: RepositorioPlano },
  { lifecycle: Lifecycle.ResolutionScoped }
);

container.register<IRepositorioSocio>("RepositorioSocio",
  { useClass: RepositorioSocio },
  { lifecycle: Lifecycle.ResolutionScoped }
);

container.register<IRepositorioDependente>("RepositorioDependente",
  { useClass: RepositorioDependente },
  { lifecycle: Lifecycle.ResolutionScoped }
);

container.register<IServicoColaborador>("ServicoColaborador", 
  { useClass: ServicoColaborador },
  { lifecycle: Lifecycle.ResolutionScoped});

container.register<IServicoPapel>("ServicoPapel", 
  { useClass: ServicoPapel },
  { lifecycle: Lifecycle.ResolutionScoped});

container.register<IServicoPlano>("ServicoPlano", 
  { useClass: ServicoPlano },
  { lifecycle: Lifecycle.ResolutionScoped});

container.register<IServicoSocio>("ServicoSocio", 
  { useClass: ServicoSocio },
  { lifecycle: Lifecycle.ResolutionScoped});

  container.register<IServicoDependente>("ServicoDependente", 
  { useClass: ServicoDependente },
  { lifecycle: Lifecycle.ResolutionScoped});
