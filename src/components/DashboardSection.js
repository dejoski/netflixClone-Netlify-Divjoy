import React from "react";
import Section from "./Section";
import Container from "react-bootstrap/Container";
import SectionHeader from "./SectionHeader";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useRouter } from "./../util/router.js";
import { useAuth } from "./../util/auth.js";

import Unogs from './Unogs'
function DashboardSection(props) {
  const auth = useAuth();
  const router = useRouter();

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
          size={1}
          spaced={true}
          className="text-center"
        ></SectionHeader>

        {router.query.paid && auth.user.planIsActive && (
          <Alert
            variant="success"
            className="text-center mx-auto"
            style={{ maxWidth: "300px" }}
          >
            You are now subscribed&nbsp;&nbsp;🥳
          </Alert>
        )}

        <Unogs />
        <div
          className="mt-5 mx-auto text-center"
          style={{
            maxWidth: "460px",
          }}
        >
          <small>Some helpful debug info 🐛</small>
          <ListGroup className="mt-2">
            <ListGroup.Item>
              Logged in as <strong>{auth.user.email}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              {auth.user.stripeSubscriptionId && (
                <>
                  Subscription data
                  <br />
                  ID: <strong>{auth.user.stripeSubscriptionId}</strong>
                  <br />
                  Price ID: <strong>{auth.user.stripePriceId}</strong>
                  <br />
                  Status: <strong>{auth.user.stripeSubscriptionStatus}</strong>
                </>
              )}

              {!auth.user.stripeSubscriptionId && (
                <Link to="/pricing">Subscribe to a plan</Link>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/settings/general">Account settings</Link>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Container>
    </Section>
  );
}

export default DashboardSection;
