
'use strict';

/**
 * Definition of a functional module according ti the Revealing Module Pattern by
 * Encapsulates all functions in variables in one object - makes it easy reusable, transferable
 * Allows the declaration of several instances
 *
 * More on the Revealing Module Pattern in JS:
 * https://gist.github.com/zcaceres/bb0eec99c02dda6aac0e041d0d4d7bf2
 *
 */
let someModule = (function(){

    //------------  Definition of HTML node elements (private) ------------------//

    let $moduleNode = document.querySelector('.module');


    //check if node element is available
    //If not exit the creation of the module - return of init: false indicates this
    if (!$moduleNode){
        return {
            init: (function(accordeon){return false})
        }
    }

    let $listItems = $moduleNode.querySelectorAll('.module__list-item');
    let $menuIcon = $moduleNode.querySelector('.module__icon');
    let $firstLevelItems = $moduleNode.querySelectorAll('.module__list-item>li>a');

    //------------  Definition of variables ---------------------------//

    let isSomeBoolean = false;

    //-------------- Definition of private functions ---------------------------//

    function initEvents(){


        //Click events
        $moduleNode.addEventListener('click', function(event) {
           if(event.target && event.target.matches('a')){
               //Add Actions, call Handlers
               someClickHandler();
           }
        });

        //Wait for the browser to fully render the page
        window.addEventListener('load', function() {
           //Add on page load handlers
            someOnloadHandler();
        });
    }

    function someOnloadHandler() {
        //Add handler actions
    }

    function someClickHandler(){
        //Add click handler actions
        someOtherFunction();
    }

    function someOtherFunction(){
        //Some actions
    }

    //Init actions
    function initMenu(someParam) {

        //Pass parameters
        isSomeBoolean = someParam;

        initEvents();
    }

    //------------------- Call of init functions ------------------------------//




    //-------------- Definition of public functions ---------------------------//
    return {
        init: initMenu
    }

})();



/**
 * Main function
 * Init your modules here
 */
(function(){

    //Fix for older Browser matches function
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
    }


    someModule.init(false);

})();





