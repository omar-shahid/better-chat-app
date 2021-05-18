import { Response } from "express";
import { ObjectID } from "mongodb";
import Notification from "../models/Notification";
import { ExpressRequest } from "../types";

class NotificationController {
  public async getNotifications(req: ExpressRequest, res: Response) {
    const notifications = await Notification.find({
      users: { $in: [new ObjectID(req.session.qid)] },
    });
    //   .sort({ date: -1 })
    //   .exec();

    res.json({ notifications });
  }
}
export default new NotificationController();
