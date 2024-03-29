import React, { useState, useEffect } from "react";
import "../App.css";

const SuggestionBar = (props) => {
  const [tip, setTip] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    let defaultTip = "";
    if (props.discount > 25) {
      defaultTip =
        "This is absolutely the best time to buy this product. Don't miss out, Drop chances are lower than 15%";
      setSelectedOption("Exactly");
    } else if (props.discount <= 25 && props.discount > 15) {
      defaultTip =
        "This is a good time to buy this product. Drop chances are lower than 30%";
      setSelectedOption("Indeed");
    } else if (props.discount <= 15 && props.discount > 7) {
      defaultTip =
        "This is a good time to buy this product. Drop chances are lower than 50%";
      setSelectedOption("Maybe");
    } else {
      defaultTip =
        "This is not a good time to buy this product. Drop chances are higher than 50%";
      setSelectedOption("Nope");
    }
    setTip(defaultTip);
  }, [props.discount]);

  return (
    <div className="suggestion-bar">
      <div className="suggestion-bar-options">
        <div
          className={`suggestion-bar-option exactly ${
            selectedOption === "Exactly" && "active"
          }`}
        >
          Exactly
          {selectedOption === "Exactly" && (
            <div className="arrow-down green"></div>
          )}
        </div>
        <div
          className={`suggestion-bar-option indeed ${
            selectedOption === "Indeed" && "active"
          }`}
        >
          Indeed
          {selectedOption === "Indeed" && (
            <div className="arrow-down yellow"></div>
          )}
        </div>
        <div
          className={`suggestion-bar-option maybe ${
            selectedOption === "Maybe" && "active"
          }`}
        >
          Maybe
          {selectedOption === "Maybe" && (
            <div className="arrow-down orange"></div>
          )}
        </div>
        <div
          className={`suggestion-bar-option nope ${
            selectedOption === "Nope" && "active"
          }`}
        >
          Nope
          {selectedOption === "Nope" && <div className="arrow-down red"></div>}
        </div>
      </div>
      {tip && <div className="tip">{tip}</div>}
    </div>
  );
};

export default SuggestionBar;
