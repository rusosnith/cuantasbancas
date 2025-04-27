// Datos iniciales de los partidos
const partidos = [
    { partido: "UCeDe", color: "#FF0000", porcentaje: 25, locked: false },
    { partido: "LA IZQUIERDA EN LA CIUDAD", color: "#0000FF", porcentaje: 18, locked: false },
    { partido: "EVOLUCIÓN", color: "#00FF00", porcentaje: 12, locked: false },
    { partido: "EL MOVIMIENTO", color: "#FFFF00", porcentaje: 10, locked: false },
    { partido: "C. CIVICA - ARI", color: "#FF00FF", porcentaje: 8, locked: false },
    { partido: "SEAMOS LIBRES", color: "#00FFFF", porcentaje: 7, locked: false },
    { partido: "VOLVAMOS BUENOS AIRES", color: "#FFA500", porcentaje: 6, locked: false },
    { partido: "FIT - UNIDAD", color: "#800080", porcentaje: 5, locked: false },
    { partido: "FRENTE PATRIOTA FEDERAL", color: "#008000", porcentaje: 5, locked: false },
    { partido: "LA LIBERTAD AVANZA", color: "#800000", porcentaje: 4, locked: false },
    { partido: "BUENOS AIRES PRIMERO", color: "#800000", porcentaje: 4, locked: false },
    { partido: "PRINCIPIOS Y VALORES", color: "#800000", porcentaje: 4, locked: false },
    { partido: "CONFLUENCIA", color: "#800000", porcentaje: 4, locked: false },
    { partido: "UNION PORTEÑA LIBERTARIA", color: "#800000", porcentaje: 4, locked: false },
    { partido: "M.I.D", color: "#800000", porcentaje: 4, locked: false },
    { partido: "MOVIMIENTO PLURAL", color: "#800000", porcentaje: 4, locked: false },
    { partido: "EN BLANCO / ANULADOS", color: "#800000", porcentaje: 4, locked: false }
];

