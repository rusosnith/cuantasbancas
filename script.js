// Datos iniciales de los partidos

const partidos = [
    {
        "partido": "EVOLUCIÓN",
        "partidoOrig": "EVOLUCIÓN",
        "alineacion": "Ex oficialistas",
        "candidatos": [
            "LEVY",
            "CEDEIRA",
            "BARRETO",
            "VAZQUEZ",
            "LUDUEÑA SENLLE",
            "KOLACZYK",
            "SERVELLI",
            "BITCHIK DANEL",
            "BLAS ALAYO",
            "AGNONE CONTE"
        ],
        "porcentaje": 25,
        "locked": false
    },
    {
        "partido": "VOLVAMOS BUENOS AIRES",
        "partidoOrig": "VOLVAMOS BUENOS AIRES",
        "alineacion": "Ex oficialistas",
        "candidatos": [
            "RODRIGUEZ LARRETA",
            "TAGLIAFERRI",
            "FERRARIO",
            "BALBI",
            "TELERMAN",
            "FERESIN",
            "CARZOGLIO",
            "RODRIGUEZ",
            "BORGES",
            "MESISTRANO"
        ],
        "porcentaje": 22,
        "locked": false
    },
    {
        "partido": "COALICIÓN CIVICA - ARI",
        "partidoOrig": "COALICIÓN CIVICA - AFIRMACIÓN PARA UNA REPUBLICA IGUALITARIA (ARI)",
        "alineacion": "Ex oficialistas",
        "candidatos": [
            "OLIVETO LAGO",
            "SÁNCHEZ",
            "PACE",
            "ESSWEIN",
            "MACCIONE",
            "ROSATI DÍAZ",
            "MONSERRAT",
            "BENTIVENGA",
            "PALACIOS",
            "MARTIODA CAMPOS"
        ],
        "porcentaje": 19,
        "locked": false
    },
    {
        "partido": "FIT - UNIDAD",
        "partidoOrig": "FRENTE DE IZQUIERDA Y DE TRABAJADORES - UNIDAD",
        "alineacion": "Izquierda",
        "candidatos": [
            "BIASI",
            "BONFANTE",
            "FIERRO",
            "ALMEIDA",
            "TRIMARCHI",
            "ROMERO",
            "NAVARRO PALACIOS",
            "LIPCOVICH",
            "FERNÁNDEZ MARTI",
            "MÁSCOLO"
        ],
        "porcentaje": 8,
        "locked": false
    },
    {
        "partido": "LA IZQUIERDA EN LA CIUDAD",
        "partidoOrig": "LA IZQUIERDA EN LA CIUDAD",
        "alineacion": "Izquierda",
        "candidatos": [
            "WINOKUR",
            "AZRIEL ALONSO",
            "LEIVA",
            "D AMBROSIO ROMERO",
            "BRITO",
            "RUEDA KRAMER",
            "SAENZ",
            "HIDALGO ROBLES",
            "LUCIANO",
            "HAEBERER"
        ],
        "porcentaje": 7,
        "locked": false
    },
    {
        "partido": "UNION PORTEÑA LIBERTARIA",
        "partidoOrig": "UNION PORTEÑA LIBERTARIA",
        "alineacion": "Libertarios",
        "candidatos": [
            "SANTORO",
            "MUCHART",
            "CAMPELO",
            "SCAUZILLO",
            "SZLAJEN",
            "MÁRQUEZ",
            "ROSALES",
            "RIVERO",
            "PICCIOLI",
            "RENDICH"
        ],
        "porcentaje": 5,
        "locked": false
    },
    {
        "partido": "LA LIBERTAD AVANZA",
        "partidoOrig": "LA LIBERTAD AVANZA",
        "alineacion": "Libertarios",
        "candidatos": [
            "ADORNI",
            "PELAYO",
            "PAKGOJZ",
            "FREGUIA",
            "ARENAZA",
            "MONTENEGRO",
            "SAIFERT",
            "FLEITAS",
            "VARTABEDIAN",
            "KIENAST"
        ],
        "porcentaje": 2,
        "locked": false
    },
    {
        "partido": "M.I.D",
        "partidoOrig": "MOVIMIENTO DE INTEGRACIÓN Y DESARROLLO",
        "alineacion": "Libertarios",
        "candidatos": [
            "CARUSO LOMBARDI",
            "VILLAR",
            "ARANCIO",
            "LERNOUD",
            "TESTORI SCHROEDER",
            "RADICE",
            "VEGA",
            "YOUNG",
            "DEVITA",
            "DE SANTI"
        ],
        "porcentaje": 2,
        "locked": false
    },
    {
        "partido": "MOVIMIENTO PLURAL",
        "partidoOrig": "MOVIMIENTO PLURAL",
        "alineacion": "Libertarios",
        "candidatos": [
            "PERETTA",
            "PERETTA ALEJANDRE",
            "GONZÁLEZ",
            "NIETO",
            "ALTIERI",
            "STARKER",
            "FERNÁNDEZ",
            "SALAS",
            "FERRI",
            "BONZO"
        ],
        "porcentaje": 1,
        "locked": false
    },
    {
        "partido": "UCeDe",
        "partidoOrig": "UNION DEL CENTRO DEMOCRÁTICO",
        "alineacion": "Libertarios",
        "candidatos": [
            "MARRA",
            "MICHITTE",
            "DEL PIANO",
            "SANTAGADA",
            "RODRIGUEZ DE LA TORRE",
            "BENEGAS",
            "FURMAN",
            "BRIZUELA ACOSTA",
            "LECKIE",
            "MARTINEZ CACERES"
        ],
        "porcentaje": 1,
        "locked": false
    },
    {
        "partido": "EL MOVIMIENTO",
        "partidoOrig": "EL MOVIMIENTO",
        "alineacion": "Libertarios",
        "candidatos": [
            "ZURBRIGGEN SCHALLER",
            "ARIAS",
            "GOLDSMAN",
            "LEVIN",
            "CIGARRÁN",
            "SUSBIELLES",
            "PANAL",
            "SPENA",
            "FERREYRA",
            "ROMERO"
        ],
        "porcentaje": 1,
        "locked": false
    },
    {
        "partido": "ES AHORA BUENOS AIRES",
        "partidoOrig": "ES AHORA BUENOS AIRES",
        "alineacion": "Peronismo",
        "candidatos": [
            "SANTORO",
            "NEGRI",
            "MOCHI",
            "GONZÁLEZ",
            "MODARELLI",
            "GEMINIANI",
            "SALVATIERRA",
            "ROSSEN",
            "CAPORICCIO",
            "IAÑEZ"
        ],
        "porcentaje": 1,
        "locked": false
    },
    {
        "partido": "PRINCIPIOS Y VALORES",
        "partidoOrig": "PRINCIPIOS Y VALORES",
        "alineacion": "Peronismo",
        "candidatos": [
            "KIM",
            "LIROLA",
            "VÁZQUEZ",
            "NOBREGA",
            "COUTO",
            "MORENO",
            "SANSOBRINO",
            "RUIZ",
            "ALBISUA",
            "MACCHI"
        ],
        "porcentaje": 1,
        "locked": false
    },
    {
        "partido": "SEAMOS LIBRES",
        "partidoOrig": "SEAMOS LIBRES",
        "alineacion": "Peronismo",
        "candidatos": [
            "ABAL MEDINA",
            "PAPALEO",
            "BERCOVICH",
            "GARCIA VALLADARES",
            "GALVANO",
            "GODOY",
            "DE FLORIAN",
            "FREDES",
            "DIAZ",
            "FLEJSZ"
        ],
        "porcentaje": 1,
        "locked": false
    },
    {
        "partido": "BUENOS AIRES PRIMERO",
        "partidoOrig": "BUENOS AIRES PRIMERO",
        "alineacion": "Pro",
        "candidatos": [
            "LOSPENNATO",
            "LOMBARDI",
            "ALONSO",
            "NIETO",
            "FIGUEROA",
            "WOLFF",
            "MORALES GORLERI",
            "GARCÍA BATALLÁN",
            "BRACCIA",
            "JARVIS"
        ],
        "porcentaje": 1,
        "locked": false
    },
    {
        "partido": "CONFLUENCIA",
        "partidoOrig": "CONFLUENCIA - POR LA IGUALDAD Y LA SOBERANÍA",
        "alineacion": "Vecinal",
        "candidatos": [
            "KOUTSOVITIS",
            "ELGER VARGAS",
            "RUEJAS",
            "PARRA",
            "BIANCO",
            "BALDIVIEZO",
            "GONZALEZ GASS",
            "CAMPORA",
            "ACEVEDO",
            "MARMONI"
        ],
        "porcentaje": 1,
        "locked": false
    },
    {
        "partido": "FRENTE PATRIOTA FEDERAL",
        "partidoOrig": "FRENTE PATRIOTA FEDERAL",
        "alineacion": "Vecinal",
        "candidatos": [
            "BIONDINI",
            "CARDOZO",
            "JAIME",
            "QUINODOZ",
            "ROSAS",
            "LOZADA",
            "ZELENEÑKI",
            "NOLASCO",
            "VIVES",
            "AUCE"
        ],
        "porcentaje": 1,
        "locked": false
    },
    {
        "partido": "EN BLANCO / ANULADOS",
        "partidoOrig": "EN BLANCO / ANULADOS",
        "alineacion": "Blanco",
        "candidatos": [],
        "porcentaje": 1,
        "locked": false
    }
]

