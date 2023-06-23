import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import visitsService from "../../service/visitsService";
import { handleError } from "src/error/HttpError";

export const getVisit = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id as string;
    try {
      const visit = await visitsService.getVisit(id);
      return formatJSONResponse({
        visit,
        id,
      });
    } catch (e) {
      return formatJSONResponse(handleError(e));
    }
  }
);
