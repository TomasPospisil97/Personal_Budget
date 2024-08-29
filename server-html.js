// Get the .left-side container
const leftSideContainer = document.querySelector('.left-side');

// Generate envelopes in the .left-side
const envelopes = [
    { id: 1, title: 'Car', amount: 100 },
    { id: 2, title: 'Phone', amount: 50 },
    { id: 3, title: 'Rent', amount: 500 },
];

envelopes.forEach((envelope) => {
    const envelopeHtml = `
        <div class="envelope" data-id="${envelope.id}">
            ${envelope.title}
        </div>
    `;
    leftSideContainer.innerHTML += envelopeHtml;
});

// Add event listeners to each envelope
const envelopesElements = document.querySelectorAll('.envelope');

envelopesElements.forEach((envelope) => {
    envelope.addEventListener('click', (e) => {
        // Generate the .right-side content dynamically
        const envelopeId = e.target.dataset.id;
        const rightSideContent = generateRightSideContent(envelopeId);
        document.querySelector('.right-side').innerHTML = rightSideContent;
    });
});

// Function to generate the .right-side content
function generateRightSideContent(envelopeId) {
    // TO DO: Implement the logic to retrieve the envelope information from your database or API
    const envelopeInfo = envelopes.find((envelope) => envelope.id == envelopeId);
    const rightSideHtml = `
        <div class="about">
            <h2>${envelopeInfo.title}</h2>
            <p>Budget: ${envelopeInfo.amount}$</p>
        </div>
        <div class="adjust-delete">
            <div class="adjust">
                <i class="fas fa-plus"></i>
            </div>
            <div class="delete">
                <i class="fas fa-minus"></i>
            </div>
        </div>
    `;
    return rightSideHtml;
}

// Add event listeners to the .adjust and .delete buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('adjust')) {
        // TO DO: Implement the PUT request to adjust the envelope status
    } else if (e.target.classList.contains('delete')) {
        // TO DO: Implement the DELETE request to delete the envelope
        // and the pop-up confirmation dialog
    }
});