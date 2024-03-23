import axios from "axios";
import * as cheerio from "cheerio";
import {
  extractDescription,
  extractPrice,
  extractReviews,
  extractStars,
} from "../utils";

export async function scrapeAmazonProduct(url) {
  if (!url) return;

  const backendUrl = "http://localhost:3000/scrape";

  try {
    const res = await axios.post(backendUrl, { url });
    const $ = cheerio.load(res.data);

    const title = $("#productTitle").text().trim();

    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $("a-price.a-text-price")
    );

    const originalPrice = extractPrice(
      $("priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $("a-size-base.a-color-price")
    );

    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrl = Object.keys(JSON.parse(images));

    const currency = $(".a-price-symbol").text().trim()[0];

    const discountRate = $(".savingsPercentage")
      .text()
      .trim()
      .replace(/[-%]/g, "");

    const description = extractDescription(
      $("#feature-bullets ul li span.a-list-item")
    );

    const stars = extractStars($(".a-icon-alt"));

    const reviews = extractReviews($("#acrCustomerReviewText"));

    const data = {
      url,
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      historyPrice: [],
      outOfStock: outOfStock,
      imageUrl: imageUrl[0],
      currency,
      discountRate: Number(discountRate),
      description,
      stars,
      reviews,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };
    return data;
  } catch (err) {
    throw new Error("Failed to scrape the product: " + err.message);
  }
}
