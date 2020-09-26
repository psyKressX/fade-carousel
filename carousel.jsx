import React, { useState, useEffect, useCallback } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import "./carousel.css";

export default function Carousel(props) {
  const { children, divStyle, delay } = props;

  const [imgIndex, setImgIndex] = useState(0);
  const [init, setInit] = useState(true);

  //handles image changing by going threw ImgIndex array after
  //canceling fader timeout
  const clear = useCallback(() => {
    if (init) {
      setInit(false);
    }
  }, [init]);

  const previous = () => {
    clear();
    if (imgIndex === 0) {
      setImgIndex(children.length - 1);
    } else {
      setImgIndex((i) => i - 1);
    }
  };

  const next = useCallback(() => {
    clear();
    if (imgIndex < children.length - 1) {
      setImgIndex((i) => i + 1);
    } else {
      setImgIndex(0);
    }
  }, [clear, children.length, imgIndex]);

  const select = (index) => {
    clear();
    setImgIndex(index);
  };

  //image fader logic, stops an initial fade with init timer,
  // then sets timeOut to fader
  useEffect(() => {
    let fader;
    if (children.length > 1) {
      if (!init) {
        fader = setTimeout(() => {
          let index = imgIndex;
          if (index < children.length - 1) {
            index++;
            setImgIndex(index);
          } else {
            setImgIndex(0);
          }
        }, delay);
      } else {
        fader = setTimeout(() => {
          next();
        }, delay);
      }
      return () => {
        clearTimeout(fader);
      };
    }
  }, [init, imgIndex, delay, children.length, next, props]);

  return (
    <div style={divStyle}>
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {children.map((Child, index) => (
          <div
            key={index}
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              display: "flex",
            }}
            className={
              init && index === 0
                ? ""
                : init && index !== 0
                ? "invisible"
                : imgIndex === index
                ? "fadeIn"
                : // : index >= (imgIndex + 1) % children.length
                // ? "invisible"
                index ===
                  (((imgIndex - 1) % children.length) + children.length) %
                    children.length
                ? "fadeOut"
                : "invisible"
            }
          >
            {Child}
          </div>
        ))}
        {children.length > 1 ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: "10",
              opacity: "0.5",
              display: "flex",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <HiOutlineChevronLeft
                style={{
                  position: "absolute",
                  left: "0",
                  pointerEvents: "all",
                }}
                size={"1.9em"}
                onClick={previous}
              />
              <HiOutlineChevronRight
                style={{
                  position: "absolute",
                  right: "0",
                  pointerEvents: "all",
                }}
                size={"1.9em"}
                onClick={next}
              />
            </div>
            <div
              style={{
                alignSelf: "flex-end",
                width: "100%",
                display: "flex",
              }}
            >
              {children.map((i, index) => (
                <BsDot
                  key={index}
                  size={"1.9em"}
                  onClick={() => select(index)}
                  className={imgIndex !== index ? "fifty" : ""}
                  style={{ pointerEvents: "all" }}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

Carousel.defaultProps = {
  divStyle: {
    height: "900px",
    width: "100%",
  },
  delay: 8000,
  children: [
    <h1 style={{ margin: "auto" }}>
      Add Children elements inside Carousel component
    </h1>,
  ],
};
