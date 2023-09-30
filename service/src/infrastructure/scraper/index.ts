import puppeteer from "puppeteer";
import { create } from "../../services/Product";

async function addFetchedProductFromAmazon(link: string) {
	// 1 Fetch Product Details From Amazon
	const browser = await puppeteer.launch({ headless: "new" });
	const page = await browser.newPage();

	await page.goto(link);

	const productTitle = await page.$eval(
		"#productTitle",
		(el) => el.textContent
	);

	const productDescription = await page.$eval(
		"#productDescription",
		(el) => el.textContent
	);

	const productPrice = await page.$eval(".a-offscreen", (el) =>
		el.textContent.trim()
	);

	const price = productPrice.replace("$", "");

	const productImageUrl = await page.$eval(
		"#imgTagWrapperId",
		(el) => el.querySelector("img")?.src
	);

	console.log(productTitle.trim());
	console.log("");
	console.log(productDescription.trim());
	console.log("");
	console.log(price);
	console.log("");
	console.log(productImageUrl);

	await browser.close();

	// remove character from string
	const removeCharacter = (str: string, char: string) => {
		return str.replace(char, "");
	};

	// 2 Add Product To Database

	return await create(
		productTitle,
		productDescription,
		Number(price),
		productImageUrl
	);
}

addFetchedProductFromAmazon(
	"https://www.amazon.ca/Torin-ATRJH-3430T-Plastic-Multi-Function-Dividers/dp/B08DVFLT5P?pd_rd_w=qJMsk&content-id=amzn1.sym.455d47f8-77ff-46ae-8198-52ca1f6b4b00&pf_rd_p=455d47f8-77ff-46ae-8198-52ca1f6b4b00&pf_rd_r=S1TBSH9ZJTKWZ1XM5KVN&pd_rd_wg=MgIO4&pd_rd_r=d1749ae3-abaa-4e1d-87df-a0f7f6c01c84&pd_rd_i=B08DVFLT5P&psc=1&ref_=pd_bap_d_grid_rp_0_1_ec_nped_i_"
);
