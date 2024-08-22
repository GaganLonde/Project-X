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
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "upc_reader"] // Add more readers if needed
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        Quagga.start();
    });

    // Handle detection and display the result
    Quagga.onDetected(function (data) {
        const code = data.codeResult.code;
        document.getElementById('output').textContent = `Scanned Code: ${code}`;
    });
});
