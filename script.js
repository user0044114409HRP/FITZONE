const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

window.addEventListener("load", () => {
  setTimeout(() => $("#pageLoader").classList.add("hide"), 350);
});

const header = $("#header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

$("#menuToggle").addEventListener("click", () => {
  $("#navLinks").classList.toggle("open");
});

$$(".nav-links a").forEach(link => {
  link.addEventListener("click", () => $("#navLinks").classList.remove("open"));
});

$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  $("#themeToggle").textContent = document.body.classList.contains("light") ? "☀" : "☾";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

$$(".reveal").forEach(el => observer.observe(el));

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

const programData = {
  "Muscle Building": {
    text: "Fokus pada latihan resistance dan progres bertahap.",
    items: ["Push — Chest, Shoulder, Triceps", "Pull — Back, Biceps", "Legs — Lower Body", "Recovery — Mobility & Rest"]
  },
  "Conditioning": {
    text: "Kombinasikan strength dan cardio untuk kebugaran umum.",
    items: ["Full Body Strength", "Easy Cardio", "Intervals", "Recovery Session"]
  },
  "Running": {
    text: "Bangun rutinitas lari dengan intensitas yang terkontrol.",
    items: ["Easy Run", "Tempo / Intervals", "Long Easy Run", "Recovery Day"]
  },
  "Mobility": {
    text: "Gunakan mobility sebagai pelengkap latihan dan recovery.",
    items: ["Hip Mobility", "Shoulder Mobility", "Thoracic Mobility", "Light Stretching"]
  }
};

const modal = $("#modal");
$$(".program-btn").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.program;
    const data = programData[name];
    $("#modalTitle").textContent = name;
    $("#modalText").textContent = data.text;
    $("#modalList").innerHTML = data.items.map(item => `<div>✓ ${item}</div>`).join("");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
$("#modalClose").addEventListener("click", closeModal);
$("#modalAction").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

$("#bmiBtn").addEventListener("click", () => {
  const weight = Number($("#weight").value);
  const height = Number($("#height").value);
  if (!weight || !height || weight <= 0 || height <= 0) {
    $("#bmiValue").textContent = "--";
    $("#bmiStatus").textContent = "Masukkan berat dan tinggi yang valid.";
    return;
  }
  const bmi = weight / Math.pow(height / 100, 2);
  let status = "";
  if (bmi < 18.5) status = "Di bawah rentang umum";
  else if (bmi < 25) status = "Dalam rentang umum";
  else if (bmi < 30) status = "Di atas rentang umum";
  else status = "Obesitas";
  $("#bmiValue").textContent = bmi.toFixed(1);
  $("#bmiStatus").textContent = status;
});

let seconds = 0;
let timer = null;

function renderTimer() {
  const min = Math.floor(seconds / 60).toString().padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");
  $("#timerDisplay").textContent = `${min}:${sec}`;
}

$("#startTimer").addEventListener("click", () => {
  if (timer) return;
  timer = setInterval(() => { seconds++; renderTimer(); }, 1000);
});

$("#pauseTimer").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

$("#resetTimer").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  seconds = 0;
  renderTimer();
});

$$(".join-btn").forEach(button => {
  button.addEventListener("click", () => showToast(`Plan ${button.dataset.plan} dipilih.`));
});

$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("#contactName").value.trim();
  $("#formMessage").textContent = `Terima kasih, ${name || "teman"}! Pesan kamu sudah diproses oleh demo form.`;
  e.target.reset();
  showToast("Pesan berhasil dikirim.");
});

renderTimer();
