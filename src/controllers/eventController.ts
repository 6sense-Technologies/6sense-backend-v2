import { Request, Response } from "express";
import { handleTrackEventByMixpanel } from "../mixpanel/mixpanelController";
import { handleCreateEventByBrevo } from "../brevo/events/brevoEventController";

export const handleCreateEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {

  const mixpanelResult = await handleTrackEventByMixpanel(req, res);

  if (mixpanelResult?.status !== 200) {
    res.status(mixpanelResult?.status || 500).json(mixpanelResult);
    return;
  }

  const brevoResult = await handleCreateEventByBrevo(req, res);

  if (brevoResult?.status !== 200) {
    res.status(brevoResult?.status || 500).json(brevoResult);
    return;
  }

  res.status(200).json({
    status: 200,
    message: "Event tracked successfully in both Mixpanel and Brevo",
  });
};
