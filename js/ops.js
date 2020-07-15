const section = $("section");
const display = $(".maincontent");
const sideMenu = $(".fix-menu");
const menuItem = sideMenu.find(".fix-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

section.first().addClass("active");

const countSectionPosition = sectionEq => {
    const position = sectionEq * -100;

    if (isNaN(position)) {
        console.error("передано не верное значение в countSectionPosition");
        return 0;        
    }
    return position;
};

const changeMenuThemeForSection = (sectionEq) => {
    
    const currentSection = section.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const activeClass = "fix-menu-shadowed";

    if (menuTheme === "dark") {
        sideMenu.addClass(activeClass);
    } else {
        sideMenu.removeClass(activeClass);
    }
};

const resetActiveClassForItem = (item, itemEq, activeClass) => {
    item.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const perfomTransition = sectionEq => {
    if (inScroll) return;

    const transitionOver = 1000;
    const mouseInertionOver = 300;
        inScroll = true;
        const position = countSectionPosition(sectionEq);

        changeMenuThemeForSection(sectionEq);

        display.css({
            transform: `translateY(${position}%)`
        });

        resetActiveClassForItem(section, sectionEq, "active");  

        setTimeout(() => {
            inScroll = false;
            resetActiveClassForItem(menuItem,sectionEq,"fix-menu__item--active");
        }, transitionOver + mouseInertionOver);
    
}

const viewportScroller = () => {
    const activeSection = section.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if (nextSection.length) {
                perfomTransition(nextSection.index());
            }
        },
        prev() {

            if (prevSection.length) {
                perfomTransition(prevSection.index());
            }
        },
    };

};

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();


    if (deltaY > 0) {
        scroller.next();
    }
    if (deltaY < 0) {
        scroller.prev();
    }
});

$(window).on("keydown", (e) => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypengInInputs = tagName === "input" || tagName === "textarea";
    const scroller = viewportScroller();

    if (userTypengInInputs) return;
        switch (e.keyCode) {
            case 38:
                scroller.prev();
                break;

            case 40:
                scroller.next();
                break;
        }
    
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
    e.preventDefault()

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);
    if (reqSection.index() >= 0) {
        perfomTransition(reqSection.index())
    }
})




if (isMobile) {
    https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
    $("body").swipe( {
        swipe:function(event, direction) {
    
            const scroller = viewportScroller();
            let scrollDerection = "";
    
            if (direction === "up")  scrollDerection = "next"  ;  
            if (direction === "down") scrollDerection = "prev" ;      
            
            scroller[scrollDerection]();
        },
      });
}

