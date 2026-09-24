document.addEventListener("DOMContentLoaded", () => {
    // 1. Inyectar los estilos CSS globales del Header y Footer
    inyectarEstilosCSS();
    // 2. Inyectar las estructuras HTML
    inyectarHeaderFooter(); 
    // 3. Inicializar la interfaz y componentes lógicos
    marcarEnlaceActivo();
    setupMobileMenu();
    setupRealTimeSearch();
  yearElements();
});
function inyectarEstilosCSS() {
    const css = `
        /* --- ESTILOS DEL NAVBAR --- */
           .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 5%;
            position: fixed;
            top: 0; left: 0; width: 100%;
            box-sizing: border-box;
            z-index: 100;
            background: linear-gradient(to bottom, rgba(10,10,12,0.9) 0%, transparent 100%);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            flex-wrap: wrap;
        }
        .logo {
            font-size: 26px;
            font-weight: 900;
            letter-spacing: 1px;
            color: #fff;
        }
        .logo span {
            background: var(--primary-gradient, linear-gradient(45deg, #7000ff, #ff007f));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .nav-links a {
            color: var(--text-muted, #a0a0a0);
            text-decoration: none;
            margin-right: 25px;
            font-size: 15px;
            font-weight: 500;
            transition: color 0.3s;
        }
        .nav-links a:hover, .nav-links a.active { 
            color: var(--text-main, #fff); 
        }
        .nav-actions { 
            display: flex; 
            align-items: center; 
            gap: 20px; 
        }
        .search-box {
            position: relative;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 20px;
            padding: 6px 15px 6px 35px;
        }
        .search-icon { 
            position: absolute; 
            left: 12px; 
            top: 50%; 
            transform: translateY(-50%);
            color: var(--text-muted, #a0a0a0); 
        }
        #search-input {
            background: transparent; 
            border: none; 
            color: white; 
            outline: none; 
            font-size: 14px;
        }
        .menu-toggle {
            display: none;
            background: transparent;
            border: none;
            color: var(--text-main, #fff);
            cursor: pointer;
            z-index: 110;
            transition: transform 0.3s ease;
            padding: 5px;
        }
        .menu-toggle svg {
            display: block;
            width: 24px;
            height: 24px;
        }

        /* --- ESTILOS DEL FOOTER --- */
        .footer {
            background: linear-gradient(to top, #050507 0%, var(--bg-dark, #0a0a0c) 100%);
            padding: 60px 5% 30px 5%;
            margin-top: 60px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            position: relative;
            z-index: 3;
        }
        .footer-socials {
            display: flex;
            gap: 25px;
            margin-bottom: 40px;
        }
        .footer-socials a {
            color: var(--text-muted, #a0a0a0);
            font-size: 20px;
            transition: color 0.3s ease, transform 0.3s ease;
        }
        .footer-socials a:hover {
            color: var(--primary-color, #7000ff);
            transform: translateY(-3px);
        }
        .footer-links {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
            margin-bottom: 50px;
        }
        .footer-column {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .footer-column a {
            color: var(--text-muted, #a0a0a0);
            text-decoration: none;
            font-size: 14px;
            transition: color 0.2s ease;
        }
        .footer-column a:hover {
            color: var(--text-main, #fff);
        }
        .footer-brand {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            padding-top: 30px;
        }
        .footer-logo {
            font-size: 20px;
            font-weight: 900;
            letter-spacing: 0.5px;
            color: #fff;
        }
        .footer-logo span {
            background: var(--primary-gradient, linear-gradient(45deg, #7000ff, #ff007f));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .footer-copy {
            color: #55555d;
            font-size: 13px;
        }

        /* --- MEDIA QUERIES RESPONSIVAS --- */
        @media (max-width: 992px) {
            .navbar { padding: 15px 5%; }
            .menu-toggle { display: block; }
            .nav-links {
                position: fixed;
                top: 0; right: -100%; width: 280px; height: 100vh;
                background: rgba(10, 10, 12, 0.98);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                display: flex;
                flex-direction: column;
                padding: 100px 40px;
                gap: 30px;
                z-index: 105;
                transition: right 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                border-left: 1px solid rgba(255, 255, 255, 0.05);
            }
            .nav-links.active { right: 0; }
            .nav-links a { font-size: 20px; margin-right: 0; }
        }
        @media (max-width: 768px) {
            .footer-links { grid-template-columns: repeat(2, 1fr); gap: 20px; }
            .footer-brand { flex-direction: column; gap: 20px; align-items: flex-start; }
        }
        @media (max-width: 576px) {
            .navbar { padding: 15px 4%; }
            .nav-actions { gap: 10px; }
            .search-box { max-width: 140px; }
            #search-input { font-size: 12px; }
        }
    `;
    // Crear la etiqueta <style> e inyectarla en el <head>
    const styleTag = document.createElement("style");
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
}
function inyectarHeaderFooter() {
    const bodyContainer = document.querySelector("body");
    if (!bodyContainer) return;
    const headerHTML = `
         <header class="navbar">
            <div class="logo">ILEPALUSC <span>IERS</span></div>
            <button class="menu-toggle" id="menu-toggle" aria-label="Abrir menú">
                <svg xmlns="http://w3.org" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
            </button>
            <nav class="nav-links" id="nav-links">
                <a href="/index" id="nav-inicio">Inicio</a>
                <a href="/Series" id="nav-series">Series</a>
                <a href="/Peliculas" id="nav-peliculas">Películas</a>
                <a href="/Estrenos" id="nav-estrenos">Estrenos</a>

            </nav>
            <div class="nav-actions">
                <div class="search-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
                    <input type="text" id="search-input" placeholder="Buscar...">
                </div>
            </div>
        </header>
    `;

    const footerHTML = `
        <footer class="footer">
            <div class="footer-socials">
                <a href="https://www.facebook.com/ilepalusciers"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
</svg></a>
                <a href="https://www.instagram.com/ilepalusciers"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
</svg></a>
                <a href="https://x.com/ilepalusciers"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg></a>
                <a href="https://www.youtube.com/@ilepalusciers"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
</svg></a>
            </div>
            <div class="footer-links">
                <div class="footer-column">
                    <a href="/Acerca_de_nosotros">Acerca de nosotros</a>
                    <a href="/Avisos_legales">Avisos legales</a>
                    <a href="/Plataformas">Plataformas</a>
                </div>
                <div class="footer-column">
                    <a href="/Empleo">Empleo</a>
                    <a href="/Politicas_cookies">Preferencias de cookies</a>
                    <a href="/Servicios_B2B">Servicios</a>
                </div>
                <div class="footer-column">
                    <a href="/Terminos_uso">Términos de uso</a>
                    <a href="/Informacion_corporativa">Información corporativa</a>
                </div>
                <div class="footer-column">
                    <a href="/Politicas_seguridad">Seguridad</a>
                    <a href="/Politicas_privacidad">Privacidad</a>
                    <a href="/Contacto">Contáctanos</a>
                </div>
            </div>
            <div class="footer-brand">
                <div class="footer-logo">ILEPALUSC <span>IERS</span></div>
                <p class="footer-copy">&copy; <span class="year"></span> Ilepalusc Iers. Todos los derechos reservados.</p>
            </div>
        </footer>
    `;

    bodyContainer.insertAdjacentHTML("afterbegin", headerHTML);
    bodyContainer.insertAdjacentHTML("beforeend", footerHTML);
}
function marcarEnlaceActivo() {
 const path = window.location.pathname;
    const pagina = path.split("/").pop();
    
    document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));

    if (pagina === "/Series") {
        document.getElementById("nav-series")?.classList.add("active");
    } else if (pagina === "/Peliculas") {
        // ... Continuación directa después de else if (pagina === "peliculas.html") {
        document.getElementById("nav-peliculas")?.classList.add("active");
    } else if (pagina === "/index" || pagina === "") {
        document.getElementById("nav-inicio")?.classList.add("active");
    }
}
/**
 * Configura el comportamiento del menú hamburguesa en dispositivos móviles
 */
function setupMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    
    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isActive = navLinks.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", isActive);
        actualizarIconoMenu(menuToggle, isActive);
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            cerrarMenuEstructural(navLinks, menuToggle);
        });
    });

    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            cerrarMenuEstructural(navLinks, menuToggle);
        }
    });
}

/**
 * Modifica dinámicamente el SVG interno del botón para alternar entre hamburguesa y cruz (X)
 */
function actualizarIconoMenu(menuToggle, isActive) {
    const svgIcon = menuToggle.querySelector("svg");
    if (!svgIcon) return;

    if (isActive) {
        svgIcon.innerHTML = `<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>`;
        menuToggle.style.transform = "rotate(90deg)";
    } else {
        svgIcon.innerHTML = `<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>`;
        menuToggle.style.transform = "rotate(0deg)";
    }
}

/**
 * Cierra físicamente el menú móvil restaurando los parámetros aria
 */
function cerrarMenuEstructural(navLinks, menuToggle) {
    if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        actualizarIconoMenu(menuToggle, false);
    }
}

/**
 * Motor de búsqueda en tiempo real sobre el catálogo de tarjetas
 */
function setupRealTimeSearch() {
    const searchInput = document.getElementById("search-input");
    const catalogContainer = document.querySelector(".movies-grid") || document.querySelector(".catalog-container");
    
    if (!searchInput) return;

    let noResultsMessage = document.getElementById("no-results-message");
    if (!noResultsMessage && catalogContainer) {
        noResultsMessage = document.createElement("div");
        noResultsMessage.id = "no-results-message";
        noResultsMessage.innerHTML = `<p class="no-results-text" style="color: #a0a0a0; font-size: 16px; margin-top: 40px;">No se encontraron películas o series que coincidan con tu búsqueda.</p>`;
        noResultsMessage.style.display = "none";
        noResultsMessage.style.width = "100%";
        noResultsMessage.style.textAlign = "center";
        catalogContainer.appendChild(noResultsMessage);
    }

    searchInput.addEventListener("input", (e) => {
        const textoBusqueda = limpiarTexto(e.target.value);
        const tarjetas = document.querySelectorAll(".movie-card"); 
        let coincidencias = 0;

        tarjetas.forEach(tarjeta => {
            const tituloElemento = tarjeta.querySelector("h3") || tarjeta.querySelector(".movie-title") || tarjeta;
            const textoTarjeta = limpiarTexto(tituloElemento.textContent);

            if (textoTarjeta.includes(textoBusqueda)) {
                tarjeta.style.display = ""; 
                coincidencias++;
            } else {
                tarjeta.style.display = "none"; 
            }
        });

        if (noResultsMessage) {
            noResultsMessage.style.display = (coincidencias === 0 && textoBusqueda !== "") ? "block" : "none";
        }
    });
}

/**
 * Sanitiza textos removiendo diacríticos y normalizando a minúsculas
 */
function limpiarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}
 // Obtener el año actual
function yearElements(){
const currentYear = new Date().getFullYear();

// Seleccionar todos los elementos con la clase "year"
const yearElements = document.querySelectorAll(".year");

// Insertar el año en cada uno
yearElements.forEach(el => {
  el.textContent = currentYear;
});
}