// Guardar los valores iniciales para poder restablecerlos
const initialValues = partidos.map(p => ({ porcentaje: p.porcentaje, locked: p.locked }));

const colorPartidos = d3
  .scaleOrdinal()
  .range(["#34aad7", "#efb118", "#c367b3", "#e86952", "#cb1f00", "#888"])
  .domain([
    "Peronismo",
    "Pro",
    "Libertarios",
    "Ex oficialistas",
    "Izquierda",
    "Vecinal"
  ])
  .unknown("silver")


// Función para calcular la distribución de bancas según D'Hondt
function calcularDhondt(
    partidos,
    bancasTotal,
    {
        modo = "porcentajes",      // "porcentajes" o "votos"
        umbralPorcentual = 0,      // % mínimo para participar
        totalVotos = null          // Solo necesario si modo="porcentajes"
    } = {}
) {
    if (!Array.isArray(partidos) || partidos.length === 0) {
        throw new Error("Debe proveer un array con partidos");
    }
    if (!Number.isInteger(bancasTotal) || bancasTotal <= 0) {
        bancasTotal = 30;
    }
    // Convertir porcentajes a votos si es necesario
    const partidosConVotos = partidos.map((p) => ({
        ...p,
        votos: modo === "porcentajes"
            ? Math.round((p.porcentaje / 100) * (totalVotos ?? (() => { throw new Error("Falta totalVotos") })()))
            : p.votos
    }));
    // Filtrar por umbral
    const totalVotosEmitidos = partidosConVotos.reduce((sum, p) => sum + p.votos, 0);
    const umbralVotos = Math.floor(totalVotosEmitidos * (umbralPorcentual / 100));
    const partidosFiltrados = partidosConVotos.filter((p) => p.votos >= umbralVotos);
    if (partidosFiltrados.length === 0) {
        return [];
    }
    // Inicializar resultado
    const resultado = partidosFiltrados.map((p) => ({
        partido: p.partido,
        votos: p.votos,
        porcentaje: p.porcentaje,
        bancas: 0
    }));
    // Generar lista de divisiones posibles
    const divisiones = resultado.flatMap((p, idx) =>
        Array.from({ length: bancasTotal }, (_, i) => ({
            idx,
            cociente: p.votos / (i + 1)
        }))
    );
    // Ordenar cocientes descendente y asignar las primeras bancasTotal bancas
    divisiones
        .sort((a, b) => b.cociente - a.cociente)
        .slice(0, bancasTotal)
        .forEach(({ idx }) => {
            resultado[idx].bancas++;
        });
    // Calcular porcentaje de bancas
    const totalBancasAsignadas = resultado.reduce((sum, p) => sum + p.bancas, 0);
    return resultado.map((p) => ({
        ...p,
        porcentajeBancas: (p.bancas / totalBancasAsignadas) * 100
    }));
}

