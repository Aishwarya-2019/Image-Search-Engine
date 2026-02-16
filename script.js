const accessKey = "99hOUzocn97t5KzeZWH03EgsNg9PkWagYxWAMqONYTM";

const form = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const imageResults = document.getElementById("image-results");
const loader = document.getElementById("loader");
const loadMoreBtn = document.getElementById("load-more");

let page = 1;
let currentQuery = "";

async function searchImages(query, pageNum) {
    loader.classList.remove("hidden");

    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${pageNum}&per_page=15&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    loader.classList.add("hidden");

    data.results.forEach(photo => {

        const card = document.createElement("div");
        card.classList.add("image-card");

        const img = document.createElement("img");
        img.src = photo.urls.regular;
        img.alt = photo.alt_description || "Unsplash Image";

        // 🔥 DOWNLOAD ON IMAGE CLICK
        img.addEventListener("click", async () => {

            try {
                const imageResponse = await fetch(photo.urls.full);
                const blob = await imageResponse.blob();

                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "image.jpg";

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            } catch (error) {
                alert("Download failed. Please try again.");
            }

        });

        card.appendChild(img);
        imageResults.appendChild(card);
    });

    loadMoreBtn.classList.remove("hidden");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    currentQuery = searchBox.value.trim();
    imageResults.innerHTML = "";
    searchImages(currentQuery, page);
});

loadMoreBtn.addEventListener("click", () => {
    page++;
    searchImages(currentQuery, page);
});

