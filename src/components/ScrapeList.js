import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Scrape.scss";
import { CSVLink } from "react-csv";

function getSelector(el){
    var names = [];
    while (el.parentNode){
      if (el.id){
        names.unshift('#'+el.id);
        break;
      }else{
        if (el===el.ownerDocument.documentElement) names.unshift(el.tagName);
        else{
          for (var c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++);
          names.unshift(el.tagName+":nth-child("+c+")");
        }
        el=el.parentNode;
      }
    }
    return names.join(" > ");
}

function getSelector2(_context) {
  var index,
    pathSelector,
    that = _context;
  if (that === "null") throw new Error("not an  dom reference");
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
      tagName.toLowerCase() === node.tagName.toLowerCase()
    ) {
      i++;
    }
  }
  return i;
}

function ScrapeList() {
  const [url, setUrl] = useState("http://robotis.us");
  const [html, setHtml] = useState("");
  const [pending, setPending] = useState(false);
  const [selectedObjects, setSelectedObjects] = useState({
    "List of Links": [],
    "List of Data Points": [],
    "Data Points": [],
    "Next Button": [],
  });
  const [csvData, setCsvData] = useState([]);
  const [action, setAction] = useState("List of Links");
  console.log(process.env);
  useEffect(() => {
    console.log(selectedObjects);
  }, [selectedObjects]);

  function handleSubmit() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    console.log("url", url);
    setPending(true);
    var data = JSON.stringify({ ...selectedObjects, action: action });
    let host = "http://127.0.0.1:5000";
    xhr.open("POST", host + "/submit?url=" + url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.open('GET', 'C:/Users/DejanStajic/OneDrive - 10jin Solutions/Documents/GitHub/MagicScraper/html2.html', true);
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) {
        setPending(false);
        console.log("failed");
        return;
      }
      if (this.status !== 200) {
        setPending(false);
        console.log("failed");
        return;
      } // or whatever error handling you want
      // document.getElementById("y").innerHTML = this.responseText;
      // setHtml(this.responseText);
      setCsvData(JSON.parse(JSON.parse(this.responseText)));
      setPending(false);
    };
    xhr.send(data);
  }
  function WhilePending() {
    return (
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
    );
  }
  function getHtml(url) {
    var xhr = new XMLHttpRequest();
    console.log("url", url);
    setPending(true);
    let host = "http://127.0.0.1:5000";
    xhr.open("GET", host + "/html?url=" + url, true);
    // xhr.open('GET', 'C:/Users/DejanStajic/OneDrive - 10jin Solutions/Documents/GitHub/MagicScraper/html2.html', true);
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) {
        setPending(false);
        console.log("failed");
        return;
      }
      if (this.status !== 200) {
        setPending(false);
        console.log("failed");
        return;
      }
      setHtml(this.responseText);
      console.log(this.responseText);
      setPending(false);
    };
    xhr.send();
  }
  function afterCsv() {
    return (
      <>
        <CSVLink data={csvData} filename="MagicScraper.csv">
          Download me
        </CSVLink>
        <button
          onClick={() =>
            alert(
              "Feature is still under construction. Try again in a few days"
            )
          }
        >
          Save/Schedule Bot
        </button>
      </>
    );
  }

  function SelectedTable() {
    console.log(action, selectedObjects[action], selectedObjects);
    return (
      <table>
        {selectedObjects[action].length !== 0 ? (
          <>
            <thead>
              <td>Selected Text</td>
              <td>Title of Column</td>
            </thead>
            <tbody>
              {selectedObjects[action].map((each, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <button
                        onClick={(e) =>
                          setSelectedObjects((old) => ({
                            ...old,
                            [action]: selectedObjects[action].filter(
                              (item) => item.value !== each.value
                            ),
                          }))
                        }
                      >
                        <span role="img" aria-label="X">
                          ❌
                        </span>
                      </button>
                      {each.value}
                    </td>
                    <td>
                      <input
                        placeholder="Title"
                        onChange={(e) => {
                          let temp = {...selectedObjects}
                          temp[action][i].title = e.target.value
                          setSelectedObjects(temp);
                        }}
                        value={each.title}
                      />
                    </td>
                  </tr>
                );
              })}
              <button onClick={handleSubmit}>Submit</button>
            {csvData.length !== 0 ? afterCsv() : null}
            </tbody>
          </>
        ) : null}
      </table>
    );
  }

  function ShadowContent() {
    return (
      <div
        style={{ width: "50%", float: "left" }}
        onClick={(e) => {
          var c = getSelector(e.target);
          if(action==='List of Links' || action==='List of Data Points'){
            c = c.replace(/:nth-child\(\d+\)/g,'')
          }
          var element = document.querySelector(c);
          // TODO: Ask which element or get the one they clicked
          try {
            e.preventDefault();
            e.stopPropagation();
          } catch (err) {
            alert(err.message);
          }
          // TODO: Add ability to collect images as well
          if (action !== "Next Button") {
            setSelectedObjects((old) => ({
              ...old,
              [action]: old[action].concat({
                selector: c,
                value: element.textContent,
                element: element,
                title: "",
              }),
            }));
          } else {
            setSelectedObjects((old) => ({
              ...old,
              [action]: [
                {
                  selector: c,
                  value: element.textContent,
                  element: element,
                  title: "",
                },
              ],
            }));
          }
          console.log(selectedObjects, typeof selectedObjects);
        }}
        className="content"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    );
  }

  return (
    <div style={{ textAlign: "-webkit-center" }}>
      <input
        placeholder="What's your URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={(e) => getHtml(url)}>Get Url</button>
      {!pending && html && (
        <>
          <div style={{ 
    "position": "fixed",
    "width": "50%",
    "float": "right",
    "left": "50%",
    "height":"50%",
    "overflow-y":"scroll",
 }}>
            <div
              onChange={(e) => {
                setAction(e.target.value);
              }}
            >
              <p>Would you like to use this page for links or collect data:</p>
              <label>
                <input
                  type="radio"
                  value="List of Links"
                  name="action"
                  checked={action === "List of Links" ? "checked" : null}
                />{" "}
                List of Links
              </label>
              <label>
                <input
                  type="radio"
                  value="List of Data Points"
                  name="action"
                  checked={action === "List of Data Points" ? "checked" : null}
                />{" "}
                List of Data Points
              </label>
              <label>
                <input
                  type="radio"
                  value="Data Points"
                  name="action"
                  checked={action === "Data Points" ? "checked" : null}
                />{" "}
                Data Points
              </label>
              <label>
                <input
                  type="radio"
                  value="Next Button"
                  name="action"
                  checked={action === "Next Button" ? "checked" : null}
                />{" "}
                Next Button
              </label>
            </div>

            <label>Start selecting the {action}</label>
            {SelectedTable()}
          </div>
          <div id="host">{ShadowContent()}</div>
        </>
      )}
      {pending && WhilePending()}
    </div>
  );
}

export default ScrapeList;
