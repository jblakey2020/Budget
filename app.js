// Module that handle the budget data
var budgetController = (function(){
    //creating a data module 
    //function constructor
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
//create a data system with array ready to recieve data
    var data = {
    allItems:{
        exp:[],
        inc:[],
    },
    total:{
        exp: 0,
        inc: 0,
    }

    };

    return {
        addItem: function(type, des, val){
            var newItem, ID;
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

            if(type === 'exp'){

            newItem = new Expense(ID, des, val);

            }else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            data.allItems[type].push(newItem);
            return newItem;
    }
    };
  



})();




//USER Interphase Controller
var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };



    return{
        getInput: function() {
            return{
             type: document.querySelector(DOMstrings.inputType).value,
             description: document.querySelector(DOMstrings.inputDescription).value,
             value:document.querySelector(DOMstrings.inputValue).value
            
        };
    },
    getDOMstrings: function(){
        return DOMstrings;
    }
    };


})();




//Connect UI and Budget // Gloabal app controller
var controller = (function(budgetCtrl, UICtrl){

   var setUpEventListner = function(){
    var DOM = UICtrl.getDOMstrings();
   //Setting up event linster
    document.querySelector(DOM.inputBtn).addEventListener('click', crtlAddItem);
    //KEY PRESS EVENT
    document.addEventListener("keypress", function(event) {
        if(event.keyCode === 13 || event.which === 13){
            crtlAddItem();
            
        }
    });
};

 

    var crtlAddItem = function(){
        var input, newItem;

       input = UICtrl.getInput();

         budgetController.addItem(input.description, input.value, input.type);
     

    };
    return{
        init:function(){
            console.log('application has started');
            setUpEventListner();
        }
    };


})(budgetController, UIController);

controller.init();