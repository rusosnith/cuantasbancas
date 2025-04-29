console.log("Script loaded: datos.js");

export const colorPartidos = d3
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

// Function to load legislators from CSV
export async function loadLegislatorsFromCSV() {
    console.log("Loading legislators from CSV...");
    const data = await d3.csv("LEgislatura CABA - legis2025_compatible.csv");
    return data.map(row => ({
        apellido: row.Apellido,
        nombre: row.Nombre,
        partido: row.Bloque,
        alineacion: row.sector,
        renueva: row.Renueva2025 === "1"
    }));
}

export const legislaturaCaba2025 = await loadLegislatorsFromCSV();

// Function to load candidaturas from CSV
export async function loadCandidatosFromCSV() {
    console.log("Loading Candidatos from CSV...");
    const data = await d3.csv("candidatos2025Export.csv");
    return data.map(row => ({
        apellido: row.apellido,
        nombre: row.nombre,
        partido: row.partidoCorto,
        alineacion: row.alineacion,
        orden: +row.orden
    }));
}


export const candidatos2025 = await loadCandidatosFromCSV();

export var queAlineacion = d3.rollup(
    candidatos2025,
    (v) => v[0].alineacion,
    (d) => d.partido
  )


// Datos de los partidos políticos
export const partidos = [
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
        "porcentaje": 5,
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
        "porcentaje": 8,
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
        "porcentaje": 4,
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
        "porcentaje": 5,
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
        "porcentaje": 1,
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
        "porcentaje": 1,
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
        "porcentaje": 20,
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
        "porcentaje": 1,
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
        "porcentaje": 6,
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
        "porcentaje": 20,
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
        "porcentaje": 2,
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
        "porcentaje": 2,
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
        "porcentaje": 20,
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
    // Agregar al final el partido de voto en blanco
    {
        "partido": "EN BLANCO / ANULADOS",
        "partidoOrig": "EN BLANCO / ANULADOS",
        "alineacion": "Voto en blanco",
        "candidatos": ["-"],
        "porcentaje": 1,
        "locked": false,
        "color": "#bbb"
    }
];


// Diccionario de IDs y partidos inventados
export const partidoIds = {
    "p1": "EVOLUCIÓN",
    "p2": "VOLVAMOS BUENOS AIRES",
    "p3": "COALICIÓN CIVICA - ARI",
    "p4": "FIT - UNIDAD",
    "p5": "LA IZQUIERDA EN LA CIUDAD",
    "p6": "UNION PORTEÑA LIBERTARIA",
    "p7": "LA LIBERTAD AVANZA",
    "p8": "M.I.D",
    "p9": "MOVIMIENTO PLURAL",
    "p10": "UCeDe",
    "p11": "EL MOVIMIENTO",
    "p12": "ES AHORA BUENOS AIRES",
    "p13": "PRINCIPIOS Y VALORES",
    "p14": "SEAMOS LIBRES",
    "p15": "BUENOS AIRES PRIMERO",
    "p16": "CONFLUENCIA",
    "p17": "FRENTE PATRIOTA FEDERAL",
    "p18": "EN BLANCO / ANULADOS"
};