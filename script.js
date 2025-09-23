const accessKey = "c3JziQ8xDg9HvSQIIY1tjvyjxvbD-SmE4NGTX69wfJ4";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    // Open source website of the image
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    // Open in a new tab
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });
}

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  page = 1;
  await searchImages();
});