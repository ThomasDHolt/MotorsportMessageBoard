import { FormatDateStringForClient } from "./string.js";

const feedbackSection = document.getElementById("feedbackSection");
const feedbackForm = document.getElementById("feedbackForm");

async function FetchMessages()
{
    const res = await fetch("https://nurburgring24guestbook-server.onrender.com/messages");
    const messages = await res.json();
    return messages;
}

async function DisplayMessages()
{
    const messages = await FetchMessages();

    messages.forEach((singleMessage) => {
        const div = document.createElement("div");
        const name = document.createElement("h3");
        const messageContent = document.createElement("p");
        const date = document.createElement("p");
        const rating = document.createElement("p");
        const likes = document.createElement("p");

        div.append(name, messageContent, date, rating, likes);

        const dateString = FormatDateStringForClient(new Date(singleMessage.date));

        name.innerText = singleMessage.sender;
        messageContent.innerText = singleMessage.content;
        date.innerText = dateString;
        rating.innerText = singleMessage.rating;
        likes.innerText = singleMessage.likes;

        feedbackSection.appendChild(div);
    });
}

DisplayMessages();

feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
});