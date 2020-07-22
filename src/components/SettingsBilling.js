import React, { useEffect } from "react";
import PageLoader from "./PageLoader";
import { useAuth } from "./../util/auth.js";
import { useRouter } from "./../util/router.js";
import { redirectToBilling } from "./../util/stripe.js";

function SettingsBilling(props) {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user.planId) {
      // If user has a plan then take them to the
      // Stripe billing portal to manage it.
      redirectToBilling();
    } else {
      // Otherwise go to pricing so they can
      // purchase a plan.
      router.push("/pricing");
    }
  }, [auth.user.planId]);

  return (
    <PageLoader
      style={{
        height: "50px",
      }}
    ></PageLoader>
  );
}

export default SettingsBilling;
