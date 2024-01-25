exports.handler = async function (event, context) {
  try {
    const { email } = JSON.parse(event.body);

    // Check if email is valid
    var emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errorMessage: "Invalid Email Address" }),
      };
    }

    // Send to mail api
    const url = "https://us9.api.mailchimp.com/3.0/lists/7015e98a5a/members";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic ${process.env.MAILCHIMP_API_KEY}",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    });

    const responseBody = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify({}),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong." }),
    };
  }
};
