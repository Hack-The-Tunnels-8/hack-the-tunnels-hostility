import express, { Request, Response } from "express";
import { OrderService } from "../../../services";
import { success, error } from "../utils";
import { sendSMS } from "../../sms/twilio";
import { sendWebhook } from "../../webhooks/index";
import { sendOrderEmail } from "../../email/sendEmail";

const router = express.Router();

const getOrder = async (request: Request, response: Response) => {
	const id = request.params.id;
	const result = await OrderService.find(id);

	if (result.err) {
		return error(response, {
			error: result.val.message,
			statusCode: 404,
		});
	}

	return success(response, {
		data: {
			order: result.val,
		},
		statusCode: 200,
	});
};

const createOrder = async (request: Request, response: Response) => {
	const result = await OrderService.create(
		request.body.customer,
		request.body.lineItems
	);

	if (result.err) {
		return error(response, {
			error: result.val.message,
			statusCode: 400,
		});
	}
	await sendSMS("6136003977", "Your order has been created. Thank you!");
	await sendWebhook("orderConfirmation");
  sendOrderEmail("caoallan3@gmail.com")
	return success(response, {
		data: {
			order: result.val,
		},
		statusCode: 201,
	});
};

router.get("/:id", getOrder);
router.post("/", createOrder);

export default router;
