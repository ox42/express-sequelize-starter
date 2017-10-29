$(document).ready(function(){

    $('form.login-form-action').submit(function(event){

        event.preventDefault();
        $('form.login-form-action').find('p.form-error').css('opacity', 0);

        //notice how you can use "let" and other ES6 features
        let submitUrl = $('form.login-form-action').attr('action');
        let emailAddress = $(this).find('input#emailAddress').val();
        let password = $(this).find('input#password').val();

        $.post(submitUrl, {
            username: emailAddress,
            password: password
        }).then(() => {

            window.location.href = '/dashboard';
        }).fail(() => {

            //invalid combination
            $('form.login-form-action').find('p.form-error').show().css('opacity', 1);
        });
    });
});