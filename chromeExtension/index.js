const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("text-el");
let myLeads = [];
 

const ulEl= document.getElementById("ul-El");

const deleteBtn = document.getElementById("del-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn");

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myLeads=[];
    renderLeads(myLeads);
})


if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
})

//After writing the above if block the inputs stay on the web page even after refreshing the page
inputBtn.addEventListener("click", function(){
    let input = inputEl.value;
    myLeads.push(input);
    inputEl.value = "";
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    console.log(localStorage.getItem("myLeads"));
    renderLeads(myLeads);
})

function renderLeads(leads){
    let listItems = "";
    for(let i=0; i<leads.length; i++){
        // listItems += "<li><a  target = '_blank' href= '" + myLeads[i] + "'>" +myLeads[i] + "</a></li>";
        //This is not clean and looks ugly hence we use template string
        listItems += `
        <li>
           <a target='_blank' href='${leads[i]}'>
           ${leads[i]}
           </a>
        </li>
        `
        //THe above part is called template string wrapped inside backticks ``
    }
    ulEl.innerHTML = listItems;
}

//Template strings can be broken into parts and written on line lines
//It also preserves spaces
const name = "Prathamesh";
const message = `
  Hey ${name},
      How are you?
  GO ahead.
`
console.log(message)