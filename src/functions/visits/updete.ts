import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import visitsService from "../../service/visitsService";
import { handleError } from "src/error/HttpError";

export const updateVisit = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const id = event.pathParameters?.id as string;
      const strBody = JSON.stringify(event.body);

      const visit = await visitsService.updateVisit(
        id,
        visitsService.createVisitFromBody(id, strBody)
      );
      return formatJSONResponse({
        visit,
        id,
      });
    } catch (e) {
      return formatJSONResponse(handleError(e));
    }
  }
);
