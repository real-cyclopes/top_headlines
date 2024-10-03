import { Request, Response, NextFunction, Router } from "express";
import { readCSV, getHeadlines } from "../utils/recommend";
import Controller from "../interfaces/controller.interface";

class RecommendController implements Controller {
  public path = "/recommends";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      this.getRecommendations
    )
  }


  private getRecommendations = async (
    request: Request<{}, {}, {}>,
    response: Response,
    next: NextFunction
  ) => {
    try {

      const data = await getHeadlines();
      response.send({
        data,
      });
    } catch (error) {
      console.log("error", error);
      next(error);
    }
  };
}

export default RecommendController;
