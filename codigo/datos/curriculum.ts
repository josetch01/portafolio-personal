// Archivo de datos 100% en español extraído fielmente del CV de José María Torres Chirinos

export interface TecnologiaItem {
  nombre: string;
  icono?: string;
  nivel?: string;
}

export interface CategoriaCompetencia {
  id: 'frontend' | 'backend' | 'datos' | 'nube' | 'automatizacion';
  titulo: string;
  subtitulo: string;
  descripcion: string;
  paletaPanel: 'arena' | 'cielo' | 'salvia' | 'pintura' | 'obsidiana';
  imagenFondo: string;
  tecnologias: TecnologiaItem[];
  metricaDestacada: {
    valor: string;
    etiqueta: string;
  };
}

export interface CasoSolucion {
  id: string;
  categoria: string;
  titulo: string;
  cliente: string;
  periodo: string;
  ubicacion: string;
  descripcion: string;
  impactoTecnico: string;
  imagenEditorial: string;
  paletaPanel: 'arena' | 'cielo' | 'salvia' | 'pintura';
  tipoFragmento: 'revision-codigo' | 'flujo-ci' | 'analitica-saas' | 'chat-whatsapp' | 'geolocalizacion' | 'expedientes-crm';
  tecnologias: TecnologiaItem[];
  fragmentoDatos: {
    archivoRuta: string;
    estado: string;
    metricaPrincipal: string;
    lineasCodigo?: { tipo: 'contexto' | 'eliminado' | 'agregado'; texto: string }[];
    pasosPipeline?: { nombre: string; icono: string; tiempo: string; estado: 'completado' | 'activo' }[];
    metricasBarras?: { etiqueta: string; porcentaje: number; valor: string }[];
  };
}

export interface ExperienciaLaboral {
  id: string;
  cargo: string;
  empresa: string;
  ubicacion: string;
  periodo: string;
  esActual: boolean;
  etiquetasFiltro: ('react-angular' | 'java-spring' | 'python-django' | 'php-laravel' | 'cloud-devops')[];
  logros: string[];
  tecnologias: TecnologiaItem[];
}

export interface CertificacionItem {
  titulo: string;
  institucion: string;
  periodo: string;
  insignia: string;
  destacada?: boolean;
}

export const DATOS_PERFIL = {
  nombreCompleto: 'José María Torres Chirinos',
  nombreCorto: 'José Torres',
  rolPrincipal: 'Desarrollador Full Stack & Frontend',
  gradoAcademico: 'Bachiller en Ingeniería de Sistemas',
  empresaActual: 'NGR S.A.C',
  ubicacion: 'Perú',
  telefono: '923945382',
  telefonoFormato: '+51 923 945 382',
  whatsappUrl: 'https://wa.me/51923945382',
  correoPrincipal: 'josetorchi@gmail.com',
  correoSecundario: 'jmtch_01@hotmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/josetorreschirinos',
  linkedinUsuario: 'linkedin.com/in/josetorreschirinos',
  cvUrl: '/recursos/cv-jose-torres.pdf',
  resumenEjecutivo:
    'Bachiller en Ingeniería de Sistemas y Desarrollador Full Stack y Frontend con sólida experiencia en el diseño, desarrollo y mantenimiento de aplicaciones web, sistemas empresariales y plataformas CRM. Especialista en interfaces dinámicas con React, Angular y TypeScript, integradas con arquitecturas backend en Java (Spring Boot), Python (Django), PHP (Laravel) y Node.js sobre infraestructuras cloud (AWS, GCP y Microsoft Azure).',
  metricasHero: [
    { valor: '4+ Años', etiqueta: 'Trayectoria en Ingeniería de Software' },
    { valor: '10', etiqueta: 'Experiencias Corporativas en Perú' },
    { valor: '3 Nubes', etiqueta: 'AWS · Google Cloud · Azure' },
    { valor: 'SMPC®', etiqueta: 'Scrum Master Professional Certificado' },
  ],
};

