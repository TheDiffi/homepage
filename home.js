/* -- Redirect -- */

function gotoProj(foldername) {
	window.location.href = "../" + foldername;
}

function gotoSite(path) {
	window.location.href = path;
}

const throttle = (func, delay) => {
	let lastCall = 0;
	return (...args) => {
		let now = new Date().getTime();
		if (now - lastCall > delay) {
			lastCall = now;
			return func(...args);
		}
	};
};

/* -- Carousel Navigation -- */

let activeIndex = 0;

const slides = document.getElementsByTagName("project");

const onNavLeft = () => {
	const nextIndex = (activeIndex - 1 + slides.length) % slides.length;

	const currentSlide = document.querySelector(`[data-index="${activeIndex}"]`),
		nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);

	currentSlide.dataset.status = "after";
	nextSlide.dataset.status = "becoming-active-from-before";

	setTimeout(() => {
		nextSlide.dataset.status = "active";
		activeIndex = nextIndex;
	}, 10);
};

const onNavRight = () => {
	const nextIndex = (activeIndex + 1) % slides.length;

	const currentSlide = document.querySelector(`[data-index="${activeIndex}"]`),
		nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);

	currentSlide.dataset.status = "before";
	nextSlide.dataset.status = "becoming-active-from-after";

	setTimeout(() => {
		nextSlide.dataset.status = "active";
		activeIndex = nextIndex;
	}, 10);
};

const onNav = (direction) => {
	if (direction === "left") {
		onNavLeft();
	} else {
		onNavRight();
	}
};

// Throttled versions of the navigation functions
const throttleOnNav = throttle(onNav, 550);

document
	.querySelectorAll('[data-event="nav-button-left"]')
	.forEach((el) => el.addEventListener("click", () => throttleOnNav("left")));
document
	.querySelectorAll('[data-event="nav-button-right"]')
	.forEach((el) => el.addEventListener("click", () => throttleOnNav("right")));

// Attach non-debounced functions to keyboard events
document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		onNav("left");
	} else if (e.key === "ArrowRight") {
		onNav("right");
	}
});

/* -- Mobile Nav Toggle -- */

/* const nav = document.querySelector("nav");

const handleNavToggle = () => {  
  nav.dataset.transitionable = "true";
  
  nav.dataset.toggled = nav.dataset.toggled === "true" ? "false" : "true";
}

window.matchMedia("(max-width: 800px)").onchange = e => {
  nav.dataset.transitionable = "false";

  nav.dataset.toggled = "false";
}; */
