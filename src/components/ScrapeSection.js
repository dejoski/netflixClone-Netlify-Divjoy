import React from "react";
import Section from "./Section";
import Container from "react-bootstrap/Container";
import SectionHeader from "./SectionHeader";
import Scrape from "./Scrape";
import ScrapeList from "./ScrapeList";

function ScrapeSection(props) {
  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={2}
          spaced={true}
          className="text-center"
        ></SectionHeader>
        {/* <Scrape></Scrape> */}
        <ScrapeList/>
      </Container>
    </Section>
  );
}

export default ScrapeSection;
