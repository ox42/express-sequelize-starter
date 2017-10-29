//anything you want to be run before other client side scripts

$(document).ready(function(){

    $('select[data-selected-value]').each(function() {

        $(this).find('option').each(function() {
            if (!$(this).prop('value') && !$(this).is('[value]')) {
                $(this).prop('value', $(this).text());
            }
        });

        let value = $(this).data('selected-value');
        $(this).val('' + value);
    });
});