// Función para actualizar la distribución de bancas
function actualizarBancas() {
    const totalBancas = parseInt(document.getElementById('totalBancas').value, 10) || 30;
    const umbralPorcentual = parseFloat(document.getElementById('umbralPorcentual').value) || 0;
    
    // Adaptar datos de partidos al formato requerido por calcularDhondt
    const partidosParaDhondt = partidos.filter(d => d.partido != "EN BLANCO / ANULADOS").map(p => ({
        partido: p.partido,
        porcentaje: p.porcentaje,
        color: colorPartidos(p.alineacion)
    }));
    
    // Calcular distribución de bancas
    const resultado = calcularDhondt(
        partidosParaDhondt,
        totalBancas,
        {
            modo: "porcentajes",
            umbralPorcentual: umbralPorcentual,
            totalVotos: 10000
        }
    );
    
    // Ordenar resultados de mayor a menor cantidad de bancas
    resultado.sort((a, b) => b.bancas - a.bancas);
    
    // Mostrar resultados
    const bancasContainer = d3.select("#bancas-resultado");
    bancasContainer.html(""); // Limpiar contenedor
    
    // Crear elementos para cada partido con bancas
    bancasContainer.selectAll(".banca-tag")
        .data(resultado)
        .join("div")
        .attr("class", "banca-tag")
        .style("background-color", d => {
            // Buscar el color basado en la alineación del partido
            const partido = partidos.find(p => p.partido === d.partido);
            return partido ? colorPartidos(partido.alineacion) : "#999";
        })
        .html(d => "<b>" + d.partido + ":</b>"+ d.bancas +" bancas");
}

