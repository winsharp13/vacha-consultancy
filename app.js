// CONTACTS
function addContact() {
  let data = JSON.parse(localStorage.getItem("contacts")) || [];

  data.push({
    name: name.value,
    email: email.value,
    category: category.value
  });

  localStorage.setItem("contacts", JSON.stringify(data));
  loadContacts();
}

function loadContacts() {
  let data = JSON.parse(localStorage.getItem("contacts")) || [];
  let search = document.getElementById("search")?.value?.toLowerCase() || "";
  let html = "";

  data.filter(d =>
    d.name.toLowerCase().includes(search) ||
    d.category.toLowerCase().includes(search)
  ).forEach((d,i) => {
    html += `
    <div class="card flex">
      <div>
        <b>${d.name}</b><br>
        ${d.email}<br>
        ${d.category}
      </div>
      <button onclick="deleteContact(${i})">X</button>
    </div>`;
  });

  if(document.getElementById("list"))
    list.innerHTML = html;
}

function deleteContact(i) {
  let data = JSON.parse(localStorage.getItem("contacts"));
  data.splice(i,1);
  localStorage.setItem("contacts", JSON.stringify(data));
  loadContacts();
}

function exportCSV() {
  let data = JSON.parse(localStorage.getItem("contacts")) || [];
  let csv = "Name,Email,Category\n";

  data.forEach(d => {
    csv += `${d.name},${d.email},${d.category}\n`;
  });

  let blob = new Blob([csv]);
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "contacts.csv";
  a.click();
}

function copyEmails() {
  let data = JSON.parse(localStorage.getItem("contacts")) || [];
  navigator.clipboard.writeText(data.map(d => d.email).join(", "));
}

// PR GENERATOR
function generatePR() {
  document.getElementById("output").innerHTML = `
    <h2>${headline.value}</h2>
    <p>${company.value}</p>
    <p>${content.value}</p>
  `;
}

function downloadDoc() {
  let html = output.innerHTML;
  let blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "press-release.doc";
  a.click();
}

// COVERAGE
function addCoverage() {
  let data = JSON.parse(localStorage.getItem("coverage")) || [];

  data.push({
    client: client.value,
    link: link.value,
    date: new Date().toLocaleDateString()
  });

  localStorage.setItem("coverage", JSON.stringify(data));
  loadCoverage();
}

function loadCoverage() {
  let data = JSON.parse(localStorage.getItem("coverage")) || [];
  let html = "";

  data.forEach(d => {
    html += `
    <div class="card">
      <b>${d.client}</b><br>
      <a href="${d.link}" target="_blank">View Article</a><br>
      ${d.date}
    </div>`;
  });

  if(document.getElementById("coverageList"))
    coverageList.innerHTML = html;
}

// REPORT
function generateReport() {
  let data = JSON.parse(localStorage.getItem("coverage")) || [];

  let html = `<h3>Total Coverage: ${data.length}</h3>`;

  data.forEach(d => {
    html += `<p>${d.client}</p>`;
  });

  document.getElementById("report").innerHTML = html;
}
