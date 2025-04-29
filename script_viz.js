import { colorPartidos } from './datos.js';

// Función para preprocesar los datos
function processData(data) {



    return data.map(bloque => {
        // Procesar las bancas no en juego
        const bancasNoEnJuego = bloque.actuales - bloque.enJuego;
        const diputadosNoEnJuego = bloque.diputadosActuales.slice(0, bancasNoEnJuego).map(apellido => ({
            tipo: "actual",
            apellido: apellido,
            color: colorPartidos(bloque.bloque),
            opacity: 0.5,
            title: apellido
        }));
        
        // Procesar las bancas ganadas
        const diputadosGanados = bloque.ganadas.flatMap(partido => 
            partido.diputados.map(apellido => ({
                tipo: "ganada",
                apellido: apellido,
                color: colorPartidos(bloque.bloque),
                opacity: 1,
                partido: partido.partido,
                title: `${apellido} - ${partido.partido}`
            }))
        );
        
        return {
            bloque: bloque.bloque,
            diputados: [...diputadosNoEnJuego, ...diputadosGanados],
            totalBancas: bancasNoEnJuego + diputadosGanados.length,
            bancasGanadas: diputadosGanados.length
        };
    });
}

// Crear la visualización inicial
export function createVisualization(currentData) {
    // Preprocesar los datos
    const processedData = processData(currentData);
    const container = d3.select("#chart-container");
    
    // Crear grupos para cada bloque
    const bloques = container.selectAll(".bloque")
        .data(processedData)
        .join("div")
        .attr("class", "bloque")
        .attr("id", d => `bloque-${d.bloque.replace(/\s+/g, '-').toLowerCase()}`);
    
    // Añadir stacks para cada bloque
    const stacks = bloques.append("div")
        .attr("class", "stack");
       // .attr("id", d => `stack-${d.bloque.replace(/\s+/g, '-').toLowerCase()}`);
    
    // Crear bancas dentro de cada stack
    stacks.each(function(d) {
        const stack = d3.select(this);
        
        updateBancas(stack, d.diputados);
    });
    
    // Añadir etiquetas para cada bloque
    var etiquetasBloques = bloques.append("div")
        .attr("class", "label")
        .attr("id", d => `label-${d.bloque.replace(/\s+/g, '-').toLowerCase()}`)
        .html(d => `<span>${d.bloque}</span> <span>${d.totalBancas} bancas</span><span>(suma ${(d.bancasGanadas)}) </span>`);
    
    // Crear la leyenda
    createLegend(processedData);
}

// Función para actualizar las bancas
function updateBancas(stack, diputados) {
    // Join para las bancas
    const bancas = stack.selectAll(".banca")
        .data(diputados, (d, i) => `${d.tipo}-${d.apellido}-${i}`);
    
    // Enter: nuevas bancas
    bancas.enter()
        .append("div")
        .attr("class",d => "banca" + " " + ( d.tipo))
        .style("background-color", d => d.color)
        .text(d => d.apellido)
        .attr("title", d => d.title);
    
    // Update: bancas existentes
    bancas
        .style("background-color", d => d.color)
        .text(d => d.apellido)
        .attr("title", d => d.title);
    
    // Exit: eliminar bancas que ya no existen
    bancas.exit()
        .remove();
}

// Función para crear la leyenda
function createLegend(data) {
    const legend = d3.select("#legend");
    
    // Crear elementos de leyenda para cada bloque
    const legendItems = legend.selectAll(".legend-item")
        .data(data, d => d.bloque)
        .enter()
        .append("div")
        .attr("class", "legend-item");
    
    legendItems.append("div")
        .attr("class", "legend-color")
        .style("background-color", d => colorPartidos(d.bloque));
    
    legendItems.append("span")
        .text(d => d.bloque);
}

// Función para actualizar la visualización
function updateVisualization(newData) {
    const processedData = processData(newData);
    const container = d3.select("#chart-container");
    
    // Actualizar los bloques
    const bloques = container.selectAll(".bloque")
        .data(processedData, d => d.bloque);
    
        
    // Para cada bloque, actualizar sus bancas
    bloques.each(function(d) {
        const bloque = d3.select(this);
        const stack = bloque.select(".stack");
        
        // Actualizar las bancas
        updateBancas(stack, d.diputados);
        
        // Actualizar la etiqueta
        bloque.select(".label")
            .text(`${d.bloque} (${d.totalBancas} bancas)`);
    });
}

