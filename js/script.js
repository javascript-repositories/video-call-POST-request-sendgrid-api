const sendButton = document.querySelector("button");
const emailInput = document.querySelector("#email");
const subjectInput = document.querySelector("#subject");
const messageInput = document.querySelector("#message");

const form = document.querySelector("form");
const loader = document.querySelector(".loader");
const responseDiv = document.querySelector("#response");

const url = "api-gateway-url"; // this will be the URL created in AWS API Gateway

sendButton.addEventListener("click", async function() {

    loader.style.display = "block";
    form.style.opacity = 0;

    const email = emailInput.value;
    const subject = subjectInput.value;
    const message = messageInput.value;

    const data = {
        "email": email,
        "subject": subject,
        "message": message
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        });

        console.log(response)

        // check the status of the response
        // the lambda function is coded to return 400 if the function fails
        if(response.status === 400) {
            responseDiv.innerHTML = "An error occurred: " + response.statusText;
        }
        else {            
            responseDiv.innerHTML = "Email sent";
            // clear the inputs
            emailInput.value = "";
            subjectInput.value = "";
            messageInput.value = "";
            // disable the button once the form has been submitted
            sendButton.disabled = true;
        }        
    }
    catch(error) {
        console.log(error);
        responseDiv.innerHTML = JSON.stringify(error);
    }
    finally {
        loader.style.display = "none";
        form.style.opacity = 1;
    }

});

// validation
emailInput.addEventListener("keyup", validateForm);
subjectInput.addEventListener("keyup", validateForm);
messageInput.addEventListener("keyup", validateForm);

function validateForm() {
    let disabled = false;

    if (
        !validateEmail(emailInput.value) ||
        !checkInputLength(subjectInput.value, 3) ||
        !checkInputLength(messageInput.value, 5)
    ) {
        disabled = true;
    }

    sendButton.disabled = disabled;
}

function checkInputLength(value, length) {
    const trimmedValue = value.trim();

    if (trimmedValue.length >= length) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
}
