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
	// gsap.to(".swiper-slide .slide-img", 1, {
	// 	rotation: 20,
	// });
});

slider.on("slideChangeTransitionEnd", function () {
	// gsap.to(".swiper-slide .slide-img", 1, {
	// 	rotation: 10,
	// });
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
// const form = document.getElementById('form');
// const search = document.getElementById('search');
const heading = document.getElementById('heading');
const mealsEl = document.getElementById('meals');
const singleMeal = document.getElementById('single-meal');
const modal = document.getElementById('modal');
const close = document.getElementById('close');

// Event listeners
// form.addEventListener('keyup', e => {
//     e.preventDefault();

//     const searchTerm = search.value.trim();

//     if(!searchTerm){
//         heading.innerHTML = `Please type in a search term...`;
//         mealsEl.innerHTML = '';
//         singleMeal.innerHTML = '';
//     }else{
//         heading.innerHTML = '';
//         singleMeal.innerHTML = '';
//         searchMeals(searchTerm);
//     }
// })

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info');
        }else{
            return false;
        }
    });

    if(mealInfo){
        const mealId = mealInfo.getAttribute('data-mealID');
        getMealById(mealId);
    }

    modal.style.display = 'block';
})


// Close modal
close.addEventListener('click', () => {
  modal.style.display = 'none';
})

// Show sea foods on home page
const showMealsOnHome = async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`);
    const data = await res.json();

    showMeals(data);
}

showMealsOnHome();

// Search for any meals
const searchMeals = async (term) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const data = await res.json();

    console.log(data);
    showMeals(data);
}

// Show meals on screen
const showMeals = (data) => {

    if(data.meals === null){
        heading.innerHTML = `Meals not found`;
        mealsEl.innerHTML = '';
        singleMeal.innerHTML = '';
    }else{
		console.log(data.meals.slice(0,6))
        heading.innerHTML = `${data.meals.slice(0,6).length} meals found`;

        mealsEl.innerHTML = data.meals.slice(0,6).map(item => `
        
            <div class = 'meal'>
            
                <img src = '${item.strMealThumb}' alt = '${item.strMeal}' />
    
                <div class = 'meal-info' data-mealID = ${item.idMeal}>
                
                    <h3>${item.strMeal}</h3>
                
                </div>
            
            </div>
        
        `).join('');
    }
}

// Getting meals by their Ids
const getMealById = async meal => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`);
    const data = await res.json();

    addMealToDOM(data.meals[0]);
}

// Adding meals to DOM
const addMealToDOM = (meal) => {
    const ingredients = [];
  
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
  
    singleMeal.innerHTML = `
      <div class="single-meal">
        <div class = 'modal-left'>
          <h1>${meal.strMeal}</h1>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="single-meal-info">
            <div>
              <h4>Category: </h4>
              ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            </div>
            <div>
              <h4>Area: </h4>
              ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
          </div>
        </div>
        <div class = 'modal-right'>
          <div class="main">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
              ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
          </div>
          <div class = 'video'>
            <h2>Recipe Video</h2>
            <iframe width="500" height="300" allowfullscreen = 'true'
            src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
            </iframe>
          </div>
        </div>
      </div>
    `;
}
