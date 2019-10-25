const workshops = {
  render: async () => {
    return `
    <section id="workshops">
    <h3>Talleres de reparación</h3>
    <div class="section">
    <h5>Zona sur</h5>
    <div class="divider"></div>
        <h6 id="enbiciados" class="place">Enbiciados Bike</h6>
        <p><i class="material-icons tiny">location_on</i> Av. Coyoacán 745 A, Col del Valle Centro, 03100 Ciudad de
          México, CDMX</p>
        <p><i class="material-icons tiny">local_phone</i> 01 55 5335 1127</p>
      </div>
      <div class="section">
      <h5>Zona norte</h5>
      <div class="divider"></div>
        <h6 id="comunitario" class="place">Taller Comunitario Enchulame La Bici</h6>
        <p><i class="material-icons tiny">location_on</i> Calle Eligio Ancona 79, Sta María la Ribera, 06400 Ciudad de
          México, CDMX</p>
        <p><i class="material-icons tiny">local_phone</i> 01 55 7038 9057</p>
      </div>
      <div class="section">
      <h5>Zona centro</h5>
      <div class="divider"></div>
        <h6 id="bici-urbana" class="place">La Bici Urbana</h6>
        <p><i class="material-icons tiny">location_on</i> Av. Morelos 70, Juárez, 06600 Ciudad de México, CDMX</p>
        <p><i class="material-icons tiny">local_phone</i> 01 55 5578 0547</p>
      </div>
      <div id="map-container" class="map"></div>
    </section>
        `;
  },
  after_render: () => {
    const enbiciados = document.getElementById('enbiciados');
    const comunitario = document.getElementById('comunitario');
    const biciUrbana = document.getElementById('bici-urbana');

    const moveToEnbiciados = (map) => {
      map.setCenter({lat:19.385584, lng:-99.1698427});
      map.setZoom(16);
    }

    const moveToComunitario = (map) => {
      map.setCenter({lat:19.4522432, lng:-99.1570658});
      map.setZoom(16);
    }

    const moveToBici = (map) => {
      map.setCenter({lat:19.432509, lng:-99.1539226});
      map.setZoom(16);
    }


    var mark = new H.map.Marker({lat:19.385584, lng:-99.1698427});
    var marker = new H.map.Marker({lat:19.4522432, lng:-99.1570658});
    var markers = new H.map.Marker({lat:19.432509, lng:-99.1539226});
    
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

    enbiciados.addEventListener('click', () => moveToEnbiciados(map));
comunitario.addEventListener('click', () => moveToComunitario(map));
biciUrbana.addEventListener('click', () => moveToBici(map));

map.addObject(mark);
map.addObject(marker);
map.addObject(markers);
  }
};
export default workshops;
