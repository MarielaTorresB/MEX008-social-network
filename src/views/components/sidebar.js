import Utils from "../../services/Utils.js";


const sidebar = {
  render: async () => {
    let user = firebase.auth().currentUser;
    let name, email, photoUrl;
    
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
    }

    return `
    <nav> 
    <a id="side-trigger" href="#" data-target="slide-out" class="sidenav-trigger">
    <i id="menu" class="material-icons">view_list</i></a>
    </nav>
    <ul id="slide-out" class="sidenav">
      <li>
        <div class="user-view">
          <div class="background">
            <!-- <img src="img/bike-day.jpg">-->
          </div>
          <a><img class="circle" src="${photoUrl}"></a>
          <a><span class="white-text name">${name}</span></a>
          <a><span class="white-text email">${email}</span></a>
        </div>
      </li>
      <li><a href="#/timeline"><i class="material-icons">home</i>Timeline</a></li>
      <li>
      <div class="divider"></div>
    </li>
      <li><a href="#/profile"><i class="material-icons">account_circle</i>Perfil</a></li>
      <li><a href="#/settings"><i class="material-icons">settings</i>Configuración</a></li>
      <li>
        <div class="divider"></div>
      </li>
      <li><a class="subheader">Directorio</a></li>
      <li><a class="waves-effect" href="#/shops"><i class="material-icons">directions_bike</i>Tiendas</a></li>
      <li><a class="waves-effect" href="#/workshops"><i class="material-icons">build</i>Talleres de reparación</a></li>
      <li class="right"><a id="sos" class="waves-effect right-align modal-trigger" href="#modalSOS"><i class="material-icons">report_problem</i>S.O.S.</a></li>     
      <li id="divider-final">
        <div class="divider"></div>
      </li>
      <li class="right"><a id="sign-out" class="waves-effect">Cerrar Sesión</a></li>
    </ul>

    <!-- Modal S.O.S. Structure -->
    <div id="modalSOS" class="modal">
      <div class="modal-content">
        <h5>¡${name} has presionado el botón de emergencia!</h4>
        <h6>Tu ubicación y alerta serán enviadas inmediatamente a todos los ciclistas cercanos a ti</h6>
      <div id="sos-map" class="map"></div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn-flat">Entendido</a>
        <a href="#modalAddSOS" class="modal-close waves-effect waves-green btn-flat modal-trigger sos">Publicar S.O.S.</a>
      </div> 
    </div>

    <!-- Modal AddSOS Structure -->
    <div id="modalAddSOS" class="modal modal-fixed-footer">
        <div class="modal-content">
            <h4>S.O.S.</h4>
            <div class="divider"></div>
            <div class="input-field">
                <textarea id="textarea-sos" class="materialize-textarea">¡Chicos necesito ayuda! Me encuentro en las calles:</textarea>
                <label for="textarea-post"></label>
            </div>
        </div>
        <div class="modal-footer">
            <a class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
            <a id="add-sos" href="#/timeline" class="modal-close waves-effect waves-green btn-flat">Publicar S.O.S.</a>
        </div>
    </div>
    `;
  },
  after_render: () => {
     function addCircleToMap(map){
      map.addObject(new H.map.Circle(
        // The central point of the circle
        {lat:19.4212752, lng:-99.1653181},
        // The radius of the circle in meters
        1000,
        {
          style: {
            strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
            lineWidth: 2,
            fillColor: 'rgba(115, 236, 239, 0.7)'  // Color of the circle
          }
        }
      ));
    }


    var platformSOS = new H.service.Platform({
      'apikey': 'b7CvitQdD24O0hV1dxkZtp5DWvZdnnhVkD-W70ZTy4Y'
      });
  
      // Obtain the default map types from the platform object
      var maptypes = platformSOS.createDefaultLayers();
  
      // Instantiate (and display) a map object:
      var mapSOS = new H.Map(
      document.getElementById('sos-map'),
      maptypes.vector.normal.map,
      {
        center: {lat:19.4284700, lng:-99.1276600},
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1
      });
    

    // Now use the map as required...
 addCircleToMap(mapSOS);   
    
    const addSOS = document.getElementById('add-sos');
    addSOS.addEventListener('click', () => {
      Utils.sosPost();
    });

    //Inicializando sidebar
    const btnCollapse = document.querySelectorAll(".sidenav");
    M.Sidenav.init(btnCollapse);

    //Inicializando modales   
    let mSOS = document.querySelectorAll('.modal');
    M.Modal.init(mSOS);   



    //agregando chismosa para 'sign-out'
    document.getElementById("sign-out").addEventListener("click", () => {
      firebase.auth().signOut();
    });
  },
};

export default sidebar;
