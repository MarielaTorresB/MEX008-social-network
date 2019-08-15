//import elementLI from "../components/elementLI.js";
//import Utils from "../../services/Utils.js";

const timeline = {
  render: async () => {
/*     db.collection("posts").onSnapshot.((querySnapshot) => {
      querySnapshot.forEach((post) => {
          console.log(`${post.id} => ${post.textPost()}`);
      });
  }); */

    return `
<section>
      <table>
        <thead>
          <tr>
            <th>Timeline</th>
          </tr>
        </thead>

        <tbody id="tabla">
          
        </tbody>
      </table>
    <!-- Modal More Trigger-->
    <div id="more-btn" class="right-align">
      <a class="waves-effect waves-light btn modal-trigger" href="#modal-more"><i
          class="material-icons">more_vert</i></a>
    </div>
    <!-- Modal More Structure-->
    <div id="modal-more" class="modal bottom-sheet" data-id="${doc.id}">
      <div class="modal-content">
        <h3 class="header">Opciones</h3>
        <ul class="collection">
          <li class="collection-item avatar">
            <i class="material-icons circle green">edit</i>
            <span class="title">Editar</span>
            <p>Editar</p>
            <a href="#!" class="secondary-content">
              <i class="material-icons">edit</i>
            </a>
          </li>
          <li class="collection-item avatar" id="buttonDelete">
            <i class="material-icons circle red">delete</i>
            <span class="title">Eliminar</span>
            <p>Eliminar</p>
            <a href="#!" class="secondary-content">
              <i class="material-icons">delete</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- Modal add Trigger -->
    <a id="add-btn" class="btn-floating btn-large waves-effect waves-light btn modal-trigger teal" href="#modal-add"><i class="material-icons">add</i></a>
  
    <!-- Modal add Structure -->
    <div id="modal-add" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Publicación</h4>
        <textarea name="post-textarea" autocapitalize="sentences" plachedolder="¿Que está pasando?"></textarea>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
        <a id="send-btn" href="#!" class="modal-close waves-effect waves-green btn-flat">Publicar</a>
      </div>
    </div>
    </section>
        `;
                   },
  after_render: () => {
    let tabla=document.getElementById("tabla");
    tabla.innerHTML = "";
    db.collection("posts").onSnapshot((querySnapshot) => {
     querySnapshot.forEach((doc) => {
     console.log(`${doc.data().displayName} => ${doc.data().textPost}`);
     tabla.innerHTML += `
     <div class="col s12 m7">
     <h2 class="header">${doc.data().displayName}</h2>
     <div class="card horizontal">
     <div id="more-btn" class="right-align">
     <a class="waves-effect waves-light btn modal-trigger" href="#modal-more"><i
         class="material-icons">more_vert</i></a>
      </div>
       <div class="card-stacked">
         <div class="card-content">
           <p>${doc.data().textPost}</p>
           <p>${doc.data().date}</p>
         </div>
         <div class="card-action">
           <a href="#">Delete</a>

           <!-- Switch -->
           <div class="switch">
           <p>
           <label>
             <input id="indeterminate-checkbox" type="checkbox" />
             <span><i class="material-icons like" >favorite</i></span>
           </label>
         </p>
           </div>
         </div>
       </div>
     </div>
   </div>
             
     `

     });
   }); 

let buttonDelete= document.getElementById("buttonDelete");


let deletePost=(id)=>{

  console.log(id);
  db.collection("posts").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
}


buttonDelete.addEventListener("click", deletePost);
  },
                  };

export default timeline;

