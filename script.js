// 1. Importaciones y configuración inicial
console.log("Script loaded: script.js");
import { partidos, partidoIds, legislaturaCaba2025, queAlineacion, candidatos2025 } from './datos.js';

// 2. Variables globales y constantes
let porcentajeMaximo = 40;
console.log("Initial configuration: porcentajeMaximo =", porcentajeMaximo);
const initialValues = partidos.map(p => ({ porcentaje: p.porcentaje, locked: p.locked }));

// 3. Utilidades generales (colores, helpers, etc)
const colorPartidos = d3
  .scaleOrdinal()
  .range(["#34aad7", "#efb118", "#c367b3", "#ff791d", "#cb1f00", "#888"])
  .domain([
    "Peronismo",
    "Pro",
    "Libertarios",
    "Ex oficialistas",
    "Izquierda",
    "Vecinal"
  ])
  .unknown("silver");

// 4. Funciones de manipulación de URL y compartir
function actualizarURL() {
    console.log("Updating URL with current percentages...");
    const params = new URLSearchParams();
    partidos.forEach((partido, index) => {
        const id = Object.keys(partidoIds).find(key => partidoIds[key] === partido.partido);
        if (id) {
            params.set(id, partido.porcentaje.toFixed(1));
        }
    });
    history.replaceState(null, "", `?${params.toString()}`);
    console.log("URL updated:", window.location.href);
}

function actualizarEnlacesDeCompartir() {
    const urlActual = window.location.href;
    const twitterLink = document.querySelector(".share-buttons a[href*='twitter.com']");
    if (twitterLink) {
        twitterLink.href = `https://twitter.com/intent/tweet?text=Descubre%20cuántas%20bancas%20puede%20obtener%20cada%20partido%20en%20${encodeURIComponent(urlActual)}`;
    }
    const whatsappLink = document.querySelector(".share-buttons a[href*='whatsapp.com']");
    if (whatsappLink) {
        whatsappLink.href = `https://api.whatsapp.com/send?text=Descubre%20cuántas%20bancas%20puede%20obtener%20cada%20partido%20en%20${encodeURIComponent(urlActual)}`;
    }
}

function copiarAlPortapapeles() {
    const urlActual = window.location.href;
    navigator.clipboard.writeText(urlActual)
        .then(() => {
            alert("Enlace copiado al portapapeles");
        })
        .catch(err => {
            console.error("Error al copiar el enlace: ", err);
            alert("No se pudo copiar el enlace. Por favor, inténtalo de nuevo.");
        });
}
window.copiarAlPortapapeles = copiarAlPortapapeles;

actualizarURL = (function(originalActualizarURL) {
    return function() {
        originalActualizarURL();
        actualizarEnlacesDeCompartir();
    };
})(actualizarURL);

function cargarDatosDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
        const partido = partidos.find(p => partidoIds[key] === p.partido);
        if (partido) {
            partido.porcentaje = parseFloat(value);
        }
    });
}

// 5. Funciones de lógica de negocio (cálculos, redistribución, etc)
function calcularDhondt(
    partidos,
    bancasTotal,
    {
        modo = "porcentajes",
        umbralPorcentual = 0,
        totalVotos = null
    } = {}
) {
    if (!Array.isArray(partidos) || partidos.length === 0) {
        throw new Error("Debe proveer un array con partidos");
    }
    if (!Number.isInteger(bancasTotal) || bancasTotal <= 0) {
        bancasTotal = 30;
    }
    const partidosConVotos = partidos.map((p) => ({
        ...p,
        votos: modo === "porcentajes"
            ? Math.round((p.porcentaje / 100) * (totalVotos ?? (() => { throw new Error("Falta totalVotos") })()) )
            : p.votos
    }));
    const totalVotosEmitidos = partidosConVotos.reduce((sum, p) => sum + p.votos, 0);
    const umbralVotos = Math.floor(totalVotosEmitidos * (umbralPorcentual / 100));
    const partidosFiltrados = partidosConVotos.filter((p) => p.votos >= umbralVotos);
    if (partidosFiltrados.length === 0) {
        return [];
    }
    const resultado = partidosFiltrados.map((p) => ({
        partido: p.partido,
        votos: p.votos,
        porcentaje: p.porcentaje,
        bancas: 0
    }));
    const divisiones = resultado.flatMap((p, idx) =>
        Array.from({ length: bancasTotal }, (_, i) => ({
            idx,
            cociente: p.votos / (i + 1)
        }))
    );
    divisiones
        .sort((a, b) => b.cociente - a.cociente)
        .slice(0, bancasTotal)
        .forEach(({ idx }) => {
            resultado[idx].bancas++;
        });
    const totalBancasAsignadas = resultado.reduce((sum, p) => sum + p.bancas, 0);
    return resultado.map((p) => ({
        ...p,
        porcentajeBancas: (p.bancas / totalBancasAsignadas) * 100
    }));
}

