const mainContainer = document.querySelector(".blog-item"),
    imagePreview = mainContainer.querySelectorAll(".blog-img"),
    images = mainContainer.querySelectorAll(".blog-img img"),
    video = mainContainer.querySelectorAll(".video_popup");

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