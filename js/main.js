
'use strict';

/**
 * Side Navigation logic
 * Build according to the Revealing Module Pattern
 */
let slideNav = (function(){

    //------------  HTML node elements ------------------//

    let $sideNav = document.querySelector('.side-nav');
    let $listItems = $sideNav.querySelectorAll('.side-nav__list a');
    let $menuIcon = $sideNav.querySelector('.side-nav__menu-icon');
    let $firstLevelItems = $sideNav.querySelectorAll('.side-nav__list>li>a');

    //------------  Varaibles ---------------------------//

    let isAccordeon = false;

    //-------------- Functions ---------------------------//

    function initEvents(){


        //Click events
        $sideNav.addEventListener('click', function(event) {
           if(event.target && event.target.matches('a')){
               listItemClickHandler(event, event.target);
               event.stopPropagation();
               event.preventDefault();
           } else if (event.target && event.target.matches('.side-nav__menu-icon')){
               menuClickHandler();
               event.stopPropagation();
           }
        }, false);
        //----------------

        /*
        for (let i = 0; i < $listItems.length; i++) {
            $listItems[i].addEventListener('click', (e) => {listItemClickHandler(e, e.target)});
        }
        */

        //Only for testing!
        for(let i = 0; i < $firstLevelItems.length; i++) {
            $firstLevelItems[i].addEventListener('click', function(e) {testImages(e, i)});
        }

        //Wait for the browser to fully render the page
        window.addEventListener('load', function() {
           initListHeights();
        });
    }

    function menuClickHandler() {

        $sideNav.classList.toggle('side-nav--open');
    }

    function listItemClickHandler(event, $item) {

        let $listItem = $item.parentNode;
        let $subList = $item.parentNode.querySelector('ul');
        Array.prototype.forEach.call($listItems, function($item){
            $item.parentNode.classList.remove('active');
        });
        $listItem.classList.add('active');
        let $parentItem = $listItem.parentNode.parentNode;
        if ($parentItem.nodeName ==='LI') {
            $parentItem.classList.add('active');
        }
        if(isAccordeon){
            toggleSublist($subList);
        }
        event.preventDefault();
    }

    function toggleSublist($subList){

        if ($subList){
            $subList.classList.toggle('open');
            if ($subList.classList.contains('open')) {
                $subList.style.maxHeight = $subList.getAttribute('data-maxHeight') + 'px';
            } else {
                $subList.style.maxHeight = 0;
            }
        }
    }

    function initListHeights(){
        let maxHeight = 0;
        let $subLists = $sideNav.querySelectorAll('ul');
        /*
        setTimeout(()=>{
            $subLists.forEach(($subList) => {
                maxHeight = $subList.offsetHeight;
                $subList.setAttribute("data-maxHeight", maxHeight);
                $subList.style.maxHeight = maxHeight + 'px';
            });
        },20);
        */
        Array.prototype.forEach.call($subLists, function($subList) {
            maxHeight = $subList.offsetHeight;
            $subList.setAttribute("data-maxHeight", maxHeight);
            $subList.style.maxHeight = maxHeight + 'px';
        });
    }

    function initMenu(accordeon) {

        //Pass parameters
        isAccordeon = accordeon;

        initEvents();
    }

    /**
     * Only for testing purpose
     * @ToDo Remove for dist
     * @param event
     * @param index
     */
    function testImages(event, index){

        let $styleGuideImage = document.querySelector('.styleguide__image');

        switch (index) {
            case 0:
                $styleGuideImage.src="images/styleguide-bsp/01_Colors.png";
                break;
            case 1:
                $styleGuideImage.src="images/styleguide-bsp/02_Color_primary.png";
                break;
            case 2:
                $styleGuideImage.src="images/styleguide-bsp/03_Color_secondary.png";
                break;
            case 3:
                $styleGuideImage.src="images/styleguide-bsp/11_Font.png";
                break;
            case 4:
                $styleGuideImage.src="images/styleguide-bsp/11_Font_typeface.png";
                break;
            case 5:
                $styleGuideImage.src="images/styleguide-bsp/20_icons.png";
                break;
            default:
                break;
        }
    }

    //Returning public functions
    return {
        init: initMenu
    }

})();

/**
 * Main function
 */
(function(){

    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }else {
    }

    slideNav.init(false);
})();





