# The Mandalorian - Juego de memoria

Juego de memoria con parejas de cartas iguales de personajes de The Mandalorian.

## Características

- Juego tipo Memory
- PWA instalable en Android, iOS e escritorio.
- Funcionamento offline básico grazas a cacheado de recursos estáticos con Service Worker.
- Iconos e favicons optimizados para iOS e Android.
- Interface adaptada a pantalla completa en modo `standalone` / `fullscreen`.

## Tecnoloxías empregadas

- HTML5, CSS3, JavaScript.
- Service Worker para cacheado e modo offline.
- Web App Manifest para configuración da PWA (nome, iconos, cores, pantalla completa).
- Favicons e iconos “maskable” para dispositivos móbiles.

## Estrutura do proxecto

- `index.html`: páxina principal da aplicación.
- `css/styles.css`: estilos da interface.
- `sw.js` (ou `service-worker.js`): script do Service Worker, xestiona a caché e as peticións de rede.
- `manifest.json`: configuración da PWA (nome, short_name, display, start_url, scope, icons, etc.).
- `assets/favicons/`: iconos e favicons para navegadores, PWA e dispositivos móbiles.
- `assets/...`: resto de recursos estáticos (imaxes, etc.).

## Service Worker e caché

O Service Worker realiza:

- Evento `install`: abre a caché `v1_cache_weatherapp_pwa` e almacena os recursos estáticos necesarios para que a aplicación funcione sen conexión (HTML, CSS, iconos, etc.).[web:63]  
- Evento `activate`: elimina cachés antigas que non están na whitelist e toma o control inmediato das páxinas coa chamada a `clients.claim()`. Isto evita ter que recargar a páxina para usar a nova versión do Service Worker.[web:63][web:66]  
- Evento `fetch`: intercepta as peticións da aplicación e devolve primeiro os recursos da caché, facendo “fallback” á rede se non están cacheados (estratexia cache-first).[web:63]

## Manifest e modo pantalla completa

O ficheiro `manifest.json` define:

- `name` e `short_name`: nomes completos e abreviados da app.
- `background_color` e `theme_color`: cores usadas no splash e na UI do navegador.
- `orientation`: bloquea a orientación (por exemplo, `portrait`).
- `display`: modo de visualización PWA (`standalone` ou `fullscreen` segundo o comportamento desexado).
- `start_url` e `scope`: URL de inicio e alcance da PWA.
- `icons`: conxunto de iconos en distintos tamaños para Android, iOS e escritorio.[web:22][web:34][web:57]

No `index.html` complétase a configuración con:

- `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` para aproveitar toda a área de pantalla, incluídos notch e barras de estado.[web:24]  
- Meta tags para modo app en móbiles:  
  - `mobile-web-app-capable`  
  - `apple-mobile-web-app-capable`  
  - `apple-mobile-web-app-status-bar-style`.[web:7][web:29]

## Iconos e favicons

Os iconos xeráronse a partir dunha imaxe base e exportáronse en varios tamaños para cubrir os diferentes plataformas e casos de uso (navegador, PWA, iOS, Android). Exemplos de tamaños utilizados:

- 512x512 e 192x192 para o manifest PWA (Android / escritorio).
- 180x180, 167x167, 152x152 para `apple-touch-icon` en iOS.
- 32x32, 16x16 como favicons clásicos para navegador.[web:57]

Algúns deses iconos poden marcarse co atributo `purpose: "any maskable"` no manifest para mellor integración como icono adaptativo en Android.[web:48]
