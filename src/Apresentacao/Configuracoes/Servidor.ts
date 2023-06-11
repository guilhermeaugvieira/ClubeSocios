import './DotEnv';
import 'reflect-metadata';
import './InjecaoDependencia';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { Rotas } from './Rotas';

const Servidor = express();

Servidor.use(express.json());
Servidor.use(express.urlencoded({extended: false}));
Servidor.use(cors());

Servidor.options('*', (req, res, next) => {
  res.sendStatus(200);
});

Servidor.use(Rotas);

Servidor.get("/", (requisicao: Request, resposta: Response) => {
  return resposta.status(200).json("Servidor funcionando");
});

export { Servidor };