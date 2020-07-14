 const section = $("section");
 const display = $(".maincontent");

 let inScroll = false;

 section.first().addClass("active");

 const perfomTransition = sectionEq => {
     if (inScroll === false) {
         inScroll = true;
        const position = sectionEq * -100;
        display.css({
           transform: `translateY(${position}%)`
        });
        section.eq(sectionEq).addClass("active").siblings().removeClass("active")
        
        setTimeout(() => {
            inScroll =  false
        }, 1300);
     }
    }

 const scrollViewport = derection => {
     const activeSection = section.filter(".active");
     const nextSection = activeSection.next();
     const prevSection = activeSection.prev();


     if (derection === "next" && nextSection.length) {
         perfomTransition(nextSection.index())

     }
     if (derection === "prev" && prevSection.length) {
        perfomTransition(prevSection.index())
    }
 }

 $(window).on("wheel", e => {
     const deltaY = e.originalEvent.deltaY;

     if(deltaY > 0) {
         scrollViewport("next");
     }
     if(deltaY < 0) {
        scrollViewport("prev");
    }
 });

 $(window).on("keydown", (e) => {     
    const tagName = e.target.tagName.toLowerCase();

    if (tagName != "input" && tagName != "textarea") {
        switch (e.keyCode) {
            case 38:
               scrollViewport("prev");
                break;
        
                case 40:
                   scrollViewport("next");
                    break;
        }
    }     
 });

 $("[data-scroll-to]").click( e=> {
     e.preventDefault()

     const $this = $(e.currentTarget);
     const target = $this.attr("data-scroll-to");
     const reqSection = $(`[data-section-id=${target}]`);
     if (reqSection.index() >= 0) {
        perfomTransition(reqSection.index())
     }
    
 })
