const elementLI = {
  render: async () => {
    return ` 
    <div id="posts-list" class="col s12 m7">
    <h5>Posts</h5>     
      <!-- Post cards -->
    
      </div>
      <!-- Modal Confirmation-delete Structure -->
      <div id="confirmation-delete" class="modal">
          <div class="modal-content">
              <h4>Cofirmación de Eliminar</h4>
              <p>¿Estás seguro de querer eliminar esta publicación?</p>
          </div>
          <div class="modal-footer">
              <a href="#/timeline" class="modal-close waves-effect waves-green btn-flat">Aceptar</a>
              <a href="#/timeline" class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
          </div>
      </div>

      <!-- Modal Form Trigger -->
      <a id="add-btn" class="btn-floating btn-large waves-effect waves-light btn modal-trigger teal right"
          href="#form"><i class="material-icons">add</i></a>

      <!-- Modal form Structure -->
      <div id="form" class="modal modal-fixed-footer">
          <div class="modal-content">
              <h4>Publicación</h4>
              <div class="divider"></div>
              <div class="input-field">
                  <textarea id="textarea-post" class="materialize-textarea"></textarea>
                  <label for="textarea-post">¿Que está pasando?</label>
              </div>
          </div>
          <div class="modal-footer">
              <a href="#/timeline" class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
              <a id="send-btn" href="#/timeline" class="modal-close waves-effect waves-green btn-flat">Publicar</a>
          </div>
      </div>
      `;
  },


  after_render: () => {
    let postList=document.getElementById("post-list");
  db.collection("posts").onSnapshot((querySnapshot) => { 
    querySnapshot.forEach((post) => {
      console.log(`${post.id} => ${post.data().textPost}`);
      postList.innerHTML += `
      <div class="card horizontal" style="overflow: visible;">

          <div class="card-image waves-effect waves-block waves-light" data-pid="${post.id}" data-uid="${post.data().uid}">
              <img src="https://lorempixel.com/100/190/nature/6">
          </div>

          <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">${post.data().displayName}<i
                      class="material-icons">more_vert</i></span>
              <p>${post.data().textPost}</p>
              <p>${post.data().date}</p>
              <div class="card-action section">
              <p>${post.data().likes}</p><i class="material-icons right">favorite_border</i>
              </div>
          </div>

          <div class="card-reveal" style="display: none; transform: translateY(0%);">
              <li class=" card-title">
                  <span class="title"></span>
                  <i class="material-icons right">close</i>
              </li>

              <ul class="collection">
                  <li class="collection-item avatar">
                      <!-- Modal Form Trigger -->
                      <a class="modal-trigger" href="#form">
                          <span class="title">Editar</span>
                          <i class="material-icons btn waves-effect waves-light circle yellow">edit</i>
                      </a>
                  </li>

                  <li class="collection-item avatar">
                      <!-- Modal Confirmation-delete Trigger -->
                      <a class="modal-trigger" href="#confirmation-delete">
                          <span class="title">Eliminar</span>
                          <i class="material-icons circle red">delete</i>
                      </a>
                  </li>
              </ul>
          </div>
          
      </div>
      `;
    });
  });
  },
};

export default elementLI;