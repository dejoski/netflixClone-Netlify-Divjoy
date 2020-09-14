import React from "react";
import Section from "./Section";
import Container from "react-bootstrap/Container";
import SectionHeader from "./SectionHeader";
import NewsletterSection2 from "./NewsletterSection2";

function HeroSection(props) {
  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container className="text-center">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={1}
          spaced={true}
        ></SectionHeader>
        <form action="https://lively-aromatic-doll.glitch.me" method="GET">
          <input type="text" name="values" placeholder="Value here" /> 
          <input type="text" name="urls" placeholder="Full URL" /> 
          <input type="submit" /> 
        </form>
        {/* <NewsletterSection2
          bg="light"
          textColor="dark"
          size="md"
          bgImage=""
          bgImageOpacity={1}
          title="Stay in the know"
          subtitle="Receive our latest articles and feature updates"
          buttonText="Subscribe"
          buttonColor="primary"
          inputPlaceholder="Enter your email"
          subscribedMessage="You are now subscribed!"
        ></NewsletterSection2> */}
      </Container>
    </Section>
  );
}

export default HeroSection;
