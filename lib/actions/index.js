import { scrapeAmazonProduct } from "../scrapper/index.js";
import axios from "axios";

export async function scrapeAndStoreProduct(productUrl) {
  if (!productUrl) {
    console.error("Invalid product URL.");
    return;
  }
  const scrapedProduct = await scrapeAmazonProduct(productUrl);
  if (scrapedProduct !== null) return scrapedProduct;
}
