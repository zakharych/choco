$('.form').submit(e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");
    
    
    


    $.ajax({
        url: "https://webdev-api.loftschool.com/sendmail",
        method: "POST",
        data: {
            name: name.val(),
            phone: phone.val(),
            comment: comment.val(),
            to: to.val()
        },
    })
    // $.fancybox.open({
    //     src:"#modal",
    //     type: "inline"
    // })
})

$(".js-submit-button").click(e =>{
    e.preventDefault();
    $.fancybox.close();
})