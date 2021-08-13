const username = document.querySelector("#username");
const btn = document.querySelector("#submit");
const btnDelete = document.querySelector("#delete");
const form = document.querySelector(".link-form__form");
const row = document.querySelector(".row");
const links = [];
const names = [];

//Creating user and checking for existing user.
if (localStorage.getItem("linkifyUsername") === null) {
  const name = prompt("Enter Your Name?");
  username.innerHTML = `Hey, ${name}!`;

  localStorage.setItem("linkifyUsername", name);
} else {
  const name = localStorage.getItem("linkifyUsername");
  username.innerHTML = `Hey, ${name}!`;
}

// Restoring Old Links
if (localStorage.getItem("linkNames") !== null) {
  let nameArr = localStorage.getItem("linkNames");
  let urlArr = localStorage.getItem("linkUrl");
  nameArr = nameArr.split(",");
  urlArr = urlArr.split(",");
  nameArr.forEach((element, c = 0) => {
    const html = `
   <div class="row__col">
      <a target="_blank"  class="linktag" href="${urlArr[c]}">${element}</a> <span>&rarr; </span> <span class="cross">&cross;</span>
    </div>
  `;

    row.insertAdjacentHTML("beforeend", html);

    links.push(urlArr[c]);
    names.push(element);
    c += 1;
  });
}

//Adding New Links to current
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
      <a target="_blank" class="linktag"  href="${linkUrl}">${linkName}</a> <span>&rarr; </span> <span class="cross">&cross;</span>
    </div>
  `;

    row.insertAdjacentHTML("beforeend", html);
    localStorage.setItem("linkNames", names);
    localStorage.setItem("linkUrl", links);
    location.reload();
  } else {
    alert("name already taken");
  }
});

//Deleting Account and clearling local storage
btnDelete.addEventListener("click", () => {
  localStorage.removeItem("linkNames");
  localStorage.removeItem("linkUrl");
  localStorage.removeItem("linkifyUsername");
  location.reload();
});

//Deleting Selected Link
const crosses = document.querySelectorAll(".cross");
crosses.forEach((cross) => {
  cross.addEventListener("click", (e) => {
    e.preventDefault();
    const parentEl = e.target.parentElement;
    const toDelete = parentEl.querySelector(".linktag");
    let toDeleteName = toDelete.innerHTML;
    let toDeleteUrl = toDelete.href;
    const found = names.findIndex((el) => el === toDeleteName);
    if (names.length === 1) {
      localStorage.removeItem("linkUrl");
      localStorage.removeItem("linkNames");
      location.reload();
    } else {
      parentEl.innerHTML = "";
      names.splice(found, 1);
      links.splice(found, 1);
      localStorage.setItem("linkNames", names);
      localStorage.setItem("linkUrl", links);
      location.reload();
    }
  });
});
