const themeButton = document.getElementById("changeTheme");

themeButton.addEventListener('click', (e) => {
    let element = document.querySelector("html");
    let theme = element.getAttribute("data-theme");
    let newTheme = theme === "light" ? "dark" : "light";
    element.setAttribute("data-theme", newTheme);
    themeButton.innerHTML = theme === "light" ?  `<i class='fa-solid fa-moon'></i>` : `<i class='fa-solid fa-sun'></i>`;
})

const newsletterForm = document.getElementById("newsletter-form");

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const subscriptionData = new FormData(newsletterForm);
    const data = Object.fromEntries(subscriptionData.entries());

    console.log(data);
    fetch("https://script.google.com/macros/s/AKfycbwUJvXN-Z_J9R0jF87iUiTGfSZREZ3vg8dKAVAkkAsJLqjpMzb7PjBDVoDLE-_I0FO7Qg/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((result) => alert(`Thank you for subscribing, ${data.firstName}!`))
    .catch((error) => alert('There was an error, we could not save your information!'));
    newsletterForm.reset();
})