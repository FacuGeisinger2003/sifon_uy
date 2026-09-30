# Sifón — web

Sitio de **Sifón**, vermú casero hecho en Montevideo por Facu y Bruno.

Web publicada: https://facugeisinger2003.github.io/sifon_uy/

---

## Estructura

```
sifon_uy/
├── index.html          ← estructura y textos de la página
├── css/
│   └── styles.css      ← colores, tipografías y diseño
├── js/
│   ├── config.js       ← DATOS: WhatsApp, email, Instagram, recetas  ← editá acá
│   └── main.js         ← funcionamiento (sifón, calculadora, pedidos)
├── assets/
│   ├── favicon.svg     ← ícono de la pestaña
│   └── img/            ← poné acá las fotos
├── .nojekyll           ← le dice a GitHub Pages que publique los archivos tal cual
└── README.md
```

## Secciones de la página

| Sección | id en `index.html` | Qué tiene |
|---|---|---|
| Inicio | `#inicio` | Logo, bajada y el sifón interactivo |
| El producto | `#producto` | Botella + ficha con pestañas Receta N°1 / N°2 |
| La receta | `#receta` | Tarjeta "3 + 1" y calculadora de vasos |
| Nosotros | `#nosotros` | Texto, foto, próximos pasos, Facu y Bruno |
| Para tiendas | `#tiendas` | Formulario de pedido por cajas de 6 → WhatsApp |
| Contacto | `#contacto` | Instagram, WhatsApp, email |

---

## Cómo editar (lo más común)

### 1. Contacto y recetas → `js/config.js`
Todo lo que cambia seguido está en este archivo:

- `whatsapp`: número que recibe los pedidos, formato `598` + número sin el 0 (ej. `59899123456`).
- `whatsappVisible`: cómo se muestra el número (ej. `099 123 456`).
- `email` e `instagram`.
- `recetas`: datos de cada ficha (vino, hierbas, días de maceración, graduación).

Todo lo que esté entre `[corchetes]` aparece en rojo en la web como pendiente.

### 2. Textos → `index.html`
Buscá el texto que querés cambiar (Cmd+F) y reemplazalo. Los textos de cada sección están dentro de su `<section id="...">`.

Pendientes en `index.html`:
- `[precio por caja]` y `[a coordinar]` (sección Para tiendas)

### 3. Fotos
Las fotos están en `assets/img/`:
- `facu-y-bruno-duotono.jpg` → foto principal de "Nosotros" (en los colores de la marca)
- `facu-y-bruno.jpg` → la misma foto a color (para usarla, cambiá el nombre en `index.html`)
- `facu.jpg` y `bruno.jpg` → las caritas redondas de las tarjetas

Para cambiar una foto, subí la nueva a `assets/img/` **con el mismo nombre** y reemplaza a la anterior.

#### Agregar una foto nueva
1. Subí la foto a `assets/img/` (ej. `facu-y-bruno.jpg`, idealmente de menos de 500 KB).
2. En `index.html`, reemplazá:
   ```html
   <div class="foto">[foto: Facu y Bruno con el sifón]</div>
   ```
   por:
   ```html
   <img class="foto" src="assets/img/facu-y-bruno.jpg" alt="Facu y Bruno con el sifón" style="object-fit:cover;padding:0">
   ```

### 4. Colores y tipografías → `css/styles.css`
Al principio del archivo, en `:root`, están todos los colores de la marca:

| Variable | Color | Uso |
|---|---|---|
| `--azul` | `#2F5D8A` | Azul sifón, fondos principales |
| `--vidrio` | `#A9C8C0` | Vidrio del sifón |
| `--rojo` | `#C8372D` | Logo, botones, acentos |
| `--azulejo` | `#F3EEE3` | Fondo claro |
| `--tinta` | `#1C2B3A` | Texto y bordes |

Tipografías (Google Fonts): **Ultra** para títulos y **Courier Prime** para textos.

### 5. Calculadora de la receta → `js/main.js`
Usa 90 ml de vermú y 30 ml de soda por vaso, y botellas de 750 ml. Si cambian la receta, buscá `v*90` y `v*30` en `main.js`, y actualizá también el texto que explica la cuenta en `index.html` (id `calcNota`).

---

## Cómo subir cambios a GitHub (sin instalar nada)

1. Entrá al repo: https://github.com/FacuGeisinger2003/sifon_uy
2. **Para editar un archivo:** abrilo → lápiz ✏️ → cambiá → **Commit changes**.
3. **Para subir archivos nuevos o reemplazarlos:** **Add file → Upload files** → arrastrá los archivos o carpetas → **Commit changes**. Si ya existe un archivo con el mismo nombre en la misma carpeta, lo reemplaza.
4. Esperá 1-2 minutos y recargá la web (si no ves el cambio: Cmd+Shift+R).

**Si no ves los cambios:** el navegador guarda copias de `styles.css`, `main.js` y las fotos. En `index.html` esos archivos se cargan con `?v=3` al final (ej. `css/styles.css?v=3`). Cuando cambies uno de ellos, subí ese número (`?v=4`) en `index.html` y así todos ven la versión nueva.

### Primera vez: activar GitHub Pages
**Settings → Pages → Branch: `main` / `(root)` → Save.**

## Probar en la compu antes de subir
Abrí `index.html` con doble clic y se ve en el navegador. Si editás `config.js` o `styles.css`, recargá la página.

---

## Pendientes

- [ ] Número de WhatsApp y email en `js/config.js`
- [ ] Confirmar que el usuario `@sifon.vermu` esté libre en Instagram
- [ ] Datos reales de las recetas (vino, hierbas, maceración, graduación)
- [ ] Precio mayorista por caja y zonas de entrega
- [ ] Fotos del producto (botella, sifón, receta servida)
- [ ] (Opcional) Dominio propio, ej. `sifon.com.uy`: se configura en Settings → Pages → Custom domain

---

Beber con moderación. Prohibida su venta a menores de 18 años.
