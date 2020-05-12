# POST request example using the SendGrid API and an AWS Lambda Function

There is extra code in `script.js` that isn't in the video to check the response status of the API call:

```js
if(response.status === 400) {
    responseDiv.innerHTML = "An error occurred: " + response.statusText;
}
```

You will need a SendGrid key, verified email address and an API Gateway URL pointing to a Lambda Function for this example to work.

Example code the Lambda Function is [here](https://github.com/javascript-repositories/video-call-sendgrid-lambda-function).