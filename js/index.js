const username = document.querySelector("#username");

if (localStorage.getItem("linkifyUsername") === null) {
  const name = prompt("Enter Your Name?");
  username.innerHTML = `Hey, ${name}!`;

  localStorage.setItem("linkifyUsername", name);
} else {
  const name = localStorage.getItem("linkifyUsername");
  username.innerHTML = `Hey, ${name}!`;
}
