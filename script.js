let fileInput = document.getElementById("filepicker");
let innerImage = document.querySelector(".inner-upload-image");
let image = null;
let url = null;
let InputImg = document.getElementById("input-image");
let icon = document.querySelector("#icon");
let span = document.querySelector("span");
let OriginalImg = document.querySelector(".resultImg1 img");
let GeneratedImg = document.querySelector(".resultImg2 img");

let uploadBtn = document.querySelector("#upload-btn");
let loading = document.querySelector("#loading");
let downloadBtn = document.querySelector("#download");
let resetBtn = document.querySelector("#reset");

function handleUpload() {
    const ApiKey = "iqu84CCGzsZJeNog2xtYm6CM";
    
    if (!image) {
        document.getElementById("error-message").style.display = "block";
        return;
    }

    const formdata = new FormData();
    formdata.append("image_file", image);
    formdata.append("size", "auto");

    fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": ApiKey },
        body: formdata,
    })
        .then(response => response.blob())
        .then(blob => {
            loading.style.display = "none";
            url = URL.createObjectURL(blob);
            GeneratedImg.src = url;

            // Show result section
            document.querySelector(".result").style.display = "block";
        })
        .catch(err => console.error(err));
}

innerImage.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
    image = fileInput.files[0];
    
    if (!image) return;

    let reader = new FileReader();
    
    reader.onload = (e) => {   
        InputImg.src = e.target.result; // Display uploaded image
        InputImg.style.display = "block";
        icon.style.display = "none";
        span.style.display = "none";
        
        OriginalImg.src = e.target.result; // Set original image for comparison
    };
    
    reader.readAsDataURL(image);
});

uploadBtn.addEventListener("click", () => {
    loading.style.display = "block";
    handleUpload();
});

downloadBtn.addEventListener("click", () => {
     fetch(url)
         .then(res => res.blob())
         .then(file => {
             let a = document.createElement("a");
             a.href = URL.createObjectURL(file);
             a.download = `removed-bg-${Date.now()}.png`;
             a.click();
         })
         .catch(err => console.error(err));
});

resetBtn.addEventListener("click", () => window.location.reload());