// Get references to HTML elements by their IDs
let imgBox = document.getElementById('imgBox');       // The container for the QR image
let qrImage = document.getElementById('qrImage');     // The <img> element where the QR code will be shown
let qrText = document.getElementById('qrText');       // The input field where user types the text/URL

// Function to generate a QR code
function generateQR() {
  if(qrText.value.length > 0) {  // Check if input is not empty

    // Add CSS class to show loading animation and display the QR image box
    imgBox.classList.add("loading");     // Add loading animation (spinner, pulse, etc.)
    imgBox.classList.add("show-img");    // Make the image box visible

    // Clear the previous QR code image source
    qrImage.src = "";

    // Use a small delay to simulate loading and give better UX
    setTimeout(() => {
      // Set the image source to a QR code URL generated using the external API
      qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(qrText.value);
      
      // Once the QR image has fully loaded, remove the loading animation class
      qrImage.onload = function() {
        imgBox.classList.remove("loading");
      };
    }, 600); // Delay of 600ms (optional, just for smoother UX)

  } else {
    // If input is empty

    // Hide the QR image box (if previously shown)
    imgBox.classList.remove("show-img");

    // Add error class to input field to show visual feedback (e.g., red border or shake)
    qrText.classList.add('error');

    // Remove the error class after 1 second to reset the animation
    setTimeout(() => {
      qrText.classList.remove('error');
    }, 1000);
  }
}

// Listen for the "Enter" key press on the input field
qrText.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    generateQR(); // Call the QR generation function when Enter is pressed
  }
});

// Add 'active' class when input field is focused (for styling like glow or border highlight)
qrText.addEventListener("focus", function() {
  this.classList.add("active");
});

// Remove 'active' class when input field loses focus
qrText.addEventListener("blur", function() {
  this.classList.remove("active");
});