const form = document.getElementById("userForm");
const usersContainer = document.getElementById("usersContainer");
const detailsContainer = document.getElementById("detailsContainer");

/* Load Users */
const loadUsers = async () => {
  const res = await fetch("/api/users");
  const users = await res.json();

  usersContainer.innerHTML = "";

  users.forEach((user) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = user.name;
    div.onclick = () => getUserDetails(user._id);
    usersContainer.appendChild(div);
  });
};

/* Create User */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const city = document.getElementById("city").value;

  await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, city }),
  });

  form.reset();
  loadUsers();
});

/* Get User Details */
const getUserDetails = async (id) => {
  const res = await fetch(`/api/users/${id}`);
  const data = await res.json();

  detailsContainer.innerHTML = `
    <p><strong>Name:</strong> ${data.user.name}</p>
    <p><strong>Email:</strong> ${data.user.email}</p>
    <p><strong>City:</strong> ${data.user.city}</p>
    <hr>
    <p><strong>Temperature:</strong> ${data.weather.temperature}°C</p>
    <p><strong>Description:</strong> ${data.weather.description}</p>
    <p><strong>Humidity:</strong> ${data.weather.humidity}%</p>
  `;
};

loadUsers();
