import './style.css';

const btn = document.querySelector("button");
const pCount = document.querySelector("p");

let count = 0;

btn.addEventListener("click", () => {
    count++;
    pCount.innerText = count;
});