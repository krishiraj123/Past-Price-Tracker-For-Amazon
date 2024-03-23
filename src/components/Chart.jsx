import React, { useEffect, useState } from "react";
import axios from "axios";
import CanvasJS from "@canvasjs/charts";

const Chart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const printChart = () => {
      if (products.length > 0) {
        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          theme: "light2",
          title: {
            text: "Simple Line Chart",
          },
          data: [
            {
              type: "line",
              indexLabelFontSize: 16,
              dataPoints: products.map((product) =>
                product.priceHistory.map((val) => ({
                  y: val.price,
                  x: val.date,
                }))
              ),
            },
          ],
        });
        chart.render();
      }
    };
    printChart();
  }, [products]);

  return (
    <div className="flex justify-center items-center">
      <div
        id="chartContainer"
        className="pt-5"
        style={{ height: "70vh", width: "90%" }}
      ></div>
    </div>
  );
};

export default Chart;
