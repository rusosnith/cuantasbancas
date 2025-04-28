// Datos iniciales con apellidos de diputados



 let currentData = [
    {
        bloque: "Peronismo",
        actuales: 10,
        enJuego: 4,
        diputadosActuales: ["González", "Fernández", "Rodríguez", "López", "Martínez", "Sánchez", "Gómez", "Díaz", "Torres", "Ramírez"],
        ganadas: [
            { 
                partido: "ES AHORA BUENOS AIRES", 
                bancas: 5,
                diputados: ["Pérez", "Acosta", "Hernández", "Suárez", "García"]
            },
            { 
                partido: "PRINCIPIOS Y VALORES", 
                bancas: 3,
                diputados: ["Romero", "Benítez Larguísimo", "Castro"]
            }
        ]
    },
    {
        bloque: "UCR",
        actuales: 8,
        enJuego: 3,
        diputadosActuales: ["Álvarez", "Vázquez", "Molina", "Gutiérrez", "Flores", "Rojas", "Mendoza", "Ortega"],
        ganadas: [
            { 
                partido: "JUNTOS POR EL CAMBIO", 
                bancas: 4,
                diputados: ["Silva", "Luna", "Cabrera", "Morales"]
            }
        ]
    },
    {
        bloque: "PRO",
        actuales: 9,
        enJuego: 4,
        diputadosActuales: ["Ríos", "Moreno", "Ortiz", "Franco", "Giménez", "Domínguez", "Navarro", "Aguilar", "Herrera"],
        ganadas: [
            { 
                partido: "PROPUESTA REPUBLICANA", 
                bancas: 5,
                diputados: ["Medina", "Ramos", "Vargas", "Arias", "Reyes"]
            },
            { 
                partido: "JUNTOS", 
                bancas: 2,
                diputados: ["Cruz", "Peralta"]
            }
        ]
    },
    {
        bloque: "Izquierda",
        actuales: 5,
        enJuego: 2,
        diputadosActuales: ["Maldonado", "Castillo", "Aguirre", "Miranda", "Carrasco"],
        ganadas: [
            { 
                partido: "FRENTE DE IZQUIERDA", 
                bancas: 3,
                diputados: ["Figueroa", "Delgado", "Concepción García Márquez Del Alto Valle"]
            }
        ]
    }
];

// Datos alternativos para simular actualización
const alternativeData = [
    {
        bloque: "Peronismo",
        actuales: 10,
        enJuego: 4,
        diputadosActuales: ["González", "Fernández", "Rodríguez", "López", "Martínez", "Sánchez", "Gómez", "Díaz", "Torres", "Ramírez"],
        ganadas: [
            { 
                partido: "ES AHORA BUENOS AIRES", 
                bancas: 3,
                diputados: ["Pérez", "Acosta", "Hernández"]
            },
            { 
                partido: "PRINCIPIOS Y VALORES", 
                bancas: 6,
                diputados: ["Romero", "Benítez Larguísimo", "Castro", "Álvarez", "Rojas", "Ortiz"]
            }
        ]
    },
    {
        bloque: "UCR",
        actuales: 8,
        enJuego: 3,
        diputadosActuales: ["Álvarez", "Vázquez", "Molina", "Gutiérrez", "Flores", "Rojas", "Mendoza", "Ortega"],
        ganadas: [
            { 
                partido: "JUNTOS POR EL CAMBIO", 
                bancas: 6,
                diputados: ["Silva", "Luna", "Cabrera", "Morales", "Jiménez", "Paredes"]
            }
        ]
    },
    {
        bloque: "PRO",
        actuales: 9,
        enJuego: 4,
        diputadosActuales: ["Ríos", "Moreno", "Ortiz", "Franco", "Giménez", "Domínguez", "Navarro", "Aguilar", "Herrera"],
        ganadas: [
            { 
                partido: "PROPUESTA REPUBLICANA", 
                bancas: 2,
                diputados: ["Medina", "Ramos"]
            },
            { 
                partido: "JUNTOS", 
                bancas: 1,
                diputados: ["Cruz"]
            }
        ]
    },
    {
        bloque: "Izquierda",
        actuales: 5,
        enJuego: 2,
        diputadosActuales: ["Maldonado", "Castillo", "Aguirre", "Miranda", "Carrasco"],
        ganadas: [
            { 
                partido: "FRENTE DE IZQUIERDA", 
                bancas: 5,
                diputados: ["Figueroa", "Delgado", "Rodríguez", "López", "García"]
            }
        ]
    }
];