function canSliderMove(index, newValue) {
    const oldValue = partidos[index].porcentaje;
    const change = oldValue - newValue;
    if (change > 0) return true;
    const unlockedTotal = partidos.reduce((sum, p, i) =>
        i !== index && !p.locked ? sum + p.porcentaje : sum, 0);
    const absChange = Math.abs(change);
    if (unlockedTotal < absChange) return false;
    return true;
}

function redistributeChange(change) {
    const unlockedSliders = partidos.filter(p => !p.locked);
    if (unlockedSliders.length === 0) return;
    const totalUnlocked = unlockedSliders.reduce((sum, p) => sum + p.porcentaje, 0);
    partidos.map(partido => {
        if (!partido.locked) {
            const proportion = partido.porcentaje / totalUnlocked;
            partido.porcentaje += change * proportion;
            return {
                ...partido,
                porcentaje: Math.max(0, Math.min(porcentajeMaximo, partido.porcentaje))
            };
        }
        return partido;
    });
    const newTotal = partidos.reduce((sum, p) => sum + p.porcentaje, 0);
    if (Math.abs(newTotal - 100) > 0.001 && unlockedSliders.length > 0) {
        const firstUnlockedIndex = partidos.findIndex(p => !p.locked);
        if (firstUnlockedIndex !== -1) {
            partidos[firstUnlockedIndex].porcentaje += (100 - newTotal);
            partidos[firstUnlockedIndex].porcentaje = Math.max(0, Math.min(porcentajeMaximo, partidos[firstUnlockedIndex].porcentaje));
        }
    }
}

// 6. Funciones de UI (sliders, visualización, actualización de valores)
function createSliders() {
    console.log("Creating sliders...");
    partidos.sort((a, b) => b.porcentaje - a.porcentaje);
    const slidersContainer = d3.select("#sliders");
    const containers = slidersContainer.selectAll(".slider-container")
        .data(partidos)
        .enter()
        .append("div")
        .attr("class", "slider-container");
    const labelContainers = containers.append("div")
        .attr("class", "slider-label");
    labelContainers.append("span")
        .style("color", d => colorPartidos(d.alineacion))
        .text(d => d.partido)
    labelContainers.append("span")
        .attr("class", "candidato-label")
        .style("color", d => colorPartidos(d.alineacion))
        .text(d => d.candidatos[0])
    containers.append("input")
        .attr("type", "range")
        .attr("class", "slider")
        .attr("min", 0)
        .attr("max", porcentajeMaximo)
        .attr("step", 0.1)
        .attr("value", d => d.porcentaje)
        .attr("id", (d, i) => `slider-${i}`)
        .on("input", function(event, d, i) {
            const index = partidos.findIndex(p => p.partido === d.partido);
            const newValue = parseFloat(this.value);
            const oldValue = partidos[index].porcentaje;
            if (canSliderMove(index, newValue)) {
                partidos[index].porcentaje = newValue;
                partidos[index].locked = true;
                updateLockIcon(index);
                redistributeChange(oldValue - newValue);
                updatePercentages();
                actualizarBancas();
                actualizarURL();
            } else {
                this.value = oldValue;
            }
        });
    containers.append("span")
        .attr("class", "lock-icon")
        .attr("id", (d, i) => `lock-${i}`)
        .html('<i class="fa-solid fa-lock"></i>')
        .on("click", (event, d, i) => {
            const index = partidos.findIndex(p => p.partido === d.partido);
            toggleLock(index);
        });
    containers.append("div")
        .attr("class", "value-display")
        .attr("id", (d, i) => `value-${i}`)
        .text(d => d.porcentaje + "%");
    partidos.forEach((partido, index) => {
        updateLockIcon(index);
        updateSliderColor(index, partido.color, partido.porcentaje);
    });
    const referenciaContainer = d3.select("#sliders").append("div")
        .attr("class", "referencia-container");
    referenciaContainer.selectAll(".referencia-item")
        .data([
                "Izquierda",
                "Peronismo",
                "Ex oficialistas",
                "Vecinal",
                "Pro",
                "Libertarios"
                ])
        .join("div")
        .attr("class", "referencia-item")
        .html(d => `
            <div style="background-color: ${colorPartidos(d)};"></div>
            <span>${d}</span>
        `);
}

function updateLockIcon(index) {
    const lockIcon = document.getElementById(`lock-${index}`);
    if (partidos[index].locked) {
        lockIcon.style.visibility = "visible";
    } else {
        lockIcon.style.visibility = "hidden";
    }
}

