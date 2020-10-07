import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../util/auth.js";
import Spinner from "react-bootstrap/Spinner";
import "./Scrape.scss";

function getSelector(_context) {
  var index,
    localName,
    pathSelector,
    that = _context,
    node;
  if (that == "null") throw "not an  dom reference";
  index = getIndex(that);

  while (that.tagName) {
    pathSelector = that.localName + (pathSelector ? ">" + pathSelector : "");
    that = that.parentNode;
  }
  pathSelector = pathSelector + ":nth-of-type(" + index + ")";

  return pathSelector;
}

function getIndex(node) {
  var i = 1;
  var tagName = node.tagName;

  while (node.previousSibling) {
    node = node.previousSibling;
    if (
      node.nodeType === 1 &&
      tagName.toLowerCase() == node.tagName.toLowerCase()
    ) {
      i++;
    }
  }
  return i;
}

function Scrape(props) {
  const auth = useAuth();
  const [url, setUrl] = useState("http://robotis.us");
  const [html, setHtml] = useState("<p>Testing</p>");
  const [pending, setPending] = useState(false);

  function getHtml(url) {
    var xhr = new XMLHttpRequest();
    console.log("url", url);
    setPending(true);
    xhr.open("GET", "http://127.0.0.1:5000/html?url=" + url, true);
    //xhr.open('GET', 'robo2.html', true);
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      if (this.status !== 200) return; // or whatever error handling you want
      // document.getElementById("y").innerHTML = this.responseText;
      setHtml(this.responseText);
      console.log(this.responseText);
      setPending(false);
    };
    xhr.send();
    // var rightArrowParents = [];
    // var entry = this.tagName.toLowerCase();
    // if (this.className) {
    //   entry += "." + this.className.replace(/ /g, ".");
    // }
    // rightArrowParents.push(entry);
    // alert(rightArrowParents.join(" "));
  }

  return (
    <div style={{ "text-align": "-webkit-center" }}>
      <p>Hello World</p>
      <input
        placeholder="What's your URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={() => alert(url)}>Submit</button>
      <button onClick={(e) => getHtml(url)}>Get Url</button>
      {!pending && (
        <div
          style={{ width: "50%" }}
          onClick={(e) => {
            alert(e.target.event);
            var c = getSelector(e.target);
            var element = document.querySelector(c);

            console.log(element);
            console.log(c);
            //element.style.color = "red"
            try {
              e.preventDefault();
              e.stopPropagation();
            } catch (err) {
              alert(err.message);
            }
          }}
          className="content"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      )}
      {pending && (
        <>
          <Spinner
            animation="border"
            size="sm"
            role="status"
            aria-hidden={true}
            className="align-baseline"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
          <p>This process may take a minute, please wait.</p>
        </>
      )}

      {/* <iframe src={url}  onChange={(e)=>console.log(e)} /> */}
    </div>
  );
}

export default Scrape;
