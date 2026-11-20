import React, { useState, useEffect } from 'react';
import {
  DATOS_PERFIL,
  CATEGORIAS_COMPETENCIAS,
  CASOS_SOLUCIONES,
  EXPERIENCIAS_LABORALES,
  CERTIFICACIONES,
  CasoSolucion,
} from './datos/curriculum';
import {
  Download,
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight,
  CheckCircle2,
  Terminal,
  Layers,
  Cpu,
  GraduationCap,
  Award,
  Globe,
  Copy,
  Check,
  Send,
  Briefcase,
  Code2,
  GitBranch,
  Database,
  Cloud,
} from 'lucide-react';

type FiltroCompetencia = 'todas' | 'frontend' | 'backend' | 'datos' | 'nube' | 'automatizacion';
type FiltroExperiencia = 'todas' | 'react-angular' | 'java-spring' | 'python-django' | 'php-laravel' | 'cloud-devops';
type PestanaArquitectura = 'resumen' | 'flujo-nube' | 'codigo';

export default function Aplicacion() {
  const [tema, establecerTema] = useState<'oscuro' | 'claro'>('oscuro');
  const [menuMovilAbierto, establecerMenuMovilAbierto] = useState(false);
  const [filtroCompetencia, establecerFiltroCompetencia] = useState<FiltroCompetencia>('todas');
  const [filtroExperiencia, establecerFiltroExperiencia] = useState<FiltroExperiencia>('todas');
  const [pestanaHero, establecerPestanaHero] = useState<PestanaArquitectura>('resumen');
  const [datoCopiado, establecerDatoCopiado] = useState<string | null>(null);
  const [notificacion, establecerNotificacion] = useState<string | null>(null);

  // Estado del formulario de contacto
  const [nombreContacto, establecerNombreContacto] = useState('');
  const [empresaContacto, establecerEmpresaContacto] = useState('');
  const [canalContacto, establecerCanalContacto] = useState<'whatsapp' | 'correo'>('whatsapp');
  const [mensajeContacto, establecerMensajeContacto] = useState('');

  useEffect(() => {
    const temaGuardado = localStorage.getItem('tema_portafolio_jose') as 'oscuro' | 'claro' | null;
    if (temaGuardado === 'claro' || temaGuardado === 'oscuro') {
      establecerTema(temaGuardado);
      document.documentElement.setAttribute('data-tema', temaGuardado);
    }
  }, []);

  const alternarTema = () => {
    const nuevoTema = tema === 'oscuro' ? 'claro' : 'oscuro';
    establecerTema(nuevoTema);
    document.documentElement.setAttribute('data-tema', nuevoTema);
    localStorage.setItem('tema_portafolio_jose', nuevoTema);
  };

  const mostrarMensajeToast = (texto: string) => {
    establecerNotificacion(texto);
    setTimeout(() => {
      establecerNotificacion((actual) => (actual === texto ? null : actual));
    }, 3200);
  };

  const copiarAlPortapapeles = async (valor: string, etiqueta: string) => {
    try {
      await navigator.clipboard.writeText(valor);
      establecerDatoCopiado(valor);
      mostrarMensajeToast(`${etiqueta} copiado al portapapeles: ${valor}`);
      setTimeout(() => establecerDatoCopiado(null), 2200);
    } catch {
      mostrarMensajeToast(`Valor: ${valor}`);
    }
  };

  const procesarEnvioContacto = (evento: React.FormEvent) => {
    evento.preventDefault();
    if (!nombreContacto.trim() || !mensajeContacto.trim()) {
      mostrarMensajeToast('Por favor completa tu nombre y el requerimiento.');
      return;
    }

    const presentacion = empresaContacto.trim()
      ? `Hola José, soy ${nombreContacto.trim()} de ${empresaContacto.trim()}.`
      : `Hola José, soy ${nombreContacto.trim()}.`;
    const cuerpoMensaje = `${presentacion}\n\n${mensajeContacto.trim()}`;

    if (canalContacto === 'whatsapp') {
      const urlWhatsapp = `${DATOS_PERFIL.whatsappUrl}?text=${encodeURIComponent(cuerpoMensaje)}`;
      window.open(urlWhatsapp, '_blank', 'noopener,noreferrer');
      mostrarMensajeToast('Abriendo conversación directa en WhatsApp...');
    } else {
      const asunto = encodeURIComponent(`Contacto Profesional desde Portafolio — ${nombreContacto.trim()}`);
      const cuerpo = encodeURIComponent(cuerpoMensaje);
      window.location.href = `mailto:${DATOS_PERFIL.correoPrincipal}?cc=${DATOS_PERFIL.correoSecundario}&subject=${asunto}&body=${cuerpo}`;
      mostrarMensajeToast('Abriendo tu cliente de correo electrónico...');
    }
  };

  const competenciasFiltradas =
    filtroCompetencia === 'todas'
      ? CATEGORIAS_COMPETENCIAS
      : CATEGORIAS_COMPETENCIAS.filter((c) => c.id === filtroCompetencia);

  const experienciasFiltradas =
    filtroExperiencia === 'todas'
      ? EXPERIENCIAS_LABORALES
      : EXPERIENCIAS_LABORALES.filter((e) => e.etiquetasFiltro.includes(filtroExperiencia));

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#5ab9fc] selection:text-[#07090e]">
      <a href="#contenido-principal" className="enlace-saltar">
        Saltar al contenido principal
      </a>

      {/* CABECERA FIJA CON HAIRLINE 1PX (Taste Skill System Nav) */}
      <header
        className="sticky top-0 z-50 h-[4.5rem] border-b transition-colors duration-200"
        style={{
          backgroundColor: 'var(--color-cabecera)',
          borderColor: 'var(--color-borde)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <div className="contenedor-maestro h-full flex items-center justify-between gap-4">
          <a
            href="#inicio"
            className="inline-flex items-center gap-3 font-bold text-lg tracking-tight boton-interactivo"
            aria-label="José María Torres Chirinos — Ir al inicio"
          >
            <span
              className="w-9 h-9 rounded-lg flex items-center justify-center font-mono text-sm font-extrabold"
              style={{
                backgroundColor: 'var(--color-accion)',
                color: 'var(--color-sobre-accion)',
              }}
            >
              JT
            </span>
            <span className="font-semibold tracking-tight">
              José<span style={{ color: 'var(--color-accion)' }}>Torres</span>
              <span className="text-xs font-mono ml-1.5 opacity-60 hidden sm:inline">v2.5</span>
            </span>
          </a>

          {/* Navegación de escritorio (sustantivos de una palabra según Taste Skill) */}
          <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-1">
            {[
              { etiqueta: 'Arquitectura', enlace: '#inicio' },
              { etiqueta: 'Stack', enlace: '#competencias' },
              { etiqueta: 'Sistemas', enlace: '#sistemas' },
              { etiqueta: 'Trayectoria', enlace: '#trayectoria' },
              { etiqueta: 'Formación', enlace: '#formacion' },
              { etiqueta: 'Contacto', enlace: '#contacto' },
            ].map((item) => (
              <a
                key={item.enlace}
                href={item.enlace}
                className="px-3.5 py-2 rounded-lg text-[15px] font-medium transition-colors duration-150 hover:opacity-100 opacity-80"
                style={{ color: 'var(--color-tinta)' }}
              >
                {item.etiqueta}
              </a>
            ))}
          </nav>

          {/* Acciones de cabecera */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={alternarTema}
              className="boton-interactivo boton-secundario-taste w-11 h-11 rounded-xl flex items-center justify-center border cursor-pointer"
              style={{
                backgroundColor: 'var(--color-tarjeta)',
                borderColor: 'var(--color-borde)',
                color: 'var(--color-tinta)',
              }}
              aria-label={tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={tema === 'oscuro' ? 'Modo claro' : 'Modo oscuro'}
            >
              {tema === 'oscuro' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a
              href={DATOS_PERFIL.cvUrl}
              download="CV_Jose_Maria_Torres_Chirinos.pdf"
              className="boton-interactivo boton-primario-taste hidden sm:inline-flex items-center gap-2 h-11 px-4 rounded-xl font-medium text-[15px] cursor-pointer"
              style={{
                backgroundColor: 'var(--color-accion)',
                color: 'var(--color-sobre-accion)',
              }}
            >
              <Download className="w-4 h-4" />
              <span>Descargar CV</span>
            </a>

            <button
              type="button"
              onClick={() => establecerMenuMovilAbierto(!menuMovilAbierto)}
              className="boton-interactivo md:hidden w-11 h-11 rounded-xl flex items-center justify-center border cursor-pointer"
              style={{
                backgroundColor: 'var(--color-tarjeta)',
                borderColor: 'var(--color-borde)',
                color: 'var(--color-tinta)',
              }}
              aria-expanded={menuMovilAbierto}
              aria-label="Abrir menú de navegación"
            >
              {menuMovilAbierto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {menuMovilAbierto && (
          <div
            className="md:hidden border-b px-6 py-5 flex flex-col gap-3"
            style={{
              backgroundColor: 'var(--color-fondo)',
              borderColor: 'var(--color-borde)',
            }}
          >
            {[
              { etiqueta: 'Arquitectura', enlace: '#inicio' },
              { etiqueta: 'Stack Tecnológico', enlace: '#competencias' },
              { etiqueta: 'Sistemas en Producción', enlace: '#sistemas' },
              { etiqueta: 'Trayectoria Profesional', enlace: '#trayectoria' },
              { etiqueta: 'Formación & Certificaciones', enlace: '#formacion' },
              { etiqueta: 'Contacto Directo', enlace: '#contacto' },
            ].map((item) => (
              <a
                key={item.enlace}
                href={item.enlace}
                onClick={() => establecerMenuMovilAbierto(false)}
                className="py-2.5 text-base font-medium border-b"
                style={{ borderColor: 'var(--color-borde-sutil)' }}
              >
                {item.etiqueta}
              </a>
            ))}
            <a
              href={DATOS_PERFIL.cvUrl}
              download="CV_Jose_Maria_Torres_Chirinos.pdf"
              className="boton-interactivo mt-2 inline-flex items-center justify-center gap-2 h-12 rounded-xl font-semibold text-base"
              style={{
                backgroundColor: 'var(--color-accion)',
                color: 'var(--color-sobre-accion)',
              }}
            >
              <Download className="w-4 h-4" />
              <span>Descargar CV (PDF)</span>
            </a>
          </div>
        )}
      </header>

      <main id="contenido-principal" className="flex-1">
        {/* =====================================================================
            SECCIÓN 1: HERO CON ARTE VISUAL + CONSOLA INTERACTIVA EN VIVO
            ===================================================================== */}
        <section id="inicio" className="py-12 lg:py-20 border-b" style={{ borderColor: 'var(--color-borde)' }}>
          <div className="contenedor-maestro">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Columna Izquierda (7 columnas): Narrativa clara y acciones */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div
                  className="animar-entrada-1 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium mb-6 border"
                  style={{
                    backgroundColor: 'var(--color-tarjeta)',
                    borderColor: 'var(--color-borde)',
                    color: 'var(--color-tinta-secundaria)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  <span>Analista Desarrollador Full Stack en {DATOS_PERFIL.empresaActual}</span>
                  <span className="opacity-40">|</span>
                  <span style={{ color: 'var(--color-accion)' }}>{DATOS_PERFIL.gradoAcademico}</span>
                </div>

                <h1 className="animar-entrada-1 text-4xl sm:text-5xl lg:text-[3.65rem] font-bold tracking-tight mb-6 leading-[1.08]">
                  {DATOS_PERFIL.nombreCompleto}.{' '}
                  <span style={{ color: 'var(--color-tinta-secundaria)' }} className="font-normal">
                    Ingeniería Full Stack, sistemas empresariales y nube.
                  </span>
                </h1>

                <p
                  className="animar-entrada-2 text-base sm:text-lg mb-8 max-w-2xl leading-relaxed"
                  style={{ color: 'var(--color-tinta-secundaria)' }}
                >
                  Construyo interfaces reactivas de alta precisión con{' '}
                  <strong style={{ color: 'var(--color-tinta)' }}>React, Angular y TypeScript</strong>, acopladas a
                  servicios escalables en{' '}
                  <strong style={{ color: 'var(--color-tinta)' }}>
                    Java (Spring Boot), Python (Django), PHP (Laravel) y Node.js
                  </strong>
                  , bases de datos SQL/DynamoDB y despliegues en{' '}
                  <strong style={{ color: 'var(--color-tinta)' }}>AWS, GCP y Azure</strong>.
                </p>

                {/* Fila de botones (Máximo 2 acciones principales en Hero según Taste Skill) */}
                <div className="animar-entrada-3 flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
                  <a
                    href="#sistemas"
                    className="boton-interactivo boton-primario-taste w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-xl font-semibold text-base"
                    style={{
                      backgroundColor: 'var(--color-accion)',
                      color: 'var(--color-sobre-accion)',
                    }}
                  >
                    <span>Explorar Sistemas Reales</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#contacto"
                    className="boton-interactivo boton-secundario-taste w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-xl font-medium text-base border"
                    style={{
                      backgroundColor: 'var(--color-tarjeta)',
                      borderColor: 'var(--color-borde)',
                      color: 'var(--color-tinta)',
                    }}
                  >
                    <span>Iniciar Conversación</span>
                  </a>
                </div>

                {/* Métricas de trayectoria verificadas */}
                <div
                  className="animar-entrada-4 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t w-full"
                  style={{ borderColor: 'var(--color-borde)' }}
                >
                  {DATOS_PERFIL.metricasHero.map((metrica) => (
                    <div key={metrica.etiqueta} className="flex flex-col">
                      <span className="text-2xl sm:text-3xl font-bold tracking-tight font-display">
                        {metrica.valor}
                      </span>
                      <span className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-tinta-secundaria)' }}>
                        {metrica.etiqueta}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columna Derecha (5 columnas): Visual Arquitectónico + App-Frame en vivo */}
              <div className="lg:col-span-5 animar-entrada-2">
                <div className="tarjeta-taste p-3 sm:p-4 overflow-hidden">
                  {/* Marco con imagen generada de alta resolución + Panel UI interactivo superpuesto */}
                  <div className="panel-iluminado relative min-h-[430px] sm:min-h-[460px] flex flex-col justify-between p-4 sm:p-5">
                    <img
                      src="/recursos/imagenes/arquitectura-hero.png"
                      alt="Monolitos arquitectónicos que representan sistemas distribuidos multi-cloud"
                      width={800}
                      height={600}
                      fetchPriority="high"
                      decoding="async"
                      className="imagen-panel-editorial absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(7,9,14,0.35) 0%, rgba(7,9,14,0.75) 55%, rgba(7,9,14,0.94) 100%)',
                      }}
                    />

                    {/* Barra superior del dispositivo / sistema */}
                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0d14]/85 border border-white/15 backdrop-blur-md">
                        <Terminal className="w-3.5 h-3.5 text-[#5ab9fc]" />
                        <span className="font-mono text-xs text-[#e9edf3] font-medium">
                          arquitectura.josetorres.pe
                        </span>
                      </div>

                      <div className="inline-flex rounded-lg bg-[#0a0d14]/85 p-1 border border-white/15 backdrop-blur-md">
                        {(
                          [
                            { id: 'resumen', etiqueta: 'Stack' },
                            { id: 'flujo-nube', etiqueta: 'Multi-Cloud' },
                            { id: 'codigo', etiqueta: 'Perfil TS' },
                          ] as { id: PestanaArquitectura; etiqueta: string }[]
                        ).map((pestana) => (
                          <button
                            key={pestana.id}
                            type="button"
                            onClick={() => establecerPestanaHero(pestana.id)}
                            className={`boton-interactivo px-2.5 py-1 rounded-md text-xs font-mono cursor-pointer ${
                              pestanaHero === pestana.id
                                ? 'bg-[#5ab9fc] text-[#07090e] font-semibold'
                                : 'text-[#a3b1c6] hover:text-white'
                            }`}
                          >
                            {pestana.etiqueta}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Ventana App-Frame interactiva en la parte inferior del panel */}
                    <div className="relative z-10 mt-6 fragmento-ui p-4 sm:p-5 bg-[#131824]/95 backdrop-blur-xl text-[#e9edf3]">
                      {pestanaHero === 'resumen' && (
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                            <div>
                              <p className="text-xs font-mono text-[#5ab9fc] uppercase">Ecosistema Principal</p>
                              <h2 className="text-base font-semibold text-white">
                                Full Stack &amp; Cloud Engineering
                              </h2>
                            </div>
                            <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono text-xs">
                              Producción
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2.5">
                            {[
                              { nombre: 'React & Angular', rol: 'Frontend UI', icono: '/recursos/iconos/react.svg' },
                              { nombre: 'Java Spring Boot', rol: 'Microservicios', icono: '/recursos/iconos/spring.svg' },
                              { nombre: 'Python & Django', rol: 'SaaS & Datos', icono: '/recursos/iconos/django.svg' },
                              { nombre: 'PHP & Laravel', rol: 'Sistemas & CRM', icono: '/recursos/iconos/laravel.svg' },
                              { nombre: 'AWS · GCP · Azure', rol: 'Infraestructura', icono: '/recursos/iconos/aws.svg' },
                              { nombre: 'n8n & IA Workflows', rol: 'Automatización', icono: '/recursos/iconos/n8n.svg' },
                            ].map((item) => (
                              <div
                                key={item.nombre}
                                className="flex items-center gap-2.5 p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]"
                              >
                                <span className="azulejo-icono">
                                  <img src={item.icono} alt="" className="w-full h-full object-contain" />
                                </span>
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold text-white truncate">{item.nombre}</p>
                                  <p className="text-[11px] text-[#a3b1c6] truncate">{item.rol}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {pestanaHero === 'flujo-nube' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <span className="text-xs font-mono text-[#5ab9fc]">
                              Topología de Despliegue Corporativo
                            </span>
                            <span className="text-xs font-mono text-emerald-400">99.9% Alta Disponibilidad</span>
                          </div>

                          <div className="space-y-2.5 py-1">
                            {[
                              {
                                etapa: '1. Balanceador NGINX / Ubuntu Server',
                                detalle: 'Proxy inverso, SSL y distribución de tráfico',
                                icono: '/recursos/iconos/nginx.svg',
                              },
                              {
                                etapa: '2. Frontend SPA (React / Angular / TS)',
                                detalle: 'Componentes modulares y estado reactivo',
                                icono: '/recursos/iconos/typescript.svg',
                              },
                              {
                                etapa: '3. APIs REST (Java / Django / Node / Laravel)',
                                detalle: 'Lógica transaccional + Webhooks n8n / WhatsApp',
                                icono: '/recursos/iconos/java.svg',
                              },
                              {
                                etapa: '4. Persistencia SQL & Amazon DynamoDB',
                                detalle: 'Consultas indexadas sobre AWS, GCP y Azure',
                                icono: '/recursos/iconos/postgres.svg',
                              },
                            ].map((nodo) => (
                              <div
                                key={nodo.etapa}
                                className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08]"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className="azulejo-icono">
                                    <img src={nodo.icono} alt="" className="w-full h-full object-contain" />
                                  </span>
                                  <div className="min-w-0">
                                    <p className="text-xs font-semibold text-white truncate">{nodo.etapa}</p>
                                    <p className="text-[11px] text-[#a3b1c6] truncate">{nodo.detalle}</p>
                                  </div>
                                </div>
                                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {pestanaHero === 'codigo' && (
                        <div className="font-mono text-xs leading-relaxed overflow-x-auto">
                          <div className="flex items-center justify-between text-[#a3b1c6] border-b border-white/10 pb-2 mb-2.5">
                            <span>ingeniero_fullstack.ts</span>
                            <span className="text-[#5ab9fc]">TypeScript 5.8</span>
                          </div>
                          <pre className="text-[12px] text-[#e9edf3]">
                            <code>{`const perfilProfesional = {
  nombre: "José María Torres Chirinos",
  grado: "Bachiller en Ing. de Sistemas (USS)",
  certificacion: "Scrum Master SMPC® (2024-2027)",
  rolActual: "Analista Full Stack @ NGR S.A.C",
  idiomas: { es: "Nativo", en: "Intermedio B2" },
  arquitectura: ["React", "Angular", "Java", "Django", "Laravel"],
  nube: ["AWS", "Google Cloud", "Azure", "NGINX", "DynamoDB"]
};`}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECCIÓN 2: MATRIZ DE COMPETENCIAS TÉCNICAS CON ICONOS OFICIALES A COLOR
            ===================================================================== */}
        <section id="competencias" className="py-16 lg:py-24 border-b" style={{ borderColor: 'var(--color-borde)' }}>
          <div className="contenedor-maestro">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-accion)' }}>
                  01 / Competencias Técnicas &amp; Herramientas Oficiales
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Dominio completo del stack empresarial.{' '}
                  <span style={{ color: 'var(--color-tinta-secundaria)' }} className="font-normal">
                    Desde el componente visual hasta el clúster en la nube.
                  </span>
                </h2>
              </div>

              {/* Barra de filtros interactivos */}
              <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filtrar competencias por área">
                {(
                  [
                    { id: 'todas', etiqueta: 'Todas (5)' },
                    { id: 'frontend', etiqueta: 'Frontend' },
                    { id: 'backend', etiqueta: 'Backend' },
                    { id: 'datos', etiqueta: 'Bases de Datos' },
                    { id: 'nube', etiqueta: 'Cloud & DevOps' },
                    { id: 'automatizacion', etiqueta: 'n8n & Scrum' },
                  ] as { id: FiltroCompetencia; etiqueta: string }[]
                ).map((boton) => {
                  const activo = filtroCompetencia === boton.id;
                  return (
                    <button
                      key={boton.id}
                      type="button"
                      onClick={() => establecerFiltroCompetencia(boton.id)}
                      aria-pressed={activo}
                      className="chip-filtro boton-interactivo px-3.5 py-2 rounded-xl text-sm font-medium border cursor-pointer"
                      style={{
                        backgroundColor: activo ? 'var(--color-accion)' : 'var(--color-tarjeta)',
                        color: activo ? 'var(--color-sobre-accion)' : 'var(--color-tinta)',
                        borderColor: activo ? 'var(--color-accion)' : 'var(--color-borde)',
                      }}
                    >
                      {boton.etiqueta}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rejilla Bento alineada a 12 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {competenciasFiltradas.map((categoria, indice) => {
                const claseColumna =
                  filtroCompetencia !== 'todas'
                    ? 'lg:col-span-6'
                    : indice < 2
                    ? 'lg:col-span-3'
                    : 'lg:col-span-2';

                return (
                  <article
                    key={categoria.id}
                    className={`tarjeta-taste p-6 sm:p-7 flex flex-col justify-between ${claseColumna}`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span
                          className="font-mono text-xs px-2.5 py-1 rounded-md border"
                          style={{
                            borderColor: 'var(--color-borde)',
                            color: 'var(--color-accion)',
                            backgroundColor: 'var(--color-tarjeta-elevada)',
                          }}
                        >
                          {categoria.subtitulo}
                        </span>
                        <span className="font-mono text-xs" style={{ color: 'var(--color-tinta-secundaria)' }}>
                          {categoria.tecnologias.length} tecnologías
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold mb-2.5">{categoria.titulo}</h3>
                      <p className="text-[16px] leading-relaxed mb-6" style={{ color: 'var(--color-tinta-secundaria)' }}>
                        {categoria.descripcion}
                      </p>
                    </div>

                    {/* Panel iluminado con fotografía editorial + insignias de iconos oficiales en color real */}
                    <div className={`panel-iluminado panel-iluminado--${categoria.paletaPanel} p-4 sm:p-5`}>
                      <img
                        src={categoria.imagenFondo}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="imagen-panel-editorial absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-multiply"
                      />

                      <div className="relative z-10 fragmento-ui p-4">
                        <div className="flex items-center justify-between border-b pb-2.5 mb-3" style={{ borderColor: 'var(--color-borde)' }}>
                          <span className="font-mono text-xs font-semibold" style={{ color: 'var(--color-accion)' }}>
                            {categoria.metricaDestacada.valor}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--color-tinta-secundaria)' }}>
                            {categoria.metricaDestacada.etiqueta}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {categoria.tecnologias.map((tec) => (
                            <span
                              key={tec.nombre}
                              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium border"
                              style={{
                                backgroundColor: 'var(--color-tarjeta)',
                                borderColor: 'var(--color-borde)',
                                color: 'var(--color-tinta)',
                              }}
                            >
                              {tec.icono ? (
                                <span className="azulejo-icono !w-5 !h-5 !p-0.5">
                                  <img src={tec.icono} alt="" className="w-full h-full object-contain" />
                                </span>
                              ) : (
                                <Code2 className="w-3.5 h-3.5" style={{ color: 'var(--color-accion)' }} />
                              )}
                              <span>{tec.nombre}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECCIÓN 3: CASOS DE ÉXITO Y SISTEMAS EN PRODUCCIÓN (TARJETAS X.AI / FIGMA)
            ===================================================================== */}
        <section id="sistemas" className="py-16 lg:py-24 border-b" style={{ borderColor: 'var(--color-borde)' }}>
          <div className="contenedor-maestro">
            <div className="max-w-3xl mb-12">
              <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-accion)' }}>
                02 / Sistemas e Ingeniería en Producción
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Arquitecturas construidas para operar en entornos reales.{' '}
                <span style={{ color: 'var(--color-tinta-secundaria)' }} className="font-normal">
                  Multi-cloud, CRMs con inteligencia artificial, SaaS y gobierno digital.
                </span>
              </h2>
            </div>

            {/* Rejilla 2x3 con la receta de tarjetas de Taste Skill (Card > Lit Panel > Live UI Fragment) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {CASOS_SOLUCIONES.map((caso) => (
                <TarjetaCasoProduccion key={caso.id} caso={caso} />
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECCIÓN 4: TRAYECTORIA PROFESIONAL VERIFICADA (10 EXPERIENCIAS)
            ===================================================================== */}
        <section id="trayectoria" className="py-16 lg:py-24 border-b" style={{ borderColor: 'var(--color-borde)' }}>
          <div className="contenedor-maestro">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-accion)' }}>
                  03 / Historial Laboral Completo (2022 – Actualidad)
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Experiencia profesional verificada.{' '}
                  <span style={{ color: 'var(--color-tinta-secundaria)' }} className="font-normal">
                    10 etapas impulsando soluciones web en Perú.
                  </span>
                </h2>
              </div>

              {/* Filtros de trayectoria */}
              <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filtrar trayectoria por stack">
                {(
                  [
                    { id: 'todas', etiqueta: 'Todas (10)' },
                    { id: 'react-angular', etiqueta: 'React / Angular' },
                    { id: 'java-spring', etiqueta: 'Java' },
                    { id: 'python-django', etiqueta: 'Python / Django' },
                    { id: 'php-laravel', etiqueta: 'PHP / Laravel' },
                    { id: 'cloud-devops', etiqueta: 'AWS / GCP / Linux' },
                  ] as { id: FiltroExperiencia; etiqueta: string }[]
                ).map((filtro) => {
                  const activo = filtroExperiencia === filtro.id;
                  return (
                    <button
                      key={filtro.id}
                      type="button"
                      onClick={() => establecerFiltroExperiencia(filtro.id)}
                      aria-pressed={activo}
                      className="chip-filtro boton-interactivo px-3.5 py-2 rounded-xl text-sm font-medium border cursor-pointer"
                      style={{
                        backgroundColor: activo ? 'var(--color-accion)' : 'var(--color-tarjeta)',
                        color: activo ? 'var(--color-sobre-accion)' : 'var(--color-tinta)',
                        borderColor: activo ? 'var(--color-accion)' : 'var(--color-borde)',
                      }}
                    >
                      {filtro.etiqueta}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              {experienciasFiltradas.map((exp) => (
                <article
                  key={exp.id}
                  className="tarjeta-taste p-6 sm:p-8 transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Columna Meta (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r pb-4 lg:pb-0 lg:pr-6" style={{ borderColor: 'var(--color-borde)' }}>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {exp.esActual ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              Actualidad
                            </span>
                          ) : (
                            <Briefcase className="w-4 h-4" style={{ color: 'var(--color-accion)' }} />
                          )}
                          <span className="font-mono text-xs" style={{ color: 'var(--color-tinta-secundaria)' }}>
                            {exp.periodo}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold">{exp.cargo}</h3>
                        <p className="text-base font-medium mt-1" style={{ color: 'var(--color-accion)' }}>
                          {exp.empresa}
                        </p>
                        <p className="text-sm mt-0.5" style={{ color: 'var(--color-tinta-secundaria)' }}>
                          {exp.ubicacion}
                        </p>
                      </div>

                      {/* Insignias de tecnologías con sus iconos reales */}
                      <div className="flex flex-wrap gap-1.5 mt-5">
                        {exp.tecnologias.map((tec) => (
                          <span
                            key={tec.nombre}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border"
                            style={{
                              backgroundColor: 'var(--color-tarjeta-elevada)',
                              borderColor: 'var(--color-borde)',
                            }}
                          >
                            {tec.icono && (
                              <span className="azulejo-icono !w-4 !h-4 !p-0.5">
                                <img src={tec.icono} alt="" className="w-full h-full object-contain" />
                              </span>
                            )}
                            <span>{tec.nombre}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Columna Logros (8 cols) */}
                    <div className="lg:col-span-8 flex flex-col justify-center">
                      <ul className="space-y-3">
                        {exp.logros.map((logro, i) => (
                          <li key={i} className="flex items-start gap-3 text-[16px] leading-relaxed">
                            <CheckCircle2
                              className="w-5 h-5 shrink-0 mt-1"
                              style={{ color: exp.esActual ? '#10b981' : 'var(--color-accion)' }}
                            />
                            <span style={{ color: 'var(--color-tinta)' }}>{logro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECCIÓN 5: EDUCACIÓN UNIVERSITARIA, CERTIFICACIONES E IDIOMAS
            ===================================================================== */}
        <section id="formacion" className="py-16 lg:py-24 border-b" style={{ borderColor: 'var(--color-borde)' }}>
          <div className="contenedor-maestro">
            <div className="max-w-3xl mb-12">
              <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-accion)' }}>
                04 / Respaldo Académico &amp; Certificaciones
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ingeniería de Sistemas &amp; Liderazgo Ágil.{' '}
                <span style={{ color: 'var(--color-tinta-secundaria)' }} className="font-normal">
                  Grado universitario, certificación Scrum Master y formación continua.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Columna Izquierda (5 cols): Grado Universitario e Idiomas */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <article className="tarjeta-taste p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className="w-12 h-12 rounded-xl flex items-center justify-center border"
                        style={{
                          backgroundColor: 'var(--color-tarjeta-elevada)',
                          borderColor: 'var(--color-borde)',
                          color: 'var(--color-accion)',
                        }}
                      >
                        <GraduationCap className="w-6 h-6" />
                      </span>
                      <span className="font-mono text-xs px-3 py-1 rounded-full border" style={{ borderColor: 'var(--color-borde)' }}>
                        Ago. 2018 – Feb. 2024
                      </span>
                    </div>

                    <p className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--color-accion)' }}>
                      Grado Académico Conferido
                    </p>
                    <h3 className="text-2xl font-bold mb-2">Bachiller en Ingeniería de Sistemas</h3>
                    <p className="text-base font-semibold mb-4" style={{ color: 'var(--color-tinta-secundaria)' }}>
                      Universidad Señor de Sipán — Perú
                    </p>
                    <p className="text-[16px] leading-relaxed" style={{ color: 'var(--color-tinta-secundaria)' }}>
                      Grado académico conferido en febrero de 2024 (Estudios culminados: Agosto 2018 – Diciembre 2023).
                      Formación integral en arquitectura de software, ingeniería de requerimientos, bases de datos,
                      redes, seguridad informática y dirección de proyectos TI.
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t flex items-center justify-between text-xs font-mono" style={{ borderColor: 'var(--color-borde)' }}>
                    <span>Estado: Grado Conferido Oficial</span>
                    <span className="text-emerald-400">Verificado</span>
                  </div>
                </article>

                {/* Idiomas */}
                <article className="tarjeta-taste p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <Globe className="w-5 h-5" style={{ color: 'var(--color-accion)' }} />
                    <h3 className="text-xl font-bold">Idiomas</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      className="p-4 rounded-xl border"
                      style={{
                        backgroundColor: 'var(--color-tarjeta-elevada)',
                        borderColor: 'var(--color-borde)',
                      }}
                    >
                      <p className="font-bold text-base">Español</p>
                      <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-accion)' }}>
                        Nativo
                      </p>
                    </div>
                    <div
                      className="p-4 rounded-xl border"
                      style={{
                        backgroundColor: 'var(--color-tarjeta-elevada)',
                        borderColor: 'var(--color-borde)',
                      }}
                    >
                      <p className="font-bold text-base">Inglés</p>
                      <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-accion)' }}>
                        Nivel Intermedio (B2)
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              {/* Columna Derecha (7 cols): Certificaciones y Formación Complementaria */}
              <div className="lg:col-span-7">
                <article className="tarjeta-taste p-7 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6" style={{ color: 'var(--color-accion)' }} />
                      <h3 className="text-xl sm:text-2xl font-bold">Certificaciones &amp; Especialización</h3>
                    </div>
                    <span className="font-mono text-xs" style={{ color: 'var(--color-tinta-secundaria)' }}>
                      5 credenciales
                    </span>
                  </div>

                  <div className="divide-y" style={{ borderColor: 'var(--color-borde)' }}>
                    {CERTIFICACIONES.map((cert) => (
                      <div
                        key={cert.titulo}
                        className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h4 className="font-semibold text-[16px]">{cert.titulo}</h4>
                            {cert.destacada && (
                              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                SMPC®
                              </span>
                            )}
                          </div>
                          <p className="text-sm mt-0.5" style={{ color: 'var(--color-tinta-secundaria)' }}>
                            {cert.institucion} &bull; <span>{cert.insignia}</span>
                          </p>
                        </div>
                        <span
                          className="font-mono text-xs px-3 py-1 rounded-full border self-start sm:self-center shrink-0"
                          style={{
                            backgroundColor: 'var(--color-tarjeta-elevada)',
                            borderColor: 'var(--color-borde)',
                          }}
                        >
                          {cert.periodo}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECCIÓN 6: CONTACTO DIRECTO Y CIERRE EDITORIAL
            ===================================================================== */}
        <section id="contacto" className="py-16 lg:py-24">
          <div className="contenedor-maestro">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Información y Canales Directos con Copiado en 1 Clic (6 cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-accion)' }}>
                    05 / Contacto Directo
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                    Disponible para proyectos Full Stack, arquitectura Frontend y consultoría Cloud.
                  </h2>
                  <p className="text-[16px] leading-relaxed mb-8" style={{ color: 'var(--color-tinta-secundaria)' }}>
                    Comunícate directamente por WhatsApp, correo electrónico o LinkedIn. Todos los datos corresponden a
                    mis canales oficiales en Perú.
                  </p>

                  <div className="space-y-3.5">
                    {/* WhatsApp / Teléfono */}
                    <div className="tarjeta-taste p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="azulejo-icono !w-10 !h-10 !p-1.5">
                          <img src="/recursos/iconos/whatsapp.svg" alt="" className="w-full h-full object-contain" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-mono" style={{ color: 'var(--color-tinta-secundaria)' }}>
                            Teléfono / WhatsApp Directo (Perú)
                          </p>
                          <a
                            href={DATOS_PERFIL.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base font-semibold hover:underline truncate block"
                          >
                            {DATOS_PERFIL.telefonoFormato}
                          </a>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => copiarAlPortapapeles(DATOS_PERFIL.telefono, 'Teléfono')}
                        className="boton-interactivo px-3 py-2 rounded-lg text-xs font-mono border inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                        style={{
                          backgroundColor: 'var(--color-tarjeta-elevada)',
                          borderColor: 'var(--color-borde)',
                        }}
                      >
                        {datoCopiado === DATOS_PERFIL.telefono ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Correo Gmail */}
                    <div className="tarjeta-taste p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="azulejo-icono !w-10 !h-10 !p-1.5">
                          <img src="/recursos/iconos/gmail.svg" alt="" className="w-full h-full object-contain" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-mono" style={{ color: 'var(--color-tinta-secundaria)' }}>
                            Correo Principal
                          </p>
                          <a
                            href={`mailto:${DATOS_PERFIL.correoPrincipal}`}
                            className="text-base font-semibold hover:underline truncate block"
                          >
                            {DATOS_PERFIL.correoPrincipal}
                          </a>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => copiarAlPortapapeles(DATOS_PERFIL.correoPrincipal, 'Correo Gmail')}
                        className="boton-interactivo px-3 py-2 rounded-lg text-xs font-mono border inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                        style={{
                          backgroundColor: 'var(--color-tarjeta-elevada)',
                          borderColor: 'var(--color-borde)',
                        }}
                      >
                        {datoCopiado === DATOS_PERFIL.correoPrincipal ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Correo Hotmail */}
                    <div className="tarjeta-taste p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="azulejo-icono !w-10 !h-10 !p-1.5">
                          <img src="/recursos/iconos/azure.svg" alt="" className="w-full h-full object-contain" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-mono" style={{ color: 'var(--color-tinta-secundaria)' }}>
                            Correo Alternativo
                          </p>
                          <a
                            href={`mailto:${DATOS_PERFIL.correoSecundario}`}
                            className="text-base font-semibold hover:underline truncate block"
                          >
                            {DATOS_PERFIL.correoSecundario}
                          </a>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => copiarAlPortapapeles(DATOS_PERFIL.correoSecundario, 'Correo Hotmail')}
                        className="boton-interactivo px-3 py-2 rounded-lg text-xs font-mono border inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                        style={{
                          backgroundColor: 'var(--color-tarjeta-elevada)',
                          borderColor: 'var(--color-borde)',
                        }}
                      >
                        {datoCopiado === DATOS_PERFIL.correoSecundario ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* LinkedIn */}
                    <div className="tarjeta-taste p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="azulejo-icono !w-10 !h-10 !p-1.5">
                          <img src="/recursos/iconos/linkedin.svg" alt="" className="w-full h-full object-contain" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-mono" style={{ color: 'var(--color-tinta-secundaria)' }}>
                            Red Profesional LinkedIn
                          </p>
                          <a
                            href={DATOS_PERFIL.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base font-semibold hover:underline truncate block"
                          >
                            {DATOS_PERFIL.linkedinUsuario}
                          </a>
                        </div>
                      </div>
                      <a
                        href={DATOS_PERFIL.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="boton-interactivo px-3 py-2 rounded-lg text-xs font-mono border inline-flex items-center gap-1.5 shrink-0"
                        style={{
                          backgroundColor: 'var(--color-tarjeta-elevada)',
                          borderColor: 'var(--color-borde)',
                        }}
                      >
                        <span>Abrir</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulario de Contacto Accesible (Taste Skill Form Recipe: etiquetas visibles, 48px altura, 16px fuente) */}
              <div className="lg:col-span-6">
                <form
                  onSubmit={procesarEnvioContacto}
                  className="tarjeta-taste p-7 sm:p-9 space-y-5"
                  aria-label="Formulario para enviar mensaje a José María Torres Chirinos"
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Envío Rápido de Propuesta o Consulta</h3>
                    <p className="text-sm" style={{ color: 'var(--color-tinta-secundaria)' }}>
                      Todos los campos tienen etiquetas visibles y abren comunicación directa sin intermediarios.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="campo-nombre" className="block text-sm font-medium mb-1.5">
                      Tu nombre completo *
                    </label>
                    <input
                      id="campo-nombre"
                      type="text"
                      autoComplete="name"
                      required
                      value={nombreContacto}
                      onChange={(e) => establecerNombreContacto(e.target.value)}
                      placeholder="Ej. Andrea Salazar"
                      className="w-full h-12 px-4 rounded-xl border text-base"
                      style={{
                        backgroundColor: 'var(--color-tarjeta-elevada)',
                        borderColor: 'var(--color-borde)',
                        color: 'var(--color-tinta)',
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="campo-empresa" className="block text-sm font-medium mb-1.5">
                        Empresa o entidad
                      </label>
                      <input
                        id="campo-empresa"
                        type="text"
                        autoComplete="organization"
                        value={empresaContacto}
                        onChange={(e) => establecerEmpresaContacto(e.target.value)}
                        placeholder="Ej. Corporación Digital"
                        className="w-full h-12 px-4 rounded-xl border text-base"
                        style={{
                          backgroundColor: 'var(--color-tarjeta-elevada)',
                          borderColor: 'var(--color-borde)',
                          color: 'var(--color-tinta)',
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="campo-canal" className="block text-sm font-medium mb-1.5">
                        Canal de respuesta
                      </label>
                      <select
                        id="campo-canal"
                        value={canalContacto}
                        onChange={(e) => establecerCanalContacto(e.target.value as 'whatsapp' | 'correo')}
                        className="w-full h-12 px-4 rounded-xl border text-base"
                        style={{
                          backgroundColor: 'var(--color-tarjeta-elevada)',
                          borderColor: 'var(--color-borde)',
                          color: 'var(--color-tinta)',
                        }}
                      >
                        <option value="whatsapp">WhatsApp (+51 923 945 382)</option>
                        <option value="correo">Correo (josetorchi@gmail.com)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="campo-mensaje" className="block text-sm font-medium mb-1.5">
                      Detalles del proyecto o vacante *
                    </label>
                    <textarea
                      id="campo-mensaje"
                      required
                      rows={4}
                      value={mensajeContacto}
                      onChange={(e) => establecerMensajeContacto(e.target.value)}
                      placeholder="Hola José, buscamos un Desarrollador Full Stack para..."
                      className="w-full p-4 rounded-xl border text-base resize-y"
                      style={{
                        backgroundColor: 'var(--color-tarjeta-elevada)',
                        borderColor: 'var(--color-borde)',
                        color: 'var(--color-tinta)',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="boton-interactivo boton-primario-taste w-full h-12 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2.5 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--color-accion)',
                      color: 'var(--color-sobre-accion)',
                    }}
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {canalContacto === 'whatsapp' ? 'Iniciar Chat en WhatsApp' : 'Redactar Correo Electrónico'}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* PIE DE PÁGINA CON LÍNEA EXPANDIBLE DE CRÉDITOS DE LICENCIA (Taste Skill Rule 1) */}
      <footer
        className="border-t py-10 text-sm"
        style={{
          backgroundColor: 'var(--color-fondo-alt)',
          borderColor: 'var(--color-borde)',
          color: 'var(--color-tinta-secundaria)',
        }}
      >
        <div className="contenedor-maestro flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold" style={{ color: 'var(--color-tinta)' }}>
              {DATOS_PERFIL.nombreCompleto} &bull; {DATOS_PERFIL.rolPrincipal}
            </p>
            <p className="text-xs mt-1">
              Construido con React 19, TypeScript, Vite y Tailwind CSS v4 aplicando UI/UX Pro Max, Emil Kowalski Skills
              y Taste Skill 2.5.
            </p>
          </div>

          <details className="text-xs font-mono cursor-pointer">
            <summary className="hover:underline">Créditos de fotografías e iconografía</summary>
            <p className="mt-2 max-w-md text-[11px] leading-relaxed">
              Fotografías editoriales de paisaje bajo licencia Wikimedia Commons (CC BY-SA / Public Domain) integradas
              del catálogo curado de Taste Skill y arte arquitectónico generado a medida. Logotipos de tecnologías en
              sus colores oficiales de marca.
            </p>
          </details>
        </div>
      </footer>

      {/* TOAST DE NOTIFICACIÓN ACCESIBLE (Sonner Style) */}
      {notificacion && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl border shadow-2xl flex items-center gap-2.5 text-sm font-medium"
          style={{
            backgroundColor: 'var(--color-tarjeta)',
            borderColor: 'var(--color-accion)',
            color: 'var(--color-tinta)',
          }}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notificacion}</span>
        </div>
      )}
    </div>
  );
}

/**
 * Componente de Tarjeta de Caso de Producción siguiendo la arquitectura de Taste Skill:
 * 1. Tarjeta exterior limpia (1 paso sobre el fondo de página)
 * 2. Texto conciso arriba (Título + descripción de 16px en tinta principal)
 * 3. Panel iluminado abajo con imagen real y fragmento de UI en vivo a escala real
 */
function TarjetaCasoProduccion({ caso }: { caso: CasoSolucion }) {
  return (
    <article className="tarjeta-taste p-6 sm:p-8 flex flex-col justify-between">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="font-mono text-xs font-medium" style={{ color: 'var(--color-accion)' }}>
            {caso.categoria}
          </span>
          <span
            className="font-mono text-xs px-2.5 py-0.5 rounded-full border"
            style={{
              backgroundColor: 'var(--color-tarjeta-elevada)',
              borderColor: 'var(--color-borde)',
              color: 'var(--color-tinta-secundaria)',
            }}
          >
            {caso.cliente} &bull; {caso.periodo}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold mb-2.5">{caso.titulo}</h3>

        <p className="text-[16px] leading-relaxed mb-4" style={{ color: 'var(--color-tinta-secundaria)' }}>
          {caso.descripcion}
        </p>

        <p
          className="text-sm p-3.5 rounded-xl border mb-6"
          style={{
            backgroundColor: 'var(--color-tarjeta-elevada)',
            borderColor: 'var(--color-borde)',
            color: 'var(--color-tinta)',
          }}
        >
          <strong style={{ color: 'var(--color-accion)' }}>Impacto en producción: </strong>
          {caso.impactoTecnico}
        </p>
      </div>

      <div>
        {/* Panel Iluminado (Taste Skill Lit Panel) */}
        <div className={`panel-iluminado panel-iluminado--${caso.paletaPanel} p-4 sm:p-5 mb-5`}>
          <img
            src={caso.imagenEditorial}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="imagen-panel-editorial absolute inset-0 w-full h-full object-cover opacity-45"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(10,13,20,0.12) 0%, rgba(10,13,20,0.45) 100%)',
            }}
          />

          {/* Fragmento de UI en vivo dentro del panel */}
          <div className="relative z-10 fragmento-ui p-4">
            <div
              className="flex flex-wrap items-center justify-between gap-2 border-b pb-2.5 mb-3 text-xs font-mono"
              style={{ borderColor: 'var(--color-borde)' }}
            >
              <span className="truncate font-semibold">{caso.fragmentoDatos.archivoRuta}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {caso.fragmentoDatos.estado}
              </span>
            </div>

            {/* Renderizado condicional según el tipo de fragmento real */}
            {caso.fragmentoDatos.lineasCodigo && (
              <div className="font-mono text-[11.5px] space-y-1 overflow-x-auto">
                {caso.fragmentoDatos.lineasCodigo.map((linea, idx) => (
                  <div
                    key={idx}
                    className={`px-2 py-1 rounded ${
                      linea.tipo === 'eliminado'
                        ? 'bg-red-500/15 text-red-300 line-through opacity-80'
                        : linea.tipo === 'agregado'
                        ? 'bg-emerald-500/15 text-emerald-300 font-medium'
                        : 'opacity-80'
                    }`}
                  >
                    {linea.tipo === 'eliminado' ? '- ' : linea.tipo === 'agregado' ? '+ ' : '  '}
                    {linea.texto}
                  </div>
                ))}
              </div>
            )}

            {caso.fragmentoDatos.pasosPipeline && (
              <div className="space-y-2">
                {caso.fragmentoDatos.pasosPipeline.map((paso) => (
                  <div
                    key={paso.nombre}
                    className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-xs"
                    style={{
                      backgroundColor: 'var(--color-tarjeta)',
                      borderColor: 'var(--color-borde)',
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="azulejo-icono !w-5 !h-5 !p-0.5">
                        <img src={paso.icono} alt="" className="w-full h-full object-contain" />
                      </span>
                      <span className="font-medium truncate">{paso.nombre}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 font-mono">
                      <span style={{ color: 'var(--color-tinta-secundaria)' }}>{paso.tiempo}</span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          paso.estado === 'activo' ? 'bg-[#5ab9fc] animate-ping' : 'bg-emerald-400'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {caso.fragmentoDatos.metricasBarras && (
              <div className="space-y-2.5">
                {caso.fragmentoDatos.metricasBarras.map((barra) => (
                  <div key={barra.etiqueta}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">{barra.etiqueta}</span>
                      <span className="font-mono font-semibold" style={{ color: 'var(--color-accion)' }}>
                        {barra.valor}
                      </span>
                    </div>
                    <div
                      className="w-full h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'var(--color-tarjeta)' }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${barra.porcentaje}%`,
                          backgroundColor: 'var(--color-accion)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Fila de tecnologías del caso con iconos oficiales a color */}
        <div className="flex flex-wrap gap-2">
          {caso.tecnologias.map((tec) => (
            <span
              key={tec.nombre}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border"
              style={{
                backgroundColor: 'var(--color-tarjeta-elevada)',
                borderColor: 'var(--color-borde)',
              }}
            >
              {tec.icono && (
                <span className="azulejo-icono !w-4 !h-4 !p-0.5">
                  <img src={tec.icono} alt="" className="w-full h-full object-contain" />
                </span>
              )}
              <span>{tec.nombre}</span>
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
