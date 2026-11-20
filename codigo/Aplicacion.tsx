import React, { useState, useEffect, useRef } from 'react';
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
  GraduationCap,
  Award,
  Globe,
  Copy,
  Check,
  Send,
  Briefcase,
  Code2,
  Sparkles,
  Camera,
} from 'lucide-react';

type FiltroCompetencia = 'todas' | 'frontend' | 'backend' | 'datos' | 'nube' | 'automatizacion';
type FiltroExperiencia = 'todas' | 'react-angular' | 'java-spring' | 'python-django' | 'php-laravel' | 'cloud-devops';
type PestanaArquitectura = 'resumen' | 'flujo-nube' | 'codigo';
type ModoRetrato = '3d' | 'real';

export default function Aplicacion() {
  const [tema, establecerTema] = useState<'oscuro' | 'claro'>('oscuro');
  const [menuMovilAbierto, establecerMenuMovilAbierto] = useState(false);
  const [seccionActiva, establecerSeccionActiva] = useState<string>('#inicio');
  const [modoRetrato, establecerModoRetrato] = useState<ModoRetrato>('3d');
  const [inclinacionAvatar, establecerInclinacionAvatar] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [filtroCompetencia, establecerFiltroCompetencia] = useState<FiltroCompetencia>('todas');
  const [filtroExperiencia, establecerFiltroExperiencia] = useState<FiltroExperiencia>('todas');
  const [pestanaHero, establecerPestanaHero] = useState<PestanaArquitectura>('resumen');
  const [datoCopiado, establecerDatoCopiado] = useState<string | null>(null);
  const [notificacion, establecerNotificacion] = useState<string | null>(null);

  const referenciaHero = useRef<HTMLElement | null>(null);

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

  // Seguimiento de sección activa al hacer scroll para iluminar la píldora de navegación
  useEffect(() => {
    const idsSecciones = ['inicio', 'competencias', 'sistemas', 'trayectoria', 'formacion', 'contacto'];
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            establecerSeccionActiva(`#${entrada.target.id}`);
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0.05 }
    );

    idsSecciones.forEach((id) => {
      const elemento = document.getElementById(id);
      if (elemento) observador.observe(elemento);
    });

    return () => observador.disconnect();
  }, []);

  const alternarTema = () => {
    const nuevoTema = tema === 'oscuro' ? 'claro' : 'oscuro';
    establecerTema(nuevoTema);
    document.documentElement.setAttribute('data-tema', nuevoTema);
    localStorage.setItem('tema_portafolio_jose', nuevoTema);
  };

  // Seguimiento 3D del cursor para que el rostro de José Torres gire suavemente hacia el puntero
  const manejarMovimientoEscenario = (evento: React.MouseEvent<HTMLElement>) => {
    if (!referenciaHero.current) return;
    const rectangulo = referenciaHero.current.getBoundingClientRect();
    const centroX = rectangulo.left + rectangulo.width / 2;
    const centroY = rectangulo.top + rectangulo.height / 2;

    const deltaX = (evento.clientX - centroX) / (rectangulo.width / 2);
    const deltaY = (evento.clientY - centroY) / (rectangulo.height / 2);

    establecerInclinacionAvatar({
      x: Math.max(-1, Math.min(1, deltaX)),
      y: Math.max(-1, Math.min(1, deltaY)),
    });
  };

  const reiniciarEscenario = () => {
    establecerInclinacionAvatar({ x: 0, y: 0 });
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

  const elementosNavegacion = [
    { etiqueta: 'Inicio', enlace: '#inicio' },
    { etiqueta: 'Stack', enlace: '#competencias' },
    { etiqueta: 'Sistemas', enlace: '#sistemas' },
    { etiqueta: 'Trayectoria', enlace: '#trayectoria' },
    { etiqueta: 'Formación', enlace: '#formacion' },
    { etiqueta: 'Contacto', enlace: '#contacto' },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#5ab9fc] selection:text-[#07090e]">
      <a href="#contenido-principal" className="enlace-saltar">
        Saltar al contenido principal
      </a>

      {/* =====================================================================
          BARRA DE NAVEGACIÓN FLOTANTE EN CÁPSULAS (Inspirada en la referencia)
          ===================================================================== */}
      <header className="sticky top-0 z-50 pt-4 pb-2 px-4">
        <div className="contenedor-maestro flex items-center justify-between gap-3">
          {/* Cápsula Izquierda: Acciones rápidas (Tema + CV + Menú Móvil) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={alternarTema}
              className="capsula-nav-flotante boton-interactivo w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
              style={{ color: 'var(--color-tinta)' }}
              aria-label={tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={tema === 'oscuro' ? 'Modo claro' : 'Modo oscuro'}
            >
              {tema === 'oscuro' ? <Sun className="w-4 h-4 text-[#5ab9fc]" /> : <Moon className="w-4 h-4 text-[#0265d6]" />}
            </button>

            <a
              href={DATOS_PERFIL.cvUrl}
              download="CV_Jose_Maria_Torres_Chirinos.pdf"
              className="capsula-nav-flotante boton-interactivo hidden sm:inline-flex items-center gap-2 h-11 px-4 rounded-full font-medium text-xs font-mono cursor-pointer hover:border-[#5ab9fc]/50"
              style={{ color: 'var(--color-tinta)' }}
            >
              <Download className="w-3.5 h-3.5" style={{ color: 'var(--color-accion)' }} />
              <span>CV PDF</span>
            </a>

            <button
              type="button"
              onClick={() => establecerMenuMovilAbierto(!menuMovilAbierto)}
              className="capsula-nav-flotante boton-interactivo md:hidden w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
              style={{ color: 'var(--color-tinta)' }}
              aria-expanded={menuMovilAbierto}
              aria-label="Abrir menú de navegación"
            >
              {menuMovilAbierto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Cápsula Central: Píldora de Navegación con Ítem Activo Iluminado */}
          <nav
            aria-label="Navegación principal"
            className="capsula-nav-flotante hidden md:flex items-center gap-1 p-1.5 rounded-full"
          >
            {elementosNavegacion.map((item) => {
              const esActivo = seccionActiva === item.enlace;
              return (
                <a
                  key={item.enlace}
                  href={item.enlace}
                  onClick={() => establecerSeccionActiva(item.enlace)}
                  className={`boton-interactivo px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    esActivo
                      ? 'boton-pildora-magico font-semibold'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                  style={!esActivo ? { color: 'var(--color-tinta)' } : undefined}
                >
                  {item.etiqueta}
                </a>
              );
            })}
          </nav>

          {/* Cápsula Derecha: Identidad con Mini-Avatar 3D de José Torres */}
          <a
            href="#inicio"
            className="capsula-nav-flotante boton-interactivo inline-flex items-center gap-2.5 pl-3.5 pr-1.5 py-1.5 rounded-full"
            aria-label="José María Torres Chirinos — Ir al inicio"
          >
            <div className="text-right">
              <p className="text-xs sm:text-sm font-bold leading-none tracking-tight">
                José <span style={{ color: 'var(--color-accion)' }}>Torres</span>
              </p>
              <p className="text-[10px] font-mono opacity-70 hidden sm:block mt-0.5">
                Full Stack &amp; Cloud
              </p>
            </div>
            <span
              className="w-8 h-8 rounded-full overflow-hidden border flex items-center justify-center shrink-0 bg-[#0a0d14]"
              style={{ borderColor: 'var(--color-accion)' }}
            >
              <img
                src="/recursos/imagenes/avatar-3d-jose.webp"
                alt="Mini avatar 3D de José Torres"
                className="w-full h-full object-cover scale-110"
              />
            </span>
          </a>
        </div>

        {/* Menú móvil desplegable */}
        {menuMovilAbierto && (
          <div className="contenedor-maestro mt-3 md:hidden">
            <div className="capsula-nav-flotante rounded-2xl p-5 flex flex-col gap-2.5">
              {elementosNavegacion.map((item) => (
                <a
                  key={item.enlace}
                  href={item.enlace}
                  onClick={() => {
                    establecerSeccionActiva(item.enlace);
                    establecerMenuMovilAbierto(false);
                  }}
                  className="py-2.5 px-3 rounded-xl text-base font-medium border-b last:border-b-0"
                  style={{ borderColor: 'var(--color-borde-sutil)' }}
                >
                  {item.etiqueta}
                </a>
              ))}
              <a
                href={DATOS_PERFIL.cvUrl}
                download="CV_Jose_Maria_Torres_Chirinos.pdf"
                className="boton-interactivo boton-pildora-magico mt-2 inline-flex items-center justify-center gap-2 h-11 rounded-full font-semibold text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Descargar CV Oficial (PDF)</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="contenido-principal" className="flex-1">
        {/* =====================================================================
            SECCIÓN 1: HERO ESCÉNICO 3D CON ROSTRO ANIMADO + TIPOGRAFÍA MONUMENTAL
            ===================================================================== */}
        <section
          id="inicio"
          ref={referenciaHero}
          onMouseMove={manejarMovimientoEscenario}
          onMouseLeave={reiniciarEscenario}
          className="escenario-hero-3d patron-ondas-radar pt-6 pb-16 lg:pt-10 lg:pb-24 border-b overflow-hidden"
          style={{ borderColor: 'var(--color-borde)' }}
        >
          <div className="contenedor-maestro relative">
            {/* Subtítulo superior de estado */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 animar-entrada-1">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium border"
                style={{
                  backgroundColor: 'var(--color-tarjeta)',
                  borderColor: 'var(--color-borde)',
                  color: 'var(--color-tinta-secundaria)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span>Analista Desarrollador Full Stack @ {DATOS_PERFIL.empresaActual}</span>
                <span className="opacity-40">|</span>
                <span style={{ color: 'var(--color-accion)' }}>{DATOS_PERFIL.gradoAcademico}</span>
              </div>

              {/* Conmutador interactivo: Avatar 3D Animado vs Foto Real de LinkedIn */}
              <div
                className="inline-flex items-center p-1 rounded-full border text-xs font-mono"
                style={{
                  backgroundColor: 'var(--color-tarjeta)',
                  borderColor: 'var(--color-borde)',
                }}
                role="group"
                aria-label="Cambiar modo de retrato"
              >
                <button
                  type="button"
                  onClick={() => establecerModoRetrato('3d')}
                  className={`boton-interactivo inline-flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer ${
                    modoRetrato === '3d'
                      ? 'bg-[#5ab9fc] text-[#07090e] font-semibold'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Avatar 3D</span>
                </button>
                <button
                  type="button"
                  onClick={() => establecerModoRetrato('real')}
                  className={`boton-interactivo inline-flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer ${
                    modoRetrato === 'real'
                      ? 'bg-[#5ab9fc] text-[#07090e] font-semibold'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <Camera className="w-3 h-3" />
                  <span>Foto LinkedIn</span>
                </button>
              </div>
            </div>

            {/* ESCENARIO CENTRAL: Tipografía Gigante en 2 pisos + Rostro 3D Superpuesto en medio */}
            <div className="relative flex flex-col items-center justify-center text-center pt-2 pb-6">
              {/* PISO 1 Y 2 DE TIPOGRAFÍA MONUMENTAL (El rostro 3D se superpone sobre la 2da línea como en la imagen) */}
              <h1 className="titulo-monumental-hero animar-entrada-1 relative z-10 flex flex-col items-center">
                <span
                  className="block text-[2.55rem] sm:text-[4.4rem] md:text-[5.6rem] lg:text-[6.8rem] tracking-tight"
                  style={{
                    color: 'var(--color-tinta)',
                    transform: `translate3d(${inclinacionAvatar.x * -10}px, ${inclinacionAvatar.y * -6}px, 0)`,
                    transition: 'transform 260ms var(--curva-salida)',
                  }}
                >
                  HAZ QUE TU CÓDIGO
                </span>
                <span
                  className="texto-gradiente-cielo block text-[2.95rem] sm:text-[5.2rem] md:text-[6.6rem] lg:text-[8.1rem] mt-1 sm:mt-0"
                  style={{
                    transform: `translate3d(${inclinacionAvatar.x * -16}px, ${inclinacionAvatar.y * -10}px, 0)`,
                    transition: 'transform 260ms var(--curva-salida)',
                  }}
                >
                  HABLE POR TI.
                </span>
              </h1>

              {/* ROSTRO 3D ANIMADO EN EL CENTRO DEL ESCENARIO (Superpuesto con parallax 3D y mirada viva) */}
              <div className="relative z-20 -mt-8 sm:-mt-16 md:-mt-20 lg:-mt-24 mb-6 flex items-center justify-center">
                {/* Halo luminoso dinámico detrás de la cabeza */}
                <div
                  aria-hidden="true"
                  className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl pointer-events-none opacity-65"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(90, 185, 252, 0.42) 0%, rgba(56, 189, 248, 0.14) 55%, transparent 75%)',
                    transform: `translate3d(${inclinacionAvatar.x * 24}px, ${inclinacionAvatar.y * 20}px, 0)`,
                    transition: 'transform 200ms var(--curva-salida)',
                  }}
                />

                {/* Satélites de tecnologías oficiales flotando alrededor del retrato 3D */}
                <div
                  aria-hidden="true"
                  className="satelite-flotante-1 hidden sm:flex absolute -left-24 top-8 items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-cabecera)',
                    borderColor: 'var(--color-borde)',
                  }}
                >
                  <span className="azulejo-icono !w-5 !h-5 !p-0.5">
                    <img src="/recursos/iconos/react.svg" alt="" className="w-full h-full object-contain" />
                  </span>
                  <span className="font-mono text-xs font-semibold">React &amp; Angular</span>
                </div>

                <div
                  aria-hidden="true"
                  className="satelite-flotante-2 hidden sm:flex absolute -right-28 top-10 items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-cabecera)',
                    borderColor: 'var(--color-borde)',
                  }}
                >
                  <span className="azulejo-icono !w-5 !h-5 !p-0.5">
                    <img src="/recursos/iconos/spring.svg" alt="" className="w-full h-full object-contain" />
                  </span>
                  <span className="font-mono text-xs font-semibold">Java &amp; Spring Boot</span>
                </div>

                <div
                  aria-hidden="true"
                  className="satelite-flotante-3 hidden md:flex absolute -left-28 bottom-12 items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-cabecera)',
                    borderColor: 'var(--color-borde)',
                  }}
                >
                  <span className="azulejo-icono !w-5 !h-5 !p-0.5">
                    <img src="/recursos/iconos/aws.svg" alt="" className="w-full h-full object-contain" />
                  </span>
                  <span className="font-mono text-xs font-semibold">AWS · GCP · Azure</span>
                </div>

                <div
                  aria-hidden="true"
                  className="satelite-flotante-4 hidden md:flex absolute -right-24 bottom-12 items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-cabecera)',
                    borderColor: 'var(--color-borde)',
                  }}
                >
                  <span className="azulejo-icono !w-5 !h-5 !p-0.5">
                    <img src="/recursos/iconos/n8n.svg" alt="" className="w-full h-full object-contain" />
                  </span>
                  <span className="font-mono text-xs font-semibold">n8n &amp; IA</span>
                </div>

                {/* Contenedor 3D con seguimiento de cursor, respiración y reflejo */}
                <div className="avatar-3d-levitante">
                  <div
                    className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[21.5rem] lg:h-[21.5rem] select-none"
                    style={{
                      transform: `rotateY(${inclinacionAvatar.x * 16}deg) rotateX(${inclinacionAvatar.y * -14}deg) translate3d(${inclinacionAvatar.x * 14}px, ${inclinacionAvatar.y * 10}px, 24px)`,
                      transition: 'transform 180ms var(--curva-salida)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {modoRetrato === '3d' ? (
                      <div className="relative w-full h-full">
                        <picture>
                          <source srcSet="/recursos/imagenes/avatar-3d-jose.webp" type="image/webp" />
                          <img
                            src="/recursos/imagenes/avatar-3d-jose.png"
                            alt="Retrato 3D animado de José María Torres Chirinos basado en su fotografía de LinkedIn"
                            width={512}
                            height={512}
                            fetchPriority="high"
                            decoding="async"
                            className="w-full h-full object-contain drop-shadow-[0_26px_48px_rgba(0,0,0,0.82)]"
                          />
                        </picture>

                        {/* Brillos oculares vivos y párpados sutiles que siguen el ratón para darle vida al rostro 3D */}
                        <span
                          aria-hidden="true"
                          className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/85 pointer-events-none blur-[0.3px]"
                          style={{
                            top: '41.3%',
                            left: '37.4%',
                            transform: `translate3d(${inclinacionAvatar.x * 4.5}px, ${inclinacionAvatar.y * 3.5}px, 0)`,
                            transition: 'transform 90ms linear',
                          }}
                        />
                        <span
                          aria-hidden="true"
                          className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/85 pointer-events-none blur-[0.3px]"
                          style={{
                            top: '41.3%',
                            left: '60.8%',
                            transform: `translate3d(${inclinacionAvatar.x * 4.5}px, ${inclinacionAvatar.y * 3.5}px, 0)`,
                            transition: 'transform 90ms linear',
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full h-full rounded-full overflow-hidden border-4 shadow-2xl bg-[#131824] flex items-center justify-center"
                        style={{ borderColor: 'var(--color-accion)' }}
                      >
                        <img
                          src="/recursos/imagenes/foto-jose-torres.jpg"
                          alt="Fotografía oficial de LinkedIn de José María Torres Chirinos"
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* BARRA INFERIOR DEL ESCENARIO HERO (Idéntica en composición a la referencia: CTA Píldora a la izquierda, Nombre + Rol a la derecha) */}
              <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 pt-2 pb-10 animar-entrada-3">
                {/* Izquierda: Botones de Acción (CTA Píldora Iluminada + Contacto) */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <a
                    href="#sistemas"
                    className="boton-interactivo boton-pildora-magico inline-flex items-center gap-2.5 h-12 px-7 rounded-full font-bold text-base"
                  >
                    <span>Ver Mis Sistemas</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#contacto"
                    className="boton-interactivo boton-secundario-taste inline-flex items-center gap-2 h-12 px-6 rounded-full font-medium text-sm border"
                    style={{
                      backgroundColor: 'var(--color-tarjeta)',
                      borderColor: 'var(--color-borde)',
                      color: 'var(--color-tinta)',
                    }}
                  >
                    <span>Hablemos en Vivo</span>
                  </a>
                </div>

                {/* Derecha: Firma Editorial del Ingeniero (Como en la esquina derecha de la referencia) */}
                <div className="text-center sm:text-right">
                  <p className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                    {DATOS_PERFIL.nombreCompleto}
                  </p>
                  <p className="text-sm sm:text-base font-medium mt-0.5" style={{ color: 'var(--color-accion)' }}>
                    {DATOS_PERFIL.rolPrincipal} &bull; Scrum Master SMPC®
                  </p>
                </div>
              </div>
            </div>

            {/* FILA INFERIOR DEL HERO: Resumen Ejecutivo + Consola de Arquitectura en Vivo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t" style={{ borderColor: 'var(--color-borde)' }}>
              {/* Resumen y Métricas (7 columnas) */}
              <div className="lg:col-span-7 space-y-6">
                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{ color: 'var(--color-tinta-secundaria)' }}
                >
                  Construyo interfaces reactivas de alta precisión con{' '}
                  <strong style={{ color: 'var(--color-tinta)' }}>React, Angular y TypeScript</strong>, acopladas a
                  arquitecturas backend escalables en{' '}
                  <strong style={{ color: 'var(--color-tinta)' }}>
                    Java (Spring Boot), Python (Django), PHP (Laravel) y Node.js
                  </strong>
                  , optimización de bases de datos SQL/DynamoDB y despliegues de alta disponibilidad en{' '}
                  <strong style={{ color: 'var(--color-tinta)' }}>AWS, GCP y Microsoft Azure</strong>.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-2">
                  {DATOS_PERFIL.metricasHero.map((metrica) => (
                    <div
                      key={metrica.etiqueta}
                      className="p-4 rounded-2xl border"
                      style={{
                        backgroundColor: 'var(--color-tarjeta)',
                        borderColor: 'var(--color-borde)',
                      }}
                    >
                      <span className="text-2xl sm:text-3xl font-bold tracking-tight font-display block">
                        {metrica.valor}
                      </span>
                      <span className="text-xs mt-1 block" style={{ color: 'var(--color-tinta-secundaria)' }}>
                        {metrica.etiqueta}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consola App-Frame Interactiva (5 columnas) */}
              <div className="lg:col-span-5">
                <div className="tarjeta-taste p-3 sm:p-4 overflow-hidden">
                  <div className="panel-iluminado relative min-h-[340px] flex flex-col justify-between p-4">
                    <img
                      src="/recursos/imagenes/arquitectura-hero.png"
                      alt="Monolitos arquitectónicos que representan sistemas distribuidos multi-cloud"
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="imagen-panel-editorial absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(7,9,14,0.4) 0%, rgba(7,9,14,0.8) 55%, rgba(7,9,14,0.95) 100%)',
                      }}
                    />

                    {/* Barra superior del terminal */}
                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0d14]/85 border border-white/15 backdrop-blur-md">
                        <Terminal className="w-3.5 h-3.5 text-[#5ab9fc]" />
                        <span className="font-mono text-xs text-[#e9edf3] font-medium">
                          jose-torres-portafolio.netlify.app
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

                    {/* Ventana interactiva */}
                    <div className="relative z-10 mt-4 fragmento-ui p-4 bg-[#131824]/95 backdrop-blur-xl text-[#e9edf3]">
                      {pestanaHero === 'resumen' && (
                        <div className="grid grid-cols-2 gap-2">
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
                              className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]"
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
                      )}

                      {pestanaHero === 'flujo-nube' && (
                        <div className="space-y-2">
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
                              className="flex items-center justify-between gap-3 p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]"
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
                      )}

                      {pestanaHero === 'codigo' && (
                        <div className="font-mono text-xs leading-relaxed overflow-x-auto">
                          <pre className="text-[11.5px] text-[#e9edf3]">
                            <code>{`const perfilProfesional = {
  nombre: "José María Torres Chirinos",
  grado: "Bachiller en Ing. de Sistemas (USS)",
  certificacion: "Scrum Master SMPC® (2024-2027)",
  rolActual: "Analista Full Stack @ NGR S.A.C",
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
                    className="boton-interactivo boton-pildora-magico w-full h-12 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2.5 cursor-pointer"
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
            <summary className="hover:underline">Créditos de fotografías, avatar 3D e iconografía</summary>
            <p className="mt-2 max-w-md text-[11px] leading-relaxed">
              Retrato 3D estilizado generado a partir de la fotografía oficial de LinkedIn de José María Torres Chirinos.
              Fotografías editoriales de paisaje bajo licencia Wikimedia Commons (CC BY-SA / Public Domain) y logotipos
              oficiales de tecnologías en sus colores de marca.
            </p>
          </details>
        </div>
      </footer>

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
