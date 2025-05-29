// ===================== SLIDESHOW =====================

// Lấy các phần tử slideshow
const slides = document.querySelectorAll(".slides img");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
let current = 0;
let autoSlideInterval = null;

// Hiển thị slide theo chỉ số
function showSlide(index) {
	slides.forEach((img, i) => {
		img.style.display = i === index ? "block" : "none";
	});
}

// Chuyển sang slide tiếp theo
function nextSlide() {
	current = (current + 1) % slides.length;
	showSlide(current);
}

// Chuyển về slide trước
function prevSlide() {
	current = (current - 1 + slides.length) % slides.length;
	showSlide(current);
}

// Tự động chuyển slide mỗi 3 giây
function startAutoSlide() {
	autoSlideInterval = setInterval(nextSlide, 3000);
}

// Reset timer khi click nút
function resetAutoSlide() {
	clearInterval(autoSlideInterval);
	startAutoSlide();
}

// Gán sự kiện cho nút chuyển slide
if (btnRight && btnLeft) {
	btnRight.addEventListener("click", () => {
		nextSlide();
		resetAutoSlide();
	});
	btnLeft.addEventListener("click", () => {
		prevSlide();
		resetAutoSlide();
	});
}

// Khởi tạo slideshow khi trang load
if (slides.length > 0) {
	showSlide(current);
	startAutoSlide();
}

// ===================== GUEST DROPDOWN =====================

const checkInInput = document.querySelector(".input-checkIn");
const checkOutInput = document.querySelector(".input-dates");

if (checkInInput && checkOutInput) {
	checkInInput.addEventListener("change", function () {
		checkOutInput.min = checkInInput.value;
		if (checkOutInput.value < checkInInput.value) {
			checkOutInput.value = checkInInput.value;
		}
	});
}

let counts = {
	adults: 2,
	children: 0,
	rooms: 1,
};

function toggleGuestDropdown() {
	const dropdown = document.getElementById("guest-dropdown");
	if (dropdown) {
		dropdown.classList.toggle("hidden");
		updateSummary();
	}
}

function changeCount(type, delta) {
	if (counts[type] + delta >= 0) {
		counts[type] += delta;
		const countSpan = document.getElementById(`${type}-count`);
		if (countSpan) countSpan.textContent = counts[type];
		updateSummary();
	}
}

function updateSummary() {
	const summary = `${counts.adults} adults · ${counts.children} children · ${counts.rooms} room`;
	const summarySpan = document.getElementById("summary");
	if (summarySpan) summarySpan.textContent = summary;
}

// Đóng dropdown khi click bên ngoài
document.addEventListener("click", function (e) {
	const guestSelector = document.getElementById("guest-selector");
	const dropdown = document.getElementById("guest-dropdown");
	if (dropdown && !dropdown.classList.contains("hidden") && guestSelector && !guestSelector.contains(e.target)) {
		dropdown.classList.add("hidden");
	}
});

// ===================== Introducing video =====================
function showHotelVideo() {
	document.getElementById("videoModal").style.display = "flex";
}

function closeHotelVideo() {
	document.getElementById("videoModal").style.display = "none";
}

// ===================== Slide service =====================
document.addEventListener("DOMContentLoaded", function () {
	const slider = document.querySelector(".service-list-hotel");
	if (!slider) return;

	// Nhân đôi card để không bị trống khi lặp
	const cards = Array.from(slider.children);
	cards.forEach((card) => {
		const clone = card.cloneNode(true);
		slider.appendChild(clone);
	});

	// Khi animation lặp, chuyển card đầu xuống cuối và reset animation
	slider.addEventListener("animationiteration", function () {
		const firstCard = slider.children[0];
		slider.appendChild(firstCard);
		slider.style.animation = "none";
		void slider.offsetWidth; // trigger reflow
		slider.style.animation = "scrollService 2s linear infinite";
	});
});

// ===================== Comment hotel =====================
document.addEventListener("DOMContentLoaded", function () {
	const items = document.querySelectorAll(".evaluate-item");
	const dots = document.querySelectorAll(".evaluate-dots .dot");
	const itemsPerPage = 4;

	function showPage(page) {
		items.forEach((item, i) => {
			item.style.display = i >= page * itemsPerPage && i < (page + 1) * itemsPerPage ? "flex" : "none";
		});
		dots.forEach((dot, i) => {
			dot.classList.toggle("active", i === page);
		});
	}

	dots.forEach((dot, i) => {
		dot.addEventListener("click", () => showPage(i));
	});

	showPage(0); // Hiển thị trang đầu tiên khi load
});

// ===================== Image hotel =====================
document.addEventListener("DOMContentLoaded", function () {
	const galleryImgs = Array.from(document.querySelectorAll(".footer-gallery img"));
	const modal = document.getElementById("footer-album-modal");
	const modalImg = document.querySelector(".footer-album-img");
	const closeBtn = document.querySelector(".footer-album-close");
	const prevBtn = document.querySelector(".footer-album-prev");
	const nextBtn = document.querySelector(".footer-album-next");
	let currentIdx = 0;

	if (!galleryImgs.length) return;

	function showModal(idx) {
		currentIdx = idx;
		modalImg.src = galleryImgs[currentIdx].src;
		modal.classList.add("active");
	}

	galleryImgs.forEach((img, idx) => {
		img.style.cursor = "pointer";
		img.addEventListener("click", () => showModal(idx));
	});

	closeBtn.addEventListener("click", () => modal.classList.remove("active"));
	modal.addEventListener("click", (e) => {
		if (e.target === modal) modal.classList.remove("active");
	});

	prevBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		currentIdx = (currentIdx - 1 + galleryImgs.length) % galleryImgs.length;
		modalImg.src = galleryImgs[currentIdx].src;
	});

	nextBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		currentIdx = (currentIdx + 1) % galleryImgs.length;
		modalImg.src = galleryImgs[currentIdx].src;
	});

	// Optional: Đóng modal bằng phím ESC
	document.addEventListener("keydown", function (e) {
		if (modal.classList.contains("active")) {
			if (e.key === "Escape") modal.classList.remove("active");
			if (e.key === "ArrowLeft") prevBtn.click();
			if (e.key === "ArrowRight") nextBtn.click();
		}
	});
});
