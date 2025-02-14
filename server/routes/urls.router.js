import { Router } from "express";
import URLController from "../controllers/urls.controller.js";

const UrlsRouter = Router();

UrlsRouter.post("/create", URLController.create);
UrlsRouter.get("/fetch", URLController.fetchAll);
UrlsRouter.get("/:shortUrl", URLController.redirect);

export default UrlsRouter;
