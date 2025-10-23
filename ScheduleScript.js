// scheduleScript.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointmentForm");

  // ✅ Appointment form submit
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
  fullName: form.elements["fullName"].value,
  phoneNumber: form.elements["phoneNumber"].value,
  email: form.elements["email"].value,
  gender: form.elements["gender"].value,
  healthCondition: form.elements["healthCondition"].value,
  preferredTime: document.querySelector(".selected-time")?.innerText || "Not Selected"
};

    try {
      const res = await fetch("http://localhost:5000/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      alert(result.message);

      form.reset(); // clear form after success
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  });

  // ✅ (Optional) Handle time slot buttons
  document.querySelectorAll(".time-button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".time-button").forEach(b => b.classList.remove("selected-time"));
      btn.classList.add("selected-time");
    });
  });
});
