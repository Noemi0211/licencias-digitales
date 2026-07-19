# Licencias Digitales — Ruta de Aprendizaje

Paquete SCORM 1.2 para Moodle/Aules que guía al estudiante a lo largo de una secuencia de aprendizaje sobre licencias digitales: Copyright, Creative Commons, Copyleft, Copyfarleft y Dominio Público.

---

## Índice

1. [Descripción general](#descripción-general)
2. [Contenido didáctico (6 pasos)](#contenido-didáctico)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Cómo abrir y modificar](#cómo-abrir-y-modificar)
5. [Cómo empaquetar como SCORM](#cómo-empaquetar-como-scorm)
6. [Configuración del profesor](#configuración-del-profesor)
7. [Datos persistentes y resultados](#datos-persistentes-y-resultados)
8. [Licencia](#licencia)

---

## Descripción general

| Campo | Valor |
|---|---|
| **Nombre** | Estudio de Licencias Digitales |
| **Formato** | SCORM 1.2 (HTML + CSS + JS) |
| **Módulo** | Ofimática |
| **Ciclo** | Documentación y Administración Sanitarias |
| **Autora** | Noemí Celaya Mingot |
| **Año** | 2026 |

El paquete se sube a Moodle o Aules como un paquete SCORM. No requiere servidor backend; toda la lógica funciona en el navegador.

### Funcionalidades principales

- **6 pasos progresivos**: Evaluación Inicial → Vídeo → Infografía → Práctica → Juego Detective → Evaluación Final
- **Pantalla de resultados finales** que agrega errores de las 4 evaluaciones con feedback detallado
- **Panel del profesor** (botón visible arriba a la derecha, protegido con contraseña)
- **Text-to-Speech** integrado en todas las pantallas
- **Confetti** al superar el 80 % de aciertos
- **Animaciones de transición** entre pantallas (slide-in-right / slide-in-left)
- **Selección de paso** desde la pantalla de inicio (puede saltar directamente a cualquier paso)
- **Almacenamiento local** de resultados en `localStorage` (exportable a JSON)
- **Envío de puntuación a Moodle** vía SCORM API

---

## Contenido didáctico

### Paso 1 — Evaluación Inicial

Cuestionario de 8 preguntas de opción múltiple que evalúa conocimientos previos. Al finalizar muestra un resumen con aciertos, fallos y explicaciones.

- Fuente: `js/step1.js` (funciones `ei*`)
- Datos: `EI_PREGUNTAS` en `js/data.js`

### Paso 2 — Vídeo: Licencias en Sanidad

Reproductor de vídeo (`Licencias_en_Sanidad.mp4`). Pantalla introductoria con instrucciones antes de reproducir.

- Fuente: `js/step2.js`

### Paso 3 — Infografía de Licencias

Visualización de `img/Cartel_licencias.png`, un cartel resumen de las licencias más habituales.

- Fuente: `js/step3.js`

### Paso 4 — Práctica: Identificar Licencia

5 preguntas aleatorias en las que el estudiante debe identificar la licencia a partir de su imagen. Feedback inmediato con tarjetas comparativas (correcta vs. elegida).

- Fuente: `js/step4.js` (funciones `prac*`)
- Datos: `PRAC_PREGUNTAS`, `PRAC_OPCIONES` en `js/data.js`

### Paso 5 — Juego: Detective de Licencias

10 escenarios aleatorios en los que el estudiante debe elegir la licencia más adecuada para un caso práctico. Incluye explicaciones tras cada respuesta.

- Fuente: `js/step5.js` (funciones `game*`)
- Datos: `GAME_SCENARIOS` en `js/data.js`

### Paso 6 — Evaluación Final

Cuestionario de 15 preguntas aleatorias con navegación (anterior/siguiente), guardado de respuestas, calificación sobre 10 y feedback detallado. Envía la puntuación a Moodle vía SCORM.

- Fuente: `js/step6.js` (funciones `ef*`)
- Datos: `EF_PREGUNTAS` en `js/data.js`

### Paso 7 — Pantalla de Resultados Finales

Agrega los resultados de las 4 evaluaciones (Paso 1, 4, 5 y 6), muestra un resumen por secciones, nota global y retroalimentación didáctica.

- Fuente: `js/results.js`

### Paso 8 — Panel del Profesor

Accesible haciendo clic 5 veces en el logo de la cabecera en un máximo de 2 segundos. Contraseña por defecto: `admin`. Almacena resultados en `localStorage`, muestra gráficas de barras y permite exportar a JSON.

- Fuente: `js/teacher.js`

---

## Estructura del proyecto

```
estudio_licencias_digitales/
├── index.html                    # Pantalla principal (SCORM entry point)
├── imsmanifest.xml               # Manifesto SCORM 1.2
├── Licencias_en_Sanidad.mp4      # Vídeo del Paso 2
├── css/
│   └── estudio.css               # Estilos completos (~490 líneas)
├── img/
│   ├── logo.png                  # Logo principal
│   ├── secuencia_aprendizaje.png # Imagen de la secuencia (intro)
│   ├── Cartel_licencias.png      # Infografía (Paso 3)
│   ├── CC_BY_NC_SA.png           # Icono CC (footer)
│   ├── CC.png                    # Símbolo Creative Commons
│   ├── Copyright.png             # Símbolo Copyright
│   ├── Copyleft.png              # Símbolo Copyleft
│   ├── Copyfarleft.png           # Símbolo Copyfarleft
│   ├── Dominio-publico.png       # Símbolo Dominio Público
│   ├── BY.png                    # Icono atribución
│   ├── SA.png                    # Icono compartir igual
│   ├── NC.png                    # Icono no comercial
│   ├── ND.png                    # Icono sin derivadas
│   ├── CC_BY.png                 # CC BY
│   ├── CC_BY_SA.png              # CC BY-SA
│   ├── CC_BY_NC.png              # CC BY-NC
│   ├── CC_BY_ND.png              # CC BY-ND
│   ├── CC_BY_NC_SA.png           # CC BY-NC-SA
│   ├── CC_BY_NC_ND.png           # CC BY-NC-ND
│   ├── evaluacion_inicial.png    # Icono Evaluación Inicial
│   ├── evaluacion_final.png      # Icono Evaluación Final
│   ├── actividad_central.png     # Icono actividad central
│   └── Logo_videoresumen.png     # Logo videoresumen
└── js/
    ├── data.js                   # Datos: licencias, preguntas, escenarios
    ├── utils.js                  # Utilidades: shuffle()
    ├── scorm.js                  # Integración SCORM 1.2
    ├── tts.js                    # Text-to-Speech
    ├── confetti.js               # Efecto confetti
    ├── navigation.js             # Navegación entre pantallas
    ├── step1.js                  # Paso 1: Evaluación Inicial
    ├── step2.js                  # Paso 2: Vídeo
    ├── step3.js                  # Paso 3: Infografía
    ├── step4.js                  # Paso 4: Práctica
    ├── step5.js                  # Paso 5: Juego Detective
    ├── step6.js                  # Paso 6: Evaluación Final
    ├── results.js                # Paso 7: Resultados Finales
    ├── teacher.js                # Paso 8: Panel del Profesor
    └── app.js                    # Inicialización y arranque
```

### Dependencias entre módulos JS

El orden de carga en `index.html` es crítico. Los módulos dependen de los anteriores:

```
data.js       ← Define LICENCIAS, EI_PREGUNTAS, PRAC_PREGUNTAS,
                 PRAC_OPCIONES, GAME_SCENARIOS, EF_PREGUNTAS
    ↓
utils.js      ← shuffle()
    ↓
scorm.js      ← scormFind(), scormInit(), scormScore()
    ↓
tts.js        ← toggleTTS(), stopSpeech()
    ↓
confetti.js   ← launchConfetti()
    ↓
navigation.js ← showScreen(), goToIntro(), goToStep(), initStep()
    ↓
step1–6.js    ← Funciones de cada paso (initEvalInicial, initVideo, etc.)
    ↓
results.js    ← showFinalResults()
    ↓
teacher.js    ← teacherSaveResult(), teacherGetData(), teacherLogin(), teacherRender()
    ↓
app.js        ← initApp() — llama a todas las funciones de inicialización
```

---

## Cómo abrir y modificar

### Requisitos previos

- Un navegador web moderno (Chrome, Firefox, Edge)
- Un editor de código (VS Code recomendado)
- No se necesita servidor local; basta con abrir `index.html` en el navegador

### Abrir en el navegador

Doble clic en `index.html` o arrástralo a la ventana del navegador.

### Flujo de edición típico

1. **Editar preguntas**: Abrir `js/data.js` y modificar los arrays `EI_PREGUNTAS`, `PRAC_PREGUNTAS`, `GAME_SCENARIOS` o `EF_PREGUNTAS`. Cada pregunta tiene esta estructura:

   ```js
   {
     id: "ei_1",           // Identificador único
     pregunta: "Texto…",   // Enunciado
     imagen: "img/…",      // (opcional) imagen asociada
     opciones: ["A", "B", "C", "D"],
     correcta: 0,          // Índice (0-based) de la respuesta correcta
     explicacion: "…"      // Texto explicativo tras responder
   }
   ```

2. **Editar licencias**: Modificar el array `LICENCIAS` en `js/data.js`. Cada entrada necesita `id`, `nombre`, `img` y `desc`.

3. **Cambiar estilos**: Editar `css/estudio.css`. Los estilos están organizados por secciones con comentarios claros.

4. **Añadir/quitar pasos**: Modificar `index.html` (añadir/quitar `<section id="screen-stepN">`), crear o eliminar el módulo `js/stepN.js`, y actualizar `app.js` y `navigation.js`.

5. **Cambiar la contraseña del profesor**: Modificar la constante `TEACHER_PASS` en `js/teacher.js`.

### Cambiar el vídeo

Sustituir `Licencias_en_Sanidad.mp4` por otro archivo MP4 con el mismo nombre, o editar la ruta en `js/step2.js` (función `startVideo()`).

---

## Cómo empaquetar como SCORM

1. Asegurarse de que `imsmanifest.xml` lista todos los archivos (ya actualizado con los 15 módulos JS).
2. Comprimir **el contenido entero de la carpeta** en un archivo `.zip` (sin subcarpeta raíz).
3. Subir el `.zip` a Moodle → Añadir actividad → Paquete de contenidos SCORM.

### Comando rápido (PowerShell)

```powershell
$source = "C:\Users\Usuario\Documents\Jaume I 25-26\Formación\CDD B2\Tarea\estudio_licencias_digitales"
$dest   = "$source\estudio_licencias_digitales.zip"
if (Test-Path $dest) { Remove-Item $dest }
Compress-Archive -Path "$source\*" -DestinationPath $dest -Force
```

### Comando rápido (Linux/macOS)

```bash
cd /ruta/a/estudio_licencias_digitales
zip -r estudio_licencias_digitales.zip . -x "*.zip"
```

---

## Configuración del profesor

| Parámetro | Valor por defecto | Ubicación |
|---|---|---|
| Contraseña del panel | `admin` | `TEACHER_PASS` en `js/teacher.js` |
| Clave de almacenamiento | `licencias_digitales_results` | `TEACHER_KEY` en `js/teacher.js` |

### Acceso al panel

1. Hacer clic en el botón **_PROFESOR_** (fijo, arriba a la derecha).
2. Introducir la contraseña en el cuadro de diálogo.

### Funciones del panel

- Visualización de resultados por sección con gráficas de barras
- Cálculo de porcentaje de aprobados
- Borrar datos almacenados
- Exportar resultados a archivo `.json`

---

## Datos persistentes y resultados

Los resultados se almacenan en `localStorage` del navegador bajo la clave `licencias_digitales_results` con esta estructura:

```json
{
  "results": {
    "ei": { "correct": 6, "total": 8, "date": "2026-03-15T10:30:00.000Z" },
    "practice": { "correct": 4, "total": 5, "date": "…" },
    "game": { "correct": 8, "total": 10, "date": "…" },
    "ef": { "correct": 13, "total": 15, "date": "…" }
  }
}
```

- **Moodle**: La puntuación se envía automáticamente vía la API SCORM 1.2 al completar la Evaluación Final (Paso 6).
- **Navegador**: Los datos persisten hasta que el usuario borre el caché del navegador o el profesor los elimine desde el panel.
- **Exportación**: El panel del profesor permite descargar un archivo JSON con todos los resultados.

---

## Licencia

Material para el aula de Ofimática © 2026 por **Noemí Celaya Mingot** está licenciada bajo [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es).

Puedes libremente:
- **Compartir** — copiar y redistribuir el material en cualquier medio o formato
- **Adaptar** — remezclar, transformar y crear a partir del material

Bajo las siguientes condiciones:
- **Reconocimiento** — Debes otorgar el crédito adecuado, proporcionar un enlace a la licencia e indicar si se realizaron cambios.
- **NoComercial** — No puedes utilizar el material para fines comerciales.
- **CompartirIgual** — Si remezclas, transformas o crear a partir del material, debes distribuir tus contribuciones bajo la misma licencia.

---

## Créditos

- **Autora**: Noemí Celaya Mingot
- **Ciclo**: Documentación y Administración Sanitarias
- **Módulo**: Ofimática
- **Colaboradora**: IA asistida (OpenAI)
- **Iconos Creative Commons**: [creativecommons.org](https://creativecommons.org)
