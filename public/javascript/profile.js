const editBtn = document.querySelector("#editBtn");
const inputs = document.querySelectorAll('input[type="text"]');
const saveBtn = document.querySelector("#saveBtn");

editBtn.addEventListener("click", () => {
  inputs.forEach((input) => {
    input.removeAttribute("disabled");
  });

  saveBtn.classList.remove("d-none");
});