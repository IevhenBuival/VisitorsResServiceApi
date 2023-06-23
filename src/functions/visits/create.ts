import { formatJSONError } from "./../../libs/api-gateway";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { v4 } from "uuid";
import visitsService from "../../service/visitsService";
import { handleError } from "src/error/HttpError";

export const createVisit = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const strBody = JSON.stringify(event.body);
      const id = v4();
      const visit = await visitsService.createVisit(
        visitsService.createVisitFromBody(id, strBody)
      );

      return formatJSONResponse({
        status: 201,
        visit,
      });
    } catch (e) {
      return formatJSONError(handleError(e));
    }
  }
);
