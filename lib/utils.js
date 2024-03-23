export function extractPrice(...elements) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) return priceText.replace(/\D/g, "");
  }
  return "";
}

export function extractDescription(...elements) {
  for (const element of elements) {
    const descriptionText = element.text().trim();

    if (descriptionText) return descriptionText;
  }
  return "";
}

export function extractStars(...elements) {
  for (const element of elements) {
    const starText = element.text().trim();

    if (starText) return starText.substring(0, 3);
  }
  return "";
}

export function extractReviews(...elements) {
  for (const element of elements) {
    const reviewText = element.text().trim();
    let newText = reviewText.split(" ")[0];
    if (reviewText) return newText;
  }
  return "";
}
