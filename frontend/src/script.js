/* global emailjs */

// Import the insertReservation function from supabaseClient.js
import { insertReservation } from './src/supabaseClient.js';

function SendMail(event) {
    event.preventDefault();

    const contactForm = document.getElementById("contactForm");
    const confirmBtn = document.getElementById('confirmReservation');

    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const phoneInput = contactForm.querySelector('input[type="tel"]');

    if (!nameInput || !emailInput || !phoneInput) {
        alert("Please fill in all contact information.");
        return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    const date = document.getElementById('reservationDate').value;
    const time = document.getElementById('reservationTime').value;
    const table = document.getElementById('selectedTable').value;
    const guests = document.getElementById('guestsNumber').value;
    const requests = document.getElementById('specialRequests').value || 'None';

    if (!name || !email || !phone || !date || !time || !table || !guests) {
        alert("Please complete all fields.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    confirmBtn.disabled = true;
    confirmBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Processing...';

    const templateParams = {
        to_name: name,
        restaurant_name: "Fog & Flame",
        reservation_date: formatDate(date),
        reservation_time: formatTime(time),
        table_number: table.replace('Table ', '').split(' ')[0],
        number_of_guests: guests,
        special_requests: requests,
        restaurant_phone: '+44 20 7123 4567',
        restaurant_address: '123 Restaurant Street, London, United Kingdom',
        email: email
    };

    console.log("Email template parameters:", templateParams);

    // Prepare reservation data for Supabase
    const reservationData = {
        name,
        email,
        phone,
        date,
        time,
        table,
        guests,
        requests
    };

    // First send the email notification
    emailjs.send(import.meta.env.EMAILJS_SERVICE_ID, import.meta.env.EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);

            // Then save to Supabase database
            insertReservation(reservationData)
                .then(result => {
                    if (result.success) {
                        console.log('Reservation saved to database');
                    } else {
                        console.warn('Database save failed, but email was sent:', result.error);
                        // Continue with success flow even if database save fails
                    }

                    // Show success message - this happens whether DB save succeeded or not
                    const modal = contactForm.closest('.fixed');
                    if (modal) {
                        modal.innerHTML = `
                        <div class="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                            <div class="text-center mb-4">
                                <i class="ri-check-line ri-3x text-green-500"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-4 text-center">Reservation Confirmed!</h3>
                            <p class="text-gray-600 mb-4 text-center">
                                Your reservation has been successfully confirmed for ${table} on ${formatDate(date)} at ${formatTime(time)}.
                                A confirmation email has been sent to ${email}.
                            </p>
                            <div class="space-y-3">
                                <button class="w-full bg-primary text-white py-2 px-4 rounded-button hover:bg-opacity-90 transition-colors"
                                        onclick="this.closest('.fixed').remove()">
                                    Close
                                </button>
                                <a href="HomePage.html" class="block w-full text-center bg-secondary text-white py-2 px-4 rounded-button hover:bg-opacity-90 transition-colors">
                                    Back to Home
                                </a>
                            </div>
                        </div>
                        `;
                    }
                })
                .catch(dbError => {
                    console.error('Error saving to database:', dbError);
                    // Still show success since email was sent
                    const modal = contactForm.closest('.fixed');
                    if (modal) {
                        modal.innerHTML = `
                        <div class="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                            <div class="text-center mb-4">
                                <i class="ri-check-line ri-3x text-green-500"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-4 text-center">Reservation Confirmed!</h3>
                            <p class="text-gray-600 mb-4 text-center">
                                Your reservation has been successfully confirmed for ${table} on ${formatDate(date)} at ${formatTime(time)}.
                                A confirmation email has been sent to ${email}.
                            </p>
                            <div class="space-y-3">
                                <button class="w-full bg-primary text-white py-2 px-4 rounded-button hover:bg-opacity-90 transition-colors"
                                        onclick="this.closest('.fixed').remove()">
                                    Close
                                </button>
                                <a href="HomePage.html" class="block w-full text-center bg-secondary text-white py-2 px-4 rounded-button hover:bg-opacity-90 transition-colors">
                                    Back to Home
                                </a>
                            </div>
                        </div>
                        `;
                    }
                });

            confirmBtn.disabled = false;
            confirmBtn.innerHTML = 'Confirm';
        })
        .catch(function(error) {
            console.error('Email sending failed:', error);
            alert('Failed to send confirmation: ' + error.text);
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = 'Confirm';
        });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatTime(timeString) {
    // Check if timeString already includes AM/PM
    if (timeString.includes('AM') || timeString.includes('PM')) {
        return timeString;
    }

    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

// Initialize EmailJS after DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    emailjs.init('7CQHXp502_e6kFQcb');
});

// Export the SendMail function to make it globally available
window.SendMail = SendMail;