const editBtn = document.querySelector("#editBtn");
const inputs = document.querySelectorAll('input[type="text"]');
const saveBtn = document.querySelector("#saveBtn");
const chk = document.getElementById('chk');

editBtn.addEventListener("click", () => {
  inputs.forEach((input) => {
    input.removeAttribute("disabled");
  });

  saveBtn.classList.remove("d-none");
});


chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
$.ajax({
  type: "get",
  url: "/dark",
  success: function (response) {
    
  }
});
});



// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});