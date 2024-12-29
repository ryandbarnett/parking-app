document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const spotId = params.get("spot");
    const bookings = JSON.parse(localStorage.getItem("bookings")) || {};

    const spotMessage = document.getElementById("spot-message");
    const bookingForm = document.getElementById("booking-form");
    const parkingVisual = document.getElementById("parking-visual");

    // Render parking spots
    const totalSpots = 3; // Adjust based on the number of parking spots
    for (let i = 1; i <= totalSpots; i++) {
        const spotDiv = document.createElement("div");
        spotDiv.className = "spot";
        spotDiv.textContent = `Spot ${i}`;

        // Highlight the selected spot
        if (i == spotId) {
            spotDiv.style.backgroundColor = "yellow";
        } else {
            spotDiv.style.backgroundColor = bookings[i] ? "red" : "lightgray"; // Red for booked, light gray for available
        }

        parkingVisual.appendChild(spotDiv);
    }

    // Update the spot message and form visibility
    if (!spotId || spotId < 1 || spotId > totalSpots) {
        spotMessage.textContent = "Invalid spot. Please select a valid spot.";
        bookingForm.style.display = "none";
        return;
    }

    if (bookings[spotId]) {
        spotMessage.textContent = `Spot ${spotId} is already booked by ${bookings[spotId].name} (License Plate: ${bookings[spotId].licensePlate}) for ${bookings[spotId].duration}.`;
        bookingForm.style.display = "none";
    } else {
        spotMessage.textContent = `Spot ${spotId} is available.`;
        bookingForm.style.display = "block";

        // Handle form submission
        bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const licensePlate = document.getElementById("license-plate").value;
        const duration = document.getElementById("duration").value;

        bookings[spotId] = { name, email, licensePlate, duration };
        localStorage.setItem("bookings", JSON.stringify(bookings));
        alert(`Spot ${spotId} booked successfully for ${duration}!`);
        window.location.reload();
        });
    }
});
  