function displayContacts() {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  let search = document.getElementById("search").value.toLowerCase();
  let output = "";

  contacts
    .filter(c => c.name.toLowerCase().includes(search) || c.category.toLowerCase().includes(search))
    .forEach((c, i) => {
      output += `
      <div class="card flex">
        <div>
          <b>${c.name}</b><br>
          ${c.email}<br>
          <span class="tag">${c.category}</span>
        </div>
        <button onclick="deleteContact(${i})">❌</button>
      </div>`;
    });

  document.getElementById("contactList").innerHTML = output;
}

function copyEmails() {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  let emails = contacts.map(c => c.email).join(", ");
  navigator.clipboard.writeText(emails);
  alert("Emails copied!");
}