// Crear los sliders
function createSliders() {
    const slidersContainer = d3.select("#sliders");
    
    // Crear contenedores para cada partido usando d3.js
    const containers = slidersContainer.selectAll(".slider-container")
        .data(partidos)
        .enter()
        .append("div")
        .attr("class", "slider-container");
    
    // Añadir etiquetas con los nombres de los partidos
    const labelContainers = containers.append("div")
        .attr("class", "slider-label");
    
    labelContainers.append("span")
        .style("color", d => colorPartidos(d.alineacion))
        .text(d => d.partido)    

    // Añadir iconos de candado
    const lockIcons = labelContainers.append("span")
        .attr("class", "lock-icon")
        .attr("id", (d, i) => `lock-${i}`)
        .html('<i class="fa-solid fa-lock"></i>')
        .on("click", (event, d, i) => {
            // Obtener el índice del dataset original
            const index = partidos.findIndex(p => p.partido === d.partido);
            toggleLock(index);
        });
    
    // Añadir sliders
    containers.append("input")
        .attr("type", "range")
        .attr("class", "slider")
        .attr("min", 0)
        .attr("max", 50)
        .attr("step", 0.1)
        .attr("value", d => d.porcentaje)
        .attr("id", (d, i) => `slider-${i}`)
        .on("input", function(event, d, i) {
            const index = partidos.findIndex(p => p.partido === d.partido);
            const newValue = parseFloat(this.value);
            const oldValue = partidos[index].porcentaje;
            
            // Verificar si podemos mover este slider sin romper el total
            if (canSliderMove(index, newValue)) {
                partidos[index].porcentaje = newValue;
                partidos[index].locked = true;
                updateLockIcon(index);
                
                // Redistribuir el cambio entre los sliders no bloqueados
                redistributeChange(oldValue - newValue);
                
                // Actualizar la interfaz
                updatePercentages();
                
                // Actualizar la distribución de bancas
                actualizarBancas();
            } else {
                // Si no se puede mover, volver al valor anterior
                this.value = oldValue;
            }
        });
    
    // Añadir displays de valores
    containers.append("div")
        .attr("class", "value-display")
        .attr("id", (d, i) => `value-${i}`)
        .text(d => d.porcentaje + "%");
    
    // Inicializar los iconos de candado y colores de slider
    partidos.forEach((partido, index) => {
        updateLockIcon(index);
        updateSliderColor(index, partido.color, partido.porcentaje);
    });
}

// Verificar si un slider puede moverse a un nuevo valor sin romper el total
function canSliderMove(index, newValue) {
    const oldValue = partidos[index].porcentaje;
    const change = oldValue - newValue;
    
    // Si es una reducción, siempre se puede (los otros aumentarán)
    if (change > 0) return true;
    
    // Si es un aumento, necesitamos verificar que los sliders desbloqueados
    // puedan reducirse lo suficiente para compensar
    const unlockedTotal = partidos.reduce((sum, p, i) =>
        i !== index && !p.locked ? sum + p.porcentaje : sum, 0);
    
    // El cambio absoluto que necesitamos compensar
    const absChange = Math.abs(change);
    
    // Si no hay sliders desbloqueados o el cambio es mayor que lo que pueden absorber
    if (unlockedTotal < absChange) return false;
    
    return true;
}

// Redistribuir un cambio entre sliders no bloqueados
function redistributeChange(change) {
    const unlockedSliders = partidos.filter(p => !p.locked);
    
    if (unlockedSliders.length === 0) return;
    
    // Distribuir el cambio proporcionalmente
    const totalUnlocked = unlockedSliders.reduce((sum, p) => sum + p.porcentaje, 0);
    
    // Actualizar los porcentajes de los sliders no bloqueados
    partidos.map(partido => {
        if (!partido.locked) {
            const proportion = partido.porcentaje / totalUnlocked;
            partido.porcentaje += change * proportion;
            
            // Asegurar que está dentro de los límites
            return {
                ...partido,
                porcentaje: Math.max(0, Math.min(50, partido.porcentaje))
            };
        }
        return partido;
    });
    
    // Verificar si necesitamos ajustar para obtener exactamente 100%
    const newTotal = partidos.reduce((sum, p) => sum + p.porcentaje, 0);
    
    if (Math.abs(newTotal - 100) > 0.001 && unlockedSliders.length > 0) {
        // Encontrar el primer slider desbloqueado para ajustar
        const firstUnlockedIndex = partidos.findIndex(p => !p.locked);
        if (firstUnlockedIndex !== -1) {
            partidos[firstUnlockedIndex].porcentaje += (100 - newTotal);
            partidos[firstUnlockedIndex].porcentaje = Math.max(0, Math.min(50, partidos[firstUnlockedIndex].porcentaje));
        }
    }
}