// Configuración de colores para los bloques
const colorScale = d3.scaleOrdinal()
    .domain(currentData.map(d => d.bloque))
    .range(d3.schemeCategory10);

// Función para preprocesar los datos
function processData(data) {
    return data.map(bloque => {
        // Procesar las bancas no en juego
        const bancasNoEnJuego = bloque.actuales - bloque.enJuego;
        const diputadosNoEnJuego = bloque.diputadosActuales.slice(0, bancasNoEnJuego).map(apellido => ({
            tipo: "actual",
            apellido: apellido,
            color: colorScale(bloque.bloque),
            opacity: 0.5,
            title: apellido
        }));
        
        // Procesar las bancas ganadas
        const diputadosGanados = bloque.ganadas.flatMap(partido => 
            partido.diputados.map(apellido => ({
                tipo: "ganada",
                apellido: apellido,
                color: colorScale(bloque.bloque),
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
function createVisualization() {
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
        .attr("class", "stack")
        .attr("id", d => `stack-${d.bloque.replace(/\s+/g, '-').toLowerCase()}`);
    
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
        .style("background-color", d => colorScale(d.bloque));
    
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


// Inicializar visualización
createVisualization();

// Evento para actualizar datos
d3.select("#update-btn").on("click", function() {
    currentData = currentData === alternativeData ? 
        [
            {
                bloque: "Peronismo",
                actuales: 10,
                enJuego: 4,
                diputadosActuales: ["González", "Fernández", "Rodríguez", "López", "Martínez", "Sánchez", "Gómez", "Díaz", "Torres", "Ramírez"],
                ganadas: [
                    { 
                        partido: "ES AHORA BUENOS AIRES", 
                        bancas: 5,
                        diputados: ["Pérez", "Acosta", "Hernández", "Suárez", "García"]
                    },
                    { 
                        partido: "PRINCIPIOS Y VALORES", 
                        bancas: 3,
                        diputados: ["Romero", "Benítez Larguísimo", "Castro"]
                    }
                ]
            },
            {
                bloque: "UCR",
                actuales: 8,
                enJuego: 3,
                diputadosActuales: ["Álvarez", "Vázquez", "Molina", "Gutiérrez", "Flores", "Rojas", "Mendoza", "Ortega"],
                ganadas: [
                    { 
                        partido: "JUNTOS POR EL CAMBIO", 
                        bancas: 4,
                        diputados: ["Silva", "Luna", "Cabrera", "Morales"]
                    }
                ]
            },
            {
                bloque: "PRO",
                actuales: 9,
                enJuego: 4,
                diputadosActuales: ["Ríos", "Moreno", "Ortiz", "Franco", "Giménez", "Domínguez", "Navarro", "Aguilar", "Herrera"],
                ganadas: [
                    { 
                        partido: "PROPUESTA REPUBLICANA", 
                        bancas: 5,
                        diputados: ["Medina", "Ramos", "Vargas", "Arias", "Reyes"]
                    },
                    { 
                        partido: "JUNTOS", 
                        bancas: 2,
                        diputados: ["Cruz", "Peralta"]
                    }
                ]
            },
            {
                bloque: "Izquierda",
                actuales: 5,
                enJuego: 2,
                diputadosActuales: ["Maldonado", "Castillo", "Aguirre", "Miranda", "Carrasco"],
                ganadas: [
                    { 
                        partido: "FRENTE DE IZQUIERDA", 
                        bancas: 3,
                        diputados: ["Figueroa", "Delgado", "Concepción García Márquez Del Alto Valle"]
                    }
                ]
            }
        ] : alternativeData;
    
    updateVisualization(currentData);
});