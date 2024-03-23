const express = require("express");
const app = express();
const port = 3000;
require("./db/conn");
const Signup = require("./models/signup");
const cors = require("cors");
const bcrypt = require("bcrypt");
const axios = require("axios");
const Product = require("./models/product");
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    let info = await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: to,
      subject: subject,
      html: text,
    });
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const checkPriceAndSendEmail = async (productId, userEmail) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      console.error("Product not found.");
      return;
    }
    const user = product.users.find((user) => user.email === userEmail);
    if (!user) {
      console.error("User not found for the given email.");
      return;
    }
    const truncatedTitle =
      product.title.length > 30
        ? product.title.substring(0, 30) + "..."
        : product.title;
    const messagebody = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Price Tracking Email</title>
<style>
  /* Reset styles */
  body, h1, h2, h3, p {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    background-color: #f4f4f4;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 28px;
    color: #333333;
    margin-bottom: 20px;
    text-align: center;
  }

  p {
    font-size: 16px;
    color: #666666;
    margin-bottom: 20px;
  }

  .product-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .button {
    display: inline-block;
    padding: 12px 24px;
    background-color: #007bff;
    color: #ffffff;
    font-size: 18px;
    text-decoration: none;
    border-radius: 8px;
    margin-top: 10px;
    transition: background-color 0.3s ease;
  }

  .button:hover {
    background-color: #0056b3;
  }

  @media screen and (max-width: 600px) {
    .container {
      padding: 10px;
    }
    h1 {
      font-size: 24px;
    }
    p {
      font-size: 14px;
    }
    .button {
      font-size: 16px;
    }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Past Price</h1>
    <p>You are now tracking a product. Here's the latest update:</p>
    <img src="${product.imageUrl}" class="product-image" alt="Product Image">
    <p>This product is back in stock! with <b>Lowest Price of ${product.lowestPrice}</b> Don't miss out - <a href="${product.url}" class="button" target="_blank" rel="noopener noreferrer">Buy it now</a></p>
    <p>Stay tuned for more updates and offers.</p>
  </div>
</body>
</html>
`;
    if (product.currentPrice <= user.price) {
      console.log(
        `Sending email to ${userEmail} regarding the price drop for product ${truncatedTitle}.`
      );
      sendEmail(
        userEmail,
        `Welcome to Price Tracking for ${truncatedTitle}`,
        messagebody
      );
    } else {
      console.log(
        `Price for product ${truncatedTitle} is higher than user's desired price.`
      );
    }
  } catch (error) {
    console.error("Error checking price and sending email:", error);
  }
};

app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const user = await Signup.create(req.body);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.json({ message: "Login successful" });
      } else {
        res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      res.status(404).json({ error: "No record exists" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/scrape", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Missing URL parameter" });
    }

    // BrightData Proxy Configuration
    const username = "brd-customer-hl_50377bb4-zone-unblocker";
    const password = "c5q0gsp2tyzc";
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;
    const proxyOptions = {
      auth: {
        username: `${username}-session-${session_id}`,
        password,
      },
      port,
      host: "brd.superproxy.io",
      rejectUnauthorized: false,
    };

    const response = await axios.get(url, proxyOptions);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/product", async (req, res) => {
  try {
    const { product } = req.body;

    const checkurl = await Product.find({ url: product.url });

    if (product.currentPrice === 0 || product.originalPrice === 0) {
      return res.status(400).json({ error: "Product price cannot be zero." });
    } else {
      if (checkurl.length === 0) {
        const createdProduct = await Product.create(product);
        return res.json(createdProduct);
      } else {
        const existingProduct = await Product.findOne({ url: product.url });

        if (!existingProduct) {
          return res.status(404).json({ error: "Product not found." });
        }

        const updatedPriceHistory = [
          ...existingProduct.priceHistory,
          { price: product.currentPrice, date: new Date() },
        ];

        const getLowestPrice = (priceList) => {
          let lowestPrice = priceList[0];
          for (let i = 0; i < priceList.length; i++) {
            if (priceList[i].price < lowestPrice.price) {
              lowestPrice = priceList[i];
            }
          }
          return lowestPrice.price;
        };

        const getHighestPrice = (priceList) => {
          let highestPrice = priceList[0];
          for (let i = 0; i < priceList.length; i++) {
            if (priceList[i].price > highestPrice.price) {
              highestPrice = priceList[i];
            }
          }
          return highestPrice.price;
        };

        const getAveragePrice = (priceList) => {
          const sumOfPrices = priceList.reduce(
            (acc, curr) => acc + curr.price,
            0
          );
          const averagePrice = sumOfPrices / (priceList.length || 1);
          return averagePrice;
        };

        const updatedProduct = {
          ...product,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        const newProduct = await Product.findOneAndUpdate(
          { url: product.url },
          updatedProduct,
          { upsert: true, new: true }
        );

        if (product.currentPrice === 0 || product.originalPrice === 0) {
          return res
            .status(400)
            .json({ error: "Product price cannot be zero." });
        }

        return res.json(newProduct);
      }
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: error.message });
  }
});

app.get("/product", async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    if (product !== null) {
      return res.json(product);
    } else {
      console.log("No such product found");
      return res.status(404).json({ error: "No such product found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

app.post("/trending", async (req, res) => {
  try {
    const newProductList = req.body.products;

    await Product.deleteMany({});

    await Product.insertMany(newProductList);

    res
      .status(200)
      .json({ success: true, message: "Product list updated successfully." });
  } catch (error) {
    console.error("Error updating product list:", error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

app.post("/product/:productId/user", async (req, res) => {
  try {
    const productId = req.params.productId;
    const userData = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // const existingUser = product.users.find(user => user.email === userData.email);
    // if (existingUser) {
    //   return res.status(400).json({ error: "Email already exists in the users list." });
    // }
    const existingUserIndex = product.users.findIndex(
      (user) => user.email === userData.email
    );
    if (existingUserIndex !== -1) {
      const existingUser = product.users[existingUserIndex];
      if (existingUser.price !== userData.price) {
        product.users.splice(existingUserIndex, 1);
      }
    }

    product.users.push(userData);
    await product.save();

    product.users.forEach((user) => {
      checkPriceAndSendEmail(productId, user.email);
    });
    // checkPriceAndSendEmail(productId, userData.email);

    return res.status(200).json({ message: "User data added successfully." });
  } catch (error) {
    console.error("Error adding user data:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(port, () => {
  console.log("Server is up on port " + port + ".");
});
