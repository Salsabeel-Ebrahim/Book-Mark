 // Get HTML elements

var siteUrlInput = document.getElementById('siteurl')
var siteNameInput = document.getElementById('siteName')
 var library = [] ;

 siteNameInput.addEventListener("input", function () {
  isValidInfo(InputsRegex.name, siteNameInput);
});

siteUrlInput.addEventListener("input", function () {
  isValidInfo(InputsRegex.url, siteUrlInput);
});

    
if(localStorage.getItem("libraryForbookMarker")){
  library = JSON.parse(localStorage.getItem("libraryForbookMarker"))
  display()
}
/** product details regex    **/
var InputsRegex ={
name : /^[A-Za-z0-9\s]+$/ , 
url : /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/
}
function addBook(){
  if( isValidInfo(InputsRegex.name, siteNameInput) &&
      isValidInfo(InputsRegex.url , siteUrlInput)  ){

        var bookmark = {
          name : siteNameInput.value ,
          visit : siteUrlInput.value }
      
      library.push(bookmark)
      localStorage.setItem("libraryForbookMarker" , JSON.stringify(library))
      
      resetAll()
      
      display()
      }
   
}

function resetAll(){
  siteUrlInput.value = "";
  siteNameInput.value = "";

  siteUrlInput.classList.remove("is-invalid" , "is-valid");
  siteNameInput.classList.remove("is-invalid" , "is-valid");
}



function display() {
    var cartona = "";
    for (let i = 0; i < library.length; i++) {
      cartona += `
                   <tr class="text-center t-row">
  <td class="fw-bold">${i + 1}</td>
  <td class="fw-bold">${library[i].name}</td>  

  <td class="visit-cells">
   <button class="btn btn-visit  text-white" >
        <a href="${ library[i].visit }" target="_blank"
         class="text-decoration-none
         text-white"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
             </button>
                  </td>


    <td class="delete-cells ">
        <button class="btn btn-delete text-white" onclick="deleteMark(${i})">
               <i class="fa-solid fa-trash-can"></i>
                    Delete
                    </button>    </td>
  
                </tr>
          `;
    }
    document.getElementById("tableBody").innerHTML = cartona;
  }


function deleteMark( deletedindex){
  library.splice( deletedindex, 1)

  localStorage.setItem("libraryForbookMarker" , JSON.stringify(library))
  display()
}

function isValidInfo(regex , InputElement){
if(regex.test(InputElement.value)){
       InputElement.classList.add("is-valid")
        InputElement.classList.remove("is-invalid")
        InputElement.nextElementSibling.classList.replace("d-block" ,"d-none" )
        return true  
      }
        else {
          InputElement.classList.add("is-invalid")
          InputElement.classList.remove("is-valid")
          InputElement.nextElementSibling.classList.replace("d-none" , "d-block")
       
          return false 
        }
}

