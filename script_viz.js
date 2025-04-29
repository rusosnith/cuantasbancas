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
            bancasGanadas: diputadosGanados.length
        };
    });
}

// Función unificada para crear y actualizar la visualización
export function createVisualization(currentData) {
    // Preprocesar los datos
    const processedData = processData(currentData);
    // Ordenar los bloques según el dominio explícito
    processedData.sort((a, b) => ORDEN_ALINEACIONES.indexOf(a.bloque) - ORDEN_ALINEACIONES.indexOf(b.bloque));
    const container = d3.select("#chart-container");

    // Actualizar los bloques
    const bloques = container.selectAll(".bloque")
        .data(processedData, d => d.bloque);

    // Enter: Nuevos bloques
    const bloquesEnter = bloques.enter()
        .append("div")
        .attr("class", "bloque")
        .attr("id", d => `bloque-${d.bloque.replace(/\s+/g, '-').toLowerCase()}`);

    bloquesEnter.append("div")
        .attr("class", "stack")
        .attr("id", d => `stack-${d.bloque.replace(/\s+/g, '-').toLowerCase()}`);

    bloquesEnter.append("div")
        .attr("class", "label")
        .attr("id", d => `label-${d.bloque.replace(/\s+/g, '-').toLowerCase()}`);

    // Update + Enter
    const bloquesMerge = bloques.merge(bloquesEnter);

    // Actualizar las bancas en cada bloque
    bloquesMerge.each(function (d) {
        const bloque = d3.select(this);
        const stack = bloque.select(".stack");

        // Identificar índices de las bancas actuales
        const diputados = d.diputados;
        let lastActualIdx = -1;
        for (let i = 0; i < diputados.length; i++) {
            if (diputados[i].tipo === "actual") lastActualIdx = i;
        }

        // Update bancas
        const bancas = stack.selectAll(".banca")
            .data(diputados);

        // Enter: nuevas bancas
        bancas.enter()
            .append("div")
            .attr("class", (b, i) => {
                let base = "banca " + b.tipo;
                if (b.tipo === "actual" && i === lastActualIdx) base += " banca-actual-top";
                return base;
            })
            .merge(bancas)
            .style("background-color", b => b.color)
            .style("opacity", b => b.opacity)
            .text(b => b.dataDiputado.apellido)
            .attr("title", b => `${b.dataDiputado.apellido}, ${b.dataDiputado.nombre} - ${b.dataDiputado.partido}`);

        // Exit: eliminar bancas que ya no existen
        bancas.exit().remove();

        // Actualizar etiqueta
        bloque.select(".label")
            .html(d => `<span>${d.bloque}</span> <span>${d.totalBancas} bancas</span><span>(suma ${d.bancasGanadas}) </span>`);
    });

    // Exit: eliminar bloques que ya no existen
    bloques.exit().remove();
}

