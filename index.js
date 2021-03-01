// LANDING PAGE ANIMATION
// var scene = document.getElementById("scene");
// var parallaxInstance = new Parallax(scene);
var TxtType = function (el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 1000;
	this.txt = "";
	this.tick();
	this.isDeleting = false;
};
TxtType.prototype.tick = function () {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];
	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}
	this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
	var that = this;
	var delta = 200 - Math.random() * 100;
	if (this.isDeleting) {
		delta /= 2;
	}
	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === "") {
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}
	setTimeout(function () {
		that.tick();
	}, delta);
};
window.onload = function () {
	var elements = document.getElementsByClassName("typewrite");
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute("data-type");
		var period = elements[i].getAttribute("data-period");
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
	document.body.appendChild(css);
};
var keys = [
	"Mission",
	"Structure",
	"Trang",
	"Thu",
	"Liem",
	"Long",
	"Nhan",
	"Member",
];
var slider = new Swiper(".swiper-container", {
	// Optional parameters
	slidesPerView: "auto",
	spaceBetween: 150,
	centeredSlides: true,
	mousewheel: true,
	pagination: {
		el: ".planet-links",
		clickable: true,
		renderBullet: function (index, className) {
			return '<div class="' + className + '">' + keys[index] + "</div>";
		},
	},
});

slider.on("slideChange", function () {
	console.log("SLIDE CHANGED");
	gsap.to(".slide-text span", 0.2, {
		x: "-100px",
	});
	gsap.to(".slide-number span", 0.2, {
		x: "-100px",
	});
	gsap.to(".slide-detail span", 0.5, {
		x: "-1000px",
	});
	gsap.to(".slide-detail-facts div", 0.5, {
		x: "-1000px",
	});
	gsap.to(".swiper-slide-active", 0.5, {
		scale: 0.85,
	});
	gsap.to(".swiper-slide .slide-img", 1, {
		rotation: 20,
	});
});

slider.on("slideChangeTransitionEnd", function () {
	gsap.to(".swiper-slide .slide-img", 1, {
		rotation: 10,
	});
	gsap.to(".slide-text span", 0.2, {
		x: 0,
		delay: 0.1,
	});
	gsap.to(".slide-text span", 0, {
		x: "100px",
	});

	gsap.to(".slide-number span", 0.2, {
		x: 0,
	});
	gsap.to(".slide-number span", 0, {
		x: "100px",
	});

	gsap.to(".slide-detail span", 0.2, {
		x: 0,
	});

	gsap.to(".slide-detail-facts div", 0.5, {
		x: 0,
	});

	gsap.to(".swiper-slide-active", 0.5, {
		scale: 1,
		ease: Power4.easeOut,
	});

	gsap.to(".swiper-slide-active .slide-text", 0, {
		autoAlpha: 1,
	});
	gsap.to(".swiper-slide-active .slide-number", 0, {
		autoAlpha: 1,
	});

	gsap.to(".swiper-slide-next .slide-text", 0, {
		autoAlpha: 0,
	});
	gsap.to(".swiper-slide-prev .slide-text", 0, {
		autoAlpha: 0,
	});

	gsap.to(".swiper-slide-next .slide-number", 0, {
		autoAlpha: 0,
	});
	gsap.to(".swiper-slide-prev .slide-number", 0, {
		autoAlpha: 0,
	});
});

gsap.to(".rockbg1", 2, {
	y: 12,
	repeat: -1,
	yoyo: true,
	delay: 0,
});

gsap.to(".swiper-slide-next .slide-text", 0, {
	autoAlpha: 0,
});
gsap.to(".swiper-slide-prev .slide-text", 0, {
	autoAlpha: 0,
});

gsap.to(".swiper-slide-next .slide-number", 0, {
	autoAlpha: 0,
});
gsap.to(".swiper-slide-prev .slide-number", 0, {
	autoAlpha: 0,
});

gsap.to(".swiper-slide", 0, {
	scale: 0.85,
});

gsap.to(".swiper-slide-active", 0, {
	scale: 1,
});
$(".navTrigger").click(function () {
	$(this).toggleClass("active");
	console.log("Clicked menu");
	$("#mainListDiv").toggleClass("show_list");
	$("#mainListDiv").fadeIn();
});
$(".hover").mouseleave(function () {
	$(this).removeClass("hover");
});
document
	.querySelector("#contact-form")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		e.target.elements.name.value = "";
		e.target.elements.email.value = "";
		e.target.elements.message.value = "";
	});
