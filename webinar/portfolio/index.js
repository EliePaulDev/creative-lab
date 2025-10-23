 let slideIndex = 1;
showSlides(slideIndex);

function toggleTheme() {
    let element = document.querySelector("html");
    let theme = element.getAttribute("data-theme");
    let newTheme = theme === "light" ? "dark" : "light";
    element.setAttribute("data-theme", newTheme);
}

const contactForm = document.getElementById("contact-form");


contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    fetch("https://formspree.io/f/mldloljz", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Accept' : 'application/json'
        }
    }).then( response => {
        if(response.ok) {
            alert(`Thank you, ${data.firstName}! We received your contact information.`);
            contactForm.reset();
        }
        else {
            alert('Oops! There was a problem submitting your form. Try again!');
            console.log(response.json());
        }
    }).catch( error => console.log(`The errors are ${error}`));
    console.log(data);
    

    
})

const hamburgerMenu = document.getElementById("hamburgerMenu");

hamburgerMenu.addEventListener('click', () => {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("hidden");
})





function plusSlides(n) {
    console.log("click plus");
    console.log("update with: ", n);
    console.log("the current slide is : ", slideIndex);
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    console.log("slides are : ", slides);
    if(n > slides.length) slideIndex = 1;
    if(n < 1) slidesIndex = slides.length;
    for( let i = 0; i < slides.length; i++ ) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}
