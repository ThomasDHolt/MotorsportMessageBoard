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
        const messageDiv = document.createElement("div");
        const topDiv = document.createElement("div");
        const mainDiv = document.createElement("div");
        const bottomDiv = document.createElement("div");
        const likeDiv = document.createElement("div");
        const deleteDiv = document.createElement("div");

        const name = document.createElement("h3");
        const messageContent = document.createElement("p");
        const date = document.createElement("p");
        const rating = document.createElement("p");
        const likes = document.createElement("p");
        const likeButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        messageDiv.classList.add("flex-container", "flex-column", "message-container");
        topDiv.classList.add("flex-container", "flex-row", "flex-space-between");
        mainDiv.classList.add("flex-container", "flex-row", "flex-centre-horizontal");
        bottomDiv.classList.add("flex-container", "flex-row", "flex-space-between");
        likeDiv.classList.add("flex-container", "flex-row");

        name.classList.add("name", "text-margin", "centre-text-horizontal");
        rating.classList.add("text-margin", "centre-text-horizontal");
        date.classList.add("text-margin", "centre-text-horizontal");
        messageContent.classList.add("text-margin", "feedback-text");
        likes.classList.add("text-margin", "extra-text");
        

        topDiv.append(name, rating, date);
        mainDiv.append(messageContent);
        likeDiv.append(likes, likeButton);
        deleteDiv.append(deleteButton);
        bottomDiv.append(likeDiv, deleteDiv);

        messageDiv.append(topDiv, mainDiv, bottomDiv);

        const dateString = FormatDateStringForClient(new Date(singleMessage.date));

        name.innerText = singleMessage.sender;
        messageContent.innerText = singleMessage.content;
        date.innerText = dateString;
        rating.innerText = `${singleMessage.rating}/5`;
        likes.innerText = singleMessage.likes;

        likeButton.innerText = "Like";
        likeButton.addEventListener("click", async () => {LikeMessage(singleMessage,)});

        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", async () => {DeleteMessage(singleMessage)});

        feedbackSection.appendChild(messageDiv);
    });
}

DisplayMessages();

feedbackForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(feedbackForm);
    const jokeData = Object.fromEntries(formData);

    await fetch("https://nurburgring24guestbook-server.onrender.com/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeData)
    });

    feedbackSection.innerHTML = "";
    DisplayMessages();
});

async function LikeMessage(messageData)
{
    const currentLikes = messageData.likes;

    const requestBody =
    {
        "likes": currentLikes
    }

    console.log(messageData.likes);

    await fetch(`https://nurburgring24guestbook-server.onrender.com/messages/${messageData.msg_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    feedbackSection.innerHTML = "";
    DisplayMessages();
}

async function DeleteMessage(messageData)
{
    await fetch(`https://nurburgring24guestbook-server.onrender.com/messages/${messageData.msg_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    feedbackSection.innerHTML = "";
    DisplayMessages();
}