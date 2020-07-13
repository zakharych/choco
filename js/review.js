const findBlockByAlias = (alias) =>{
    return $(".review").filter((ndx, item) => {
        return $(item).attr("data-linked") === alias;
    });
};
$(".reviews-autors__item").click((e) =>{
    
    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAlias(target);
    const curItem = $this.closest(".reviews-autors__item");

    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("active").siblings().removeClass("active");
});