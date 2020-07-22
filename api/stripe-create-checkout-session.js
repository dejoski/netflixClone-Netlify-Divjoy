const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const requireAuth = require("./_require-auth.js");
const { getUser, updateUser } = require("./_db.js");

exports.handler = requireAuth(async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const user = event.user;

  try {
    let { email, stripeCustomerId } = await getUser(user.uid);

    // If user does not already have a stripeCustomerId then create a customer in Stripe
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({ email: email });

      await updateUser(user.uid, {
        stripeCustomerId: customer.id,
      });

      stripeCustomerId = customer.id;
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      subscription_data: {
        // Use trial period set for this priceId (if there is one)
        trial_from_plan: true,
      },
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      // Uncomment if you need address collection
      //billing_address_collection: "required",
      //shipping_address_collection: { allowed_countries: ['US'] },
      success_url: `${process.env.STRIPE_DOMAIN}/dashboard?paid=true`,
      cancel_url: `${process.env.STRIPE_DOMAIN}/pricing`,
    });

    // Return success response
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ status: "success", data: session }),
    });
  } catch (error) {
    console.log("stripe-create-checkout-session error", error);

    // Return error response
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        status: "error",
        code: error.code,
        message: error.message,
      }),
    });
  }
});
