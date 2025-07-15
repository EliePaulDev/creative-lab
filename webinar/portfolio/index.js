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

    console.log(data);
    contactForm.reset();

    alert(`Thank you, ${data.firstName}! We received your contact information.`);
})