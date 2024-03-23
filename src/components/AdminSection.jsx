import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";

// export const isAdmin = true;
const AdminSection = (props) => {
  const [products, setProducts] = useState([]);
  const Navigate = useNavigate();

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

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result, rowIndex) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const items = reorder(products, sourceIndex, destinationIndex);
    setProducts(items);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post("http://localhost:3000/trending", {
        products,
      });
      console.log(response);
    } catch (error) {
      console.error("Error updating products:", error);
    }
    Navigate("/");
  };

  return (
    <>
      <h1 className="text-5xl text-center font-mono font-semibold">
        Admin Panel
      </h1>
      <div className="col-11 col-lg-10 ms-auto me-auto my-5">
        <div className="flex justify-between flex-col md:flex-row">
          <p className="mb-2 text-lg font-monospace text-gray-400 font-medium">
            Drag and drop the products to make changes in the trending section.
          </p>
          <button className="btn btn-dark btn-lg mb-4" onClick={handleUpdate}>
            UPDATE TRENDS
          </button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          {[...Array(Math.ceil(products.length / 3)).keys()].map((rowIndex) => (
            <Droppable
              droppableId={`row-${rowIndex}`}
              key={`row-${rowIndex}`}
              direction="horizontal"
            >
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
                >
                  {products
                    .slice(rowIndex * 3, (rowIndex + 1) * 3)
                    .map((product, index) => (
                      <Draggable
                        key={product._id}
                        draggableId={product._id}
                        index={index + rowIndex * 3}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="col my-2" key={product._id}>
                              <div className="card h-100 shadow">
                                <img
                                  src={product.imageUrl}
                                  className="card-img-top img-fluid p-3"
                                  alt="Product"
                                  style={{
                                    height: "100px",
                                    objectFit: "contain",
                                    width: "100%",
                                  }}
                                />
                                <div className="card-body">
                                  <div className="d-flex justify-content-between mb-3">
                                    <small className="text-muted font-bold">
                                      Highest Price: {product.currency}
                                      {product.highestPrice}
                                    </small>
                                    <small className="text-muted font-bold">
                                      Lowest Price: {product.currency}
                                      {product.lowestPrice}
                                    </small>
                                  </div>
                                  <h5 className="card-title text-sm font-normal lh-4">
                                    {product.title.substring(0, 35)}
                                  </h5>
                                  <h6 className="card-subtitle mb-2 text-muted text-center my-3 font-bold">
                                    <span className="shadow rounded-lg p-2 m-2">
                                      Current Price: {product.currency}
                                      {product.currentPrice}
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </>
  );
};

export default AdminSection;
