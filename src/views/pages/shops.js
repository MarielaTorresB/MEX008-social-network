const shops = {
  render: async () => {
    return `
    <section id="shops">
    <h3>Tiendas</h3>
    <div class="section">
    <h5>Zona sur</h5>
    <div class="divider"></div>
      <h6 id="ciclocros" class="place">Ciclocros</h6>
      <p><i class="material-icons tiny">location_on</i> Calle Melchor Pérez de Soto 211, 
      Col. Ampliación Miguel Hidalgo 3a Sección,
      14250, Tlalpan, CDMX</p>
      <p><i class="material-icons tiny">local_phone</i> 01 55 5423 7865</p>
    </div>
    <div class="section">
    <h5>Zona norte</h5>
    <div class="divider"></div>
      <h6 id="bazzinga" class="place">Bazzinga</h6>
      <p><i class="material-icons tiny">location_on</i>Calle Cienfuegos 850,
      Col. Lindavista 07300, Gustavo A. Madero, CDMX </p>
      <p><i class="material-icons tiny">local_phone</i> 01 55 5929 4557</p>
    </div>
    <div class="section">
    <h5>Zona centro</h5>
    <div class="divider"></div>
      <h6 id="bici-productos" class="place">Bici Productos</h6>
      <p><i class="material-icons tiny">location_on</i>Calle San Pablo 13, 
      Col. Centro 06090, Cuauhtémoc, CDMX</p>
      <p><i class="material-icons tiny">local_phone</i> 01 55 3278 2328</p>
    </div>
    <div id="map-container" class="map"></div>
    </section>
        `;
  },
  after_render: () => {
    const ciclocros = document.getElementById('ciclocros');
    const bazzinga = document.getElementById('bazzinga');
    const biciProductos = document.getElementById('bici-productos');

    const moveToCiclocros = (map) => {
      map.setCenter({lat:19.2799829, lng:-99.2069512});
      map.setZoom(16);
    }

    const moveToBazzinga = (map) => {
      map.setCenter({lat:19.4951, lng:-99.1292});
      map.setZoom(16);
    }

    const moveToBici = (map) => {
      map.setCenter({lat:19.4259, lng:-99.1313});
      map.setZoom(16);
    }


    var mark = new H.map.Marker({lat:19.2799829, lng:-99.2069512});
    var marker = new H.map.Marker({lat:19.4951, lng:-99.1292});
    var markers = new H.map.Marker({lat:19.4259, lng:-99.1313});

/*Boilerplate map initialization code starts below: */

//Step 1: initialize communication with the platform
   // Initialize the platform object:
   var platform = new H.service.Platform({
    'apikey': 'nvBcLGKefyanVmbYlYHuGKTR0vn95HOJzQCYXhbNtBQ'
  });

var defaultLayers = platform.createDefaultLayers();

    //Step 2: initialize a map - this map is centered over Europe
    var map = new H.Map(document.getElementById('map-container'),
      defaultLayers.vector.normal.map,{
      center: {lat:19.4284700, lng:-99.1276600},
      zoom: 10,
      pixelRatio: window.devicePixelRatio || 1
    });
// add a resize listener to make sure that the map occupies the whole container
 map.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

ciclocros.addEventListener('click', () => moveToCiclocros(map));
bazzinga.addEventListener('click', () => moveToBazzinga(map));
biciProductos.addEventListener('click', () => moveToBici(map));

map.addObject(mark);
map.addObject(marker);
map.addObject(markers);

  }
};
export default shops;
