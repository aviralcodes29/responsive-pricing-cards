// Billing Toggle Functionality
const billingToggle = document.getElementById('billingToggle');
const priceElements = document.querySelectorAll('.price');
const periodElements = document.querySelectorAll('.period');

billingToggle.addEventListener('change', function() {
    const isYearly = this.checked;
    
    priceElements.forEach(priceElement => {
        const monthlyPrice = priceElement.getAttribute('data-monthly');
        const yearlyPrice = priceElement.getAttribute('data-yearly');
        
        // Simple fade animation
        priceElement.style.transition = 'opacity 0.2s ease';
        priceElement.style.opacity = '0.5';
        
        setTimeout(() => {
            priceElement.textContent = isYearly ? yearlyPrice : monthlyPrice;
            priceElement.style.opacity = '1';
            priceElement.style.color = '#000000';
        }, 200);
    });
    
    // Update period text
    periodElements.forEach(periodElement => {
        periodElement.textContent = isYearly ? 'year' : 'month';
        periodElement.style.color = '#888';
    });
});

// Card Selection Functionality
const priceCards = document.querySelectorAll('.price-col');
const selectButtons = document.querySelectorAll('.select-btn');
const selectionMessage = document.getElementById('selectionMessage');

selectButtons.forEach((button) => {
    button.addEventListener('click', function() {
        // Remove previous selection
        priceCards.forEach(card => card.classList.remove('selected'));
        
        // Add selection to clicked card
        const selectedCard = this.closest('.price-col');
        selectedCard.classList.add('selected');
        
        // Get plan details
        const planName = selectedCard.getAttribute('data-plan');
        const billingType = billingToggle.checked ? 'Yearly' : 'Monthly';
        const priceElement = selectedCard.querySelector('.price');
        const price = priceElement.textContent;
        
        // Show selection message
        selectionMessage.textContent = `✅ ${planName.charAt(0).toUpperCase() + planName.slice(1)} Plan Selected - $${price}/${billingType.toLowerCase()}`;
        selectionMessage.classList.add('show');
        
        // Change button text
        selectButtons.forEach(btn => btn.textContent = 'Select Plan');
        this.textContent = 'Selected ✓';
        
        // Hide message after 4 seconds
        setTimeout(() => {
            selectionMessage.classList.remove('show');
        }, 4000);
    });
});

// Cards entrance animation
window.addEventListener('load', () => {
    priceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
});