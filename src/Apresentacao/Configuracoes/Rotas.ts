import { Router } from 'express';
import { RotasColaboradores } from '../Rotas/RotasColaboradores';
import { RotasDependentes } from '../Rotas/RotasDependentes';
import { RotasPapeis } from '../Rotas/RotasPapeis';
import { RotasPlanos } from '../Rotas/RotasPlanos';
import { RotasSocios } from '../Rotas/RotasSocios';
import { RotasVeiculos } from '../Rotas/RotasVeiculos';

const Rotas = Router();

Rotas.use('/api/colaboradores', RotasColaboradores);
Rotas.use('/api/socios', RotasSocios);
Rotas.use('/api/socios/:idSocio/veiculos', RotasVeiculos);
Rotas.use('/api/socios/:idSocio/dependentes', RotasDependentes);
Rotas.use('/api/papeis', RotasPapeis);
Rotas.use('/api/planos', RotasPlanos);

export { Rotas };