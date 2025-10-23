
document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.getElementById("nav-login-container");
  const userEmail = localStorage.getItem("userEmail");

  if (userEmail && loginContainer) {
    const firstLetter = userEmail.charAt(0).toUpperCase();
    loginContainer.innerHTML = `<div id="user-avatar" class="user-avatar">${firstLetter}</div>`;

    document.getElementById("user-avatar").addEventListener("click", () => {
      if (confirm("Do you want to log out?")) {
        localStorage.removeItem("userEmail");
        window.location.reload();
      }
    });
  } else {
    loginContainer.innerHTML = `<a href="login.html" id="login-btn" class="hover:text-green-300">Login</a>`;
  }
});

