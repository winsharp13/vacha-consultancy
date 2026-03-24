// CONTACTS
function addContact() {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const category = document.getElementById("category").value;

  contacts.push({ name, email, category });
  localStorage.setItem("contacts", JSON.stringify(contacts));

  alert("Contact Added!");
  displayContacts();
}

function displayContacts() {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  let output = "";

  contacts.forEach((c, i) => {
    output += `<div class="card">
      <b>${c.name}</b><br>${c.email}<br>${c.category}
      <button onclick="deleteContact(${i})">Delete</button>
    </div>`;
  });

  document.getElementById("contactList").innerHTML = output;
}

function deleteContact(i) {
  let contacts = JSON.parse(localStorage.getItem("contacts"));
  contacts.splice(i, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts();
}

// PRESS GENERATOR
function generatePR() {
  const headline = document.getElementById("headline").value;
  const company = document.getElementById("company").value;
  const details = document.getElementById("details").value;
  const quote = document.getElementById("quote").value;

  const result = `
  <h2>${headline}</h2>
  <p><b>${company}</b> announces:</p>
  <p>${details}</p>
  <blockquote>${quote}</blockquote>
  `;

  document.getElementById("prOutput").innerHTML = result;
}

// COVERAGE TRACKER
function addCoverage() {
  let data = JSON.parse(localStorage.getItem("coverage")) || [];

  const client = document.getElementById("client").value;
  const link = document.getElementById("link").value;
  const pub = document.getElementById("pub").value;

  data.push({ client, link, pub, date: new Date().toLocaleDateString() });
  localStorage.setItem("coverage", JSON.stringify(data));

  displayCoverage();
}

function displayCoverage() {
  let data = JSON.parse(localStorage.getItem("coverage")) || "";
  let output = "";

  data.forEach(d => {
    output += `<div class="card">
      <b>${d.client}</b><br>${d.pub}<br>
      <a href="${d.link}" target="_blank">View</a><br>
      ${d.date}
    </div>`;
  });

  document.getElementById("coverageList").innerHTML = output;
}

// REPORT
function generateReport() {
  let data = JSON.parse(localStorage.getItem("coverage")) || [];
  let total = data.length;

  let output = `<h3>Total Coverage: ${total}</h3>`;

  data.forEach(d => {
    output += `<p>${d.client} - ${d.pub}</p>`;
  });

  document.getElementById("reportOutput").innerHTML = output;
}
