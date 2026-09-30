// ============================================================
//  SIFÓN — CONFIGURACIÓN DE LA WEB
//  Editá SOLO este archivo para cambiar datos, contacto y recetas.
//  Lo que va entre [corchetes] se muestra en rojo en la web
//  como "pendiente": reemplazalo por el dato real.
// ============================================================

window.SIFON_CONFIG = {

  // WhatsApp para recibir pedidos. Formato: 598 + número sin el 0.
  // Ej: 099 123 456  ->  '59899123456'
  whatsapp: '',

  // Cómo se muestra el WhatsApp en la sección Contacto
  whatsappVisible: '[número de WhatsApp]',

  email: '[email de contacto]',

  instagram: 'sifon.vermu',

  // Fichas de producto (pestañas de "El producto")
  recetas: {
    tab1: {
      nombre: 'Receta N°1',
      estado: 'Tanda N°01',
      estilo: 'Vermú rojo',
      tipo: 'VERMÚ ROJO',          // texto chico de la etiqueta de la botella
      vino: '[vino]',
      hierbas: '[hierbas de la receta]',
      macera: '[x] días',
      grad: '[xx]% vol'
    },
    tab2: {
      nombre: 'Receta N°2',
      estado: 'En prueba',
      estilo: '[estilo: rojo, blanco o rosado]',
      tipo: 'RECETA N°2',
      vino: '[vino]',
      hierbas: '[hierbas de la receta]',
      macera: '[x] días',
      grad: '[xx]% vol'
    }
  }
};
