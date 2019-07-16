
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


    let Constructor = function(){

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
    };

    return Constructor;


})();

/**
 * Module for floating labels
 * @type {{init}}
 */
let floatLabels = (function(){

    let Constructor = function(floatLabelClass){

        //------------  Definition of HTML node elements (private) ------------------//

        let $floatLabels = [];
        let $floatLabelInputs = [];
        let $floatLabelGroups = [];


        //-------------- Definition of private functions ---------------------------//

        function initEvents(){


            for (let i=0; i < $floatLabelInputs.length; i++) {

                if($floatLabelInputs[i].value && $floatLabelInputs[i].value !== '') {
                    $floatLabelInputs[i].parentNode.classList.add('filled');
                }
                $floatLabelInputs[i].addEventListener('focus', focusHandler);
                $floatLabelInputs[i].addEventListener('focusout', focusOutHandler)
            }
        }

        function focusHandler(e){
            e.target.parentNode.classList.add('active');
        }

        function focusOutHandler(e){
            e.target.parentNode.classList.remove('active');
            if (e.target.value && e.target.value !== '') {
                e.target.parentNode.classList.add('filled');
            }else {
                e.target.parentNode.classList.remove('filled');
            }
        }

        //Init actions
        function init(floatLabelClass) {

            //Pass parameters
            $floatLabels = document.querySelectorAll('.' + floatLabelClass + ', ' + floatLabelClass);

            for (let i=0; i < $floatLabels.length; i++) {

                let $group = $floatLabels[i].parentNode;
                let $input = $group.querySelector('input');
                $floatLabelGroups.push($group);
                $floatLabelInputs.push($input);
            }

            initEvents();
        }

        //------------------- Call of init functions ------------------------------//

        init(floatLabelClass);


        //-------------- Definition of public functions ---------------------------//
        return {
            init: init
        }
    };

    return Constructor;

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


    new someModule();

    new floatLabels('form__float-label');

})();





