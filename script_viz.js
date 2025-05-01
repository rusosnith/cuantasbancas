import { colorPartidos } from './datos.js';

// Dominio explícito de alineaciones para el orden de los stacks
export const ORDEN_ALINEACIONES = [
    "Izquierda",
    "Peronismo",
    "Ex oficialistas",
    "Vecinal",
    "Pro",
    "Libertarios"
];

// Función para preprocesar los datos
function processData(data) {
    return data.map(bloque => {
        // Procesar las bancas no en juego
        const bancasNoEnJuego = bloque.actuales - bloque.enJuego;
        const diputadosNoEnJuego = bloque.diputadosActuales.map(dip => ({
            tipo: "actual",
            dataDiputado: {
                apellido: dip.apellido.toUpperCase(),
                nombre: dip.nombre,
                partido: dip.partido
            },
            color: colorPartidos(bloque.bloque),
        }));

        // Procesar las bancas ganadas
        const diputadosGanados = bloque.ganadas.flatMap(partido =>
            partido.diputados.map(dip => ({
                tipo: "ganada",
                dataDiputado: {
                    apellido: dip.apellido.toUpperCase(),
                    nombre: dip.nombre,
                    partido: partido.partido
                },
                color: colorPartidos(bloque.bloque),
            }))
        );

        return {
            bloque: bloque.bloque,
            diputados: [...diputadosNoEnJuego, ...diputadosGanados],
            totalBancas: diputadosNoEnJuego.length + diputadosGanados.length,
            bancasGanadas: diputadosGanados.length,
            enJuego: bloque.enJuego,
        };
    });
}

// Función unificada para crear y actualizar la visualización
export function createVisualization(currentData) {
    // Preprocesar los datos
    const processedData = processData(currentData);
    
    // Ordenar los bloques según el dominio explícito
    processedData.sort((a, b) => 
        ORDEN_ALINEACIONES.indexOf(a.bloque) - ORDEN_ALINEACIONES.indexOf(b.bloque)
    );
    
    const container = d3.select("#chart-container");


    // Actualizar los bloques
    const bloques = container.selectAll(".bloque")
        .data(processedData);

    // ---- ENTER: Nuevos bloques ----
    const bloquesEnter = bloques.enter()
        .append("div")
        .attr("class", "bloque")
        .attr("id", d => `bloque-${d.bloque.replace(/\s+/g, '-').toLowerCase()}`);

    // Crear la estructura interna de los nuevos bloques
    const stacksEnter = bloquesEnter.append("div")
        .attr("class", "stack")
        .attr("id", d => `stack-${d.bloque.replace(/\s+/g, '-').toLowerCase()}`);

    const labelsEnter = bloquesEnter.append("div")
        .attr("class", "label")
        .attr("id", d => `label-${d.bloque.replace(/\s+/g, '-').toLowerCase()}`);

    // ---- MERGE: Actualizar bloques existentes y nuevos ----
    const bloquesMerge = bloques.merge(bloquesEnter);
    
    // ---- Actualizar stacks y bancas ----
    // Crear una función para procesar los datos de diputados
    const processDiputados = d => {
        // Añadir el índice del último diputado "actual" a los datos
        const lastActualIdx = d.diputados.reduce((lastIdx, diputado, idx) => 
            diputado.tipo === "actual" ? idx : lastIdx, -1);
            
        // Añadimos esta propiedad para usarla al asignar clases
        return d.diputados.map((diputado, idx) => ({
            ...diputado,
            isLastActual: diputado.tipo === "actual" && idx === lastActualIdx
        }));
    };
    
    // Actualizar todas las bancas en una sola operación sin .each()
    bloquesMerge.each(d => d.processedDiputados = processDiputados(d));
    
    // Seleccionar todos los stacks como una variable reutilizable
    const stacksMerge = bloquesMerge.select(".stack");
    const labelsMerge = bloquesMerge.select(".label");
    
    // Hacer join con los datos procesados
    const bancas = stacksMerge.selectAll(".banca")
        .data(d => d.processedDiputados);
        
    // ENTER: Crear bancas nuevas
    bancas.enter()
        .append("div")
        .attr("class", d => {
            let baseClass = "banca " + d.tipo;
            if (d.isLastActual) baseClass += " banca-actual-top";
            return baseClass;
        })
        .merge(bancas) // MERGE: Actualizar bancas existentes y nuevas
        .style("background-color", d => d.color)
        .style("opacity", d => d.opacity)
        .text(d => d.dataDiputado.apellido)
        .attr("title", d => 
            `${d.dataDiputado.apellido}, ${d.dataDiputado.nombre} - ${d.dataDiputado.partido}`
        );
        
    // EXIT: Eliminar bancas que ya no existen
    bancas.exit().remove();
    
    // Actualizar etiquetas para todos los bloques usando la variable definida
    labelsMerge.html(d => {
        return `<span class="title">${d.bloque}</span>` +
            `<div class="metricas-flex">` +
            `<span class="metrica-item"><i class=\"fa-solid fa-chair\"></i> ${d.totalBancas}</span>` +
            `<span class="metrica-item"><i class=\"fa-solid fa-recycle\"></i> ${d.enJuego}</span>` +
            `<span class="metrica-item"><i class=\"fa-solid fa-trophy\"></i> ${d.bancasGanadas}</span>` +
            `</div>`;
    });

    // ---- EXIT: Eliminar bloques que ya no existen ----
    bloques.exit().remove();
}
