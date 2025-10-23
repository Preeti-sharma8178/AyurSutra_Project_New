
    (function () {
      // Elements
      const patientBtn = document.getElementById("patient-btn");
      const adminBtn = document.getElementById("admin-btn");
      const patientFields = document.getElementById("patient-fields");
      const doctorFields = document.getElementById("doctor-fields");
      const signinBtn = document.getElementById("signin-btn");
      const signInForm = document.getElementById("sign-in-form");
      const signUpForm = document.getElementById("sign-up-form");
      const forgotForm = document.getElementById("forgot-password-form");
      const showSignupBtn = document.getElementById("show-signup-btn");
      const showSigninBtn = document.getElementById("show-signin-btn");
      const forgotLink = document.getElementById("forgot-password-link");
      const backToSignin = document.getElementById("back-to-signin");
      const registerBtn = document.getElementById("register-btn");

      let currentRole = "patient";

      // Helper to show only one form (signin/signup/forgot)
      function showOnly(formToShow) {
        const forms = [signInForm, signUpForm, forgotForm];
        forms.forEach(f => {
          if (!f) return;
          if (f === formToShow) f.classList.remove("hidden");
          else f.classList.add("hidden");
        });
      }

      // Default initial state
      function setRole(role) {
        currentRole = role;
        if (role === "patient") {
          patientBtn.classList.add("bg-green-600","text-white");
          adminBtn.classList.remove("bg-green-600","text-white");
          patientFields.style.display = "block";
          doctorFields.style.display = "none";
          signinBtn.textContent = "Sign in as Patient";
        } else {
          adminBtn.classList.add("bg-green-600","text-white");
          patientBtn.classList.remove("bg-green-600","text-white");
          doctorFields.style.display = "block";
          patientFields.style.display = "none";
          signinBtn.textContent = "Sign in as Doctor";
        }
      }

      // Bind toggle buttons
      patientBtn && patientBtn.addEventListener("click", () => setRole("patient"));
      adminBtn && adminBtn.addEventListener("click", () => setRole("doctor"));

      // Show forms
      showSignupBtn && showSignupBtn.addEventListener("click", () => {
        showOnly(signUpForm);
        document.getElementById("form-title").textContent = "Create Account";
        document.getElementById("form-subtitle").textContent = "Join our Panchakarma wellness community";
      });
      showSigninBtn && showSigninBtn.addEventListener("click", () => {
        showOnly(signInForm);
        document.getElementById("form-title").textContent = "Sign In";
        document.getElementById("form-subtitle").textContent = "Access your health records and appointments";
      });

      forgotLink && forgotLink.addEventListener("click", (e) => {
        e.preventDefault();
        showOnly(forgotForm);
        document.getElementById("form-title").textContent = "Forgot Password?";
        document.getElementById("form-subtitle").textContent = "Enter your email to receive a password reset link.";
      });

      backToSignin && backToSignin.addEventListener("click", () => {
        showOnly(signInForm);
        document.getElementById("form-title").textContent = "Sign In";
        document.getElementById("form-subtitle").textContent = "Access your health records and appointments";
      });

      // Sign-in submit (works for patient & doctor)
      signInForm && signInForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const payload = {
          email: signInForm["signin-email"].value,
          password: signInForm["signin-password"].value,
          role: currentRole,
          patientId: signInForm["patient-id"]?.value || null,
          doctorCode: signInForm["doctor-code"]?.value || null
        };

        try {
          const res = await fetch("http://localhost:5000/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          const data = await res.json().catch(() => ({}));
          console.log("Signin Response:", data, "Status:", res.status);

          if (res.ok) {
            alert(data.message || "Login successful!");
            window.location.href = "index.html";  
          } else {
            alert("❌ " + (data.error || "Login failed!"));
          }
        } catch (err) {
          console.error(err);
          alert("⚠️ Could not connect to backend");
        }
      });

      // Register (create new patient)
      signUpForm && signUpForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const pw = signUpForm["signup-password"].value;
        const cpw = signUpForm["confirm-password"].value;
        if (pw !== cpw) { alert("Passwords do not match"); return; }

        const payload = {
          name: signUpForm["fullname"].value,
          email: signUpForm["signup-email"].value,
          phone: signUpForm["phone"].value,
          age: signUpForm["age"].value,
          gender: signUpForm["gender"].value,
          password: pw,
          role: "patient"
        };

        try {
          const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          const data = await res.json().catch(() => ({}));
          console.log("Register Response:", data, "Status:", res.status);

          alert(data.message || data.error || "Registration response missing");
          if (res.ok) {
            showOnly(signInForm);
            document.getElementById("form-title").textContent = "Sign In";
            document.getElementById("form-subtitle").textContent = "Access your health records and appointments";
            signUpForm.reset();
          }
        } catch (err) {
          console.error(err);
          alert("⚠️ Could not connect to backend for registration");
        }
      });

      // Forgot password
      forgotForm && forgotForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = forgotForm["forgot-email"].value;
        try {
          const res = await fetch("http://localhost:5000/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
          });
          const data = await res.json().catch(() => ({}));
          console.log("Forgot Response:", data, "Status:", res.status);

          alert(data.message || data.error || "If your email exists, a reset link was sent.");
          if (res.ok) {
            showOnly(signInForm);
            document.getElementById("form-title").textContent = "Sign In";
            document.getElementById("form-subtitle").textContent = "Access your health records and appointments";
          }
        } catch (err) {
          console.error(err);
          alert("⚠️ Could not connect to backend for password reset");
        }
      });

      // initialize
      setRole("patient");
      showOnly(signInForm);
    })();
 
