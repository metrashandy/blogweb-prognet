"use strict";

const userId = {
    name: null,
    identity: null,
    image: null,
    message: null,
    date: null
};

const userComment = document.querySelector("#comment");
const publishBtn = document.querySelector("button[type='submit']");
const comments = document.querySelector(".comment-list");
const userName = document.querySelector("#name");
let commentsCount = 0; // Menyimpan jumlah komentar

userComment.addEventListener("input", () => {
    if (!userComment.value) {
        publishBtn.setAttribute("disabled", "disabled");
        publishBtn.classList.remove("abled");
    } else {
        publishBtn.removeAttribute("disabled");
        publishBtn.classList.add("abled");
    }
});

function addPost(event) {
    event.preventDefault(); 

    if (!userComment.value) return;

    // Menyimpan informasi komentar
    userId.name = userName.value || "Anonymous";
    userId.identity = userId.name !== "Anonymous";
    userId.image = "gambar_kontent/foto-profil-whatsapp-kosong-kacamata.jpg";
    userId.message = userComment.value;
    userId.date = new Date().toLocaleString(); 

    // Membuat tampilan komentar
    let published = `
        <div class="parents">
            <img src="${userId.image}" class="user-image">
            <div class="comment-content"> 
                <h3>${userId.name}</h3>
                <p>${userId.message}</p>
                <span class="date">${userId.date}</span>
            </div>
        </div>`;

    comments.insertAdjacentHTML("afterbegin", published);

    // Mengosongkan text area dan input nama setelah komentar dipublikasikan
    userComment.value = "";
    userName.value = "";
    publishBtn.setAttribute("disabled", "disabled");
    publishBtn.classList.remove("abled");

    // Menambah jumlah komentar setiap kali komentar dipublikasikan
    commentsCount++;
    document.getElementById("comment-count").textContent = commentsCount;
}

// Menghubungkan tombol dengan fungsi addPost
publishBtn.addEventListener("click", addPost);
