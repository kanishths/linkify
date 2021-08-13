const username = document.querySelector("#username");

const btn = document.querySelector("#submit");
const form = document.querySelector(".link-form__form");
const row = document.querySelector(".row");
const links = [];
const names = [];

if (localStorage.getItem("linkifyUsername") === null) {
  const name = prompt("Enter Your Name?");
  username.innerHTML = `Hey, ${name}!`;

  localStorage.setItem("linkifyUsername", name);
} else {
  const name = localStorage.getItem("linkifyUsername");
  username.innerHTML = `Hey, ${name}!`;
}

if (localStorage.getItem("linkNames") !== null) {
  let nameArr = localStorage.getItem("linkNames");
  let urlArr = localStorage.getItem("linkUrl");
  nameArr = nameArr.split(",");
  urlArr = urlArr.split(",");
  nameArr.forEach((element, c = 0) => {
    const html = `
   <div class="row__col">
      <a target="_blank" href="${urlArr[c]}">${element} </a> <span>&rarr; </span>
    </div>
  `;

    row.insertAdjacentHTML("beforeend", html);
    console.log(urlArr[c]);
    links.push(urlArr[c]);
    names.push(element);
    c += 1;
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const linkName = document.querySelector("#linkname").value;
  const linkUrl = document.querySelector("#linkurl").value;

  let found = names.find((element) => element === linkName);

  if (!found) {
    links.push(linkUrl);
    names.push(linkName);

    const html = `
   <div class="row__col">
      <a target="_blank" href="${linkUrl}">${linkName} </a> <span>&rarr; </span>
    </div>
  `;

    row.insertAdjacentHTML("beforeend", html);
    localStorage.setItem("linkNames", names);
    localStorage.setItem("linkUrl", links);
  } else {
    alert("name already taken");
  }
});