// Alternar el estado de bloqueo de un slider
function toggleLock(index) {
    partidos[index].locked = !partidos[index].locked;
    updateLockIcon(index);
}

// Actualizar el icono del candado según el estado
function updateLockIcon(index) {
    const lockIcon = document.getElementById(`lock-${index}`);
    if (partidos[index].locked) {
        lockIcon.style.display = "inline"; // Mostrar el candado si está bloqueado
    } else {
        lockIcon.style.display = "none"; // Ocultar el candado si está desbloqueado
    }
}

// Actualizar el color de la parte activa del slider y el espacio disponible
function updateSliderColor(index, color, porcentaje) {
    const slider = document.getElementById(`slider-${index}`);
    if (!slider) return;
    
    const valuePercent = (porcentaje / 50) * 100; // Convertir al porcentaje del rango del slider
    
    // Calcular el espacio disponible (lo que se puede aumentar)
    const totalOtherUnlocked = partidos.reduce((sum, p, i) =>
        i !== index && !p.locked ? sum + p.porcentaje : sum, 0);
    
    // Si no hay sliders desbloqueados, el espacio disponible es 0
    let availableSpace = totalOtherUnlocked;
    if (availableSpace <= 0) availableSpace = 0;
    
    // Calcular el porcentaje máximo que podría alcanzar este slider
    const maxPossiblePercentage = porcentaje + availableSpace;
    const maxPercentInSlider = Math.min(50, maxPossiblePercentage);
    const availablePercent = (maxPercentInSlider / 50) * 100;
    
    // Crear un gradiente de tres partes:
    // 1. Valor actual (color del partido)
    // 2. Espacio disponible (gris #aaa)
    // 3. Espacio no disponible (gris más claro #e0e0e0)
    slider.style.background =
        `linear-gradient(to right, 
            ${color} 0%, 
            ${color} ${valuePercent}%, 
            #aaa ${valuePercent}%, 
            #aaa ${availablePercent}%, 
            #e0e0e0 ${availablePercent}%, 
            #e0e0e0 100%)`;
}

// Actualizar porcentajes
function updatePercentages() {
    // Actualizar todos los sliders usando d3.js
    d3.selectAll(".slider").each(function(d, i) {
        const index = i;
        this.value = partidos[index].porcentaje;
    });
    
    // Actualizar todos los displays de valores
    d3.selectAll(".value-display").each(function(d, i) {
        const index = i;
        this.textContent = partidos[index].porcentaje.toFixed(1) + "%";
    });
    
    // Actualizar los colores de los sliders
    partidos.forEach((partido, index) => {
        updateSliderColor(index, colorPartidos(partido.alineacion), partido.porcentaje);
    });
    
   
}

// Restablecer valores iniciales
function resetValues() {
    partidos.forEach((partido, index) => {
        partido.porcentaje = initialValues[index].porcentaje;
        partido.locked = initialValues[index].locked;
    });
    
    d3.selectAll(".slider").each(function(d, i) {
        this.value = partidos[i].porcentaje;
    });
    
    d3.selectAll(".value-display").each(function(d, i) {
        this.textContent = partidos[i].porcentaje + "%";
    });
    
    partidos.forEach((partido, index) => {
        updateLockIcon(index);
        updateSliderColor(index, partido.color, partido.porcentaje);
    });
    
    
    // Actualizar la distribución de bancas
    actualizarBancas();
}

// Inicializar la aplicación
function init() {
    createSliders();
    
    // Manejar el botón de reset
    d3.select("#resetButton").on("click", resetValues);
    
    // Manejar cambios en los campos de configuración
    d3.select("#totalBancas").on("input", actualizarBancas);
    d3.select("#umbralPorcentual").on("input", actualizarBancas);
    
    // Asegurar que los colores de los sliders estén correctamente inicializados
    updatePercentages();
    
    // Calcular distribución inicial de bancas
    actualizarBancas();
}

// Iniciar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", init);