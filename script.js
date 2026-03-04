// =======================
// 1) 설정값
// =======================
const CORRECT_PASSWORD = "19930308";
const ADDRESS_URL = "https://naver.me/FoENsEPP";

// 갤러리 이미지 목록(상대경로)
const IMAGES = [
  "image/2.jpg","image/3.jpg","image/4.jpg","image/5.jpg","image/6.jpg",
  "image/11.jpg","image/7.jpg","image/12.jpg","image/13.jpg","image/9.jpg",
  "image/14.jpg","image/15.jpg","image/16.jpg","image/10.jpg","image/17.jpg",
  "image/18.jpg","image/19.jpg","image/20.jpg","image/21.jpg","image/22.jpg",
  "image/23.jpg","image/24.jpg","image/25.jpg","image/26.jpg","image/27.jpg",
  "image/28.jpg","image/29.jpg","image/30.jpg","image/38.jpg","image/33.jpg",
  "image/32.jpg","image/34.jpg","image/35.jpg","image/36.jpg","image/37.jpg",
  "image/31.jpg",
];

// =======================
// 2) DOM 요소 가져오기
//    (HTML에 id가 있어야 함)
// =======================
const gridStrip = document.getElementById("gridStrip");

// 비밀번호 모달 관련
const openModalBtn = document.getElementById("openModalBtn");
const modalBackdrop = document.getElementById("modalBackdrop");
const passwordInput = document.getElementById("passwordInput");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");
const errorText = document.getElementById("errorText");

// 라이트박스(이미지 확대) 관련
const lightbox = document.getElementById("lightbox");       // 배경(검은 오버레이)
const lightboxImg = document.getElementById("lightboxImg"); // 확대 이미지 태그

// =======================
// 3) 라이트박스 함수
// =======================

// 이미지 클릭 시 호출: 라이트박스 열기
function openLightbox(src, altText) {
  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = src;                 // 확대할 이미지 경로 설정
  lightboxImg.alt = altText || "expanded";

  lightbox.classList.add("open");        // CSS에서 .open이면 보이게
  lightbox.setAttribute("aria-hidden", "false");
}

// 라이트박스 닫기 (다시 클릭하면 닫히게 만들거임)
function closeLightbox() {
  if (!lightbox || !lightboxImg) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");

  // 닫을 때 src 비워서(선택) 메모리/로딩 정리
  lightboxImg.src = "";
}

// =======================
// 4) 갤러리 렌더링
//    (이미지들을 화면에 만들고,
//     클릭하면 openLightbox 실행되게 연결)
// =======================
function renderGallery() {
  if (!gridStrip) return;

  gridStrip.innerHTML = "";

  IMAGES.forEach((src, idx) => {
    const cell = document.createElement("div");
    cell.className = "cell";

    const img = document.createElement("img");
    img.src = src;
    img.alt = `gallery-${idx + 1}`;
    img.loading = "lazy";

    // ✅ 핵심: 이미지 클릭하면 확대 열기
    img.addEventListener("click", () => {
      openLightbox(src, img.alt);
    });

    cell.appendChild(img);
    gridStrip.appendChild(cell);
  });
}

// 페이지 로드 시 갤러리 생성
renderGallery();

// =======================
// 5) 라이트박스 닫기 이벤트
// =======================

// ✅ 핵심: 확대된 화면(배경/이미지)을 클릭하면 닫기
// (그래서 "다시 클릭하면 확대 끄기"가 됨)
lightbox?.addEventListener("click", closeLightbox);

// ESC 키로 라이트박스 닫기
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox?.classList.contains("open")) {
    closeLightbox();
  }
});

// =======================
// 6) 비밀번호 모달 로직
// =======================
function openModal() {
  if (!modalBackdrop) return;

  modalBackdrop.classList.add("open");
  modalBackdrop.setAttribute("aria-hidden", "false");

  if (errorText) errorText.textContent = "";
  if (passwordInput) passwordInput.value = "";

  setTimeout(() => passwordInput?.focus(), 0);
}

function closeModal() {
  if (!modalBackdrop) return;

  modalBackdrop.classList.remove("open");
  modalBackdrop.setAttribute("aria-hidden", "true");
}

function handleConfirm() {
  const value = (passwordInput?.value || "").trim();

  if (value === CORRECT_PASSWORD) {
    closeModal();

    // 새 탭 열기 (팝업차단되면 현재 탭 이동)
    const w = window.open(ADDRESS_URL, "_blank", "noopener,noreferrer");
    if (!w) window.location.href = ADDRESS_URL;

    return;
  }

  if (errorText) errorText.textContent = "비밀번호가 틀렸습니다. 다시 입력해 주세요.";
  passwordInput?.focus();
  passwordInput?.select();
}

// =======================
// 7) 비밀번호 모달 이벤트 연결
// =======================
openModalBtn?.addEventListener("click", openModal);
confirmBtn?.addEventListener("click", handleConfirm);
cancelBtn?.addEventListener("click", closeModal);

// Enter=확인 / Escape=닫기
passwordInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleConfirm();
  if (e.key === "Escape") closeModal();
});

// 모달 바깥 클릭하면 닫기
modalBackdrop?.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});

// ESC로 닫기(모달 열린 상태에서)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalBackdrop?.classList.contains("open")) {
    closeModal();
  }
});