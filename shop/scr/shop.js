

var Handler = function(){
    
    var self = this;
    this.data = [];
    this.content = [];
    this.filters = {};
    this.contentBlock = document.querySelector(".content");
    this.selectedItem = {}

    this.sort = ["priceAsc",  "priceDesc"];


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
 
    //смотрит какие фильтры выбраны и вызывает функции
    this.getFilteredArray = function(){

        //перед этим копирует в массив вывода всё из массива с бд
        this.content = this.data;

        //если выбран фильтр цвета, вызывает функцию фильтрации по цвету
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
        if(this.filters.sort)
        {
            if(this.filters.sort == "priceAsc")
            {
                this.sortAsc();
            }
            if(this.filters.sort == "priceDesc")
            {
                this.sortDesc();
            }
        }
                
    }

    //sorts array by price property ascent
    //to desc just reverse this array
    this.sortAsc = function(){
        var data = this.content;
        data.sort(function(a, b){
            if(+a.price > +b.price)
            {
                return 1;
            }
            if(+a.price < +b.price)
            {
                return -1;
            }
            return 0;
        });
        this.content = data;
    }

    this.sortDesc = function(){
        this.sortAsc();
        this.content = this.content.reverse();
    }


    ColorEventListener = function(){
        var selectedIndex = document.getElementById('colorSelector').options.selectedIndex;
        var color = document.getElementById("colorSelector").options[selectedIndex].value;
        self.filters.color = color;
        self.drawGoods();
        // self.getFilteredArray();
        // console.log(self.content);

    }

    CategoryEventListener = function(){
        var selectedIndex = document.getElementById('CategorySelector').options.selectedIndex;
        var category = document.getElementById("CategorySelector").options[selectedIndex].value;
        self.filters.category = category;
        self.drawGoods();
    }

    SizeEventListener = function(){
        var selectedIndex = document.getElementById('sizeSelector').options.selectedIndex;
        var size = document.getElementById("sizeSelector").options[selectedIndex].value;
        self.filters.size = size; 
        self.drawGoods();

    }

    SortEventListener = function(){
        var selectedIndex = document.getElementById('sortSelector').options.selectedIndex;
        var sort = document.getElementById("sortSelector").options[selectedIndex].value;
        self.filters.sort = sort;
        self.drawGoods();
    }



    this.drawMenuBlock = function(){

        var menuBlock = document.createElement('div');
        menuBlock.setAttribute('class', 'menu');


        var categories = this.createCategorySelector();
        var catSelect = document.createElement('select');

        catSelect.setAttribute('id','CategorySelector');
        var defOpt = document.createElement('option');
        defOpt.setAttribute('value', '');
        defOpt.innerHTML = "Category";
        catSelect.appendChild(defOpt);

        categories.forEach(function(el){
            var option = document.createElement('option');
            option.setAttribute('value', el);
            option.innerHTML = el;
            catSelect.appendChild(option);
            });

        catSelect.setAttribute('onchange', 'CategoryEventListener()');
        menuBlock.appendChild(catSelect);

        var colors = this.createColorSelector();
       
        var colorSelect = document.createElement('select');
        colorSelect.setAttribute('id','colorSelector');
        
        var defOpt = document.createElement('option');
        defOpt.setAttribute('value', '');
        defOpt.innerHTML = "Color";
        colorSelect.appendChild(defOpt);
        colors.forEach(function(el){
            var option = document.createElement('option');
            option.setAttribute('value', el);
            option.innerHTML = el;
            colorSelect.appendChild(option);
        });
        colorSelect.setAttribute('onchange', 'ColorEventListener()');

        menuBlock.appendChild(colorSelect);

        var sizes = this.createSizeSelector();

        var sizeSelect = document.createElement('select');
        sizeSelect.setAttribute('id','sizeSelector')
        var defOpt = document.createElement('option');
        defOpt.setAttribute('value', '');
        defOpt.innerHTML = "Size";
        sizeSelect.appendChild(defOpt);
        sizes.forEach(function(el){
            var option = document.createElement('option');
            option.setAttribute('value', el);
            option.innerHTML = el;
            sizeSelect.appendChild(option);
        });
        sizeSelect.setAttribute('onchange', 'SizeEventListener()');
        menuBlock.appendChild(sizeSelect);

        var sortes = this.sort;
        var sortesSelect = document.createElement('select');
        sortesSelect.setAttribute('id','sortSelector')
        var defOpt = document.createElement('option');
        defOpt.setAttribute('value', '');
        defOpt.innerHTML = "Sort by Price";
        sortesSelect.appendChild(defOpt);
        sortes.forEach(function(el){
            var option = document.createElement('option');
            option.setAttribute('value', el);
            option.innerHTML = el; 
            sortesSelect.appendChild(option);     
        });


        sortesSelect.setAttribute('onchange', 'SortEventListener()');
        menuBlock.appendChild(sortesSelect);

        var clearFilter = document.createElement('button');
        clearFilter.innerHTML = "Clear Filter";
        clearFilter.addEventListener('click', this.clearFilters);
        menuBlock.appendChild(clearFilter);
        this.contentBlock.appendChild(menuBlock);
   }


    this.clearFilters = function(){
        self.filters = {};
        var menu = document.querySelector('.menu');
        menu.remove();
        self.drawMainPage();
    }

    this.drawGoods = function(){

        self.getFilteredArray();
        
        var goods = self.content;

            if(itemBlock = document.querySelector('#goods'))
            {
                itemBlock.remove();
            }
            var itemBlock = document.createElement('div');
            itemBlock.setAttribute('id','goods');
            itemBlock.style.display = 'inline';
            
            
            goods.forEach(function(el){
                var item = document.createElement('div');
                item.style.display = 'inline-block';
                item.style.border = '1px solid black';
                item.style.margin = '20px';
                item.setAttribute('class','item');

                var a = document.createElement('a');

                a.setAttribute('href', 'javascript:void(0)');
                a.addEventListener('click', function(){
                   alert(el.id);
                });
                var img = document.createElement('img');
                img.setAttribute('src', el.url[0]);
                a.appendChild(img);
                item.appendChild(a);

                var text = document.createElement('p');
                text.innerHTML = el.title+' - <b>'+el.price+'\$</b>';
                item.appendChild(text);
                itemBlock.appendChild(item);
            });
            
            this.contentBlock.appendChild(itemBlock);
   
    }

    this.drawMainPage = function(){
        this.drawMenuBlock();
        this.drawGoods();
    }

    // var showDetails = function(){
    //     alert(1)
    // }

}


// var showDetails = function(id){
//     this.id = id;


//     this.getItem = function(){
//         //форич, ретурн весь элемент
//         //потом билдим слайдер
//         //и кнопочки там и всё остальное
//         //тут же уже нужно выгребать то что есть в корзине
//         console.log(app.content);
//     }
//     // getItem();
// }




app = new Handler;

//пихаем в него массив данных(потом будет автоматом)
app.data = data;

//рисуем главную страницу
app.drawMainPage();
