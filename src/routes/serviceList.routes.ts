import express from "express";
import ServiceListController from "../controllers/serviceList.controller";

const ServiceListRouter = express.Router();

ServiceListRouter.get("", ServiceListController.getList);
ServiceListRouter.get("/:id/available", ServiceListController.getSlots);

export default ServiceListRouter;
