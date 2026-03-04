const CORRECT_PASSWORD = "iloveyou";
const ADDRESS_URL = "https://naver.me/FoENsEPP"; 

// 갤러리 이미지
const IMAGES = [
    "image/2.jpg",
    "image/3.jpg",
    "image/4.jpg",
    "image/5.jpg",
    "image/6.jpg",
    "image/11.jpg",
    "image/7.jpg",
    "image/12.jpg",
    "image/13.jpg", 
    "image/9.jpg",
    "image/14.jpg",
    "image/15.jpg",
    "image/16.jpg",
    "image/10.jpg",
    "image/17.jpg",
    "image/18.jpg",
    "image/19.jpg",
    "image/20.jpg",
    "image/21.jpg",
    "image/22.jpg",
    "image/23.jpg",
    "image/24.jpg",
    "image/25.jpg",
    "image/26.jpg",
    "image/27.jpg",
    "image/28.jpg",
    "image/29.jpg",
    "image/30.jpg",
   "image/38.jpg" ,
    "image/33.jpg",
    "image/32.jpg",
    "image/34.jpg",
    "image/35.jpg",
    "image/36.jpg",
    "image/37.jpg", 
    "image/31.jpg",
];



function renderGallery() {
  gridStrip.innerHTML = "";

  IMAGES.forEach((src, idx) => {
    const cell = document.createElement("div");
    cell.className = "cell";

    const img = document.createElement("img");
    img.src = src;
    img.alt = `gallery-${idx + 1}`;
    img.loading = "lazy";

    cell.appendChild(img);
    gridStrip.appendChild(cell);
  });
}

renderGallery();

const openModalBtn = document.getElementById("openModalBtn");
const modalBackdrop = document.getElementById("modalBackdrop");
const passwordInput = document.getElementById("passwordInput");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");
const errorText = document.getElementById("errorText");

function openModal() {
  modalBackdrop.classList.add("open");
  modalBackdrop.setAttribute("aria-hidden", "false");
  errorText.textContent = "";
  passwordInput.value = "";

  setTimeout(() => passwordInput.focus(), 0);
}

function closeModal() {
  modalBackdrop.classList.remove("open");
  modalBackdrop.setAttribute("aria-hidden", "true");
}

function handleConfirm() {
  const value = (passwordInput.value || "").trim();

  if (value === CORRECT_PASSWORD) {
    closeModal();
    window.open(ADDRESS_URL, "_blank", "noopener,noreferrer")
    return;
  }

  errorText.textContent = "비밀번호가 틀렸습니다. 다시 입력해 주세요.";
  passwordInput.focus();
  passwordInput.select();
}
 
openModalBtn.addEventListener("click", openModal);
confirmBtn.addEventListener("click", handleConfirm);
cancelBtn.addEventListener("click", closeModal);

passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleConfirm();
  if (e.key === "Escape") closeModal();
});

modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalBackdrop.classList.contains("open")) {
    closeModal();
  }
});