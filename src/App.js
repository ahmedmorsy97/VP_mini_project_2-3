/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import "./App.css";
// import file from "./test.txt";

const App = () => {
  // let filReader;

  // const hanleFileRead = (e) => {
  //   const c = filReader.result;
  //   console.log(c);
  // }

  // const handleFileChoosen = (file) => {
  //   filReader = new FileReader();
  //   filReader.onloadend = hanleFileRead;
  //   filReader.readAsText(file);
  // }

  // handleFileChoosen();

  // const data = `rectangle 0 0 100 100
  // circle 0 0 100 100
  // rectangle 150 0 250 100`;

  // rectangle 0 0 100 100
  // circle 0 0 100 100
  // rectangle 150 0 250 100

  const numberOfCircles = parseData => {
    var numCircles = 0;
    parseData.forEach(data => {
      if (data.name === "circle") {
        numCircles++;
      }
    });
    return numCircles;
  };

  const circles = parseData => {
    var circles = [];
    parseData.forEach(data => {
      if (data.name === "circle") {
        circles.push(data);
      }
    });
    return circles;
  };

  const rects = parseData => {
    var rects = [];
    parseData.forEach(data => {
      if (data.name === "rectangle") {
        rects.push(data);
      }
    });
    return rects;
  };

  const checkData = data => {
    var parseData = [];

    data.split("\n").map(shape => {
      const shapeData = shape.trim().split(" ");
      parseData.push({
        name: shapeData[0],
        xB: +shapeData[1],
        yB: +shapeData[2],
        xT: +shapeData[3],
        yT: +shapeData[4]
      });
    });
    if (parseData.length > 4) {
      handleValidity("Invalid");
    } else {
      if (numberOfCircles(parseData) === 0) {
        if (parseData.length > 2) {
          handleValidity("Invalid");
        } else {
          if (parseData.length === 1) {
            handleValidity("Valid => Start -> BOX -> rectangle");
            calculateResult("Valid => Start -> BOX -> rectangle");
          } else {
            if (parseData[0].xT <= parseData[1].xB) {
              if (parseData[0].yB === parseData[1].yB) {
                handleValidity(
                  "Valid => Start -> TWO_BOXES -> left_of(rectangle, rectangle)"
                );
                calculateResult(
                  "Valid => Start -> TWO_BOXES -> left_of(rectangle, rectangle)"
                );
              } else {
                handleValidity("Invalid");
              }
            } else {
              if (parseData[1].xT <= parseData[0].xB) {
                if (parseData[1].yB === parseData[0].yB) {
                  handleValidity(
                    "Valid => Start -> TWO_BOXES -> left_of(rectangle, rectangle)"
                  );
                  calculateResult(
                    "Valid => Start -> TWO_BOXES -> left_of(rectangle, rectangle)"
                  );
                } else {
                  handleValidity("Invalid");
                }
              } else {
                handleValidity("Invalid");
              }
            }
          }
        }
      } else {
        if (numberOfCircles(parseData) * 2 > parseData.length) {
          handleValidity("Invalid");
        } else {
          if (
            numberOfCircles(parseData) * 2 === parseData.length &&
            parseData.length === 4
          ) {
            var inRect = [false, false];
            circles(parseData).forEach((circle, index) => {
              rects(parseData).forEach(rect => {
                if (
                  circle.xB === rect.xB &&
                  circle.xT === rect.xT &&
                  circle.yB === rect.yB &&
                  circle.yT === rect.yT
                ) {
                  inRect[index] = true;
                }
              });
            });
            if (inRect[0] && inRect[1]) {
              if (rects(parseData)[0].xT <= rects(parseData)[1].xB) {
                if (parseData[0].yB === parseData[1].yB) {
                  handleValidity(
                    "Valid => Start -> TWO_BOXES -> left_of(contains(rectangle, circle), contains(rectangle, circle))"
                  );
                  calculateResult(
                    "Valid => Start -> TWO_BOXES -> left_of(contains(rectangle, circle), contains(rectangle, circle))"
                  );
                } else {
                  handleValidity("Invalid");
                }
              } else {
                if (rects(parseData)[1].xT <= rects(parseData)[0].xB) {
                  if (parseData[1].yB === parseData[0].yB) {
                    handleValidity(
                      "Valid => Start -> TWO_BOXES -> left_of(contains(rectangle, circle), contains(rectangle, circle))"
                    );
                    calculateResult(
                      "Valid => Start -> TWO_BOXES -> left_of(contains(rectangle, circle), contains(rectangle, circle))"
                    );
                  } else {
                    handleValidity("Invalid");
                  }
                } else {
                  handleValidity("Invalid");
                }
              }
            } else {
              handleValidity("Invalid");
            }
          } else {
            var inRect = false;
            circles(parseData).forEach(circle => {
              rects(parseData).forEach(rect => {
                if (
                  circle.xB === rect.xB &&
                  circle.xT === rect.xT &&
                  circle.yB === rect.yB &&
                  circle.yT === rect.yT
                ) {
                  inRect = true;
                }
              });
            });
            // console.log(inRect);
            if (inRect) {
              if (parseData.length === 3) {
                if (rects(parseData)[0].xT <= rects(parseData)[1].xB) {
                  if (parseData[0].yB === parseData[1].yB) {
                    if (
                      circles(parseData)[0].xB > rects(parseData)[0].xB ||
                      circles(parseData)[0].xB > rects(parseData)[1].xB
                    ) {
                      handleValidity(
                        "Valid => Start -> TWO_BOXES -> left_of(rectangle, contains(rectangle, circle))"
                      );
                      calculateResult(
                        "Valid => Start -> TWO_BOXES -> left_of(rectangle, contains(rectangle, circle))"
                      );
                    } else {
                      handleValidity(
                        "Valid => Start -> TWO_BOXES -> left_of(contains(rectangle, circle), rectangle)"
                      );
                      calculateResult(
                        "Valid => Start -> TWO_BOXES -> left_of(contains(rectangle, circle), rectangle)"
                      );
                    }
                  } else {
                    handleValidity("Invalid");
                  }
                } else {
                  if (rects(parseData)[1].xT <= rects(parseData)[0].xB) {
                    if (parseData[1].yB === parseData[0].yB) {
                      if (
                        circles(parseData)[0].xB > rects(parseData)[0].xB ||
                        circles(parseData)[0].xB > rects(parseData)[1].xB
                      ) {
                        handleValidity(
                          "Valid => Start -> TWO_BOXES -> left_of(rectangle, contains(rectangle, circle))"
                        );
                        calculateResult(
                          "Valid => Start -> TWO_BOXES -> left_of(rectangle, contains(rectangle, circle))"
                        );
                      } else {
                        handleValidity(
                          "Valid => Start -> TWO_BOXES -> left_of(contains(rectangle, circle), rectangle)"
                        );
                        calculateResult(
                          "Valid => Start -> TWO_BOXES -> left_of(contains(rectangle, circle), rectangle)"
                        );
                      }
                    } else {
                      handleValidity("Invalid");
                    }
                  } else {
                    handleValidity("Invalid");
                  }
                }
              } else {
                handleValidity(
                  "Valid => Start -> BOX -> contains(rectangle, circle)"
                );
                calculateResult(
                  "Valid => Start -> BOX -> contains(rectangle, circle)"
                );
                // handleValidity("Valid");
              }
            } else {
              handleValidity("Invalid");
            }
          }
        }
      }
    }
  };

  const calculateResult = validity => {
    var d = validity.split("->");
    // console.log(d[d.length - 1].trim());

    switch (d[d.length - 1].trim()) {
      case "contains(rectangle, circle)":
        handleResult(100);
        break;
      case "left_of(rectangle, rectangle)":
        handleResult(100);
        break;
      case "left_of(contains(rectangle, circle), rectangle)":
        handleResult(1000);
        break;
      case "left_of(rectangle, contains(rectangle, circle))":
        handleResult(1000);
        break;
      case "left_of(contains(rectangle, circle), contains(rectangle, circle))":
        handleResult(10000);
        break;
      case "rectangle":
        handleResult(10);
        break;
      default:
        handleResult(0);
        break;
    }
  };

  const [data, updateData] = useState("");

  const handleData = data => {
    checkData(data);
    updateData(data);
  };

  const [validity, updateValidity] = useState("Enter data to check validity");

  const handleValidity = data => {
    updateValidity(data);
  };

  const [result, updateResult] = useState(0);

  const handleResult = data => {
    updateResult(data);
  };

  return (
    <>
      <div className="App">
        <textarea rows="8" id="data"></textarea>
        <button
          onClick={() => {
            const data = document.getElementById("data").value.trim();
            handleData(data);
          }}
        >
          Apply
        </button>
        <p>{validity}</p>
        {/* {validity.indexOf("Invalid") === -1 &&
        validity !== "Enter data to check validity" ? (
          <p>Result: {result}</p>
        ) : null} */}
      </div>
      <div className="Apps">
        {
        // validity.indexOf("Invalid") === -1
        //   ? 
          data.split("\n").map((shape, i) => {
              const pro = shape.trim().split(" ");
              if (pro[0] === "rectangle") {
                return (
                  <div
                    key={i}
                    style={{
                      width: +pro[3] - +pro[1] + "px",
                      height: +pro[4] - +pro[2] + "px",
                      position: "absolute",
                      top: +pro[2] + "px",
                      left: +pro[1] + "px",
                      // border: '1px solid #fff',
                      backgroundColor: "#fff"
                    }}
                  ></div>
                );
              } else {
                return (
                  <div
                    key={i}
                    style={{
                      width: +pro[3] - +pro[1] + "px",
                      height: +pro[4] - +pro[2] + "px",
                      position: "absolute",
                      top: +pro[2] + "px",
                      left: +pro[1] + "px",
                      // border: '1px solid #fff',
                      borderRadius: "50%",
                      backgroundColor: "firebrick",
                      zIndex: 2
                    }}
                  ></div>
                );
              }
            })
          // : null
          }
      </div>
    </>
  );
};

export default App;
