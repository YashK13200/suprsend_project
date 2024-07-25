var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(event,tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

var slidemenu = document.getElementById("sidemenu");

function openmenu() {
    slidemenu.style.right = "0";
}

function closemenu() {
    slidemenu.style.right = "-200px";
}

const scriptURL = "https://script.google.com/macros/s/AKfycbyEEXMjxJ6Ivve8Fvqxwuh1LYAsdBcKC6LlBquLVORzUx0XejkrzyXqsiLKMa4L2zFu/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
            msg.innerHTML = "Message sent successfully";
            setTimeout(function () {
                msg.innerHTML = "";
            }, 5000);
        })
        .catch((error) => console.error("Error!", error.message));
    form.reset();
});

// SuprSend integration
const suprsend = (function() {
//     let publicKey = "YOUR_PUBLIC_KEY"; // Replace with your SuprSend public key
    let publicKey = "SS.gzfubvxP0AixNWqOksM90ekfoNAWptxTnJHsS8290l4"; // Replace with your SuprSend public key
    let apiUrl = "https://hub.suprsend.com/trigger/"; // SuprSend API URL

    function subscribeToNotifications(email) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${publicKey}`
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Subscription successful:', data);
                alert('Subscribed to notifications successfully!');
            } else {
                console.error('Subscription failed:', data);
                alert('Subscription failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    }

    return {
        subscribeToNotifications
    };
})();

// Subscribe form handling
const subscribeForm = document.getElementById('subscribe-form');
const emailInput = document.getElementById('email-input');

subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    suprsend.subscribeToNotifications(email);
    subscribeForm.reset();
});