// Guardar los valores iniciales para poder restablecerlos
const initialValues = partidos.map(p => ({ porcentaje: p.porcentaje, locked: p.locked }));

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
        nombre: p.nombre,
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
    const partidosParaDhondt = partidos.filter(d=>d.nombre != "EN BLANCO / ANULADOS").map(p => ({
        nombre: p.nombre,
        porcentaje: p.porcentaje,
        color: p.color
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
    
    // Mostrar resultados
    const bancasContainer = d3.select("#bancas-resultado");
    bancasContainer.html(""); // Limpiar contenedor
    
    // Crear elementos para cada partido con bancas
    bancasContainer.selectAll(".banca-tag")
        .data(resultado)
        .enter()
        .append("div")
        .attr("class", "banca-tag")
        .style("background-color", d => {
            // Buscar el color original del partido
            const partido = partidos.find(p => p.name === d.nombre);
            return partido ? partido.color : "#999";
        })
        .text(d => `${d.nombre}: ${d.bancas} bancas`);
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
        .style("color", d => d.color)
        .text(d => d.name);
    
    // Añadir iconos de candado
    const lockIcons = labelContainers.append("span")
        .attr("class", "lock-icon")
        .attr("id", (d, i) => `lock-${i}`)
        .html('<i class="fa-solid fa-lock"></i>')
        .on("click", (event, d, i) => {
            // Obtener el índice del dataset original
            const index = partidos.findIndex(p => p.name === d.name);
            toggleLock(index);
        });
    
    // Añadir sliders
    containers.append("input")
        .attr("type", "range")
        .attr("class", "slider")
        .attr("min", 0)
        .attr("max", 50)
        .attr("step", 0.1)
        .attr("value", d => d.percentage)
        .attr("id", (d, i) => `slider-${i}`)
        .on("input", function(event, d, i) {
            const index = partidos.findIndex(p => p.name === d.name);
            const newValue = parseFloat(this.value);
            const oldValue = partidos[index].percentage;
            
            // Verificar si podemos mover este slider sin romper el total
            if (canSliderMove(index, newValue)) {
                partidos[index].percentage = newValue;
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
        .text(d => d.percentage + "%");
    
    // Inicializar los iconos de candado y colores de slider
    partidos.forEach((partido, index) => {
        updateLockIcon(index);
        updateSliderColor(index, partido.color, partido.percentage);
    });
}

// Verificar si un slider puede moverse a un nuevo valor sin romper el total
function canSliderMove(index, newValue) {
    const oldValue = partidos[index].percentage;
    const change = oldValue - newValue;
    
    // Si es una reducción, siempre se puede (los otros aumentarán)
    if (change > 0) return true;
    
    // Si es un aumento, necesitamos verificar que los sliders desbloqueados
    // puedan reducirse lo suficiente para compensar
    const unlockedTotal = partidos.reduce((sum, p, i) =>
        i !== index && !p.locked ? sum + p.percentage : sum, 0);
    
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
    const totalUnlocked = unlockedSliders.reduce((sum, p) => sum + p.percentage, 0);
    
    // Actualizar los porcentajes de los sliders no bloqueados
    partidos.map(partido => {
        if (!partido.locked) {
            const proportion = partido.percentage / totalUnlocked;
            partido.percentage += change * proportion;
            
            // Asegurar que está dentro de los límites
            return {
                ...partido,
                percentage: Math.max(0, Math.min(50, partido.percentage))
            };
        }
        return partido;
    });
    
    // Verificar si necesitamos ajustar para obtener exactamente 100%
    const newTotal = partidos.reduce((sum, p) => sum + p.percentage, 0);
    
    if (Math.abs(newTotal - 100) > 0.001 && unlockedSliders.length > 0) {
        // Encontrar el primer slider desbloqueado para ajustar
        const firstUnlockedIndex = partidos.findIndex(p => !p.locked);
        if (firstUnlockedIndex !== -1) {
            partidos[firstUnlockedIndex].percentage += (100 - newTotal);
            partidos[firstUnlockedIndex].percentage = Math.max(0, Math.min(50, partidos[firstUnlockedIndex].percentage));
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
function updateSliderColor(index, color, percentage) {
    const slider = document.getElementById(`slider-${index}`);
    if (!slider) return;
    
    const valuePercent = (percentage / 50) * 100; // Convertir al porcentaje del rango del slider
    
    // Calcular el espacio disponible (lo que se puede aumentar)
    const totalOtherUnlocked = partidos.reduce((sum, p, i) =>
        i !== index && !p.locked ? sum + p.percentage : sum, 0);
    
    // Si no hay sliders desbloqueados, el espacio disponible es 0
    let availableSpace = totalOtherUnlocked;
    if (availableSpace <= 0) availableSpace = 0;
    
    // Calcular el porcentaje máximo que podría alcanzar este slider
    const maxPossiblePercentage = percentage + availableSpace;
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
        this.value = partidos[index].percentage;
    });
    
    // Actualizar todos los displays de valores
    d3.selectAll(".value-display").each(function(d, i) {
        const index = i;
        this.textContent = partidos[index].percentage.toFixed(1) + "%";
    });
    
    // Actualizar los colores de los sliders
    partidos.forEach((partido, index) => {
        updateSliderColor(index, partido.color, partido.percentage);
    });
    
    // Mostrar el total
    const total = partidos.reduce((sum, partido) => sum + partido.percentage, 0);
    d3.select("#totalPercentage").text(total.toFixed(1));
}

// Restablecer valores iniciales
function resetValues() {
    partidos.forEach((partido, index) => {
        partido.percentage = initialValues[index].percentage;
        partido.locked = initialValues[index].locked;
    });
    
    d3.selectAll(".slider").each(function(d, i) {
        this.value = partidos[i].percentage;
    });
    
    d3.selectAll(".value-display").each(function(d, i) {
        this.textContent = partidos[i].percentage + "%";
    });
    
    partidos.forEach((partido, index) => {
        updateLockIcon(index);
        updateSliderColor(index, partido.color, partido.percentage);
    });
    
    // Actualizar el total
    const total = partidos.reduce((sum, partido) => sum + partido.percentage, 0);
    d3.select("#totalPercentage").text(total.toFixed(1));
    
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
    
    // Calcular distribución inicial de bancas
    actualizarBancas();
}

// Iniciar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", init);