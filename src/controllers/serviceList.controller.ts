import { NextFunction, Response, Request } from "express";
import CleaningService from "../models/serviceList.model";
import serviceListService from "../services/serviceList.service";

class ServiceListController {
  async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const services = await CleaningService.find();
      res.json(services);
    } catch (e) {
      next(e);
    }
  }

  async getSlots(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { date } = req.query;

      const slots = await serviceListService.getSlots(id, String(date));

      res.json(slots);
    } catch (e) {
      next(e);
    }
  }
}

export default new ServiceListController();