export const CATEGORIAS_COMPETENCIAS: CategoriaCompetencia[] = [
  {
    id: 'frontend',
    titulo: 'Ingeniería Frontend & Sistemas UI',
    subtitulo: 'Interfaces Reactivas y Componentes Modulares',
    descripcion:
      'Construcción de aplicaciones SPA dinámicas, sistemas de diseño con componentes reutilizables, tipado estricto y rendimiento a 60fps adaptados a cualquier dispositivo.',
    paletaPanel: 'cielo',
    imagenFondo: '/recursos/imagenes/paisaje-reflejo.webp',
    metricaDestacada: {
      valor: 'SPA & SSR',
      etiqueta: 'Arquitectura de Componentes Reutilizables',
    },
    tecnologias: [
      { nombre: 'React', icono: '/recursos/iconos/react.svg' },
      { nombre: 'Angular', icono: '/recursos/iconos/angular.svg' },
      { nombre: 'TypeScript', icono: '/recursos/iconos/typescript.svg' },
      { nombre: 'JavaScript (ES6+)', icono: '/recursos/iconos/javascript.svg' },
      { nombre: 'HTML5', icono: '/recursos/iconos/html.svg' },
      { nombre: 'CSS3', icono: '/recursos/iconos/css.svg' },
      { nombre: 'Tailwind CSS', icono: '/recursos/iconos/tailwindcss.svg' },
      { nombre: 'Bootstrap', icono: '/recursos/iconos/bootstrap.svg' },
      { nombre: 'Livewire', icono: '/recursos/iconos/laravel.svg' },
      { nombre: 'WordPress', icono: '/recursos/iconos/wordpress.svg' },
    ],
  },
  {
    id: 'backend',
    titulo: 'Arquitectura Backend & APIs REST',
    subtitulo: 'Servicios Empresariales de Alta Escala',
    descripcion:
      'Diseño e integración de servicios backend robustos, plataformas SaaS multi-tenant, sistemas CRM corporativos y automatización de lógica de negocio.',
    paletaPanel: 'arena',
    imagenFondo: '/recursos/imagenes/sistemas-cloud.png',
    metricaDestacada: {
      valor: '4 Ecosistemas',
      etiqueta: 'JVM · Python · PHP · Node.js Runtime',
    },
    tecnologias: [
      { nombre: 'Java', icono: '/recursos/iconos/java.svg' },
      { nombre: 'Spring Boot', icono: '/recursos/iconos/spring.svg' },
      { nombre: 'Python', icono: '/recursos/iconos/python.svg' },
      { nombre: 'Django', icono: '/recursos/iconos/django.svg' },
      { nombre: 'PHP', icono: '/recursos/iconos/php.svg' },
      { nombre: 'Laravel', icono: '/recursos/iconos/laravel.svg' },
      { nombre: 'Node.js', icono: '/recursos/iconos/nodejs.svg' },
      { nombre: 'APIs RESTful' },
    ],
  },
  {
    id: 'datos',
    titulo: 'Bases de Datos SQL & NoSQL',
    subtitulo: 'Modelado y Optimización de Consultas',
    descripcion:
      'Diseño de esquemas relacionales y distribuidos, indexación, optimización de consultas críticas en producción y aseguramiento de integridad transaccional.',
    paletaPanel: 'salvia',
    imagenFondo: '/recursos/imagenes/paisaje-valle.webp',
    metricaDestacada: {
      valor: 'SQL + NoSQL',
      etiqueta: 'Baja Latencia & Alta Concurrencia',
    },
    tecnologias: [
      { nombre: 'SQL Server' },
      { nombre: 'PostgreSQL', icono: '/recursos/iconos/postgres.svg' },
      { nombre: 'MySQL', icono: '/recursos/iconos/mysql.svg' },
      { nombre: 'MariaDB', icono: '/recursos/iconos/mariadb.svg' },
      { nombre: 'Amazon DynamoDB', icono: '/recursos/iconos/aws.svg' },
      { nombre: 'MongoDB', icono: '/recursos/iconos/mongodb.svg' },
    ],
  },
  {
    id: 'nube',
    titulo: 'Cloud, DevOps & Servidores Linux',
    subtitulo: 'Despliegue Multi-Cloud y Alta Disponibilidad',
    descripcion:
      'Administración de servidores Ubuntu Linux, configuración de proxys inversos y balanceo de carga con NGINX, despliegues continuos en AWS, GCP y Azure.',
    paletaPanel: 'pintura',
    imagenFondo: '/recursos/imagenes/paisaje-horizonte.webp',
    metricaDestacada: {
      valor: '99.9% Uptime',
      etiqueta: 'Balanceo NGINX + Infraestructura Cloud',
    },
    tecnologias: [
      { nombre: 'Amazon Web Services (AWS)', icono: '/recursos/iconos/aws.svg' },
      { nombre: 'Google Cloud (GCP)', icono: '/recursos/iconos/google-cloud.svg' },
      { nombre: 'Microsoft Azure', icono: '/recursos/iconos/azure.svg' },
      { nombre: 'Azure DevOps', icono: '/recursos/iconos/azure.svg' },
      { nombre: 'NGINX', icono: '/recursos/iconos/nginx.svg' },
      { nombre: 'Ubuntu Server', icono: '/recursos/iconos/ubuntu.svg' },
      { nombre: 'Git', icono: '/recursos/iconos/git.svg' },
      { nombre: 'GitLab', icono: '/recursos/iconos/gitlab.svg' },
    ],
  },
  {
    id: 'automatizacion',
    titulo: 'Automatización IA & Liderazgo Scrum',
    subtitulo: 'Orquestación n8n y Gestión Ágil Certificada',
    descripcion:
      'Automatización de flujos empresariales con n8n, transcripción e inteligencia artificial, integración de WhatsApp API y liderazgo ágil Scrum Master (SMPC®).',
    paletaPanel: 'arena',
    imagenFondo: '/recursos/imagenes/paisaje-costa.webp',
    metricaDestacada: {
      valor: 'n8n + IA',
      etiqueta: 'Orquestación Autónoma & Scrum SMPC®',
    },
    tecnologias: [
      { nombre: 'n8n Workflows', icono: '/recursos/iconos/n8n.svg' },
      { nombre: 'WhatsApp API', icono: '/recursos/iconos/whatsapp.svg' },
      { nombre: 'Scrum Master (SMPC®)' },
      { nombre: 'Análisis Técnico' },
      { nombre: 'Levantamiento de Requerimientos' },
      { nombre: 'Control de Calidad (QA)' },
    ],
  },
];

