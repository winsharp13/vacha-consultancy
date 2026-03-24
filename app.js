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
  let search = document.getElementById("search").value.toLowerCase();
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
