$(document).ready(function(){
    // Function to update the total price
    function updateTotalPrice() {
        var totalPrice = 0;
        $('.module-row').each(function() {
            var modulePrice = parseFloat($(this).find('td:nth-child(3)').text());
            var discount = parseFloat($(this).find('.discount').val());  // Extract discount
            if (!isNaN(discount)) {
                modulePrice -= modulePrice * discount; // Apply discount to modulePrice
            }
            var maintenance = parseFloat($(this).find('td:nth-child(4)').text()) / 100;
            var additionalUsers = parseInt($(this).prev('tr').find('.additional-users').val());
            if ($(this).find('input[name="modules"]:checked').length > 0) {
                totalPrice += modulePrice;
                if (additionalUsers <= 10) {
                    totalPrice += additionalUsers * 2100.00;
                } else {
                    totalPrice += 10 * 2100.00 + (additionalUsers - 10) * 1050.00;
                }
            }
            totalPrice += totalPrice * maintenance;
        });
        $('#totalPrice').text(new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(totalPrice));
    }

    // Update the total price each time a checkbox or number input field changes
    $('input[name="modules"], .additional-users, .discount').change(updateTotalPrice); // Added .discount

    // Also update the total price when the form is submitted (in case a field changes without triggering a 'change' event)
    $('#offerForm').submit(function (e) {
        console.log("Form submitted!");
        e.preventDefault();
        updateTotalPrice();
    });
});
