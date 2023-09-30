async function sendOrderConfirmationWebhook() {
	//json payload
	const payload = {
		content: null,
		embeds: [
			{
				title: "Order Recieved!",
				description: "An order Was recieved!",
				color: 5814783,
			},
		],
		attachments: [],
	};

	// send to webhook
	return await fetch(process.env.DISCORD_WEBHOOK_URL, {
		method: "POST",
		body: JSON.stringify(payload),
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function sendWebhook(webhookType: string) {
	if (webhookType === "orderConfirmation") {
		sendOrderConfirmationWebhook();
	}
}

export { sendWebhook };