export const CASOS_SOLUCIONES: CasoSolucion[] = [
  {
    id: 'ngr-corporativo',
    categoria: 'Arquitectura Multi-Cloud & Optimización de Datos',
    titulo: 'Plataformas Corporativas Full Stack & Optimización SQL / DynamoDB',
    cliente: 'NGR S.A.C',
    periodo: 'Sep. 2025 – Actualidad',
    ubicacion: 'Perú',
    descripcion:
      'Análisis técnico, levantamiento de requerimientos y evolución Full Stack de aplicaciones corporativas críticas integradas mediante APIs REST sobre AWS y Google Cloud Platform.',
    impactoTecnico:
      'Optimización de consultas complejas en motores SQL y NoSQL (Amazon DynamoDB), elevando el rendimiento, estabilidad y escalabilidad postproducción.',
    imagenEditorial: '/recursos/imagenes/sistemas-cloud.png',
    paletaPanel: 'cielo',
    tipoFragmento: 'revision-codigo',
    tecnologias: [
      { nombre: 'React', icono: '/recursos/iconos/react.svg' },
      { nombre: 'Angular', icono: '/recursos/iconos/angular.svg' },
      { nombre: 'Java', icono: '/recursos/iconos/java.svg' },
      { nombre: 'Node.js', icono: '/recursos/iconos/nodejs.svg' },
      { nombre: 'AWS', icono: '/recursos/iconos/aws.svg' },
      { nombre: 'GCP', icono: '/recursos/iconos/google-cloud.svg' },
    ],
    fragmentoDatos: {
      archivoRuta: 'servicios/optimizador_consultas_dynamodb.ts',
      estado: 'Producción · Latencia -42%',
      metricaPrincipal: 'AWS + GCP Hybrid',
      lineasCodigo: [
        { tipo: 'contexto', texto: 'export async function consultarTransaccionesCorporativas(filtro: FiltroNGR) {' },
        { tipo: 'eliminado', texto: '  const respuesta = await clienteDynamo.scan({ TableName: "PedidosNGR" });' },
        { tipo: 'agregado', texto: '  const respuesta = await clienteDynamo.query({ IndexName: "IndiceFechaEstado", KeyConditionExpression: "estado = :e" });' },
        { tipo: 'contexto', texto: '  return mapearRespuestaOptimizada(respuesta.Items);' },
      ],
    },
  },
  {
    id: 'midas-crm-ia',
    categoria: 'CRM Ventas & Orquestación con Inteligencia Artificial',
    titulo: 'Sistema CRM para Call Center con Transcripción IA & Balanceo NGINX',
    cliente: 'Midas Solution Center',
    periodo: 'Ene. 2025 – Feb. 2026',
    ubicacion: 'Perú',
    descripcion:
      'Desarrollo integral de un CRM a medida para operaciones de ventas con gestión estratégica de leads, reportería operativa en tiempo real y visualización analítica.',
    impactoTecnico:
      'Automatización con n8n e inteligencia artificial para transcripción de llamadas telefónicas, desplegado en Ubuntu Linux con balanceo de carga NGINX sobre AWS.',
    imagenEditorial: '/recursos/imagenes/paisaje-horizonte.webp',
    paletaPanel: 'arena',
    tipoFragmento: 'flujo-ci',
    tecnologias: [
      { nombre: 'Angular', icono: '/recursos/iconos/angular.svg' },
      { nombre: 'React', icono: '/recursos/iconos/react.svg' },
      { nombre: 'Java', icono: '/recursos/iconos/java.svg' },
      { nombre: 'Django', icono: '/recursos/iconos/django.svg' },
      { nombre: 'n8n', icono: '/recursos/iconos/n8n.svg' },
      { nombre: 'NGINX', icono: '/recursos/iconos/nginx.svg' },
    ],
    fragmentoDatos: {
      archivoRuta: 'flujos/n8n_transcripcion_ia_ventas.json',
      estado: 'Alta Disponibilidad · NGINX Load Balancer',
      metricaPrincipal: 'Automatización IA Activa',
      pasosPipeline: [
        { nombre: 'Captura Audio Call Center', icono: '/recursos/iconos/ubuntu.svg', tiempo: '120ms', estado: 'completado' },
        { nombre: 'Orquestador n8n + Motor IA', icono: '/recursos/iconos/n8n.svg', tiempo: '1.4s', estado: 'completado' },
        { nombre: 'API Backend Java / Django', icono: '/recursos/iconos/java.svg', tiempo: '85ms', estado: 'completado' },
        { nombre: 'Dashboard CRM Angular/React', icono: '/recursos/iconos/angular.svg', tiempo: 'En vivo', estado: 'activo' },
      ],
    },
  },
  {
    id: 'greta-labs-saas',
    categoria: 'Plataforma SaaS & Inteligencia de Negocios',
    titulo: 'Aplicación Web bajo Suscripción (SaaS) & Motor de Reportes Excel',
    cliente: 'Greta Labs',
    periodo: 'Ago. 2024 – Sep. 2025',
    ubicacion: 'Perú',
    descripcion:
      'Construcción de interfaces personalizadas con React y TypeScript acopladas a un backend en Django y MySQL bajo entregas ágiles Scrum.',
    impactoTecnico:
      'Módulos de analítica con gráficos interactivos, exportación automatizada de reportes financieros en Excel y administración de servidores NGINX + Ubuntu en AWS.',
    imagenEditorial: '/recursos/imagenes/paisaje-reflejo.webp',
    paletaPanel: 'salvia',
    tipoFragmento: 'analitica-saas',
    tecnologias: [
      { nombre: 'React', icono: '/recursos/iconos/react.svg' },
      { nombre: 'TypeScript', icono: '/recursos/iconos/typescript.svg' },
      { nombre: 'Django', icono: '/recursos/iconos/django.svg' },
      { nombre: 'MySQL', icono: '/recursos/iconos/mysql.svg' },
      { nombre: 'AWS', icono: '/recursos/iconos/aws.svg' },
    ],
    fragmentoDatos: {
      archivoRuta: 'modulos/analitica_suscripciones_saas.tsx',
      estado: 'Sprint Scrum Completado · Exportación XLSX',
      metricaPrincipal: '99.4% Precisión Analítica',
      metricasBarras: [
        { etiqueta: 'Retención Suscriptores SaaS', porcentaje: 92, valor: '92%' },
        { etiqueta: 'Generación Automática Excel', porcentaje: 100, valor: '< 1.2s' },
        { etiqueta: 'Consultas Indexadas MySQL', porcentaje: 88, valor: '88%' },
      ],
    },
  },
  {
    id: 'chatby-whatsapp',
    categoria: 'Mensajería en Tiempo Real & Atención al Cliente',
    titulo: 'Plataforma Web de Chat en Línea & Automatización con WhatsApp API',
    cliente: 'Chatby Agency S.A.C',
    periodo: 'Jun. 2024 – Sep. 2024',
    ubicacion: 'Perú',
    descripcion:
      'Desarrollo de plataforma orientada a la atención de clientes con módulos de chat en vivo, plugins interactivos y evolución de la landing page corporativa.',
    impactoTecnico:
      'Integración de APIs REST de mensajería para automatizar notificaciones y flujos conversacionales por WhatsApp, reduciendo tiempos de respuesta al usuario final.',
    imagenEditorial: '/recursos/imagenes/paisaje-costa.webp',
    paletaPanel: 'pintura',
    tipoFragmento: 'chat-whatsapp',
    tecnologias: [
      { nombre: 'React', icono: '/recursos/iconos/react.svg' },
      { nombre: 'JavaScript', icono: '/recursos/iconos/javascript.svg' },
      { nombre: 'WhatsApp API', icono: '/recursos/iconos/whatsapp.svg' },
      { nombre: 'HTML5', icono: '/recursos/iconos/html.svg' },
      { nombre: 'CSS3', icono: '/recursos/iconos/css.svg' },
    ],
    fragmentoDatos: {
      archivoRuta: 'integraciones/webhook_whatsapp_api.js',
      estado: 'Webhook Conectado · 24/7',
      metricaPrincipal: 'Respuesta Instantánea',
      pasosPipeline: [
        { nombre: 'Evento Cliente en Chat Web', icono: '/recursos/iconos/react.svg', tiempo: '0ms', estado: 'completado' },
        { nombre: 'Despacho Webhook WhatsApp API', icono: '/recursos/iconos/whatsapp.svg', tiempo: '190ms', estado: 'activo' },
      ],
    },
  },
  {
    id: 'municipalidad-victoria',
    categoria: 'Gobierno Digital & Geolocalización',
    titulo: 'Sistema Institucional de Geolocalización, Asistencias y Archivos',
    cliente: 'Municipalidad Distrital de La Victoria',
    periodo: 'Ene. 2024 – Jul. 2024',
    ubicacion: 'Perú',
    descripcion:
      'Sistema web institucional para geolocalización operativa, control de asistencias de personal y gestión digitalizada de archivos municipales.',
    impactoTecnico:
      'Automatización de procesos internos en el backend con Python (Django) y Java, optimizando esquemas de bases de datos relacionales en AWS.',
    imagenEditorial: '/recursos/imagenes/paisaje-valle.webp',
    paletaPanel: 'cielo',
    tipoFragmento: 'geolocalizacion',
    tecnologias: [
      { nombre: 'React', icono: '/recursos/iconos/react.svg' },
      { nombre: 'Python', icono: '/recursos/iconos/python.svg' },
      { nombre: 'Django', icono: '/recursos/iconos/django.svg' },
      { nombre: 'Java', icono: '/recursos/iconos/java.svg' },
      { nombre: 'AWS', icono: '/recursos/iconos/aws.svg' },
    ],
    fragmentoDatos: {
      archivoRuta: 'servicios/control_asistencia_geolocalizada.py',
      estado: 'Desplegado en AWS · Esquema Relacional',
      metricaPrincipal: 'Geolocalización Activa',
      metricasBarras: [
        { etiqueta: 'Digitalización de Archivos', porcentaje: 95, valor: '100% Digital' },
        { etiqueta: 'Validación GPS de Asistencia', porcentaje: 98, valor: 'Tiempo Real' },
      ],
    },
  },
  {
    id: 'sistemas-legales-crm',
    categoria: 'Gestión Documental Legal & CRM Reactivo',
    titulo: 'Digitalización de Expedientes Jurídicos & CRM Corporativo en Tiempo Real',
    cliente: 'Estudio Sánchez Garay & Figueroa / Grupo Ases',
    periodo: 'Ene. 2023 – Dic. 2023',
    ubicacion: 'Chiclayo, Perú',
    descripcion:
      'Sistemas internos para administración de usuarios, control de almacén, digitalización de expedientes documentarios y CRM empresarial dinámico.',
    impactoTecnico:
      'Arquitectura híbrida empleando Laravel, Livewire y React con MySQL, ejecutando pruebas funcionales exhaustivas para garantizar la calidad del software.',
    imagenEditorial: '/recursos/imagenes/sistemas-cloud.png',
    paletaPanel: 'arena',
    tipoFragmento: 'expedientes-crm',
    tecnologias: [
      { nombre: 'Laravel', icono: '/recursos/iconos/laravel.svg' },
      { nombre: 'PHP', icono: '/recursos/iconos/php.svg' },
      { nombre: 'React', icono: '/recursos/iconos/react.svg' },
      { nombre: 'MySQL', icono: '/recursos/iconos/mysql.svg' },
    ],
    fragmentoDatos: {
      archivoRuta: 'app/Http/Livewire/GestorExpedientes.php',
      estado: 'QA Funcional Aprobado · Tiempo Real',
      metricaPrincipal: 'Laravel + React + Livewire',
      metricasBarras: [
        { etiqueta: 'Control de Expedientes y Almacén', porcentaje: 100, valor: 'Centralizado' },
        { etiqueta: 'Cobertura Pruebas Funcionales', porcentaje: 94, valor: 'QA Verificado' },
      ],
    },
  },
];

