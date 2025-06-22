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
        const likeButton = document.createElement("button");
        const getButton = document.createElement("button");

        div.append(name, messageContent, date, rating, likes, likeButton, getButton);

        const dateString = FormatDateStringForClient(new Date(singleMessage.date));

        name.innerText = singleMessage.sender;
        messageContent.innerText = singleMessage.content;
        date.innerText = dateString;
        rating.innerText = singleMessage.rating;
        likes.innerText = singleMessage.likes;

        likeButton.innerText = "Like";
        likeButton.addEventListener("click", () => {LikeMessage(singleMessage, likes)});

        getButton.innerText = "Get";
        getButton.addEventListener("click", () => {GetMessage(singleMessage)});

        feedbackSection.appendChild(div);
    });
}

DisplayMessages();

feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(feedbackForm);
    const jokeData = Object.fromEntries(formData);

    fetch("https://nurburgring24guestbook-server.onrender.com/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeData)
    });
});

function LikeMessage(messageData, likesElement)
{
    const currentLikes = messageData.likes;

    likesElement.innerText = currentLikes + 1;

    const requestBody =
    {
        "likes": currentLikes
    }

    console.log(messageData.likes);

    fetch(`https://nurburgring24guestbook-server.onrender.com/messages/${messageData.msg_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });
}

function GetMessage(messageData)
{
    fetch(`https://nurburgring24guestbook-server.onrender.com/messages/${messageData.msg_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
}