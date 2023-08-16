// Tab links
const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");

function opentab(event, tabname) {
  for (let tabLink of tabLinks) {
    tabLink.classList.remove("active-link");
  }

  for (let tabContent of tabContents) {
    tabContent.classList.remove("active-tab");
  }

  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// Side menu
const sidemenu = document.getElementById("sidemenu");
const closeIcon = document.querySelector(".fa-circle-xmark");
const openIcon = document.querySelector(".fa-bars");

function openmenu() {
  sidemenu.style.right = "0";
}

function closemenu() {
  sidemenu.style.right = "-200px";
}

openIcon.addEventListener("click", openmenu);
closeIcon.addEventListener("click", closemenu);

// Google Form
const scriptURL = 'https://script.google.com/macros/s/AKfycbzsXg8g7WAY2ta9S9slQvdu4debfpF0S5OGt4EiqGi405SR6Qtaxdb8j_s2iu-a1cwbuw/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');

form.addEventListener('submit', e => {
  e.preventDefault();

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => response.json()) // Parse response as JSON
    .then(data => {
      if (data.result === 'success') {
        msg.textContent = 'Message sent successfully!';
        setTimeout(() => {
          msg.textContent = '';
        }, 5000);
        form.reset();
      } else {
        msg.textContent = 'Failed to send message. Please try again.';
      }
    })
    .catch(error => {
      msg.textContent = 'An error occurred. Please try again later.';
      console.error('Error!', error);
    });
});