export const EXPERIENCIAS_LABORALES: ExperienciaLaboral[] = [
  {
    id: 'ngr',
    cargo: 'Analista Desarrollador Full Stack',
    empresa: 'NGR S.A.C',
    ubicacion: 'Perú',
    periodo: 'Sep. 2025 – Actualidad',
    esActual: true,
    etiquetasFiltro: ['react-angular', 'java-spring', 'cloud-devops'],
    logros: [
      'Ejecución de análisis técnico y levantamiento de requerimientos para identificar oportunidades de mejora funcional y de rendimiento en aplicaciones corporativas asignadas al cliente NGR.',
      'Desarrollo de soluciones Full Stack, mantenimiento evolutivo de aplicaciones web e integración de servicios mediante APIs REST empleando React, Angular, Java y Node.js sobre infraestructuras cloud (AWS y GCP).',
      'Optimización de consultas en bases de datos SQL y NoSQL (DynamoDB), asegurando la estabilidad, escalabilidad y soporte postproducción de los sistemas.',
    ],
    tecnologias: [
      { nombre: 'React', icono: '/recursos/iconos/react.svg' },
      { nombre: 'Angular', icono: '/recursos/iconos/angular.svg' },
      { nombre: 'Java', icono: '/recursos/iconos/java.svg' },
      { nombre: 'Node.js', icono: '/recursos/iconos/nodejs.svg' },
      { nombre: 'AWS', icono: '/recursos/iconos/aws.svg' },
      { nombre: 'GCP', icono: '/recursos/iconos/google-cloud.svg' },
      { nombre: 'DynamoDB' },
      { nombre: 'SQL' },
    ],
  },
  {
    id: 'midas',
    cargo: 'Desarrollador Full Stack',
    empresa: 'Midas Solution Center',
    ubicacion: 'Perú',
    periodo: 'Ene. 2025 – Feb. 2026',
    esActual: false,
    etiquetasFiltro: ['react-angular', 'java-spring', 'python-django', 'cloud-devops'],
    logros: [
      'Desarrollo integral de un sistema CRM a medida orientado a operaciones de ventas en call center, aplicando buenas prácticas de código limpio y arquitectura escalable con Angular, React y Java.',
      'Construcción de módulos estratégicos para la gestión de leads, visualización de datos, análisis de información y generación de reportería operativa.',
      'Implementación de flujos de automatización con n8n e integración de servicios de inteligencia artificial para la transcripción y procesamiento automatizado de interacciones telefónicas.',
      'Administración de servidores Linux (Ubuntu), ejecución de despliegues a producción y configuración de balanceo de carga con NGINX en AWS para garantizar alta disponibilidad.',
    ],
    tecnologias: [
      { nombre: 'Angular', icono: '/recursos/iconos/angular.svg' },
      { nombre: 'React', icono: '/recursos/iconos/react.svg' },
      { nombre: 'Java', icono: '/recursos/iconos/java.svg' },
      { nombre: 'Django', icono: '/recursos/iconos/django.svg' },
      { nombre: 'n8n', icono: '/recursos/iconos/n8n.svg' },
      { nombre: 'AWS', icono: '/recursos/iconos/aws.svg' },
      { nombre: 'MySQL', icono: '/recursos/iconos/mysql.svg' },
      { nombre: 'NGINX', icono: '/recursos/iconos/nginx.svg' },
      { nombre: 'Ubuntu', icono: '/recursos/iconos/ubuntu.svg' },
    ],
  },
  {
    id: 'greta-labs',
    cargo: 'Desarrollador Full Stack',
    empresa: 'Greta Labs',
    ubicacion: 'Perú',
    periodo: 'Ago. 2024 – Sep. 2025',
    esActual: false,
    etiquetasFiltro: ['react-angular', 'python-django', 'cloud-devops'],
    logros: [
      'Desarrollo de aplicaciones web bajo modelo de suscripción (SaaS), construyendo interfaces de usuario personalizadas y responsivas en el frontend con React y TypeScript, acopladas a un backend robusto en Django.',
      'Diseño de módulos de analítica con gráficos interactivos y exportación automatizada de reportes en Excel, gestionando el almacenamiento y modelado de datos en MySQL.',
      'Administración y configuración de servidores web mediante NGINX sobre Ubuntu en AWS, coordinando entregas iterativas y planificación de sprints bajo metodología ágil Scrum.',
    ],
    tecnologias: [
      { nombre: 'React', icono: '/recursos/iconos/react.svg' },
      { nombre: 'TypeScript', icono: '/recursos/iconos/typescript.svg' },
      { nombre: 'Django', icono: '/recursos/iconos/django.svg' },
      { nombre: 'MySQL', icono: '/recursos/iconos/mysql.svg' },
      { nombre: 'AWS', icono: '/recursos/iconos/aws.svg' },
      { nombre: 'NGINX', icono: '/recursos/iconos/nginx.svg' },
      { nombre: 'Ubuntu', icono: '/recursos/iconos/ubuntu.svg' },
      { nombre: 'Scrum' },
    ],
  },
  {
    id: 'chatby',
    cargo: 'Desarrollador Full Stack',
    empresa: 'Chatby Agency S.A.C',
    ubicacion: 'Perú',
    periodo: 'Jun. 2024 – Sep. 2024',
    esActual: false,
    etiquetasFiltro: ['react-angular'],
    logros: [
      'Desarrollo de una plataforma web orientada a la atención de clientes con módulos de chat en línea y plugins interactivos, además del mantenimiento evolutivo de la landing page corporativa.',
      'Integración de APIs de mensajería para automatizar el envío de notificaciones y flujos de comunicación a través de WhatsApp, mejorando los tiempos de respuesta al usuario final.',
    ],
    tecnologias: [
      { nombre: 'React', icono: '/recursos/iconos/react.svg' },
      { nombre: 'JavaScript', icono: '/recursos/iconos/javascript.svg' },
      { nombre: 'WhatsApp API', icono: '/recursos/iconos/whatsapp.svg' },
      { nombre: 'APIs REST' },
      { nombre: 'HTML5 & CSS3', icono: '/recursos/iconos/html.svg' },
    ],
  },
  {
    id: 'la-victoria',
    cargo: 'Desarrollador Full Stack',
    empresa: 'Municipalidad Distrital de La Victoria',
    ubicacion: 'Perú',
    periodo: 'Ene. 2024 – Jul. 2024',
    esActual: false,
    etiquetasFiltro: ['react-angular', 'python-django', 'java-spring', 'cloud-devops'],
    logros: [
      'Desarrollo de un sistema web institucional para geolocalización, control de asistencias de personal y gestión digital de archivos.',
      'Implementación de la lógica de negocio y automatización de procesos internos en el backend con Python (Django) y Java, optimizando esquemas de bases de datos relacionales para un rendimiento escalable en AWS.',
    ],
    tecnologias: [
      { nombre: 'React', icono: '/recursos/iconos/react.svg' },
      { nombre: 'Python', icono: '/recursos/iconos/python.svg' },
      { nombre: 'Django', icono: '/recursos/iconos/django.svg' },
      { nombre: 'Java', icono: '/recursos/iconos/java.svg' },
      { nombre: 'AWS', icono: '/recursos/iconos/aws.svg' },
      { nombre: 'SQL Relacional' },
    ],
  },
  {
    id: 'grupo-chiappe',
    cargo: 'Desarrollador Frontend',
    empresa: 'Grupo Chiappe',
    ubicacion: 'Chiclayo, Perú',
    periodo: 'Ago. 2023 – Dic. 2023',
    esActual: false,
    etiquetasFiltro: ['react-angular'],
    logros: [
      'Diseño y construcción de interfaces de usuario interactivas utilizando React, desarrollando componentes reutilizables, modulares y escalables enfocados en la usabilidad y experiencia de usuario (UX/UI) durante todo el ciclo de vida del proyecto.',
    ],
    tecnologias: [
      { nombre: 'React', icono: '/recursos/iconos/react.svg' },
      { nombre: 'JavaScript', icono: '/recursos/iconos/javascript.svg' },
      { nombre: 'HTML5', icono: '/recursos/iconos/html.svg' },
      { nombre: 'CSS3', icono: '/recursos/iconos/css.svg' },
    ],
  },
  {
    id: 'estudio-sanchez',
    cargo: 'Desarrollador Full Stack',
    empresa: 'Estudio Jurídico Sánchez Garay & Figueroa',
    ubicacion: 'Perú',
    periodo: 'Jun. 2023 – Dic. 2023',
    esActual: false,
    etiquetasFiltro: ['php-laravel', 'react-angular'],
    logros: [
      'Desarrollo de un sistema web interno para la administración de usuarios, control de almacén y digitalización de expedientes documentarios empleando Laravel en el backend y React en el frontend, además del desarrollo del portal web institucional.',
    ],
    tecnologias: [
      { nombre: 'Laravel', icono: '/recursos/iconos/laravel.svg' },
      { nombre: 'PHP', icono: '/recursos/iconos/php.svg' },
      { nombre: 'React', icono: '/recursos/iconos/react.svg' },
      { nombre: 'MySQL', icono: '/recursos/iconos/mysql.svg' },
    ],
  },
  {
    id: 'grupo-ases',
    cargo: 'Desarrollador Web',
    empresa: 'Grupo Ases',
    ubicacion: 'Chiclayo, Perú',
    periodo: 'Ene. 2023 – Abr. 2023',
    esActual: false,
    etiquetasFiltro: ['php-laravel'],
    logros: [
      'Desarrollo integral de un sistema CRM corporativo y del sitio web empresarial utilizando Laravel y Livewire, implementando interfaces dinámicas en tiempo real y ejecutando pruebas funcionales exhaustivas para asegurar la calidad del software.',
    ],
    tecnologias: [
      { nombre: 'Laravel', icono: '/recursos/iconos/laravel.svg' },
      { nombre: 'Livewire', icono: '/recursos/iconos/laravel.svg' },
      { nombre: 'PHP', icono: '/recursos/iconos/php.svg' },
      { nombre: 'HTML5 & CSS3', icono: '/recursos/iconos/html.svg' },
    ],
  },
  {
    id: 'alojatusitio',
    cargo: 'Soporte Técnico de Sistemas',
    empresa: 'Alojatusitio',
    ubicacion: 'Perú',
    periodo: 'Sep. 2022 – Dic. 2022',
    esActual: false,
    etiquetasFiltro: ['cloud-devops'],
    logros: [
      'Resolución de incidencias técnicas, diagnóstico de conectividad y soporte directo a clientes en la configuración y operatividad de sus redes y sistemas informáticos.',
    ],
    tecnologias: [
      { nombre: 'Administración de Sistemas', icono: '/recursos/iconos/ubuntu.svg' },
      { nombre: 'Redes & Conectividad' },
      { nombre: 'Soporte Técnico TI' },
    ],
  },
  {
    id: 'blacktech',
    cargo: 'Desarrollador Web',
    empresa: 'Blacktech Consultores & Soluciones TI',
    ubicacion: 'Perú',
    periodo: 'Jul. 2022 – Dic. 2022',
    esActual: false,
    etiquetasFiltro: ['php-laravel'],
    logros: [
      'Desarrollo y mantenimiento de módulos para aplicaciones web empresariales utilizando PHP y el framework Laravel, colaborando en la implementación de requerimientos funcionales y soporte correctivo.',
    ],
    tecnologias: [
      { nombre: 'PHP', icono: '/recursos/iconos/php.svg' },
      { nombre: 'Laravel', icono: '/recursos/iconos/laravel.svg' },
      { nombre: 'HTML5', icono: '/recursos/iconos/html.svg' },
      { nombre: 'CSS3', icono: '/recursos/iconos/css.svg' },
    ],
  },
];

export const CERTIFICACIONES: CertificacionItem[] = [
  {
    titulo: 'Scrum Master Professional Certificate (SMPC®)',
    institucion: 'CertiProf',
    periodo: 'Dic. 2024 – Dic. 2027',
    insignia: 'Certificación Internacional Vigente',
    destacada: true,
  },
  {
    titulo: 'Seminario: Seguridad de la Información, Informática y Ciberseguridad (64 h)',
    institucion: 'Universidad Señor de Sipán',
    periodo: 'Jun. 2022 – Sep. 2022',
    insignia: '64 Horas Académicas',
  },
  {
    titulo: 'Curso: Programación con JavaScript (40 h)',
    institucion: 'Fundación Telefónica Movistar',
    periodo: 'Ago. 2022',
    insignia: '40 Horas Académicas',
  },
  {
    titulo: 'Curso: Fundamentos del Desarrollo Web: Full Stack o Front-end',
    institucion: 'LinkedIn Learning',
    periodo: 'Ago. 2022',
    insignia: 'Especialización Web',
  },
  {
    titulo: 'Curso: Office Intermedio (25 h)',
    institucion: 'Fundación Telefónica Movistar',
    periodo: 'Ago. 2022',
    insignia: '25 Horas Académicas',
  },
];
