# cuantasbancas

Simulador interactivo de distribución de bancas legislativas para la Legislatura de la Ciudad de Buenos Aires (2025).

## ¿Qué hace este proyecto?

- Permite simular la asignación de bancas por partido político usando el sistema D'Hondt.
- Visualiza la composición de la legislatura según los porcentajes de votos ingresados.
- Permite ajustar los porcentajes de cada partido mediante sliders.
- Calcula automáticamente la redistribución de votos y bancas.
- Permite compartir la simulación por Twitter, WhatsApp o copiar el enlace.
- Incluye referencias visuales de colores y agrupaciones políticas.

## DATOS

- Los datos de los legisladores actuales los saque de la pagina de la legislatura http://datos.legislatura.gob.ar/
- Los datos de las candidaturas se los pedi por acceso a al info a https://electoralcaba.gob.ar/
- El cálculo de D´hondt se lo chafé al gran @plenque https://votacion.ar/simulador

## Herramientas y tecnologías utilizadas

- **HTML5** y **CSS3** para la estructura y estilos.
- **JavaScript** (ES6+), con módulos.
- **D3.js** para la visualización de datos y manipulación del DOM.
- **Font Awesome** para íconos.
- Datos de candidaturas y legisladores en formato CSV.

## ¿Cómo funciona?

1. El usuario ajusta los porcentajes de votos de cada partido.
2. El sistema recalcula la distribución de bancas usando el método D'Hondt.
3. Se actualiza la visualización de la legislatura y los resultados.
4. Se puede modificar el total de bancas y el umbral porcentual.

## Uso

Solo abre `index.html` en un navegador moderno. No requiere backend ni instalación.

## Código

El codigo esta hecho bastante a mano y bastante con copilot. Algun dia lo ordenare y sacaré todo lo que esta al p3do

