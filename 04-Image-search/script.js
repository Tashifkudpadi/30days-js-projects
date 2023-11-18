const accessKey = "96s-UFABVqJC-NJuItSBqRWsbaZzMcRO3e_nocXZsv4";

const formEl = document.querySelector('form')
const inputEl = document.getElementById('input-search')
const searchResults = document.querySelector('.search-results')
const showMore = document.getElementById('show-more-button');

let inputData = "";
let page = 1;

async function searchImages() {
 inputData = inputEl.value;

 const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

 const response = await fetch(url);
 const data = await response.json();
 const results = data.results;
 if (page === 1) {
  searchResults.innerHTML = ''
 }

 results.map(result => {
  const imgWrapper = document.createElement('div')
  imgWrapper.classList.add('search-result');

  const img = document.createElement('img')
  img.src = result.urls.small
  img.alt = result.urls.description
  const imgLink = document.createElement('a')
  imgLink.href = result.links.html
  imgLink.target = '_blank'
  imgLink.textContent = result.alt_description;

  imgWrapper.appendChild(img)
  imgWrapper.appendChild(imgLink)
  searchResults.appendChild(imgWrapper)
 });

 page++
 if (page > 1) {
  showMore.style.display = 'block';
 }
}
formEl.addEventListener('submit', (e) => {
 e.preventDefault()
 page = 1
 searchImages()
})
showMore.addEventListener('click', () => {
 searchImages()
})