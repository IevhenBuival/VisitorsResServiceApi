import express, { Request, Response } from "express";
import serverless from "serverless-http";

const app = express();

app.use((req: Request, res: Response) => {
  res.send(
    "ip for proxy" +
      JSON.stringify(req.protocol + "://" + req.get("host") + "/visit")
  );
});
/*app.use("/visit", (req: Request, res: Response) =>
proxy("https://fv3lr94tmg.execute-api.us-east-1.amazonaws.com/visit")
  //proxy(req.protocol + "://" + req.get("host") + "/visit")
);*/
/*

*/

export const apiExpress = serverless(app);