function updateSliderColor(index, color, porcentaje) {
    const slider = document.getElementById(`slider-${index}`);
    if (!slider) return;
    const valuePercent = (porcentaje / porcentajeMaximo) * 100;
    const totalOtherUnlocked = partidos.reduce((sum, p, i) =>
        i !== index && !p.locked ? sum + p.porcentaje : sum, 0);
    let availableSpace = totalOtherUnlocked;
    if (availableSpace <= 0) availableSpace = 0;
    const maxPossiblePercentage = porcentaje + availableSpace;
    const maxPercentInSlider = Math.min(porcentajeMaximo, maxPossiblePercentage);
    const availablePercent = (maxPercentInSlider / porcentajeMaximo) * 100;
    slider.style.background =
        `linear-gradient(to right, 
            ${color} 0%, 
            ${color} ${valuePercent}%, 
            #aaa ${valuePercent}%, 
            #aaa ${availablePercent}%, 
            #e0e0e0 ${availablePercent}%, 
            #e0e0e0 100%)`;
}

function updatePercentages() {
    d3.selectAll(".slider").each(function(d, i) {
        const index = i;
        this.value = partidos[index].porcentaje;
    });
    d3.selectAll(".value-display").each(function(d, i) {
        const index = i;
        this.textContent = partidos[index].porcentaje.toFixed(1) + "%";
    });
    partidos.forEach((partido, index) => {
        updateSliderColor(index, colorPartidos(partido.alineacion), partido.porcentaje);
    });
}

function toggleLock(index) {
    partidos[index].locked = !partidos[index].locked;
    updateLockIcon(index);
}

// 7. Funciones de inicialización y reset
function resetValues() {
    partidos.forEach((partido) => {
        const inicial = initialValues.find(iv => iv.partido === partido.partido);
        if (inicial) {
            partido.porcentaje = inicial.porcentaje;
            partido.locked = false;
        }
    });
    history.replaceState(null, "", window.location.pathname);
    d3.selectAll(".slider").each(function(d, i) {
        this.value = partidos[i].porcentaje;
    });
    d3.selectAll(".value-display").each(function(d, i) {
        this.textContent = partidos[i].porcentaje.toFixed(1) + "%";
    });
    partidos.forEach((partido, index) => {
        updateLockIcon(index);
        updateSliderColor(index, partido.color, partido.porcentaje);
    });
    updatePercentages();
    actualizarBancas();
}

function actualizarBancas() {
    const totalBancas = parseInt(document.getElementById('totalBancas').value, 10) || 30;
    const umbralPorcentual = parseFloat(document.getElementById('umbralPorcentual').value) || 0;
    const partidosParaDhondt = partidos.filter(d => d.partido != "EN BLANCO / ANULADOS").map(p => ({
        partido: p.partido,
        porcentaje: p.porcentaje,
        color: colorPartidos(p.alineacion)
    }));
    const resultado = calcularDhondt(
        partidosParaDhondt,
        totalBancas,
        {
            modo: "porcentajes",
            umbralPorcentual: umbralPorcentual,
            totalVotos: 10000
        }
    );
    resultado.sort((a, b) => b.bancas - a.bancas);
    const bancasContainer = d3.select("#bancas-resultado");
    bancasContainer.html("");
    bancasContainer.selectAll(".banca-tag")
        .data(resultado.filter(d => d.bancas > 0))
        .join("div")
        .attr("class", "banca-tag")
        .style("background-color", d => {
            const partido = partidos.find(p => p.partido === d.partido);
            return partido ? colorPartidos(partido.alineacion) : "#999";
        })
        .html(d => "<b>" + d.partido + ":</b>"+ d.bancas +" bancas");


    var bancasTotales = d3
                .rollups(
                    legislaturaCaba2025,
                    (v) => {
                    return {
                        bloque: v[0].sector,
                        actuales: v.filter((d) => !d.Renueva2025).length,
                        enJuego: v.filter((d) => d.Renueva2025).length,
                        diputadosActuales: v
                        .filter((d) => !d.Renueva2025)
                        .map((d) => {
                            return {
                            apellido: d.Apellido,
                            nombre: d.Nombre,
                            partido: d.Bloque
                            };
                        }),
                        ganadas: resultado
                        .filter((d) => queAlineacion.get(d.nombre) == v[0].sector)
                        .map((d) => {
                            return {
                            partido: d.nombre,
                            bancas: d.bancas,
                            diputados: candidatos2025
                                .filter((d) => d.estatus == "titular")
                                .filter((e) => e.partidoCorto === d.nombre)
                                .filter((e) => +e["N° DE ORDEN"] <= d.bancas)
                            };
                        })
                    };
                    },
                    (d) => d.sector
                )
                .map((d) => d[1])
    createVisualization(bancasTotales);
}

// 8. Arranque de la aplicación (init y event listener)
function init() {
    console.log("Initializing application...");
    createSliders();
    console.log("Sliders created.");
    d3.select("#resetButton").on("click", resetValues);
    console.log("Reset button handler attached.");
    d3.select("#totalBancas").on("input", actualizarBancas);
    d3.select("#umbralPorcentual").on("input", actualizarBancas);
    console.log("Input handlers for configuration attached.");
    updatePercentages();
    console.log("Percentages updated.");
    actualizarBancas();
    console.log("Initial seat distribution calculated.");
    cargarDatosDesdeURL();
    actualizarEnlacesDeCompartir();
}

init();
console.log("Application initialized.");
