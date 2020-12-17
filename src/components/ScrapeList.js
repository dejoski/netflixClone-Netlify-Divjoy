import React, { useEffect, useState, useRef,useCallback } from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Scrape.scss";
import { CSVLink } from "react-csv";


function ScrapeList() {
  const [url, setUrl] = useState("http://robotis.us");
  const [html, setHtml] = useState("");
  const [pending, setPending] = useState(false);
  const [listening, setListening] = useState(false);
  const [selectedObjects, setSelectedObjects] = useState({
    "List of Links": [],
    "List of Data Points": [],
    "Data Points": [],
    "Next Button": [],
    "Collect Data": [],
  });
  const [csvData, setCsvData] = useState([]);
  const [action, setAction] = useState("List of Data Points");
  const innerRef = useRef(null);
  const div = innerRef.current;
  console.log(process.env);


  const eventListener = useCallback((event) => {    
    console.log("useEffect",action,event,listening);
  // if(!listening){
  //   setListening(true);
      console.log("1",JSON.parse(event.data),event.source.location.pathname === "srcdoc"); 
          
      if (event.origin.startsWith('http://localhost') && event.source.location.pathname === "srcdoc") { 
        //srcdoc  or /test.html
          console.log("Gotcha",action,JSON.parse(event.data).replace(/#([^ ]+)/,"[id='$1']"),event.source.location.pathname === "srcdoc"); 
          // var c = getSelector(JSON.parse(event.data));
          // console.log(c)
          handleIFrame(JSON.parse(event.data).replace(/#([^ ]+)/,"[id='$1']"));
    }
  // }
  
  
  
}

, [selectedObjects,action]);

useEffect(() => {
    window.addEventListener('message', eventListener);
    return () => window.removeEventListener('message', eventListener);
}, [eventListener]);


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
      setHtml(this.responseText.replace('</head>',`
              <script src="https://code.jquery.com/jquery-3.5.0.js"></script>
              <script src="http://localhost:3000/js/selector2.js" type="text/javascript"></script>
              <link type="text/css" rel="stylesheet" href="http://localhost:3000/css/selector.css"><link rel="stylesheet" href="https://nostalgic-caterwauling-limit.glitch.me/style.css">
              
              </head>`).replace('src="/','src="'.concat(url).concat('/')));
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
        {action!=='Collect Data'?null:
              <div
              onChange={(e) => {
                console.log("child changing action from",action,"to",e.target.value)
                setAction(e.target.value);
              }}
            >
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
              </div>
              }
        {selectedObjects[action].length !== -1 && action!== 'Collect Data'? (
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
                      {each.value}({each.count})
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
              {/* <button value="List of Links" onClick={(e)=>setAction(e.target.value)}>Links to many pages?</button> */}
              <button value="Next Button" onClick={(e)=>setAction(e.target.value)}>Next button?</button>
              <button onClick={handleSubmit}>Submit</button>
            {csvData.length !== 0 ? afterCsv() : null}
            </tbody>
          </>
        ) : null}
      </table>
    );
  }

  function handleIFrame(c){
    console.log("current actions is:",action,selectedObjects["action"])
    if(action==='List of Links' || action==='List of Data Points'){
      c = c.replace(/:nth-child\(\d+\)/g,'')
    }
    // var element = document.querySelector(c);
    var element = document.getElementById("dissectionSite").contentWindow.document.querySelector(c);
    var elements = Array.from(document.getElementById("dissectionSite").contentWindow.document.querySelectorAll(c));
    // var elements = Array.from(document.querySelectorAll(c));
    // console.log(elements.map(x=>x.text));
    // console.log(elements.length);
    // TODO: Ask which element or get the one they clicked
    // try {
    //   e.preventDefault();
    //   e.stopPropagation();
    // } catch (err) {
    //   alert(err.message);
    // }
    // TODO: Add ability to collect images as well
    if (action !== "Next Button") {
      setSelectedObjects((old) => ({
        ...old,
        [action]: old[action].concat({
          selector: c,
          value: element.textContent,
          values:elements.map(x=>x.text),
          count:elements.length,
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
            values:elements.map(x=>x.text),
            count:elements.length,
            title: "",
          },
        ],
      }));
    }
    console.log(selectedObjects, typeof selectedObjects);
  }

  function ShadowContent() {
    return (

<iframe title="content" id="dissectionSite" 
        onClick={handleIFrame}
        ref={innerRef}
        className="content" style={{    "width": "100%",
          "border": "3px solid hsl(0deg 0% 0%)",
          "height": "100vh"}} 
            srcdoc= {html}
            sandbox="allow-same-origin allow-scripts"></iframe>
            // html or http://localhost:3000/test.html
      // <div
      //   style={{ width: "50%", float: "left" }}
      //   onClick={(e) => {
      //     var c = getSelector(e.target);
      //     if(action==='List of Links' || action==='List of Data Points'){
      //       c = c.replace(/:nth-child\(\d+\)/g,'')
      //     }
      //     var element = document.querySelector(c);
      //     var elements = Array.from(document.querySelectorAll(c));
      //     // console.log(elements.map(x=>x.text));
      //     // console.log(elements.length);
      //     // TODO: Ask which element or get the one they clicked
      //     try {
      //       e.preventDefault();
      //       e.stopPropagation();
      //     } catch (err) {
      //       alert(err.message);
      //     }
      //     // TODO: Add ability to collect images as well
      //     if (action !== "Next Button") {
      //       setSelectedObjects((old) => ({
      //         ...old,
      //         [action]: old[action].concat({
      //           selector: c,
      //           value: element.textContent,
      //           values:elements.map(x=>x.text),
      //           count:elements.length,
      //           element: element,
      //           title: "",
      //         }),
      //       }));
      //     } else {
      //       setSelectedObjects((old) => ({
      //         ...old,
      //         [action]: [
      //           {
      //             selector: c,
      //             value: element.textContent,
      //             element: element,
      //             values:elements.map(x=>x.text),
      //             count:elements.length,
      //             title: "",
      //           },
      //         ],
      //       }));
      //     }
      //     console.log(selectedObjects, typeof selectedObjects);
      //   }}
      //   className="content"
      //   dangerouslySetInnerHTML={{ __html: html }}
      // ></div>
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
        {/*style={{ 
    "position": "fixed",
    "width": "50%",
    "float": "right",
    "left": "50%",
    "height":"50%",
    "overflow-y":"scroll",
 }}*/}
          <div >
            <div
              onChange={(e) => {
                console.log("parent changing action from",action,"to",e.target.value)
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
                  value="Collect Data"
                  name="action"
                  checked={action === "Collect Data" ? "checked" : null}
                />{" "}
                Collect Data
              </label>
                
{/*               
              
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
              </label> */}
              {/* <label>
                <input
                  type="radio"
                  value="Next Button"
                  name="action"
                  checked={action === "Next Button" ? "checked" : null}
                />{" "}
                Next Button
              </label> */}
            </div>

            {/* <label>Start selecting the {action}</label> */}
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
