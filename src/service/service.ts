import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { HttpError } from "src/error/HttpError";
import IVisit from "../model/visitor";

export default class VisitServerice {
  private Tablename: string = "VisitsTable";

  constructor(private docClient: DocumentClient) {}

  isNotValidValue(str: string | undefined): boolean {
    if (str === undefined || str.trim().length === 0) return true;
    return false;
  }

  //create item(IVisit instance) for Dynamo DB from ad and body
  createVisitFromBody(id: string, body: string): IVisit {
    const reqBody: { name: string | undefined; surname: string } =
      JSON.parse(body);
    if (this.isNotValidValue(reqBody.name)) {
      throw new HttpError(400, {
        error: '"name" must be a string and no empty',
      });
    } else if (this.isNotValidValue(reqBody.surname)) {
      throw new HttpError(400, {
        error: '"surname" must be a string and no empty',
      });
    }
    const visit = {
      visitId: id,
      name: reqBody.name,
      surname: reqBody.surname,
      visitAt: new Date().toISOString(),
    };
    return visit;
  }

  async getAllVisits(): Promise<IVisit[]> {
    //scan table
    const visits = await this.docClient
      .scan({
        TableName: this.Tablename,
      })
      .promise();
    return visits.Items as IVisit[];
  }

  async getVisit(id: string): Promise<any> {
    //get item
    const visits = await this.docClient
      .get({
        TableName: this.Tablename,
        Key: {
          visitId: id,
        },
      })
      .promise();
    if (!visits.Item) {
      throw new HttpError(404, {
        error: `id: ${id} is not exist`,
      });
    }
    return visits.Item as IVisit;
  }

  async createVisit(visit: IVisit): Promise<IVisit> {
    //put new item in table
    await this.docClient
      .put({
        TableName: this.Tablename,
        Item: visit,
      })
      .promise();
    return visit as IVisit;
  }

  async updateVisit(id: string, visit: IVisit): Promise<IVisit> {
    //check id if not exist throw error
    const oldItem = await this.getVisit(id);
    //put then but with old
    const updated = await this.createVisit({
      ...visit,
      visitAt: oldItem.visitAt,
    });
    return updated as IVisit;
  }

  async deleteVisit(id: string): Promise<any> {
    //check id if not exist throw error
    await this.getVisit(id);
    //delete then
    return await this.docClient
      .delete({
        TableName: this.Tablename,
        Key: {
          visitId: id,
        },
      })
      .promise();
  }
}
