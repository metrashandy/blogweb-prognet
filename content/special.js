const mainContainer = document.querySelector(".version"),
    imagePreview = mainContainer.querySelectorAll(".gambar"),
    images = mainContainer.querySelectorAll(".gambar img"),
    video = mainContainer.querySelectorAll("video");

window.onload = () => {
    mainContainer.onmouseenter = () => {
        images.forEach((image) => {
            image.style.opacity = 0.5;
        })
    }
    mainContainer.onmouseleave = () => {
        images.forEach((image) => {
            image.style.opacity = 1;
        })
    }

    imagePreview.forEach((image, index) => {
        image.onmouseenter = () => {
            video[index].play();
        }
        image.onmouseleave = () => {
            video[index].pause();
        }
    })
}