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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const linkName = document.querySelector("#linkname").value;
  const linkUrl = document.querySelector("#linkurl").value;

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
});
