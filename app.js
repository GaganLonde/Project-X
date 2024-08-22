document.addEventListener("DOMContentLoaded", function () {
    // Start the QuaggaJS barcode scanner
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner'), // Container for the scanner
            constraints: {
                facingMode: "environment" // Use the back camera
            }
        },
        decoder: {
            readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "ean_13_reader", // EAN-13 reader added here
                "code_39_reader",
                "upc_reader"
            ]
        },
        locator: {
            patchSize: "medium", // Available options: x-small, small, medium, large, x-large
            halfSample: true
        },
        locate: true, // Try to locate the barcode in the image
    }, function (err) {
        if (err) {
            console.error("QuaggaJS initialization failed:", err);
            return;
        }
        Quagga.start();
        console.log("QuaggaJS started successfully.");
    });

    // Handle detection and display the result
    Quagga.onDetected(function (data) {
        if (data && data.codeResult && data.codeResult.code) {
            const code = data.codeResult.code;
            document.getElementById('output').textContent = `Scanned Code: ${code}`;
            console.log("Barcode detected:", code);
        } else {
            console.log("Barcode detection failed.");
        }
    });

    Quagga.onProcessed(function (result) {
        if (result) {
            console.log(result.boxes); // This logs the detected barcode boxes
        }
    });
});
