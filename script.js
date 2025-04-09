let imgBox = document.getElementById('imgBox');
let qrImage = document.getElementById('qrImage');
let qrText = document.getElementById('qrText');

function generateQR() {
  if(qrText.value.length > 0) {
    // Add loading class
    imgBox.classList.add("loading");
    imgBox.classList.add("show-img");
    
    // Clear previous QR code
    qrImage.src = "";
    
    // Generate new QR code
    setTimeout(() => {
      qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(qrText.value);
      
      // When image loads, remove loading class
      qrImage.onload = function() {
        imgBox.classList.remove("loading");
      };
    }, 600); // Small delay for better UX
  } else {
    // If imgBox is visible, hide it when input is empty
    imgBox.classList.remove("show-img");
    
    // Show error animation on input
    qrText.classList.add('error');
    setTimeout(() => {
      qrText.classList.remove('error');
    }, 1000);
  }
}

// Generate QR code on Enter key press
qrText.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    generateQR();
  }
});

// Add focus animation for input
qrText.addEventListener("focus", function() {
  this.classList.add("active");
});

qrText.addEventListener("blur", function() {
  this.classList.remove("active");
});