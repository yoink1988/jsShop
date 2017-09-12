

var Handler = function(){
    
    this.data = [];
    this.content = [];
    this.filters = {color: "black", size: "l"};

    //returns an array with unique values
    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    //creates array with items for <option>
    this.createColorSelector = function()
    {
        var data = this.data;
        
        var colors = [];
        data.forEach(function(el, data){
            el.color.forEach(function(color, el){
                colors.push(color);
            });
        });
        colors = colors.filter(onlyUnique);
        return colors;
    }

    //creates array with items for <option>
    this.createSizeSelector = function()
    {
        var data = this.data;
        var sizes = [];
        data.forEach(function(el, data){
            el.size.forEach(function(size, el){
                sizes.push(size);
            });
        });
        sizes = sizes.filter(onlyUnique);
        return sizes;
    }

     //creates array with items for <option>
    this.createCategorySelector = function()
    {
        var data = this.data;
        var category = [];
        data.forEach(function(el, data){

            category.push(el.category);

        });
        category = category.filter(onlyUnique);
        return category;
    }

    //filters an output array with category filter
    this.filterCategory = function(){

        var data = this.content;
        var category = this.filters.category

        var result = [];

            data.forEach(function(el, data){
                if(el.category.includes(category))
                {
                    result.push(el);
                }
            });  

            this.content = result;
    }

    //filters an output array with color filter
    this.filterColor = function(){
        var data = this.content;
        var color = this.filters.color;
        var result = [];
        data.forEach(function(el, data){
            if(el.color.includes(color))
            {
                result.push(el);
            }
        });
        this.content = result;
    }

    //filters an output array with size filter
    this.filterSize = function(){
        var data = this.content;
        var size = this.filters.size;
        var result = [];
        data.forEach(function(el, data){
            if(el.size.includes(size))
            {
                result.push(el);
            }
        });
        this.content = result;
    }
 
    //applyes filters to dataArray
    this.getFilteredArray = function(){
        this.content = this.data;
        if(this.filters.color)
        {
            this.filterColor();
        }
        if(this.filters.size)
        {
            this.filterSize();
        }
        if(this.filters.category)
        {
            this.filterCategory();
        }
        
    }
}

//создаем управляющий класс
app = new Handler;

//пихаем в него массив данных(потом будет автоматом)
app.data = data;


//итемы для селектор блоков
//можешь в консоли написать просто colors
//и там будут только уникальные цвета, и если добавится  шмотка с новым цветом, тоже всё ок
//так же и с остальными итемами
var colors = app.createColorSelector();
var sizes = app.createSizeSelector();
var cat = app.createCategorySelector();

//а вот тут мой тест на массивы шмоток уже после фильтров, если они включены(хоть 1, хоть все, хоть выключены - пофиг)
//это будет задаваться событиями
// но в любом случае перед выводом будет выполняться этот метод
//в примере  this.filters = {color: "black", size: "m"};
app.getFilteredArray();


//лог покажет только обьекты попадающие под фильтры
console.log(app.content);

//вот как-то так

