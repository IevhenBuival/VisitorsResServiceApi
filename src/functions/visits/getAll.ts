import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import visitsService from "../../service/visitsService";
import { handleError } from "src/error/HttpError";

export const getAllVisits = middyfy(
  async (): Promise<APIGatewayProxyResult> => {
    try {
      const visits = await visitsService.getAllVisits();
      return formatJSONResponse({
        visits,
      });
    } catch (e) {
      return formatJSONResponse(handleError(e));
    }
  }
);
