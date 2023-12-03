// show model [title , input]
import axios from 'axios';
import Swal from 'sweetalert2';


export  function showAddModel({Token,updater}){
 
    Swal.fire({
        title: "Add Note ❤",
       html:`
       <input class ='form-control ' type="text" placeholder="Enter a title" id='title' name="title"/>
       <textarea class ='form-control mt-3 pb-5 ' type="text" placeholder="Enter a Describation" id='content' name="content"></textarea>
       `,
        showCancelButton: true,
        confirmButtonText: "Add",
        showLoaderOnConfirm: true,
        preConfirm:() => {
          let  title =document.getElementById('title').value ;
          let  content =document.getElementById('content').value;

          
            return {title,content}
           
          
          
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        console.log("hhh",result);

       
        if(result.isConfirmed!==false&&result.value.title.length!==0 &&result.value.content.length!==0){
          sendDataToNote({
            title: result?.value?.title,
            content: result?.value?.content,
            Token,
            updater,
              }
              )
        }
      
      });
      
       
   
   


}
 //   sent dato to note

 async function sendDataToNote({title , content ,Token ,updater}){
    let {data}= await axios.post('https://note-sigma-black.vercel.app/api/v1/notes',
    {title,content},
    {
        headers :{
            Token
  
         }
        
    })
    console.log(data);
    
    if(data.msg == 'done'){
        getUserNote({Token,updater})
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Note has been added",
          showConfirmButton: false,
          timer: 1500,
        });
    }
    
}
 // get note

  export async function getUserNote({Token ,updater}){
  try {
    let {data}= await axios.get('https://note-sigma-black.vercel.app/api/v1/notes',
    {
        headers:{
            Token
        }
    });
    
    updater(data.notes)
   
    
  } catch (error) {
    
    updater([])
  }

 }
 
//? **********************************Delete note******************************************

// show modul
export function showDeleteModul({noteId , Token ,updater}){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
        //  send data to api

        deleteNote({noteId , Token ,updater})
         
        }
      })
}
// send data to delete

async function deleteNote({noteId , Token ,updater}){
    let{data}=await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}` ,{
        headers:{
            Token
        }
    })
    getUserNote({Token,updater})
    Swal.fire(
        'Deleted!',
        'Your Note has been deleted.',
        'success'
      )

}



//? ***********************************updating****************************************
// show updata modul
export function showUpdateModul({prevTitle , prevContent ,noteId,Token,updater}){
    Swal.fire({
        title: "Update Note 😇",
       html:`
       <input class ='form-control ' type="text" value ="${prevTitle}" placeholder="Enter a title" id='title' name="title"/>
       <textarea class ='form-control mt-3 pb-5 ' type="text" placeholder="Enter a Describation" id='content' name="content">${prevContent}</textarea>
       `,
        showCancelButton: true,
        confirmButtonText: "Update",
        showLoaderOnConfirm: true,
        preConfirm:() => {
         let title =document.getElementById('title').value ;
          let content =document.getElementById('content').value;
           return {title,content}
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if(result.isConfirmed==true){
          updateNote({Token,noteId ,updater, title:result?.value?.title , content:result?.value?.content})


        }
      
     
     
      });
}


// send new title and content
async function updateNote({Token,noteId ,updater,title,content}){
    let{data}=await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,{title,content},{
        headers:{
            Token
        }
    })
   
    getUserNote({Token,updater})
  
    
     Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your Note has been updated',
      showConfirmButton: false,
      timer: 1000
    })
    
   
    
}




// get note after update
