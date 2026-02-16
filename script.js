const accessKey = "99hOUzocn97t5KzeZWH03EgsNg9PkWagYxWAMqONYTM";

const form = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const imageResults = document.getElementById("image-results");
const loader = document.getElementById("loader");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = searchBox.value.trim();
    if (!query) return;

    imageResults.innerHTML = "";
    loader.classList.remove("hidden");

    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        loader.classList.add("hidden");

        data.results.forEach((photo) => {
            const img = document.createElement("img");
            img.src = photo.urls.regular;
            imageResults.appendChild(img);
        });

    } catch (error) {
        loader.classList.add("hidden");
        imageResults.innerHTML = "<p>Something went wrong. Try again.</p>";
    }
});

