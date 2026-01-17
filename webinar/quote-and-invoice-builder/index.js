const { jsPDF } = window.jspdf;

const hamburgerMenu = document.getElementById("hamburger-menu");

hamburgerMenu.addEventListener('click', () => {
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenu.classList.toggle("hidden");
});


const quoteForm = document.getElementById("quote-form");

function getSpecificData(object, prefix) {
    return Object.keys(object).filter( key => key.startsWith(prefix))
        .reduce( (obj, key) => {
            obj[key] = object[key];
            return obj;
        }, {});
}

quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const quoteData = new FormData(quoteForm);
    const data = Object.fromEntries(quoteData.entries());
    console.log(data);
    // Here you can add code to process the form data, e.g., send it to a server or generate a quote PDF.

    const businessInfo = getSpecificData(data, 'business');

    const clientInfo = getSpecificData(data, 'client');

    const quoteDetails = getSpecificData(data, 'quote');
    
    console.log("Business Info:", businessInfo, "Client Info:", clientInfo, "Quote Details:", quoteDetails);

    const doc = new jsPDF();

    doc.text(businessInfo["business-name"], 40, 10, { align: 'center' });
    doc.text(businessInfo["business-address"], 40, 20, { align: 'center' });
    doc.text(businessInfo["business-email"], 40, 30, { align: 'center' });
    doc.text(businessInfo["business-phone"], 40, 40, { align: 'center' });

    doc.line(10, 50, 200, 50);

    doc.text("Client Information:", 10, 60);
    doc.text(`Name: ${clientInfo["client-name"]}`, 10, 70);
    doc.text(`Address: ${clientInfo["client-address"]}`, 10, 80);
    doc.text(`Email: ${clientInfo["client-email"]}`, 10, 90);
    doc.text(`Phone: ${clientInfo["client-phone"]}`, 10, 100);

    doc.line(10, 110, 200, 110);

    doc.text("Quote Details:", 10, 120);

    for ( const [key, value] of Object.entries(quoteDetails)) {
        doc.text(`${key}: ${value}`, 10, 130 + Object.keys(quoteDetails).indexOf(key) * 10);
    }

    doc.save('quote.pdf');
});