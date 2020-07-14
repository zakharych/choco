const validateFields = (form, fieldArray) => {
    fieldArray.forEach(field => {
        field.removeClass("form__input-error");
        if (field.val().trim() === "") {
            field.addClass("form__input-error");

        }
    });

    const errorFields = form.find(".form__input-error");

   

    return errorFields.length === 0;
}


$('.form').submit(e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $("#modal");
    const content = modal.find(".modal__content");

    const isValid = validateFields(form, [name, phone, comment, to]);


    if (isValid) {
        $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "POST",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val()
            },
            success: data => {
                content.text(data.message);

                $.fancybox.open({
                    src: "#modal",
                    type: "inline"
                });
            },

            error: data => {
                const  message = data.responseJSON.message;
                content.text(message);
                $.fancybox.open({
                    src: "#modal",
                    type: "inline"
                });
            }
        });
    }
});

$(".js-submit-button").click(e => {
    e.preventDefault();
    $.fancybox.close();
})