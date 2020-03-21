


/************model */
class Search{
    constructor(query){
        this.query = query
    }
    async getResults(){
         const key="27217edea65345c5ac5201322202003";
         const proxy="http://api.weatherapi.com/v1/current.json"
        try{
    
            const res = await axios(`${proxy}?key=${key}&q=${this.query}`);
          
            this.result = res.data.current;
            
    
        }catch(error){
             alert(error)
        }
    }
}


/***********************VIEW */

const getInput = () => document.querySelector('.form-control').value;

const clearInput = () => {
    document.querySelector('.form-control').value = "";
}

const clearResults = () => {
    document.querySelector('.weather').innerHTML = "";
 }

const renderResult = (res) => {

     let url= "images/mixed.jpg"
     document.getElementsByTagName("body")[0].style.backgroundColor = "green";
    if(res.condition.text.includes('sun')){
         url= 'images/sun.jpg'
         document.getElementsByTagName("body")[0].style.backgroundColor = "yellow";
    }
     else if (res.condition.text.includes('rain')){
        url = 'images/rain.jpg' 
        document.getElementsByTagName("body")[0].style.backgroundColor = "blue";
    } else if(res.condition.text.includes('snow')){
         url = 'images/snow.jpg'
         document.getElementsByTagName("body")[0].style.backgroundColor = "white";
    } else if(res.condition.text.includes('cloud')){
        url = 'images/cloudy.jpg'
        document.getElementsByTagName("body")[0].style.backgroundColor = "gray";
    } else if (res.condition.text.includes('Overcast')){
         url = 'images/overcast.jpg'
         document.getElementsByTagName("body")[0].style.backgroundColor = "darkgray";
    }
    document.querySelector('.panel-last').setAttribute('class', 'panel-last panel-collapse collapse show')
    
    document.querySelector('.weather').insertAdjacentHTML('afterbegin', `<h2 >Current Temperature in Celcius: ${res.temp_c}</h2>`);
    document.querySelector('.d-block').setAttribute('src', url)
} 




/**********controller */

const state = {};

const controlSearch = async () =>{
   
    //get results from view
    const query = getInput();
    
    if(query){
      //new search object and add to state
      state.search = new Search(query);
      
    }
//prepare ui for results
clearInput();
clearResults();

//search for location
  await state.search.getResults();

 // render results on UI
 renderResult(state.search.result);


}

document.querySelector('.btn-light').addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});