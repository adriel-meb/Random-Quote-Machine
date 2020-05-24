import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaTwitter } from "react-icons/fa";
import { FaBuffer } from "react-icons/fa";
import axios from "axios";

function QuoteComponent() {
  const [quote, setQuote] = useState({
    text: "",
    author: "",
  });

  const [color, setColor] = useState({
    hex: "#1262db",
  });

  //Get new quote
  const getQuote = () => {
    axios
      .get(
        "https://raw.githubusercontent.com/adriel-meb/Free-Code-Camp/master/Front%20End%20Libraries%20Projects/quotemachine/quote"
      )
      .then((res) => {
        let randomIndex = Math.floor(Math.random() * res.data.length);
        console.log(res.data);
        setQuote({
          text: res.data[randomIndex].body,
          author: res.data[randomIndex].title,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Change new background color
  const getNewColor = () => {
    let hexcolors = [
      "#66c3ff",
      "#2c1608",
      "#5c2935",
      "#ca6995",
      "#016612",
      "#0090ad",
      "#9992f6",
      "#9f0fef",
      "#97a98b",
      "#278ea5",
      "#800040",
      "#391313",
      "#775ada",
      "#003300",
      "#ac3f21",
      "#c03546",
      "#107a8b",
      "#0b8457",
      "#ff5959",
      "#caa5f1",
    ];

    let randomHex = Math.floor(Math.random() * hexcolors.length);

    return setColor({ hex: hexcolors[randomHex] });
  };

  //retrieve quotes
  useEffect(() => {
    getQuote();
  }, []);

  //handle click functions
  const handleClick = () => {
    console.log("you have click NEW QUOTE");
    getQuote();
    getNewColor();
  };

  return (
    <Container fluid id="Container">
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={{ span: 10, offset: 1 }}>
          <div id="quote-box" style={{ backgroundColor: color.hex }}>
            <div id="quote">
              <div id="text">"{quote.text}"</div>

              <div id="author">- {quote.author}</div>
            </div>

            <div id="footer">
              <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                  <Button
                    variant="outline-primary"
                    size="lg"
                    id="new-quote"
                    onClick={handleClick}
                  >
                    <FaBuffer />
                    New Quote
                  </Button>
                </Col>

                <Col lg={{ span: 6, offset: 3 }}>
                  <a
                    href={`https://twitter.com/intent/tweet?text="${quote.text}"-${quote.author}`}
                    id="tweet-quote"
                    target="_blank"
                  >
                    <Button variant="outline-primary" size="lg">
                      <FaTwitter /> Tweet!
                    </Button>
                  </a>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default QuoteComponent;
