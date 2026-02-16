const accessKey = "99hOUzocn97t5KzeZWH03EgsNg9PkWagYxWAMqONYTM";

const form = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const imageResults = document.getElementById("image-results");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    imageResults.innerHTML = "";

    data.results.forEach((photo) => {
        const img = document.createElement("img");
        img.src = photo.urls.small;
        imageResults.appendChild(img);
    });
});
