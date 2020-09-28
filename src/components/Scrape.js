import React,{useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../util/auth.js";
import "./Pricing.scss";


function Scrape(props) {
  const auth = useAuth();
  const [url, setUrl] = useState("http://robotis.us");
  return (
    <div>
      <p>Hello World</p>
      <input placeholder="What's your URL" value={url} onChange={e=>setUrl(e.target.value)} /><button onClick={()=>alert(url)}>Submit</button>
      <iframe src={url}  onChange={(e)=>console.log(e)} />
      
    </div>
    
  );
}

export default Scrape;
