//Importando pantallas
import intro from "./views/pages/intro.js";
import welcome from "./views/pages/welcome.js";
import timeline from "./views/pages/timeline.js";
import shops from "./views/pages/shops.js";
import workshops from "./views/pages/workshops.js";
import profile from "./views/pages/profile.js";
import settings from "./views/pages/settings.js";
import error404 from "./views/pages/error404.js ";

//Importando componentes
import sidebar from "./views/components/sidebar.js";
import footer from "./views/components/footer.js";

//Importando servicios
import Utils from "./services/Utils.js";

const routes = {
  "/intro": intro,
  "/": welcome,
  "/timeline": timeline,
  "/shops": shops,
  "/workshops": workshops,
  "/profile": profile,
  "/settings": settings,
};

//Función para inicializar todo
const routerApp = async () => {
  const introContainer = null || document.getElementById("intro-container");
  const welcomeContainer = null || document.getElementById("welcome-container");

  introContainer.innerHTML = await intro.render();
  welcomeContainer.innerHTML = await welcome.render();
};

//Función para inicializar contenido
const stateChange = async () => {
  const sidebarContainer = null || document.getElementById("sidebar-container");
  const sectionContainer = null || document.getElementById("section-container");
  const footerNav = null || document.getElementById("footer-nav");

  sidebarContainer.innerHTML = await sidebar.render();
  sectionContainer.innerHTML = await timeline.render();
  footerNav.innerHTML = await footer.render();

  const request = Utils.pageRequestURL();

  let parsedURL =
    (request.resource ? `/${request.resource}` : "/") +
    (request.verb ? "/" + request.verb : "") +
    (request.id ? "/:id" : "");

  let page = routes[parsedURL] ? routes[parsedURL] : error404;
  sectionContainer.innerHTML = await page.render();

  await sidebar.after_render();
  await page.after_render();
  await footer.after_render();
};

//funcion para comprobar estado de usuario
  firebase.auth().onAuthStateChanged( (user) => {
    if (user) {
      document.getElementById('signup-signin').classList.add("hide");
      document.getElementById('intro-container').classList.add("hide");
      console.log("El usuario ha entrado a sesión");
      stateChange();
    } else {
      document.getElementById('signup-signin').classList.remove("hide");
      document.getElementById('section-container').innerHTML = "";
      document.getElementById("sidebar-container").innerHTML = "";
      document.getElementById('footer-nav').innerHTML = "";
      routerApp();
      console.log('El usuario está fuera de sesión')
    }
  });


  //mapa

     // Initialize the platform object:
     var platform = new H.service.Platform({
      'apikey': 'nvBcLGKefyanVmbYlYHuGKTR0vn95HOJzQCYXhbNtBQ'
    });
  
      // Obtain the default map types from the platform object
      var defaultLayers = platform.createDefaultLayers();




window.addEventListener("hashchange", () => {
   const user = firebase.auth().currentUser;

  if (user) {
    stateChange();
  } else {
    routerApp();
  }
});
window.addEventListener("load", routerApp);

setTimeout(() => { 
  document.getElementById('intro-container').classList.add("hide");
}, 1700);
