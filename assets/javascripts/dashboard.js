//you should use a separate file for each page, to separate concerns
//gulp will concatenate and minify everything (in production)

$(document).ready(function(){

    $('button.logout-button').click(function(event){
        event.preventDefault();

        $.post('/logout')
            .always(() => {
                window.location.href = '/'
            });
    })
});
