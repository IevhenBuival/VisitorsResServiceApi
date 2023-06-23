import dynamoDBClient from "../model";
import VisitService from "./service";

const visitService = new VisitService(dynamoDBClient());
export default visitService;
