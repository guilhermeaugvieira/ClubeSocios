import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { INotificador } from "../../../Core/INotificador";
import { IServicoDependente } from "../Interfaces/IServicoDependente";

@injectable()
class ServicoDependente implements IServicoDependente {
  
  private readonly _notificador: INotificador;
  private readonly _databaseManager: PrismaClient;

  constructor(
    @inject("Notificador") notificador: INotificador,
    @inject("Database") databaseManager: PrismaClient,
  ){
    this._notificador = notificador;
    this._databaseManager = databaseManager;
  }

}

export { ServicoDependente }