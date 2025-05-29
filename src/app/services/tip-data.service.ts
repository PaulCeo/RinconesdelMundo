import { Injectable } from '@angular/core';

// Interfaces
export interface TipSummary {
  id: string;
  title: string;
  shortDescription: string;
}
export interface TipDetail {
  title: string;
  body: string;
}
// TipDataMap es un tipo interno del servicio
type TipDataMap = {
  [key: string]: TipDetail; // La clave (key) es el 'id' del consejo
};

export interface SearchedTip extends TipDetail { // Hereda title y body de TipDetail
  id: string; // Añadimos explícitamente la propiedad id
}

@Injectable({
  providedIn: 'root'
})
export class TipDataService {

  // ¡¡¡ RECUERDA REEMPLAZAR ESTO CON TUS DATOS COMPLETOS DE TIPS !!!
  private tipData: TipDataMap = {
    vuelos: {
            title: "Busca Vuelos como un Profesional",
            body: `
                <p>Encontrar vuelos baratos requiere estrategia y paciencia. Aquí tienes algunos trucos clave para dominar el arte de la búsqueda:</p>
                <ul>
                    <li><strong>Sé Flexible con Fechas y Horas:</strong> Si tu calendario lo permite, jugar con las fechas de salida y regreso puede marcar una gran diferencia. Volar en días de semana (martes, miércoles suelen ser los más baratos) o en horarios menos populares (muy temprano por la mañana, tarde por la noche) a menudo resulta más económico que los fines de semana o vuelos a mediodía.</li>
                    <li><strong>Compara Aeropuertos Cercanos:</strong> No te limites al aeropuerto principal. Si tu ciudad de origen o destino tiene aeropuertos secundarios (a menudo utilizados por aerolíneas de bajo coste), compara los precios. A veces, el ahorro en el billete compensa el coste y tiempo extra del traslado terrestre.</li>
                    <li><strong>Usa Comparadores (¡pero verifica en la Aerolínea!):</strong> Sitios web como Skyscanner, Google Flights, Kayak, Momondo o Kiwi son herramientas fantásticas para obtener una visión general rápida de precios y rutas. Te permiten comparar múltiples aerolíneas y agencias simultáneamente. Sin embargo, una vez que encuentres una tarifa atractiva, intenta siempre verificarla y, si es posible, reservar directamente en la página web oficial de la aerolínea. Esto suele facilitar la gestión de cambios, cancelaciones, selección de asientos o equipaje adicional, y evita posibles problemas con intermediarios.</li>
                    <li><strong>Activa Alertas de Precios:</strong> Si tienes claras tus fechas y ruta pero aún no estás listo para comprar, la mayoría de los comparadores y algunas aerolíneas te permiten crear alertas de precios. Recibirás notificaciones por correo electrónico cuando las tarifas suban o bajen, ayudándote a decidir el mejor momento para comprar.</li>
                    <li><strong>Modo Incógnito y Cookies:</strong> Aunque su efectividad es debatida, no cuesta nada buscar vuelos utilizando una ventana de incógnito en tu navegador o borrando las cookies regularmente. Algunas teorías sugieren que las aerolíneas o agencias podrían rastrear tus búsquedas y aumentar los precios si detectan interés repetido.</li>
                    <li><strong>Considera Vuelos con Escalas:</strong> Los vuelos directos son indudablemente más cómodos y rápidos, pero casi siempre son más caros. Si no tienes mucha prisa y quieres ahorrar significativamente, busca opciones con una o más escalas. Valora la duración total del viaje y el tiempo de la escala (asegúrate de que sea suficiente para la conexión, pero no excesivamente largo). A veces, incluso puedes aprovechar una escala larga (layover) para hacer una visita rápida a la ciudad de conexión.</li>
                    <li><strong>Antelación Óptima para Reservar:</strong> No existe una regla mágica universal, ya que depende mucho de la ruta, la temporada y la demanda. Sin embargo, como norma general: para vuelos internacionales, reservar con 2-4 meses de antelación suele dar buenos resultados; para vuelos domésticos, 1-2 meses puede ser suficiente. Evita reservar a última hora (los precios suelen dispararse) o con demasiadísima antelación (más de 8-10 meses), ya que las tarifas podrían no ser las definitivas o más competitivas.</li>
                    <li><strong>Programas de Fidelización y Millas Aéreas:</strong> Si viajas con frecuencia, inscríbete gratuitamente en los programas de viajero frecuente de las aerolíneas que más uses o de las grandes alianzas (Star Alliance, Oneworld, SkyTeam). Acumularás millas o puntos con cada vuelo (y a veces con compras asociadas) que luego podrás canjear por vuelos gratuitos, descuentos, upgrades de clase o acceso a salas VIP.</li>
                    <li><strong>Estate Atento a Ofertas y Errores de Tarifa:</strong> Sigue a blogs de viajes, páginas de ofertas o suscríbete a boletines de aerolíneas. A veces surgen promociones especiales o, muy ocasionalmente, errores de tarifa (error fares) que permiten comprar vuelos a precios increíblemente bajos (¡actúa rápido si ves uno!).</li>
                </ul>
            `
        },
        equipaje: {
            title: "Empaca Ligero y Eficiente: El Arte del Equipaje Inteligente",
            body: `
                <p>Viajar solo con equipaje de mano o con una maleta ligera tiene enormes ventajas: más libertad de movimiento, menos tiempo perdido en aeropuertos, ahorro en tasas de facturación y menor riesgo de pérdida. ¡Menos es más!</p>
                <ul>
                    <li><strong>Haz una Lista Detallada:</strong> Antes de sacar nada del armario, siéntate y haz una lista realista de todo lo que crees que necesitarás, día por día o por tipo de actividad. Luego, sé crítico: revisa la lista y elimina todo aquello que sea "por si acaso" o que puedas conseguir fácilmente en destino.</li>
                    <li><strong>Consulta el Clima con Precisión:</strong> No basta con saber si hará frío o calor. Mira la previsión detallada para tus fechas y destino(s). ¿Lloverá? ¿Habrá viento? ¿Variará mucho la temperatura entre día y noche? Esto te permitirá llevar solo la ropa adecuada.</li>
                    <li><strong>Ropa Versátil y Combinable (Armario Cápsula):</strong> Elige prendas que puedas usar en diferentes situaciones y que combinen fácilmente entre sí. Opta por colores neutros (negro, gris, azul marino, beige) como base y añade toques de color con accesorios (pañuelos, bisutería). Una buena regla es que cada parte de abajo combine con al menos 2-3 partes de arriba.</li>
                    <li><strong>El Poder de Enrollar y los Cubos Organizadores:</strong> Enrollar la ropa en lugar de doblarla suele ahorrar espacio y reducir las arrugas. Utiliza cubos organizadores (packing cubes) para agrupar prendas por tipo (camisetas, pantalones, ropa interior) y comprimirlas aún más, además de mantener la maleta ordenada.</li>
                    <li><strong>Capas, no Volumen:</strong> En lugar de un abrigo muy grueso, lleva varias capas más finas (camiseta térmica, polar, cortavientos impermeable) que puedas ponerte o quitarte según la temperatura y que ocupan menos espacio individualmente.</li>
                    <li><strong>Lava Ropa Durante el Viaje:</strong> Para viajes largos, no necesitas llevar ropa para cada día. Planea lavar ropa cada ciertos días. Puedes hacerlo en lavanderías (muy comunes en hostels y ciudades), en el lavabo del hotel (lleva un poco de jabón en láminas o líquido concentrado) o usando servicios de lavandería locales.</li>
                    <li><strong>Neceser Minimalista y Sólido:</strong> Trasvasa tus líquidos (champú, gel, crema...) a envases de viaje de 100ml o menos si vas en cabina (recuerda la bolsa transparente). Mejor aún: busca alternativas sólidas (champú en pastilla, jabón sólido, desodorante en barra) que no cuentan como líquidos y duran mucho. Lleva solo el maquillaje imprescindible.</li>
                    <li><strong>Calzado Estratégico:</strong> Es lo que más pesa y ocupa. Limítate a 2-3 pares como máximo: uno muy cómodo para caminar (zapatillas deportivas o de trekking), uno un poco más arreglado pero aún cómodo si lo necesitas (botines, zapatos planos), y quizás unas sandalias/chanclas ligeras (para playa, ducha, descanso). Lleva puesto el par más voluminoso durante el viaje.</li>
                    <li><strong>Digitaliza Documentos y Libros:</strong> Escanea o haz fotos de tus documentos importantes y guárdalos en la nube. En lugar de libros pesados, usa un e-reader o lee en tu tablet/móvil.</li>
                    <li><strong>Equipaje de Mano: Tu Kit de Supervivencia:</strong> Incluye siempre medicinas esenciales, una muda de ropa interior y camiseta, cargadores, adaptadores, tus documentos, dinero/tarjetas, objetos de valor y cualquier cosa que no puedas permitirte perder o que necesites durante el vuelo.</li>
                    <li><strong>Pesa tu Equipaje Antes de Salir:</strong> Evita sorpresas desagradables y cargos extra en el aeropuerto pesando tanto tu maleta facturada como tu equipaje de mano en casa.</li>
                </ul>
                <p>Recuerda: casi todo lo que olvides se puede comprar en destino. ¡Viaja ligero, viaja feliz!</p>
            `
        },
        documentacion: {
            title: "Documentación Imprescindible: ¡Que no te Falte Nada!",
            body: `
                <p>Tener la documentación correcta, vigente y organizada es absolutamente fundamental para cualquier viaje, especialmente internacional. Un descuido aquí puede significar no poder embarcar o incluso ser deportado.</p>
                <ul>
                    <li><strong>Pasaporte Válido:</strong> Es tu documento de identidad internacional principal.
                        <ul>
                            <li><strong>Caducidad:</strong> ¡Verifícala con mucha antelación! La mayoría de los países exigen que tu pasaporte tenga una validez mínima de <strong>6 meses</strong> desde la fecha prevista de *salida* de su territorio (no solo de entrada). Si caduca antes, renuévalo ya.</li>
                            <li><strong>Páginas Libres:</strong> Asegúrate de tener suficientes páginas en blanco para los sellos de entrada/salida y posibles visados. Algunos países requieren 1 o 2 páginas completamente libres.</li>
                            <li><strong>Estado:</strong> Debe estar en buen estado, sin roturas ni daños significativos.</li>
                        </ul>
                    </li>
                    <li><strong>Visados (si son necesarios):</strong> Es tu responsabilidad investigar si necesitas un visado para entrar a cada país que visites según tu nacionalidad.
                        <ul>
                            <li>Consulta SIEMPRE las webs oficiales de las embajadas o consulados del país de destino en tu país de origen, o el Ministerio de Asuntos Exteriores. La información en blogs o foros puede estar desactualizada.</li>
                            <li>Tramítalo con muchísima antelación. Algunos visados requieren entrevistas, documentación compleja o tardan semanas/meses en procesarse.</li>
                            <li>Considera las e-Visas (visados electrónicos) si están disponibles para tu nacionalidad y destino; suelen ser más rápidas y cómodas de obtener online.</li>
                            <li>Si haces escalas largas (layover), verifica si necesitas visado de tránsito para ese país.</li>
                        </ul>
                    </li>
                    <li><strong>DNI / Documento Nacional de Identidad:</strong> Aunque solo sirve para viajar dentro de ciertas zonas (como la UE/Schengen para europeos), es muy recomendable llevarlo como segunda identificación oficial por si pierdes el pasaporte.</li>
                    <li><strong>Billetes de Transporte:</strong> Ten a mano (impresos o digitales en el móvil con batería) los billetes de avión, tren, autobús, ferry... Guarda también los correos de confirmación con los localizadores de reserva. A veces te piden mostrar el billete de salida del país en inmigración.</li>
                    <li><strong>Reservas de Alojamiento:</strong> Guarda las confirmaciones (impresas o digitales). Pueden pedírtelas en inmigración o ser útiles para indicar direcciones.</li>
                    <li><strong>Póliza de Seguro de Viaje:</strong> Lleva contigo los detalles de la póliza, el número de certificado y, fundamental, el número de teléfono de asistencia 24 horas. Tenlo accesible fácilmente.</li>
                    <li><strong>Carnet de Conducir (y Permiso Internacional - PIC):</strong> Si tienes intención de alquilar un coche, lleva tu carnet de conducir nacional. Investiga si además necesitas el Permiso Internacional de Conducción para tu destino. Es obligatorio en muchos países fuera de la UE y recomendable en otros. Se tramita en las oficinas de tráfico de tu país.</li>
                    <li><strong>Certificados de Vacunación Internacional:</strong> Obligatorio para la fiebre amarilla si viajas desde/hacia zonas endémicas (muchos países de África y Sudamérica). Consulta los requisitos sanitarios específicos del destino. Lleva tu cartilla amarilla de vacunación internacional.</li>
                    <li><strong>Otros Documentos Útiles:</strong> Tarjeta sanitaria (europea si aplica), carnets de estudiante/joven/profesor/alberguista (para descuentos), datos de contacto de emergencia, carta de invitación (si aplica), certificado de antecedentes penales (muy raro, solo para ciertos visados/países).</li>
                    <li><strong>¡COPIAS DIGITALES Y FÍSICAS!:</strong> Este es el consejo más importante. Antes de irte:
                        <ul>
                            <li>Haz fotocopias de la página de datos de tu pasaporte, visados, DNI, carnets... Guarda una copia separada de los originales (ej. en la maleta facturada si llevas el original contigo).</li>
                            <li>Escanea o haz fotos claras de todos estos documentos y guárdalos de forma segura en la nube (Google Drive, Dropbox, OneDrive...), envíatelos a tu propio email y/o guárdalos en una memoria USB. Poder acceder a ellos online en caso de pérdida o robo es crucial.</li>
                        </ul>
                    </li>
                </ul>
            `
        },
        seguro: {
            title: "No Viajes Sin Seguro: Tu Red de Seguridad Global",
            body: `
                <p>Contratar un buen seguro de viaje antes de partir es una de las decisiones más inteligentes que puedes tomar. Puede parecer un gasto extra, pero te protege de costes potencialmente astronómicos y problemas logísticos ante imprevistos. Piensa en él como tu ángel de la guarda viajero.</p>
                <h4>Coberturas Clave a Buscar:</h4>
                <ul>
                    <li><strong>Asistencia Médica por Enfermedad o Accidente:</strong> ¡La más importante! Debe cubrir gastos médicos, quirúrgicos, farmacéuticos y de hospitalización en el extranjero. Fíjate bien en el <strong>límite de cobertura</strong>: para destinos como EEUU, Canadá, Japón o Suiza, busca límites altos (mínimo 100.000€/$ , idealmente 300.000€/$ o más). Para Europa, puede ser menor si tienes Tarjeta Sanitaria Europea, pero aún así es recomendable un seguro privado para cubrir lo que la TSE no cubre (repatriación, etc.). Verifica si cubre odontología de urgencia.</li>
                    <li><strong>Repatriación Sanitaria y Funeraria:</strong> Crucial. Cubre el traslado médico a tu país de origen si es necesario por la gravedad de la situación, o el traslado del cuerpo en caso de fallecimiento. Estos costes pueden ser altísimos (decenas o cientos de miles de euros).</li>
                    <li><strong>Cancelación o Interrupción del Viaje:</strong> Te reembolsa los gastos no recuperables (vuelos, alojamiento, tours pagados) si tienes que cancelar el viaje antes de salir o interrumpirlo una vez iniciado, por causas graves y justificadas (enfermedad/accidente grave tuyo o familiar directo, fallecimiento, despido laboral, convocatoria judicial...). Lee atentamente la lista de causas cubiertas y los límites de reembolso. A menudo se ofrece como cobertura opcional.</li>
                    <li><strong>Equipaje (Robo, Pérdida, Daño):</strong> Cubre la pérdida total o parcial, robo o daños materiales sufridos por tu equipaje facturado o a veces el de mano, durante el transporte o estancia. Verifica los límites máximos por objeto y el total de la cobertura. Guarda facturas de compra de objetos valiosos. La gestión suele requerir denuncia policial y reclamación a la aerolínea primero (Property Irregularity Report - PIR).</li>
                    <li><strong>Demoras en Transporte y Pérdida de Conexiones:</strong> Algunas pólizas ofrecen compensación o reembolso de gastos básicos (comida, alojamiento, artículos de primera necesidad) si tu transporte sufre retrasos significativos (más de X horas) o si pierdes una conexión por causas ajenas a ti (retraso del vuelo anterior, overbooking...).</li>
                    <li><strong>Responsabilidad Civil Privada:</strong> Te protege si accidentalmente causas daños físicos o materiales a terceras personas durante tu viaje (ej. rompes algo en una tienda, causas un pequeño accidente no automovilístico...).</li>
                    <li><strong>Adelanto de Fondos o Gastos Legales:</strong> En caso de problemas legales o necesidad urgente de fondos por robo, etc.</li>
                </ul>
                <h4>Aspectos a Considerar:</h4>
                <ul>
                    <li><strong>Franquicia (Deductible/Excess):</strong> Es la cantidad que tienes que pagar tú de tu bolsillo antes de que el seguro empiece a cubrir para ciertas coberturas (a veces equipaje o cancelación). Busca pólizas sin franquicia o con una franquicia baja, especialmente para gastos médicos (¡idealmente sin franquicia médica!).</li>
                    <li><strong>Actividades Cubiertas:</strong> Si vas a practicar deportes considerados de aventura o riesgo (trekking a gran altitud, buceo con botella, esquí fuera de pista, surf, escalada, puenting...), verifica que estén incluidos explícitamente en la cobertura estándar o si necesitas contratar un suplemento o una póliza deportiva específica.</li>
                    <li><strong>Condiciones Médicas Preexistentes:</strong> Sé totalmente honesto al contratar. Si tienes enfermedades crónicas o condiciones médicas preexistentes, informa a la aseguradora. Algunas las excluyen, otras las cubren con limitaciones o con un sobrecoste. No declararlas puede invalidar la póliza.</li>
                    <li><strong>Ámbito Geográfico y Duración:</strong> Asegúrate de que la póliza cubra todos los países que visitarás (¡ojo con exclusiones específicas!) y durante las fechas exactas de tu viaje (desde que sales de casa hasta que vuelves).</li>
                    <li><strong>Tipo de Póliza:</strong> <strong>Viaje único</strong> (cubre un viaje concreto), <strong>anual multiviaje</strong> (cubre todos los viajes de hasta X días que hagas en un año, suele compensar si viajas 2-3 veces o más), <strong>larga estancia</strong> (para viajes de varios meses), <strong>familiar</strong>, <strong>de estudios</strong>... elige la modalidad que mejor se adapte a tus planes.</li>
                    <li><strong>Proceso de Asistencia y Reclamación:</strong> ¿Cómo contactar en caso de emergencia (teléfono gratuito internacional, app, email)? ¿Requieren autorización previa para gastos médicos (excepto urgencias vitales)? ¿Tienes que pagar tú primero y luego pedir reembolso (presentando facturas y informes) o pagan ellos directamente al hospital (en casos graves)? Lee bien el procedimiento.</li>
                </ul>
                <p><strong>Conclusión:</strong> Compara precios y, sobre todo, coberturas y límites de diferentes compañías especializadas en seguros de viaje (IATI Seguros, Chapka Assurances, Intermundial, World Nomads, SafetyWing, Heymondo...). Lee opiniones y experiencias de otros viajeros. No te quedes solo con el seguro básico (si lo tiene) de tu tarjeta de crédito, ya que suele tener coberturas muy limitadas y muchas exclusiones. ¡Viaja tranquilo, viaja asegurado!</p>
            `
        },
         planificacion: {
            title: "Investiga y Planifica (¡Pero con Flexibilidad!)",
            body: `
                <p>Una buena planificación es la base para un viaje exitoso y sin estrés, permitiéndote aprovechar al máximo tu tiempo y presupuesto. Sin embargo, es crucial no caer en la sobreplanificación y dejar espacio para la improvisación y las sorpresas que depare el camino.</p>
                <ul>
                    <li><strong>Define tu Estilo y Prioridades:</strong> ¿Qué buscas en este viaje? ¿Relax total en una playa? ¿Aventura y adrenalina? ¿Inmersión cultural profunda? ¿Recorrer ciudades y museos? ¿Un viaje gastronómico? ¿Presupuesto mochilero ajustado o buscas más confort? Ser claro con tus prioridades te ayudará a elegir el destino adecuado, el tipo de alojamiento y las actividades que realmente disfrutarás.</li>
                    <li><strong>Investigación Profunda del Destino:</strong> Una vez elegido el destino (o mientras lo eliges), sumérgete en la investigación:
                        <ul>
                            <li><strong>Cuándo ir:</strong> Clima, temporadas (alta, baja, media), eventos especiales o festivales.</li>
                            <li><strong>Cultura y Sociedad:</strong> Costumbres locales, normas de etiqueta (saludos, vestimenta, comportamiento en público), valores importantes, religión(es) predominante(s), posibles choques culturales, historia básica.</li>
                            <li><strong>Seguridad y Salud:</strong> Situación general, zonas a evitar, timos comunes, recomendaciones sanitarias, vacunas necesarias o recomendadas y precauciones contra enfermedades locales (malaria, dengue...). Consulta fuentes oficiales (Ministerio de Exteriores de tu país) y blogs/foros recientes.</li>
                            <li><strong>Idioma:</strong> ¿Qué idioma(s) se hablan? Aprende frases básicas de cortesía.</li>
                            <li><strong>Moneda y Presupuesto:</strong> Tipo de cambio, coste de vida aproximado (alojamiento, comida, transporte), formas de pago habituales.</li>
                            <li><strong>Transporte:</strong> Cómo moverse dentro del país y de las ciudades (opciones, costes, cómo reservar).</li>
                            <li><strong>Gastronomía:</strong> Platos típicos que no te puedes perder, bebidas locales, precauciones alimentarias.</li>
                            <li><strong>Alojamiento:</strong> Tipos disponibles (hoteles, hostels, guesthouses, Airbnb...), precios medios, zonas recomendadas para alojarse según tus intereses y presupuesto.</li>
                        </ul>
                        <em>Fuentes útiles: Guías de viaje actualizadas (Lonely Planet, Rough Guides, Bradt...), blogs de viajes especializados en el destino, foros de viajeros (Tripadvisor, Thorn Tree), webs oficiales de turismo del país/región, documentales.</em>
                    </li>
                    <li><strong>Esboza un Itinerario Lógico y Flexible:</strong>
                        <ul>
                            <li>Haz una lista realista de lugares y actividades que te gustaría ver/hacer. Prioriza tus "imprescindibles".</li>
                            <li>Organiza estos puntos en un mapa para crear una ruta geográfica lógica que minimice los tiempos y costes de traslado. Usa Google Maps para visualizar distancias.</li>
                            <li>Establece un ritmo sostenible. No intentes abarcar demasiado. Es preferible disfrutar bien de menos lugares que ver muchos corriendo. Calcula tiempos de viaje realistas entre puntos, añadiendo margen para imprevistos.</li>
                            <li><strong>¡Deja días libres o huecos!</strong> No planifiques cada minuto. Deja espacio para descansar, perderte, descubrir algo inesperado o simplemente cambiar de plan si algo te gusta mucho o surge un imprevisto. La espontaneidad es parte de la magia.</li>
                        </ul>
                    </li>
                    <li><strong>Herramientas Digitales para la Organización:</strong>
                        <ul>
                            <li><strong>Mapas Offline:</strong> Google Maps (descargar zona) o Maps.me son esenciales. Marca tus puntos de interés.</li>
                            <li><strong>Itinerarios:</strong> Apps como TripIt (importa reservas de emails), Wanderlog (planificador visual) o incluso una hoja de cálculo (Google Sheets, Excel) o un documento (Google Docs, Word) pueden ayudarte a organizar días, reservas, direcciones y notas.</li>
                            <li><strong>Transporte:</strong> Apps de aerolíneas, trenes (Trainline, Omio, apps locales), buses, VTCs (Uber, Grab...).</li>
                            <li><strong>Otros:</strong> Traducción (Google Translate), conversión de moneda (XE Currency), alojamiento (Booking, Hostelworld, Airbnb).</li>
                        </ul>
                    </li>
                    <li><strong>Reserva Anticipada (Solo lo Necesario):</strong> Reserva con antelación vuelos internacionales, alojamiento en lugares muy demandados o si viajas en temporada alta, trenes específicos (ej. nocturnos), coche de alquiler (especialmente si es automático o campervan), y entradas para atracciones con cupos limitados o que generan colas enormes (Alhambra, Vaticano, Machu Picchu...). Para el resto, a menudo puedes reservar sobre la marcha o con pocos días de antelación, ganando flexibilidad.</li>
                    <li><strong>Prepara un Plan B Mental:</strong> Piensa brevemente qué harías si algo falla (vuelo cancelado, mal tiempo, lugar cerrado...). Tener una alternativa en mente reduce el estrés si ocurre.</li>
                    <li><strong>La Planificación es Parte del Viaje:</strong> Disfruta también del proceso de investigar y soñar con tu destino. ¡Pero recuerda que el objetivo final es disfrutar de la experiencia una vez estés allí!</li>
                </ul>
            `
        },
         presupuesto: {
            title: "Controla tu Presupuesto: Viaja Más y Mejor Sin Arruinarte",
            body: `
                <p>Un presupuesto bien planificado es la base para disfrutar de tu viaje sin preocupaciones económicas y, a menudo, permite viajar más tiempo o más lejos. No se trata de ser tacaño, sino inteligente con tu dinero.</p>
                <ul>
                    <li><strong>Define tu Límite Total y Sé Realista:</strong> Antes de nada, decide cuánto dinero estás dispuesto y puedes gastar en este viaje concreto. Considera todos los posibles gastos: vuelos, seguro, visados, vacunas, equipo, alojamiento, comida, transporte, actividades, compras, y un colchón para imprevistos.</li>
                    <li><strong>Investiga a Fondo el Coste de Vida del Destino:</strong> Es el paso más crucial. ¿Es un destino caro (Suiza, Japón, Escandinavia), medio (Europa Occidental, EEUU, Australia) o barato (Sudeste Asiático, partes de Latinoamérica o Europa del Este)? Usa webs como Numbeo (compara coste de vida), Price of Travel (índice Backpacker) o busca en blogs de viajes ("presupuesto para X días en Y país") para estimar costes diarios promedio de:
                        <ul>
                            <li><strong>Alojamiento:</strong> ¿Cuánto cuesta una cama en dormitorio de hostel? ¿Una habitación doble en guesthouse/hotel económico? ¿Un hotel medio? ¿Airbnb?</li>
                            <li><strong>Comida:</strong> ¿Precio de una comida callejera? ¿Un menú en restaurante local? ¿Una cena en restaurante turístico? ¿Compra en supermercado?</li>
                            <li><strong>Transporte Local:</strong> ¿Coste de un billete de metro/bus? ¿Tarifa media de un taxi/tuk-tuk?</li>
                            <li><strong>Actividades y Entradas:</strong> ¿Precio de museos, ruinas, tours organizados, actividades de aventura?</li>
                        </ul>
                    </li>
                    <li><strong>Desglosa y Estima Gastos Principales:</strong>
                        <ul>
                            <li><strong>Gastos Fijos (Pre-viaje):</strong> Vuelos internacionales/principales, seguro de viaje obligatorio, visados, vacunas específicas, equipo esencial que necesites comprar.</li>
                            <li><strong>Gastos Variables (Durante el viaje):</strong> Alojamiento (estima un coste por noche x nº noches), Comida (estima un coste diario x nº días), Transporte interno (vuelos, trenes, buses, alquiler coche/moto...), Actividades/Entradas (suma las que planeas hacer), Compras/Souvenirs (asigna una cantidad), Varios/Imprevistos (una partida para gastos menores o emergencias).</li>
                        </ul>
                    </li>
                    <li><strong>Calcula un Presupuesto Diario Guía:</strong> Resta los gastos fijos pre-viaje de tu presupuesto total. Divide el dinero restante entre el número total de días de tu viaje. Esto te dará una cifra diaria promedio como referencia para cubrir alojamiento, comida, transporte local, actividades y extras. Obviamente, unos días gastarás más y otros menos, pero te sirve para controlar.</li>
                    <li><strong>Prioriza: ¿En qué Quieres Gastar?:</strong> No todos valoramos lo mismo. Decide si prefieres invertir más en experiencias únicas (un vuelo en globo, un curso de buceo) y ahorrar en alojamiento, o si prefieres comodidad en hoteles y comer más sencillo. ¿Eres de museos o de naturaleza? Asigna más presupuesto a lo que más valoras y sé consciente de dónde puedes recortar.</li>
                    <li><strong>Busca Activamente Formas de Ahorrar:</strong>
                        <ul>
                            <li><strong>Transporte:</strong> Flexibilidad en fechas/aeropuertos, escalas, viajar en temporada baja/media, usar transporte público local en lugar de taxis/VTCs, caminar mucho, considerar buses/trenes nocturnos (ahorras noche de alojamiento).</li>
                            <li><strong>Alojamiento:</strong> Hostels (dormitorios o privados), guesthouses familiares, Airbnb (habitaciones o apartamentos con cocina), Couchsurfing (alojamiento gratuito a cambio de interacción cultural), housesitting/petsitting (cuidar casas/mascotas a cambio de alojamiento). Reservar con antelación. Evitar zonas híper-turísticas o buscar barrios bien comunicados pero más residenciales.</li>
                            <li><strong>Comida:</strong> Cocinar algunas comidas si tu alojamiento tiene cocina (desayunos, cenas sencillas), comer en mercados locales y puestos callejeros (con precaución), aprovechar menús del día, hacer picnics en parques, comprar snacks/bebidas en supermercados en lugar de tiendas turísticas, limitar el consumo de alcohol y las cenas en restaurantes caros. Llevar siempre una botella de agua reutilizable y rellenarla.</li>
                            <li><strong>Actividades:</strong> Busca días/horas con entradas gratuitas o con descuento a museos/atracciones, aprovecha los free walking tours (dejando una propina justa al final), disfruta de parques, playas y naturaleza (a menudo gratis), busca alternativas locales menos masificadas a los tours más turísticos, usa carnets de descuento si aplican (estudiante, joven, profesor...).</li>
                        </ul>
                    </li>
                    <li><strong>Registra tus Gastos Diariamente:</strong> Clave para no desviarte. Usa una app de control de gastos (Splitwise - genial si viajas en grupo, Trabee, Spendee, Fintonic...) o una simple libreta/Excel. Anota cada gasto al final del día. Te hará consciente de dónde se va el dinero y te permitirá ajustar si es necesario.</li>
                    <li><strong>Gestión Inteligente del Dinero y Tarjetas:</strong>
                        <ul>
                            <li>Avisa a tu banco de las fechas y países de tu viaje para evitar bloqueos por seguridad.</li>
                            <li>Infórmate MUY BIEN sobre las comisiones que te aplica tu banco por sacar dinero en cajeros extranjeros y por pagar en divisa extranjera (comisión por cambio de divisa). ¡Pueden sumar mucho!</li>
                            <li>Considera obtener tarjetas específicas para viajeros (Revolut, N26, Wise, Bnext...) que ofrezcan retiradas gratuitas o con bajas comisiones en el extranjero y buenos tipos de cambio (interbancario).</li>
                            <li>Lleva una combinación de métodos de pago: algo de efectivo local para pequeños gastos/transporte/mercados, una tarjeta de débito (idealmente una de viajero) para sacar de cajeros, y una o dos tarjetas de crédito diferentes (Visa/Mastercard) para pagos grandes, reservas de hotel/coche o emergencias.</li>
                            <li>Guarda dinero/tarjetas en lugares diferentes y seguros (ej. parte en una riñonera interior bajo la ropa, parte en la mochila principal, parte en la caja fuerte del hotel). Nunca lleves todo junto.</li>
                        </ul>
                    </li>
                    <li><strong>¡El Colchón para Imprevistos es Sagrado!:</strong> Reserva siempre una parte de tu presupuesto total (un 10-15% es una buena cifra orientativa) para gastos inesperados: una emergencia médica no cubierta totalmente, un taxi urgente, tener que comprar un billete nuevo, reemplazar algo perdido/roto... Te dará una enorme tranquilidad mental.</li>
                </ul>
            `
        },
         aeropuerto: {
            title: "Supera el Aeropuerto Sin Estrés: Guía Rápida y Eficaz",
            body: `
                <p>El paso por el aeropuerto puede ser una fuente de estrés, pero con un poco de preparación y conocimiento del proceso, puedes navegarlo sin problemas y empezar tu viaje con buen pie.</p>
                <ol>
                    <li><strong>Check-in Online Anticipado:</strong> La mayoría de aerolíneas permiten hacer el check-in online 24-48 horas antes del vuelo. Hazlo desde casa. Te ahorra tiempo en el aeropuerto y a menudo te permite elegir asiento. Descarga la tarjeta de embarque en tu móvil (haz captura de pantalla por si acaso) y/o imprímela si lo prefieres o la aerolínea lo requiere.</li>
                    <li><strong>Llega con Tiempo de Sobra:</strong> Es la regla de oro. No apures. Calcula el tiempo de traslado al aeropuerto (considerando posible tráfico) y suma el tiempo recomendado por la aerolínea:
                        <ul>
                            <li><strong>Vuelos Domésticos / Cortos (ej. dentro de Schengen):</strong> Mínimo 1.5 - 2 horas antes de la hora de salida del vuelo.</li>
                            <li><strong>Vuelos Internacionales:</strong> Mínimo 3 horas antes de la salida. Para vuelos a/desde EEUU, a veces incluso recomiendan 3.5-4 horas por controles adicionales.</li>
                        </ul>
                        Es mejor esperar un poco en la puerta de embarque tomando un café que correr estresado o perder el vuelo por colas inesperadas en facturación, seguridad o inmigración.
                    </li>
                    <li><strong>Documentación Esencial Preparada y Accesible:</strong> Ten siempre a mano (en un bolsillo seguro y accesible de tu bolso de mano o chaqueta, NO en la maleta que vas a facturar) tu pasaporte (o DNI si aplica) y tu tarjeta de embarque (digital o impresa).</li>
                    <li><strong>Facturación de Equipaje (si aplica):</strong> Si necesitas facturar maleta:
                        <ul>
                            <li>Si hiciste check-in online: Busca los mostradores específicos de "Baggage Drop-off" o "Entrega de equipaje" de tu aerolínea, suelen ser más rápidos.</li>
                            <li>Si no hiciste check-in online: Ve a los mostradores de facturación ("Check-in") regulares de tu aerolínea.</li>
                        </ul>
                         Verifica el peso máximo permitido para tu maleta facturada (y de mano) antes de salir de casa para evitar cargos por exceso de equipaje. Coloca una etiqueta identificativa con tu nombre y teléfono en la maleta. Quita etiquetas de vuelos anteriores.
                    </li>
                    <li><strong>Prepara tu Equipaje de Mano para el Control de Seguridad:</strong> Para agilizar el paso y evitar problemas:
                        <ul>
                            <li><strong>Líquidos (<100ml):</strong> Todos los envases individuales (champú, gel, crema, pasta dientes...) deben ser de 100ml/100g o menos. Deben ir todos juntos en una única bolsa de plástico transparente con cierre tipo zip (aprox. 1 litro / 20x20cm). Solo una bolsa por pasajero. Ten esta bolsa preparada para sacarla fácilmente de tu equipaje y ponerla visible en la bandeja del control. (Medicamentos líquidos con receta médica o comida infantil pueden tener excepciones, consulta la normativa).</li>
                            <li><strong>Aparatos Electrónicos Grandes:</strong> Ordenadores portátiles, tablets y a veces cámaras réflex grandes o e-readers deben sacarse de sus fundas/mochilas y colocarse en una bandeja separada para pasar por el escáner. Tenlos localizados y accesibles para sacarlos y guardarlos rápidamente.</li>
                            <li><strong>Abrigos, Chaquetas, Bufandas, Cinturones, Relojes:</strong> Prepárate para quitarte estas prendas y objetos metálicos de los bolsillos (monedas, llaves, móvil...). Coloca todo en la bandeja.</li>
                            <li><strong>Calzado:</strong> En algunos países (especialmente EEUU) o si llevas botas, zapatos con plataforma o con partes metálicas importantes, es muy probable que te pidan descalzarte y pasar el calzado por el escáner. Lleva calcetines limpios por si acaso.</li>
                        </ul>
                    </li>
                     <li><strong>Paso por el Control de Seguridad (Rayos X):</strong> Coloca todo (equipaje de mano, bolsa de líquidos, electrónicos, abrigo, objetos personales...) en las bandejas que te indiquen. Empuja tus bandejas hacia la cinta del escáner. Pasa tú por el arco detector de metales o el escáner corporal cuando te lo indiquen, siguiendo las instrucciones del personal. Recoge tus pertenencias al otro lado con calma, verificando meticulosamente que no te dejas nada en ninguna bandeja (¡es un punto común de olvidos!). Sé paciente y colabora si te piden una inspección adicional.</li>
                    <li><strong>Control de Pasaportes (Inmigración/Emigración):</strong> Requerido para vuelos internacionales fuera de tu zona de libre circulación (ej. salir/entrar a la zona Schengen, EEUU, Reino Unido, etc.). Ten tu pasaporte y tarjeta de embarque listos. Pueden hacerte preguntas sobre el motivo y duración de tu viaje, dónde te alojarás, etc. Responde con tranquilidad.</li>
                    <li><strong>Localiza tu Puerta de Embarque (Gate) y Verifica Horarios:</strong> Una vez superados todos los controles, busca tu número de puerta de embarque en las pantallas de información ("Departures / Salidas"). Fíjate bien en la terminal y la zona (A, B, C...). Sigue las señales. Calcula el tiempo necesario para llegar, algunas terminales son enormes y requieren caminar mucho o incluso tomar trenes internos. Una vez en la zona de tu puerta, vuelve a verificar la información en la pantalla de la propia puerta (puede haber cambios de última hora). Fíjate en la hora de inicio del embarque ("Boarding time").</li>
                    <li><strong>Espera y Embarque (Boarding):</strong> Dirígete a tu puerta con tiempo. Puedes aprovechar para ir al baño, rellenar tu botella de agua o comprar algo de última hora. Estate atento a los anuncios por megafonía. Normalmente llaman a embarcar por grupos o zonas (priority, familias con niños pequeños, y luego por número de fila o zona, indicado en tu tarjeta de embarque). Ten de nuevo tu tarjeta de embarque y pasaporte/DNI listos para mostrarlos al personal de puerta al embarcar.</li>
                    <li><strong>¡Relájate y a Volar!:</strong> Una vez dentro del avión, busca tu número de asiento, guarda tu equipaje de mano correctamente (en el compartimento superior o bajo el asiento delantero, no bloqueando pasillos o salidas), siéntate, abróchate el cinturón cuando lo indiquen, pon tu móvil en modo avión y prepárate para disfrutar del vuelo.</li>
                </ol>
            `
        },
         vuelo: {
            title: "Haz tu Vuelo Más Agradable: Consejos para Sobrevivir en las Alturas",
            body: `
                <p>Volar puede ser emocionante, pero también agotador, especialmente en vuelos largos. Con estos consejos, puedes hacer la experiencia mucho más cómoda y llevadera, llegando a tu destino más descansado y de mejor humor.</p>
                <ul>
                    <li><strong>Selección Estratégica de Asiento:</strong> Si la aerolínea lo permite (a veces pagando un extra, otras veces gratis al hacer check-in online), elegir tu asiento puede marcar una gran diferencia en tu comodidad.
                        <ul>
                            <li><strong>Ventanilla:</strong> Ideal si quieres dormir apoyando la cabeza en la pared, si te encanta mirar las nubes o el paisaje durante el despegue y aterrizaje (si es de día), y si prefieres no ser molestado por los vecinos de asiento que quieran levantarse. El principal inconveniente es que tendrás que molestar tú para salir.</li>
                            <li><strong>Pasillo:</strong> Te da libertad para levantarte cuando quieras sin pedir permiso, facilitando ir al baño, estirar las piernas o acceder al equipaje de mano superior. Es la mejor opción si eres alto, necesitas moverte frecuentemente o vas mucho al baño. El inconveniente es que te pueden molestar tus vecinos al salir, el carrito de bebidas/comida puede rozarte y tendrás menos privacidad para dormir.</li>
                            <li><strong>Asientos en Mamparas (Bulkhead) / Salidas de Emergencia:</strong> Su gran ventaja es el espacio extra para las piernas. Sin embargo, suelen tener desventajas: a menudo no hay asiento delantero bajo el que guardar objetos pequeños durante despegue/aterrizaje; la mesita y la pantalla de entretenimiento suelen estar alojadas en el reposabrazos, haciéndolo fijo y a veces más estrecho; puedes sentir más frío; y las salidas de emergencia tienen restricciones (no aptas para niños/bebés, personas con movilidad reducida o que no entiendan las instrucciones de seguridad en el idioma requerido por la tripulación).</li>
                            <li><strong>¿Qué Asientos Evitar?:</strong> Generalmente, las últimas filas del avión (suelen estar cerca de los baños y la cocina/galley, lo que implica más ruido, olores y tránsito de gente, además de que a veces estos asientos no se reclinan), y las filas justo delante de una salida de emergencia o mampara (tampoco suelen reclinarse). Consulta webs como SeatGuru.com introduciendo tu aerolínea y número de vuelo para ver mapas detallados del avión y comentarios sobre los mejores y peores asientos.</li>
                        </ul>
                    </li>
                    <li><strong>Vestimenta: Capas, Comodidad y Calcetines de Repuesto:</strong> La comodidad es primordial. Olvídate de la ropa ajustada o tejidos incómodos. Opta por pantalones elásticos o cómodos, camiseta de algodón, y lleva un jersey, sudadera o chaqueta ligera, además de un pañuelo o bufanda grande. Vestir por capas te permite adaptarte fácilmente a la temperatura de la cabina, que puede variar mucho (desde frío polar a calor). Lleva calcetines cómodos y considera llevar un par extra; quitarse los zapatos durante un vuelo largo es un gran alivio (pero sé considerado con los olores). Los calcetines de compresión pueden ayudar a mejorar la circulación en vuelos muy largos.</li>
                    <li><strong>Hidratación Fundamental:</strong> El aire en la cabina del avión es extremadamente seco (similar al de un desierto). Esto provoca deshidratación, que a su vez causa fatiga, dolor de cabeza y aumenta el jet lag. Bebe abundante agua antes, durante y después del vuelo. Lleva tu propia botella reutilizable vacía (para pasar el control de seguridad) y pide a la tripulación que te la rellene o llénala en las fuentes después del control. Evita o limita el consumo de alcohol y bebidas con cafeína (café, té negro, refrescos de cola), ya que tienen efecto diurético y empeoran la deshidratación.</li>
                    <li><strong>Muévete y Estírate Regularmente:</strong> En vuelos largos (>3-4 horas), es muy importante no permanecer inmóvil todo el tiempo. Levántate cada hora o dos (cuando el servicio lo permita y la señal de cinturones esté apagada), camina por el pasillo hasta el baño o la cocina. Sentado en tu asiento, haz círculos con los tobillos, flexiona y extiende los pies, estira las pantorrillas, mueve los hombros y estira suavemente el cuello. Esto mejora la circulación sanguínea, previene la rigidez muscular y reduce el riesgo de sufrir una Trombosis Venosa Profunda (formación de coágulos en las piernas).</li>
                    <li><strong>Tu Kit Personal de Confort y "Supervivencia" en Cabina:</strong> Prepara una pequeña bolsa o neceser con artículos esenciales para tener a mano en tu asiento (en el bolsillo delantero o bajo el asiento):
                        <ul>
                            <li><strong>Para Dormir / Descansar:</strong> Antifaz de buena calidad (que bloquee bien la luz), tapones para los oídos (de espuma o silicona moldeable) o, mejor aún, auriculares con cancelación activa de ruido (una gran inversión si vuelas a menudo).</li>
                            <li><strong>Comodidad Física:</strong> Almohada de viaje hinchable o, mejor aún, viscoelástica para el cuello. Una bufanda grande o pashmina puede servir como manta extra si hace frío (a veces las del avión no son suficientes o no hay).</li>
                            <li><strong>Cuidado Personal / Frescor:</strong> Bálsamo labial (los labios se resecan mucho), crema hidratante para manos y cara (tamaño viaje), un pequeño spray de agua termal para refrescar el rostro, toallitas húmedas desinfectantes, un pequeño cepillo y pasta de dientes para refrescarte antes de aterrizar.</li>
                            <li><strong>Salud:</strong> Medicamentos personales que necesites durante el vuelo, analgésicos básicos (paracetamol, ibuprofeno), algo para el mareo si eres propenso.</li>
                            <li><strong>Snacks:</strong> Frutos secos, barritas energéticas, galletas, fruta deshidratada... por si la comida del avión tarda, no te gusta o tienes hambre entre horas.</li>
                        </ul>
                    </li>
                    <li><strong>Entretenimiento a tu Gusto y Offline:</strong> No confíes ciegamente en el sistema de entretenimiento a bordo. Puede fallar, tener una selección limitada o no funcionar bien. Descarga ANTES de salir de casa tus propias películas, series, episodios de podcasts, playlists de música y libros electrónicos en tu móvil, tablet o e-reader. Asegúrate de tener batería suficiente y lleva tus propios auriculares (suelen ser de mejor calidad que los que dan en el avión). Un libro físico siempre es una buena opción también.</li>
                    <li><strong>Combate el Jet Lag desde el Aire:</strong> Nada más subir al avión, ajusta tu reloj (y tu mentalidad) a la hora de tu destino final. Intenta comer y dormir siguiendo el horario del lugar al que vas, no el de origen. Si llegas a tu destino de día, intenta mantenerte despierto durante el vuelo (o dormir solo siestas cortas). Si llegas de noche, intenta dormir todo lo posible en el avión (usa tu kit de confort). Evita las pantallas (luz azul) si intentas dormir.</li>
                    <li><strong>Alivia la Presión en los Oídos:</strong> Durante el despegue y, sobre todo, el aterrizaje, los cambios de presión pueden causar molestias o dolor en los oídos. Para igualar la presión, prueba a: bostezar ampliamente, tragar saliva frecuentemente, masticar chicle, chupar un caramelo o realizar la maniobra de Valsalva (tápate la nariz y sopla suavemente con la boca cerrada, como si intentaras destaponar los oídos). Si sueles sufrir mucho, existen tapones especiales para los oídos (como EarPlanes) que regulan el cambio de presión de forma más gradual.</li>
                </ul>
            `
        },
         'bus-tren': {
            title: "Viajes Largos en Bus o Tren: Comodidad y Estrategia Terrestre",
            body: `
                <p>Los viajes largos por tierra en autobús o tren pueden ser una forma fantástica, económica y a menudo muy escénica de moverse entre destinos, permitiéndote ver paisajes que te perderías volando. Sin embargo, pasar muchas horas sentado requiere cierta preparación para que la experiencia sea lo más cómoda y agradable posible.</p>
                <ul>
                    <li><strong>Reserva Estratégica y Anticipada:</strong> Especialmente para trenes nocturnos con literas (sleepers) o rutas de autobús muy populares (sobre todo en fines de semana, festivos o temporada alta). Reservar con antelación te asegura plaza (a veces se llenan) y, frecuentemente, permite conseguir mejores precios. Si puedes elegir asiento al reservar, considera: ventanilla para vistas/apoyar cabeza, pasillo para levantarte fácilmente, lejos de los baños, en el sentido de la marcha (si te mareas...). Compara diferentes compañías si hay varias que cubran tu ruta, ya que la calidad, comodidad (espacio entre asientos, reclinación), servicios a bordo (Wi-Fi, enchufes, baño) y puntualidad pueden variar enormemente.</li>
                    <li><strong>Llega con Margen Suficiente a la Estación:</strong> Las estaciones de autobús y tren, especialmente en grandes ciudades, pueden ser lugares grandes, ruidosos y confusos. No llegues con el tiempo justo. Preséntate al menos 30-45 minutos antes de la salida programada para tener tiempo de encontrar tu andén (platform) o dársena (bay/gate), verificar horarios en las pantallas de información (pueden cambiar), pasar posibles controles de equipaje/billetes, guardar tu maleta grande si es necesario y localizar tu vehículo/vagón/asiento sin estrés ni carreras de última hora.</li>
                    <li><strong>Prepara tu Equipaje de Mano Funcional:</strong> Es tu kit de supervivencia para el trayecto. Lleva una mochila o bolso pequeño con todo lo esencial que puedas necesitar durante las horas de viaje, ya que tu maleta principal probablemente irá en la bodega del autobús (inaccesible) o en compartimentos superiores o específicos del tren (poco prácticos de acceder constantemente). Imprescindibles en tu equipaje de mano:
                        <ul>
                            <li>Agua y snacks suficientes para todo el trayecto.</li>
                            <li>Entretenimiento offline (libro, e-reader, música, podcasts, películas/series descargadas) y auriculares.</li>
                            <li>Cargador portátil (power bank) completamente cargado y el cable de tu dispositivo(s). ¡No confíes en los enchufes a bordo!</li>
                            <li>Kit básico de confort: almohada de viaje hinchable/viscoelástica, antifaz, tapones para los oídos (¡muy útiles si hay ruido!).</li>
                            <li>Algo de abrigo: un jersey, chaqueta ligera o una bufanda/pañuelo grande, ya que el aire acondicionado puede ser muy fuerte o hacer frío por la noche.</li>
                            <li>Medicamentos personales que necesites tomar durante el trayecto, analgésicos básicos, tiritas, algo para el mareo si eres propenso.</li>
                            <li>Pañuelos de papel, toallitas húmedas, gel desinfectante de manos.</li>
                            <li>Tus documentos importantes (pasaporte/DNI), dinero/tarjetas y objetos de valor (móvil, cámara...). ¡Nunca en la maleta grande!</li>
                        </ul>
                    </li>
                    <li><strong>Vístete por Capas y Prioriza la Comodidad:</strong> La comodidad es primordial para tantas horas sentado. Opta por ropa holgada, tejidos cómodos y transpirables (chándal, leggings, pantalones cómodos). Usa varias capas finas en lugar de una gruesa para poder adaptarte a la temperatura. Lleva zapatos fáciles de quitar y poner (y calcetines limpios).</li>
                    <li><strong>Kit de Confort Extra para Viajes Nocturnos:</strong> Si viajas de noche en bus o tren (especialmente en asiento, no litera), una pequeña manta de viaje o un saco de dormir tipo sábana pueden añadir mucho confort. La almohada, antifaz y tapones son aún más esenciales.</li>
                    <li><strong>Alimentación e Hidratación Autosuficiente:</strong> Lleva suficiente agua y una variedad de snacks saludables y que no ensucien demasiado (fruta fácil de comer, frutos secos, barritas, bocadillos, galletas...). Aunque algunos trenes/buses tengan servicio de cafetería o hagan paradas para comer, la calidad puede ser baja, los precios altos y los horarios de parada inciertos o insuficientes.</li>
                    <li><strong>Entretenimiento Offline es el Rey:</strong> El Wi-Fi a bordo, si existe, suele ser lento, intermitente o de pago. Los enchufes pueden no funcionar, no existir o estar todos ocupados. Asegúrate de descargar previamente todo el contenido multimedia que quieras consumir. ¡Un libro físico nunca falla!</li>
                    <li><strong>Vigila tus Pertenencias en Todo Momento:</strong> Mantén tus objetos de valor siempre contigo y a la vista o en un lugar seguro (ej. mochila pequeña entre tus piernas o abrazada si duermes). Sé especialmente cuidadoso en las paradas: no dejes nada de valor a la vista en tu asiento si te bajas, aunque sea un momento. Considera usar un candado pequeño para las cremalleras de tu mochila de mano.</li>
                    <li><strong>Prepárate para la Higiene Básica:</strong> Los baños en autobuses y trenes (especialmente en trayectos largos o en algunos países) pueden variar drásticamente en limpieza. Lleva tu propio papel higiénico o pañuelos, toallitas húmedas y desinfectante de manos.</li>
                    <li><strong>Aprovecha las Paradas (con Cautela):</strong> Si el viaje incluye paradas programadas (para descanso del conductor, comida...), úsalas para estirar bien las piernas, ir a un baño posiblemente más limpio o comprar algo rápido. PERO, asegúrate de entender cuánto dura la parada y estate MUY atento a la hora de salida anunciada por el conductor o personal. ¡El vehículo se irá sin ti si te retrasas!</li>
                </ul>
            `
        },
         coche: {
            title: "Road Trips Seguros y Amenos: Disfruta la Libertad de la Carretera",
            body: `
                <p>Un viaje por carretera (road trip) ofrece una libertad y flexibilidad únicas para explorar a tu propio ritmo, descubrir lugares fuera de ruta y adaptar el viaje sobre la marcha. Para que la experiencia sea segura, placentera y sin contratiempos mecánicos o logísticos, ten en cuenta estos consejos:</p>
                <ul>
                    <li><strong>Revisión Pre-Viaje Exhaustiva del Vehículo:</strong> Antes de emprender un viaje largo, es fundamental asegurarse de que el coche (propio o de alquiler) está en óptimas condiciones. Comprueba (o pide a un taller de confianza que revise):
                        <ul>
                            <li><strong>Neumáticos:</strong> Presión correcta según especificaciones del fabricante (considera la carga), profundidad del dibujo adecuada (mínimo legal y recomendable), estado general (sin cortes, grietas o abultamientos). ¡No olvides revisar también la rueda de repuesto y tener las herramientas para cambiarla (gato, llave)! Si no hay repuesto, asegúrate de que el kit antipinchazos esté completo y sabes usarlo.</li>
                            <li><strong>Niveles de Líquidos:</strong> Aceite del motor (nivel y estado), líquido refrigerante (anticongelante, nivel correcto en frío), líquido de frenos (nivel), líquido limpiaparabrisas (rellenar depósito).</li>
                            <li><strong>Luces:</strong> Comprueba el correcto funcionamiento de TODAS las luces exteriores: posición (cortas), carretera (largas), intermitentes (delanteros, traseros y laterales si los hay), luces de freno (pide ayuda para verificar), marcha atrás, antiniebla (delantera y trasera) y luz de matrícula. Llevar un juego de bombillas de repuesto es recomendable y obligatorio en algunos países.</li>
                            <li><strong>Frenos:</strong> El pedal debe tener un tacto firme y progresivo, sin que se hunda demasiado. No debe haber ruidos extraños (chirridos metálicos) al frenar. Comprueba visualmente el estado de las pastillas y discos si es posible.</li>
                            <li><strong>Limpiaparabrisas:</strong> Las escobillas deben estar en buen estado, sin grietas, y limpiar el parabrisas eficazmente sin dejar rastros ni hacer ruido. Rellena el depósito del líquido limpiaparabrisas.</li>
                            <li><strong>Batería:</strong> Revisa que los bornes estén limpios y bien apretados, sin signos de corrosión (polvo blanco/azulado). Si la batería tiene varios años o ha dado problemas, considera comprobar su estado de carga.</li>
                             <li><strong>Otros:</strong> Aire acondicionado/calefacción, claxon, estado de los cinturones de seguridad.</li>
                        </ul>
                        <em>Si alquilas coche:</em> Inspecciónalo detenidamente al recogerlo, por dentro y por fuera, buscando cualquier daño preexistente (arañazos, golpes, manchas en tapicería...). Asegúrate de que todo quede reflejado por escrito en el contrato de alquiler antes de firmar. Haz fotos y/o un vídeo detallado como prueba. Comprueba que te entregan toda la documentación necesaria (permiso circulación, seguro) y el equipamiento obligatorio (triángulos, chalecos...). Familiarízate con los controles básicos del coche antes de salir del parking. Pregunta qué tipo de combustible usa.
                    </li>
                    <li><strong>Planificación Inteligente y Flexible de la Ruta:</strong>
                        <ul>
                            <li>Usa apps de navegación (Google Maps, Waze, Sygic, Maps.me) pero descarga SIEMPRE los mapas offline de toda la zona por la que vas a circular. La cobertura de datos móviles puede ser inexistente en áreas rurales o montañosas.</li>
                            <li>Divide el trayecto en etapas diarias realistas. No te marques objetivos de kilómetros demasiado ambiciosos. Considera la velocidad media real (que suele ser inferior a la máxima permitida por tráfico, tipo de carretera, paradas...) y el cansancio. Planifica paradas para descansar cada 2 horas aproximadamente.</li>
                            <li>Identifica posibles puntos de interés, miradores, pueblos bonitos, áreas de servicio o restaurantes por el camino.</li>
                            <li>Consulta el estado del tráfico, posibles obras, condiciones meteorológicas adversas o cierres de carreteras antes de salir y durante el viaje si tienes conexión.</li>
                            <li>Ten siempre una ruta alternativa en mente por si surge algún imprevisto.</li>
                        </ul>
                    </li>
                    <li><strong>Documentación Necesaria a Bordo:</strong> Permiso de conducir válido (nacional y/o Permiso Internacional de Conducción - PIC, según el país), permiso de circulación del vehículo, tarjeta de inspección técnica (ITV si aplica), póliza y recibo del seguro obligatorio (y la Carta Verde si sales de tu zona de cobertura habitual).</li>
                    <li><strong>Conoce y Respeta las Normas de Tráfico Locales:</strong> ¡Cada país tiene sus peculiaridades! Infórmate bien sobre: límites de velocidad (suelen variar en ciudad, carretera convencional, autopista), si se conduce por la izquierda o derecha, normas de prioridad en cruces y rotondas, tasas de alcoholemia permitidas (¡mejor siempre 0.0!), uso obligatorio de cinturones (para TODOS los ocupantes), sistemas de retención infantil (sillas homologadas según edad/peso), prohibición total o parcial del uso del móvil (incluso con manos libres en algunos sitios), normativa sobre luces (diurnas, cruce obligatorias en túneles...), equipamiento obligatorio en el coche (triángulos, chalecos, botiquín, extintor en algunos países...).</li>
                    <li><strong>Peajes, Viñetas y Tasas Urbanas:</strong> Investiga si tu ruta incluye autopistas de peaje y cómo se pagan (efectivo, tarjeta, sistemas de telepeaje tipo Via-T/Telepass). Averigua si necesitas comprar una viñeta (pegatina para el parabrisas) para circular por autopistas de ciertos países (ej. Suiza, Austria, Eslovenia, Rep. Checa...). Cómprala antes de entrar al país o justo en la frontera. Infórmate también sobre posibles zonas de bajas emisiones o tasas de congestión en grandes ciudades.</li>
                    <li><strong>Kit de Emergencia Completo y Botiquín:</strong> Además del equipamiento obligatorio (2 triángulos homologados, chaleco(s) reflectante(s) accesibles desde el habitáculo), es muy recomendable llevar: rueda de repuesto en buen estado y herramientas para cambiarla (gato, llave) o un kit reparapinchazos moderno y saber usarlo, linterna con pilas, botiquín básico de primeros auxilios, guantes de trabajo, pinzas de arranque (si la batería no es nueva), un pequeño extintor (opcional pero recomendable), rasqueta para hielo (en invierno), agua y algo de comida no perecedera por si te quedas tirado. Ten a mano el teléfono de asistencia en carretera de tu seguro.</li>
                    <li><strong>Conducción Segura, Descansada y Preventiva:</strong> La seguridad es lo primero. Jamás conduzcas cansado; la fatiga es una de las principales causas de accidente. Para cada 2 horas o 200 km aproximadamente para descansar, estirar las piernas y tomar aire. Evita comidas copiosas antes de conducir. Cero alcohol y drogas. Cuidado con medicamentos que puedan producir somnolencia. Mantén siempre la distancia de seguridad con el vehículo precedente. Adapta la velocidad a las condiciones de la vía, del tráfico y del clima. Anticipa las maniobras de otros conductores. Sé especialmente prudente de noche, con lluvia, niebla, nieve o hielo. Si viajas acompañado, turnaos al volante si ambos podéis/queréis.</li>
                    <li><strong>Entretenimiento y Buen Ambiente a Bordo:</strong> Prepara playlists de música variada, podcasts interesantes, audiolibros... algo para mantener el ánimo y hacer el viaje más llevadero. Si viajas con niños, prepara juegos, películas o actividades específicas para ellos.</li>
                    <li><strong>Orden y Limpieza Interior:</strong> Mantén el habitáculo relativamente ordenado para mayor confort y seguridad (objetos sueltos pueden ser peligrosos en caso de frenazo). Ten a mano agua, snacks, pañuelos, cargador de móvil, gafas de sol... Usa organizadores de asiento si es necesario. Una bolsa para la basura es esencial.</li>
                    <li><strong>Seguridad al Aparcar:</strong> Cierra siempre el coche. No dejes NADA de valor a la vista (ni siquiera cargadores o soportes de móvil). Guarda el equipaje en el maletero antes de llegar a tu destino final si vas a parar en algún sitio intermedio. Elige aparcamientos seguros, bien iluminados y, si es posible, vigilados, especialmente para pasar la noche.</li>
                </ul>
            `
        },
         barco: {
            title: "Navegando con Comodidad: Consejos para Ferries y Cruceros",
            body: `
                <p>Ya sea un corto trayecto en ferry entre islas o un largo crucero transatlántico, viajar en barco tiene sus particularidades. Con estos consejos, tu travesía será más placentera y evitarás contratiempos.</p>
                <ul>
                    <li><strong>Reserva y Documentación:</strong> Reserva billetes de ferry con antelación, sobre todo en temporada alta, fines de semana, rutas populares o si viajas con vehículo (las plazas de garaje son limitadas y se agotan). Para cruceros, la reserva se hace con meses o incluso años de antelación para conseguir buenos precios y camarotes deseados. Verifica qué documentación necesitas para embarcar (DNI/Pasaporte - ¡incluso en ferries dentro de un mismo país a veces lo piden!, billete/confirmación de reserva, visados si el crucero visita países que lo requieran).</li>
                    <li><strong>Llegada al Puerto y Embarque:</strong> Infórmate sobre la ubicación exacta de la terminal de tu compañía de ferry o crucero dentro del puerto (¡los puertos pueden ser enormes!). Llega con la antelación recomendada por la compañía (suele ser mayor si embarcas con vehículo - a veces 1-2 horas antes - o en cruceros - 2-3 horas antes). Los procedimientos de check-in (presentar documentación, obtener tarjetas de embarque/llave de camarote), controles de seguridad (similares a los de aeropuertos en cruceros) y el propio embarque pueden llevar tiempo. Sigue las indicaciones del personal y la señalización.</li>
                    <li><strong>Prevención y Manejo del Mareo (Mal de Mer):</strong> Es una preocupación común, aunque los barcos grandes modernos son muy estables. Si eres propenso/a o tienes dudas:
                        <ul>
                            <li><strong>Medicación Preventiva:</strong> Consulta a tu médico o farmacéutico sobre medicamentos contra el mareo (como dimenhidrinato - Biodramina, Cinfamar con cafeína para evitar somnolencia-, escopolamina en parches...). Es crucial tomarlos *antes* de sentir los síntomas (normalmente 30-60 minutos antes de embarcar o de que empiece el movimiento).</li>
                            <li><strong>Pulseras de Acupresión:</strong> Bandas elásticas que presionan el punto P6 Neiguan en la muñeca. No tienen efectos secundarios y algunas personas notan alivio.</li>
                            <li><strong>Remedios Naturales:</strong> Jengibre (en cápsulas, caramelos, infusión fresca) o menta pueden ayudar a calmar las náuseas leves.</li>
                            <li><strong>Ubicación Estratégica a Bordo:</strong> Elige asientos o camarotes en las cubiertas más bajas y lo más al centro posible del barco (longitudinal y transversalmente), ya que es donde menos se nota el balanceo y cabeceo.</li>
                            <li><strong>Mirada al Horizonte y Aire Fresco:</strong> Si empiezas a sentirte mareado, sal a una cubierta exterior si es posible, busca un punto fijo en el horizonte lejano y respira aire fresco. Evita espacios cerrados, sin ventanas o con olores fuertes (comida, combustible).</li>
                            <li><strong>Evita Leer o Mirar Pantallas Fijamente:</strong> El conflicto entre lo que ven tus ojos (quieto) y lo que siente tu oído interno (movimiento) empeora el mareo.</li>
                            <li><strong>Alimentación Ligera:</strong> Evita comidas pesadas, grasientas, muy dulces o alcohol antes y durante la travesía, especialmente si crees que puede haber mala mar. Opta por alimentos ligeros y mantente hidratado con agua. Galletas saladas tipo cracker pueden ayudar a asentar el estómago.</li>
                        </ul>
                    </li>
                    <li><strong>Gestión del Equipaje:</strong> En ferries cortos como pasajero a pie, normalmente llevas todo tu equipaje contigo y lo dejas en zonas designadas o cerca de tu asiento. En ferries más grandes o nocturnos con camarote, puede haber consignas de pago o dejas la maleta grande en el camarote/vehículo. Si viajas con coche, el equipaje principal se queda dentro del vehículo en la bodega (asegúrate de coger todo lo que necesites para la travesía: kit de mareo, abrigo, entretenimiento, snacks..., ya que el acceso suele estar prohibido una vez zarpa el barco). En cruceros, funciona similar a un avión: facturas las maletas grandes al llegar al puerto (les ponen una etiqueta con tu número de camarote) y te las entregan más tarde en la puerta de tu camarote; prepara un bolso de mano con lo esencial para las primeras horas (bañador, ropa cómoda, medicinas...).</li>
                    <li><strong>Exploración Inicial del Barco:</strong> Nada más embarcar, especialmente en un barco grande o crucero, date una vuelta rápida para localizar puntos clave: tu asiento/camarote, las cubiertas exteriores accesibles, los bares/cafeterías/restaurantes principales, los baños más cercanos, la tienda (si hay), y muy importante, los puntos de reunión ("muster station") y la ubicación de los chalecos salvavidas en caso de emergencia (mira los carteles informativos en pasillos y camarote). Coge un plano del barco si está disponible en recepción/información.</li>
                    <li><strong>Protección Solar y Ropa de Abrigo:</strong> En las cubiertas exteriores, incluso en días nublados, el sol y su reflejo en el agua pueden quemar rápidamente. Usa protector solar alto. Además, siempre suele hacer más viento y sensación de frío en cubierta, incluso en verano. Lleva una chaqueta cortavientos o un jersey a mano.</li>
                    <li><strong>Calzado Adecuado y Seguro:</strong> Opta por calzado cómodo, cerrado (o sandalias bien sujetas) y con suela antideslizante para moverte con seguridad por las cubiertas, que pueden estar mojadas, inclinarse con el oleaje o tener escaleras metálicas. Evita tacones altos o chanclas sueltas en cubierta.</li>
                    <li><strong>Entretenimiento Personalizado:</strong> Lleva tu propio entretenimiento (libros, e-readers, música, podcasts, juegos de cartas, descargas de vídeo...) para pasar el tiempo, especialmente en travesías de ferry largas donde el entretenimiento a bordo puede ser básico o inexistente. Los cruceros, en cambio, suelen ofrecer un amplio y variado programa de actividades, espectáculos, piscinas, gimnasio, etc.</li>
                    <li><strong>Opciones de Comida y Bebida:</strong> Los ferries suelen tener cafeterías o restaurantes tipo self-service (la calidad y los precios pueden variar enormemente). Los cruceros ofrecen múltiples opciones, desde grandes buffets incluidos en el precio hasta restaurantes de especialidad de pago. Verifica qué está incluido en tu billete/paquete y los horarios de apertura. Considera llevar tus propios snacks y bebidas (sobre todo agua) en ferries para ahorrar y asegurarte de tener algo que te guste.</li>
                </ul>
            `
        },
         llegada: {
            title: "Primeros Pasos al Llegar: Aterriza (o Desembarca) con Buen Pie",
            body: `
                <p>¡Felicidades, has llegado a tu destino! La emoción es palpable, pero los primeros momentos tras aterrizar o desembarcar pueden ser un poco confusos. Sigue estos pasos para asegurarte una transición suave y empezar a disfrutar cuanto antes.</p>
                <ol>
                    <li><strong>Navega los Controles de Llegada (Inmigración y Aduanas):</strong> Si llegas de un vuelo o trayecto internacional (a veces también en ferries internacionales), sigue las señales hacia "Arrivals" (Llegadas) y luego "Immigration/Passport Control". Ten tu pasaporte y visado (si es necesario, o el formulario de entrada rellenado si te lo dieron a bordo) listos. Responde a las preguntas del oficial de inmigración de forma clara, concisa y educada (motivo del viaje, duración de la estancia, dónde te alojas...). Una vez pasado el control de pasaportes, dirígete a "Baggage Claim" (Recogida de Equipajes) para buscar tu maleta facturada en la cinta indicada para tu vuelo/barco. Finalmente, pasa por Aduanas ("Customs"). Si no tienes nada que declarar (lo más habitual para turistas con efectos personales), sigue el carril verde ("Nothing to Declare"). Si llevas artículos que superan los límites permitidos (grandes cantidades de efectivo, alcohol, tabaco) o artículos restringidos (ciertos alimentos, plantas...), debes usar el carril rojo ("Goods to Declare").</li>
                    <li><strong>Verifica tu Equipaje Cuidadosamente:</strong> Cuando recojas tu maleta de la cinta, asegúrate de que es realmente la tuya comparando la etiqueta con tu resguardo. Revisa rápidamente si tiene algún daño externo importante (roturas, abolladuras graves, falta de ruedas...). Si tu maleta no aparece (se ha perdido) o está dañada, NO salgas de la zona de recogida de equipajes. Acude INMEDIATAMENTE al mostrador de tu aerolínea o al mostrador general de equipajes perdidos ("Lost & Found" o "Baggage Service") para rellenar un Parte de Irregularidad de Equipaje (PIR - Property Irregularity Report). Es fundamental hacerlo antes de salir para poder hacer el seguimiento y reclamar.</li>
                    <li><strong>Conéctate (si lo necesitas):</strong> Busca la red Wi-Fi gratuita del aeropuerto o terminal (suele requerir un registro simple o tiene tiempo limitado). Te permitirá avisar de tu llegada, comprobar mapas o pedir transporte online. Si compraste una tarjeta SIM local, instálala ahora en tu móvil (necesitarás la herramienta para abrir la bandeja SIM). Si contrataste un Pocket Wi-Fi, recógelo en el punto acordado (oficina de correos del aeropuerto, mostrador específico...).</li>
                    <li><strong>Consigue Moneda Local para Empezar:</strong>
                        <ul>
                            <li><strong>ATM (Cajero Automático):</strong> Es la forma más recomendable para obtener efectivo local, ya que suelen ofrecer el mejor tipo de cambio (el oficial de Visa/Mastercard, aunque tu banco puede aplicar comisiones). Busca cajeros de bancos conocidos y reputados dentro de la terminal (suelen ser más seguros que los externos). Saca una cantidad moderada para cubrir los primeros gastos (transporte, comida inicial...). Ten en cuenta la comisión de tu banco por retirada en el extranjero y la posible comisión que aplique el banco local dueño del cajero.</li>
                            <li><strong>Casa de Cambio (Exchange Bureau):</strong> Útil como alternativa si necesitas efectivo urgente o si tu tarjeta no funciona en los ATMs. Compara los tipos de cambio (suelen ser peores que los del ATM y que el cambio oficial) y pregunta por comisiones ocultas. Evita cambiar grandes cantidades aquí.</li>
                        </ul>
                    </li>
                    <li><strong>Transporte Seguro y Claro a tu Alojamiento:</strong> ¡Ten decidido cómo vas a ir ANTES de salir de la zona segura de llegadas! Ignora a las personas que te aborden agresivamente ofreciéndote transporte no oficial (pueden ser timos o inseguros).
                        <ul>
                            <li><strong>Transporte Público (Metro/Tren/Bus):</strong> Sigue las señales claras hacia las paradas o estaciones dentro o conectadas al aeropuerto/terminal. Infórmate sobre la línea correcta y compra el billete adecuado en máquinas automáticas o taquillas. Es la opción más económica.</li>
                            <li><strong>Taxi Oficial:</strong> Dirígete SIEMPRE a la parada oficial de taxis señalizada. Confirma si usan taxímetro o si existe una tarifa fija ("fixed rate") al centro/tu zona (búscala en carteles informativos o pregúntala antes de subir). Ten la dirección clara.</li>
                            <li><strong>Apps de Transporte (VTC - Uber, Lyft, Grab, Bolt, etc.):</strong> Si están disponibles y reguladas en tu destino, son una opción cómoda y con precio cerrado o estimado. Pide el coche desde la app una vez tengas tu equipaje y estés listo para salir. Dirígete al punto de recogida específico que te indique la aplicación (a veces son zonas designadas en llegadas o parkings cercanos).</li>
                            <li><strong>Shuttle Reservado (Compartido o Privado):</strong> Si contrataste un servicio de traslado con antelación, busca el mostrador de la compañía dentro de la terminal o el punto de encuentro exacto indicado en tu reserva. Ten tu confirmación a mano.</li>
                        </ul>
                    </li>
                    <li><strong>Llegada al Alojamiento y Check-in:</strong> Al llegar a tu hotel/hostel/apartamento, haz el check-in presentando tu reserva y documentación. Aprovecha para pedir al recepcionista un mapa gratuito de la ciudad, recomendaciones locales (restaurantes, supermercados cercanos), o aclarar dudas sobre transporte o seguridad en la zona. Pregunta por la contraseña del Wi-Fi y horarios importantes (desayuno, check-out...).</li>
                    <li><strong>Primer Paseo de Reconocimiento:</strong> Una vez instalado, sal a dar una vuelta corta y tranquila por los alrededores inmediatos de tu alojamiento. Localiza puntos útiles: una tienda donde comprar agua o snacks, una farmacia, cajeros automáticos cercanos, un par de opciones para comer, la parada de transporte público más próxima... Esto te ayudará a sentirte más ubicado, seguro y a empezar a conectar con el nuevo entorno.</li>
                </ol>
            `
        },
         ciudad: {
            title: "Muévete por una Ciudad Desconocida como un Local (o casi)",
            body: `
                <p>Explorar una ciudad nueva es una de las partes más emocionantes de viajar. Perderse un poco puede ser divertido y llevar a descubrimientos inesperados, pero saber moverte eficientemente te ahorrará tiempo, dinero y frustraciones. Aquí te damos las claves para navegar la jungla urbana con confianza:</p>
                <ul>
                    <li><strong>Mapas Offline: Tu Brújula Digital Imprescindible:</strong> Antes de salir del Wi-Fi de tu alojamiento, descarga SIEMPRE el mapa offline de la ciudad completa en Google Maps. O mejor aún, usa una app dedicada como Maps.me (basada en OpenStreetMap, muy detallada y funciona entièrement offline una vez descargado el mapa). <strong>Marca previamente</strong> (con estrellas, pines, o creando listas personalizadas) tu alojamiento, los puntos de interés que quieres visitar, estaciones de transporte clave, restaurantes recomendados, etc. Poder consultar tu ubicación GPS en el mapa sin necesidad de datos móviles es absolutamente fundamental.</li>
                    <li><strong>Oriéntate: Busca el Norte (y otras referencias):</strong> Intenta tener una idea básica de la disposición de la ciudad. ¿Dónde está el norte? ¿Hay algún río, costa o cadena montañosa que te sirva de referencia constante? Fíjate en edificios muy altos o de arquitectura singular (rascacielos, torre de iglesia, monumento...), una gran avenida o una plaza principal. Úsalos para mantener una orientación básica (norte/sur, hacia el río/lejos del río...).</li>
                    <li><strong>Caminar: La Forma Suprema de Descubrir:</strong> No hay sustituto para explorar a pie. Es la única manera de absorber realmente la atmósfera de un barrio, fijarte en los detalles arquitectónicos, descubrir tiendas peculiares, oler los aromas de los mercados, escuchar los sonidos de la calle y tropezar con plazas escondidas o escenas cotidianas auténticas. Divide la ciudad por zonas o barrios y dedica tiempo a caminar por cada uno. ¡Y repetimos: lleva el calzado más cómodo que poseas!</li>
                    <li><strong>Domina el Transporte Público Local:</strong>
                        <ul>
                            <li><strong>Investiga las Opciones:</strong> Averigua qué sistemas existen (Metro/Subway/Underground/U-Bahn, Autobuses, Tranvías/Trams, Ferries, Trenes suburbanos...) y cuál es el más eficiente y conveniente para los trayectos que probablemente harás. Webs como Rome2Rio o la función de transporte público de Google Maps pueden darte una visión inicial.</li>
                            <li><strong>Consigue Mapas y Apps Oficiales:</strong> Busca mapas físicos de la red de transporte (suelen estar disponibles gratuitamente en oficinas de turismo, estaciones principales u hoteles). Descarga la app oficial de la compañía de transporte de la ciudad si existe; a menudo incluyen planificadores de ruta, horarios (a veces en tiempo real), alertas de servicio y mapas interactivos.</li>
                            <li><strong>Descifra el Sistema de Billetes y Tarifas:</strong> Este puede ser el punto más confuso. Infórmate bien: ¿Se paga por trayecto individual, por tiempo (ej. billete válido por 1 hora), por zonas? ¿Qué tipo de billete o abono te conviene más según tu estancia y uso previsto? (Billete sencillo - single ticket, billete de 10 viajes - carnet/taco, abono diario - day pass, de 3 días, semanal - weekly pass, tarjeta recargable sin contacto - tipo Oyster, Suica, Navigo...). Aprende dónde y cómo comprar y recargar (máquinas automáticas - ¿aceptan tarjeta/efectivo?, taquillas, estancos, quioscos, app...). ¡Y lo más importante: **valida siempre tu billete** al empezar el viaje (en las máquinas canceladoras del bus/tranvía o en los tornos del metro) para evitar multas!</li>
                            <li><strong>Observa a los Locales:</strong> Fíjate en cómo suben y bajan, cómo validan sus billetes o tarjetas, dónde esperan... Es la forma más rápida de entender el funcionamiento práctico.</li>
                        </ul>
                    </li>
                    <li><strong>Taxis y VTCs: Conoce las Reglas del Juego:</strong> Investiga cómo funcionan los taxis locales. ¿Son fáciles de parar en la calle o hay que ir a paradas designadas/llamar? ¿Es obligatorio/común el uso del taxímetro? Si no, ¿es necesario negociar la tarifa *antes* de subir? ¿Hay colores o licencias oficiales que los identifiquen? Ten una idea aproximada de las tarifas para evitar timos. Las apps de VTC (Uber, Lyft, Grab, Bolt, FreeNow, etc., según el país) suelen ser una alternativa cómoda, con precio conocido de antemano y pago automático, pero verifica su disponibilidad y legalidad en tu destino.</li>
                    <li><strong>Tu "Salvavidas": Dirección del Alojamiento Siempre Contigo:</strong> Lleva siempre anotada (en un papel en la cartera y/o en una nota en el móvil accesible offline) la dirección exacta y completa de tu hotel/apartamento, incluyendo el nombre de la calle, número, código postal y barrio. Si es posible, tenla también escrita en el idioma local. Te salvará si te quedas sin batería, te pierdes o necesitas que un taxista te lleve de vuelta. Una tarjeta del hotel es perfecta para esto.</li>
                    <li><strong>Actitud de Explorador, no de Turista Perdido:</strong> Aunque no sepas dónde estás, camina con confianza y propósito. Consultar el mapa constantemente en medio de la acera te hace parecer un turista vulnerable. Párate en un lugar discreto (un portal, una tienda) si necesitas revisar el mapa o el móvil. Estar atento a tu entorno te ayuda a orientarte y también es más seguro.</li>
                    <li><strong>Preguntar es de Viajeros Inteligentes:</strong> Si estás realmente perdido, no pierdas tiempo dando vueltas. Preguntar es la solución más rápida. Dirígete preferiblemente a personal de tiendas, restaurantes, oficinas de información, policías o a personas que no parezcan apuradas. Sé educado, empieza con un saludo local ("Bonjour", "Scusi", "Excuse me"...). Mostrar el mapa o la dirección escrita ayuda muchísimo si hay barrera idiomática.</li>
                </ul>
            `
        },
         cultura: {
            title: "Respeta la Cultura Local: Clave para un Viaje Enriquecedor y Conectado",
            body: `
                <p>Viajar nos ofrece la maravillosa oportunidad de sumergirnos en culturas diferentes a la nuestra, con sus propias normas, valores y formas de ver el mundo. Para que esta inmersión sea una experiencia positiva y respetuosa, tanto para nosotros como para la comunidad que nos acoge, es fundamental actuar con sensibilidad, curiosidad y humildad.</p>
                <h4>Antes de Viajar: La Tarea de Investigar y Aprender</h4>
                <ul>
                    <li><strong>Costumbres Sociales y Etiqueta Básica:</strong> Dedica tiempo a leer sobre las normas de interacción social cotidianas. ¿Cómo se saluda a la gente (apretón de manos firme o suave, inclinación, contacto visual directo o evitado)? ¿Qué fórmulas de cortesía son importantes usar (más allá del "por favor" y "gracias")? ¿Existen diferencias en el trato según la edad, el género o el estatus social? ¿Es apropiado el contacto físico en público? ¿Cómo se considera la puntualidad?</li>
                    <li><strong>Normas en la Mesa y al Comer:</strong> ¿Se usan cubiertos, palillos o las manos (y cuál)? ¿Es de buena educación terminar toda la comida del plato o dejar un poco? ¿Cómo se brinda o se rechaza una bebida alcohólica? ¿Hay alguna costumbre al pagar la cuenta?</li>
                    <li><strong>Código de Vestimenta:</strong> Investiga cuál es la forma de vestir habitual y apropiada para diferentes situaciones (vida diaria, visitar lugares religiosos, salir por la noche, ir a la playa...). En muchos países, especialmente fuera de entornos muy occidentalizados, se valora y espera la modestia (cubrir hombros, rodillas, a veces escote). Observa cómo visten los locales de tu mismo género y edad aproximada como referencia. Llevar un pañuelo o chal ligero siempre es útil para cubrirse si es necesario.</li>
                    <li><strong>Gestos y Lenguaje No Verbal:</strong> Un gesto inocente en tu cultura (como el pulgar hacia arriba, hacer la señal de "OK" con los dedos, cruzar los dedos, señalar con el índice, mostrar la suela del zapato...) puede ser muy ofensivo en otra. Infórmate sobre los gestos que debes evitar. En caso de duda, sé discreto con tus manos y expresiones.</li>
                    <li><strong>Religión y Espiritualidad:</strong> Si la religión juega un papel importante en la sociedad, aprende los conceptos básicos y muestra respeto por las creencias y prácticas, aunque no las compartas. Infórmate sobre horarios de oración o festividades religiosas que puedan afectar a horarios comerciales o transporte.</li>
                    <li><strong>Temas Sensibles o Tabúes:</strong> Sé prudente al iniciar conversaciones sobre política local, historia reciente conflictiva, religión o críticas al país. Es mejor escuchar y aprender que opinar sin conocimiento de causa. Evita temas considerados tabú en esa cultura.</li>
                    <li><strong>Idioma: El Esfuerzo Cuenta Mucho:</strong> Nadie espera que hables fluido, pero aprender y usar activamente las frases básicas de cortesía (Hola, Adiós, Por favor, Gracias, Perdón, Sí, No, Buenos días/tardes/noches, ¿Habla inglés/español?) demuestra un enorme respeto e interés, y facilitará mucho tus interacciones cotidianas. La gente suele apreciarlo mucho.</li>
                </ul>
                <h4>Durante el Viaje: Actuar con Conciencia y Respeto</h4>
                <ul>
                    <li><strong>Sé un Observador Atento:</strong> Fíjate en cómo se comportan e interactúan los locales en diferentes contextos (tiendas, transporte, restaurantes...) e intenta adaptar tu comportamiento discretamente.</li>
                    <li><strong>Pide Permiso SIEMPRE Antes de Fotografiar Personas:</strong> Es una norma básica de respeto a la privacidad y dignidad. Una sonrisa y un gesto señalando tu cámara y esperar una señal de asentimiento suelen ser suficientes. Respeta absolutamente si te dicen que no o hacen un gesto negativo. Ten especial cuidado con niños (pide permiso a los padres) y en ceremonias o lugares de culto.</li>
                    <li><strong>Comportamiento Respetuoso en Lugares Sagrados:</strong> Infórmate sobre las normas específicas (descalzarse, cubrirse la cabeza, no fotos, silencio...). Muévete con reverencia y respeto. No comas, bebas ni fumes. No interrumpas rezos o ceremonias. Sigue las indicaciones sobre dónde puedes o no puedes ir o fotografiar.</li>
                    <li><strong>Propinas y Regateo: Sigue la Costumbre Local:</strong> Investiga cómo funcionan. La propina es obligatoria/esperada en algunos países (EEUU), opcional en otros y casi inexistente o mal vista en algunos (Japón). El regateo es parte del juego en mercados de muchos países, pero no en tiendas formales.</li>
                    <li><strong>Apoya la Economía Local de Forma Responsable:</strong> Compra artesanía directamente a los artesanos si puedes, come en restaurantes locales, contrata guías locales... Evita comprar productos hechos con especies amenazadas o que fomenten la explotación.</li>
                    <li><strong>Respeta el Medio Ambiente:</strong> No dejes basura. Utiliza papeleras o llévala contigo hasta encontrar una. Respeta la flora y fauna local. No molestes a los animales salvajes (¡nunca los alimentes!). Utiliza los senderos marcados. Ahorra agua y energía en tu alojamiento.</li>
                    <li><strong>Actitud Abierta y Humilde:</strong> Recuerda que eres un invitado/a. Acepta que las cosas pueden ser diferentes, más lentas o menos organizadas que en tu casa. No juzgues, critica o compares constantemente. Mantén una actitud curiosa, paciente y tolerante. Estás allí para aprender y experimentar.</li>
                    <li><strong>Sonríe y Sé Agradecido:</strong> La amabilidad es un lenguaje universal. Una sonrisa sincera y un "gracias" en el idioma local pueden abrir muchas puertas y corazones.</li>
                </ul>
            `
        },
         comida: {
            title: "Come Local (con Precaución): Una Aventura para tu Paladar",
            body: `
                <p>Sumergirse en la gastronomía local es, sin duda, una de las experiencias más placenteras y reveladoras de cualquier viaje. Te permite conectar con la cultura de una forma directa y deliciosa. ¡Anímate a probar, pero siempre con un poco de cabeza para cuidar tu estómago!</p>
                <h4>Dónde Encontrar los Sabores Auténticos:</h4>
                <ul>
                    <li><strong>Mercados Locales:</strong> Son el alma culinaria de cualquier destino. Pasea entre puestos de frutas exóticas que nunca has visto, verduras de formas y colores sorprendentes, especias aromáticas, pescados frescos... Observa qué compra y come la gente local. Muchos mercados tienen zonas de comida preparada o pequeños restaurantes ("comedores", "cocinas económicas") donde probar platos auténticos, caseros y muy económicos. Es una inmersión cultural total.</li>
                    <li><strong>Comida Callejera (Street Food):</strong> ¡La meca de los sabores rápidos, baratos y genuinos! Cada país y ciudad tiene sus estrellas callejeras: brochetas (satay, kebab, anticuchos), sopas de fideos (pho, ramen), empanadas, tacos, arepas, curries, samosas, crepes, dulces... Es una forma fantástica de probar muchas cosas diferentes sin gastar mucho. <strong>La clave para comer seguro es la observación y el sentido común:</strong>
                        <ul>
                            <li>Elige puestos <strong>muy concurridos</strong>, especialmente por gente local. Una alta rotación significa que la comida es fresca y popular (por algo será).</li>
                            <li>Observa que la comida se <strong>cocine al momento</strong> delante de ti, especialmente carnes y pescados. El calor intenso mata la mayoría de las bacterias.</li>
                            <li>Fíjate en la <strong>higiene general</strong> del puesto: ¿las superficies parecen limpias? ¿La persona que cocina manipula el dinero y la comida con las mismas manos o usa guantes/pinzas? ¿Los ingredientes crudos se ven frescos?</li>
                            <li>Empieza probando cosas <strong>bien cocinadas</strong> (frituras recién hechas, parrillas calientes, guisos o sopas que estén hirviendo) antes de aventurarte con crudos, ensaladas o salsas que lleven tiempo hechas.</li>
                        </ul>
                    </li>
                    <li><strong>Restaurantes Populares Locales (Fonditas, Sodas, Warungs, Trattorias...):</strong> Aléjate unas calles de las plazas y avenidas más turísticas, donde suelen estar las "trampas para turistas". Busca locales pequeños, sin grandes lujos, a menudo familiares ("la cocina de la abuela"), donde veas comer a gente del lugar. Suelen ofrecer comida casera, sabrosa y a precios mucho más razonables. No esperes menús en inglés siempre, ¡pero ahí está la aventura!</li>
                    <li><strong>Menús del Día / Platos Combinados:</strong> En muchos países, especialmente para el almuerzo, ofrecen menús fijos ("menú del día", "plato feito", "set lunch"...) que incluyen varios platos (sopa/entrante, principal, postre) y bebida a un precio muy económico. Es una excelente forma de comer bien, probar variedad y ahorrar.</li>
                    <li><strong>Pregunta por Recomendaciones Fiables:</strong> Pide consejo al personal de tu hotel/hostel (recepcionistas, dueños de guesthouses), a guías turísticos locales de confianza, o incluso a otros viajeros que encuentres y que lleven tiempo explorando la zona. Suelen conocer las "joyas ocultas".</li>
                </ul>
                <h4>Consejos para Evitar Problemas Estomacales ("La Venganza de Moctezuma"):</h4>
                <ul>
                    <li><strong>Agua Siempre Segura:</strong> Regla de oro número 1 e innegociable en muchos destinos. Bebe <strong>SOLO agua embotellada y comprueba que el precinto esté intacto</strong> o agua que hayas purificado tú mismo de forma fiable (filtro de calidad, pastillas potabilizadoras, hervido prolongado, sistema UV). No bebas agua del grifo si no tienes certeza absoluta de su potabilidad. Úsala embotellada incluso para lavarte los dientes.</li>
                    <li><strong>Hielo: El Enemigo Invisible:</strong> Evita el hielo en las bebidas, zumos o cócteles si no estás seguro de que se hizo con agua purificada. En hoteles y restaurantes de estándar turístico alto suele ser seguro (a menudo usan hielo industrial), pero en puestos callejeros, bares locales o lugares más remotos, es mejor pedir las bebidas "sin hielo" ("no ice", "mai sai namแข็ง" en Thai, "sin hielo" en español...).</li>
                    <li><strong>Frutas y Verduras Crudas: La Regla de Oro "Pélalo, Hiérvelo, Cocínalo o Evítalo":</strong> Pela tú mismo la fruta siempre que sea posible (plátanos, naranjas, mangos...). Lava bien la fruta que comas con piel usando agua segura. Ten mucha precaución con ensaladas crudas, verduras sin cocinar o fruta ya cortada que vendan en la calle, ya que pueden haber sido lavadas con agua no potable. Opta preferiblemente por verduras cocinadas.</li>
                    <li><strong>Comida Bien Cocinada y Servida Caliente:</strong> Los alimentos cocinados a altas temperaturas (hervidos, fritos, asados) y servidos inmediatamente (bien calientes) tienen mucho menos riesgo de contaminación bacteriana. Desconfía de comida que parece llevar mucho tiempo expuesta a temperatura ambiente en buffets tibios, puestos callejeros o que parece recalentada superficialmente.</li>
                    <li><strong>Marisco Crudo o Poco Hecho:</strong> Delicioso (ceviche, ostras, sushi...), pero conllevan un mayor riesgo si la frescura o la manipulación no son óptimas. Consúmelos solo en lugares de absoluta confianza, con buena reputación y donde se garantice la máxima calidad y frescura del producto.</li>
                    <li><strong>Lávate las Manos Frecuentemente:</strong> Una medida simple pero muy efectiva. Lávate bien las manos con agua y jabón antes de comer o manipular alimentos. Si no tienes acceso, usa un gel desinfectante de manos a base de alcohol.</li>
                    <li><strong>Introduce Nuevos Sabores Gradualmente:</strong> No sometas a tu estómago a un bombardeo de sabores y ingredientes totalmente nuevos y muy diferentes el primer día. Ve probando cosas nuevas poco a poco, especialmente si son muy picantes o especiadas, para darle tiempo a adaptarse.</li>
                    <li><strong>Escucha a tu Instinto (y a tu Nariz):</strong> Si algo no te huele bien, no tiene buen aspecto, o simplemente tienes una mala sensación sobre la higiene del lugar o la comida, confía en tu instinto y no lo comas. Es mejor ser precavido.</li>
                    <li><strong>Prepara tu Botiquín:</strong> Lleva siempre contigo medicamentos básicos para problemas digestivos: antidiarreicos (Loperamida - Fortasec), protector gástrico (Omeprazol), antiácidos (Almax), algo para las náuseas/vómitos (si tu médico lo recomienda) y, muy importante, sobres de sales de rehidratación oral (Sueroral, Citorsal...) para reponer líquidos y electrolitos si sufres diarrea o vómitos.</li>
                </ul>
            `
        },
         vuelta: {
            title: "Organiza tu Regreso: Checklist para un Final de Viaje Sin Sobresaltos",
            body: `
                <p>El viaje llega a su fin, la aventura concluye, pero aún quedan algunos pasos importantes para asegurar un retorno a casa tranquilo, ordenado y sin contratiempos de última hora. ¡No bajes la guardia todavía!</p>
                <ol>
                    <li><strong>Confirma los Detalles de tu Transporte de Regreso:</strong> No des nada por sentado. 24-48 horas antes, vuelve a verificar meticulosamente:
                        <ul>
                            <li>Fecha y hora EXACTA de salida de tu vuelo, tren o autobús.</li>
                            <li>Lugar de salida: Aeropuerto correcto (¡ciudades grandes tienen varios!), terminal específica (T1, T2...), estación de tren/autobús correcta (¡también puede haber varias!).</li>
                            <li>Número de vuelo/tren/bus y localizador de reserva.</li>
                        </ul>
                        Revisa tu email por si ha habido notificaciones de cambios de horario o cancelaciones por parte de la compañía. Consulta la web de la aerolínea/compañía o del aeropuerto/estación para confirmar que todo sigue según lo previsto.
                    </li>
                    <li><strong>Check-in Online (si aplica):</strong> Haz el check-in online tan pronto como se abra el plazo (normalmente 24-48h antes para vuelos). Te aseguras tu asiento, ahorras tiempo en el aeropuerto y obtienes tu tarjeta de embarque digital (haz captura de pantalla) o la opción de imprimirla.</li>
                    <li><strong>Planifica el Traslado al Punto de Salida con Amplio Margen:</strong> Decide con antelación cómo irás al aeropuerto o estación. ¿Transporte público? Consulta horarios y duración del trayecto, considerando posibles transbordos. ¿Taxi/App? Estima el coste y resérvalo si es necesario, especialmente si sales muy temprano o tarde. ¿Shuttle del hotel? Confirma hora y lugar de recogida. Sal de tu alojamiento con MUCHA antelación, especialmente si hay riesgo de tráfico.</li>
                    <li><strong>Revisión Final y Exhaustiva del Alojamiento ("Operación Olvido Cero"):</strong> Antes de entregar las llaves, haz una última inspección metódica de la habitación/apartamento: revisa cajones, armarios (¡también los estantes altos!), debajo de la cama, detrás de las puertas, el baño (colgado en la ducha, neceser olvidado...), enchufes (¡cargadores!). Asegúrate de llevarte todo lo tuyo.</li>
                    <li><strong>Empaqueta Estratégicamente para la Vuelta:</strong>
                        <ul>
                            <li>Coloca los líquidos correctamente si llevas equipaje de mano (<100ml en bolsa transparente).</li>
                            <li>Protege bien los objetos frágiles o souvenirs que hayas comprado (envuélvelos en ropa sucia, por ejemplo).</li>
                            <li>Si llevas líquidos que puedan derramarse (vino, aceite, perfumes...) en la maleta facturada, mételos en bolsas de plástico bien cerradas y rodeados de ropa para amortiguar.</li>
                            <li>Distribuye el peso si llevas varias maletas para no exceder límites. Pesa la maleta facturada antes de salir si tienes dudas sobre el límite para evitar cargos extra.</li>
                            <li>Deja a mano la ropa de abrigo que necesitarás al aterrizar en tu destino si el clima es diferente.</li>
                            <li>Recuerda las restricciones de aduanas de tu país sobre lo que puedes importar (límites de alcohol, tabaco, valor de las compras, prohibición de ciertos alimentos, plantas, productos de origen animal...).</li>
                        </ul>
                    </li>
                    <li><strong>Gestiona la Moneda Local Sobrante de Forma Inteligente:</strong> Intenta gastar las monedas y billetes pequeños que te queden en los últimos gastos (transporte al aeropuerto, un café, una botella de agua, pequeños souvenirs de última hora...). Cambiar pequeñas cantidades de moneda exótica de vuelta a tu moneda local suele ser muy desfavorable o imposible (especialmente monedas). Puedes guardarlas como recuerdo o donarlas en las urnas benéficas que suelen haber en los aeropuertos.</li>
                    <li><strong>Liquida Cuentas Pendientes:</strong> Asegúrate de haber pagado completamente la cuenta del hotel (revisa cargos extra como minibar o llamadas), posibles tasas turísticas locales, o cualquier otra deuda pendiente.</li>
                    <li><strong>Carga Todos tus Dispositivos Electrónicos:</strong> Fundamental tener el móvil con batería para el viaje (tarjeta de embarque, pedir transporte al llegar...), pero también tablet, e-reader, auriculares inalámbricos, power bank...</li>
                    <li><strong>Documentación Esencial Lista y Accesible:</strong> Ten tu pasaporte y tarjeta de embarque/billete en un lugar seguro pero fácil de sacar cuando te lo pidan (control de seguridad, embarque...).</li>
                    <li><strong>Disfruta del Último Sorbo del Viaje:</strong> Si tienes tiempo antes de dirigirte al punto de salida, regálate un último momento placentero: un último paseo por un lugar que te gustó, ese café especial, una última comida local... Despídete mentalmente del destino con una buena sensación.</li>
                </ol>
            `
        },
         emergencia: {
            title: "Qué Hacer en Caso de Emergencia: Guía Rápida para Viajeros",
            body: `
                <p>Nadie planea tener una emergencia durante un viaje, pero los imprevistos (desde un esguince hasta una enfermedad grave o un robo) pueden suceder. Estar preparado y saber cómo reaccionar de forma rápida y eficaz puede marcar una enorme diferencia en el resultado y en tu tranquilidad.</p>
                <h4>Preparación Esencial ANTES de Viajar:</h4>
                <ul>
                    <li><strong>Investiga y Guarda Números de Emergencia Locales:</strong> ¡No asumas que son iguales en todas partes! Busca cuáles son los números específicos para Policía, Ambulancia y Bomberos en cada país que visites. Guárdalos en los contactos de tu móvil (con el prefijo internacional si es necesario) y anótalos también en papel por si te quedas sin batería.</li>
                    <li><strong>Seguro de Viaje: Tu Contacto Vital 24/7:</strong> Contrata un seguro con buena cobertura médica y de asistencia. Guarda el número de teléfono de asistencia 24 horas (a menudo es un número internacional, comprueba si tienen números locales gratuitos) y tu número de póliza en varios lugares: móvil, email, una nota en tu cartera, y deja una copia a alguien en casa. ¡Este es tu primer punto de contacto crucial ante cualquier problema médico o logístico serio!</li>
                    <li><strong>Embajada o Consulado de tu País:</strong> Busca la dirección, teléfono y email de la embajada o consulado de tu país más cercano en tu destino. Guárdalos. Son tu apoyo para situaciones graves: pérdida/robo de pasaporte, problemas legales serios (detención), accidentes graves, necesidad de evacuación por catástrofe o inestabilidad política. Considera registrar tu viaje en el registro de viajeros de tu Ministerio de Exteriores si ofrece ese servicio.</li>
                    <li><strong>Contactos de Confianza en Casa:</strong> Ten a mano números de teléfono y emails de familiares o amigos a quienes poder contactar en caso de necesidad. Informa a alguien de confianza sobre tu itinerario general y los datos de tu seguro.</li>
                    <li><strong>Botiquín Básico Personalizado:</strong> Prepara un pequeño botiquín con material de cura básico (tiritas, gasas, esparadrapo, antiséptico), analgésicos/antitérmicos (paracetamol, ibuprofeno), antihistamínicos (si eres alérgico), medicamentos para problemas estomacales (antidiarreicos, antiácidos, sales de rehidratación) y, muy importante, tu medicación personal habitual (suficiente para todo el viaje y un poco más, idealmente con receta médica por si te la piden).</li>
                    <li><strong>Copias de Seguridad de Documentos:</strong> Digitales (nube, email) y físicas (separadas de los originales) de pasaporte, visados, DNI, carnet de conducir, seguro, billetes...</li>
                </ul>
                <h4>Actuación Durante una Emergencia:</h4>
                <ul>
                    <li><strong>Mantén la Calma (Dentro de lo Posible):</strong> Respira hondo. El pánico bloquea. Intenta evaluar la situación objetivamente para poder tomar decisiones.</li>
                    <li><strong>Prioriza la Seguridad Personal:</strong> Si estás en una situación de riesgo físico (robo con violencia, disturbios...), tu seguridad es lo primero. No te enfrentes innecesariamente. Busca refugio o aléjate del peligro.</li>
                    <li><strong>Emergencia Médica:</strong>
                        <ol>
                            <li>Evalúa la gravedad. Si es una emergencia vital, llama inmediatamente al número de emergencia local para solicitar una ambulancia.</li>
                            <li>Contacta lo antes posible (tú o alguien que te acompañe) con el teléfono de asistencia 24h de tu seguro de viaje. Explica claramente qué ha pasado y dónde estás. Sigue SUS INSTRUCCIONES sobre a qué centro médico dirigirte (hospitales concertados) y cómo proceder con los pagos (ellos suelen gestionar pagos directos en casos graves, pero confirma). Guarda TODOS los informes médicos y facturas.</li>
                            <li>Si estás consciente, informa al personal médico sobre alergias, condiciones preexistentes o medicación habitual. Lleva esta información escrita si es posible.</li>
                            <li>Si la situación requiere hospitalización o es muy grave, informa también a tu embajada/consulado.</li>
                        </ol>
                    </li>
                    <li><strong>Robo o Asalto:</strong>
                        <ol>
                            <li>Tras asegurar tu integridad física, acude a la comisaría de policía más cercana para poner una denuncia formal lo antes posible. Describe detalladamente lo sucedido y lo sustraído. Pide una copia sellada de la denuncia.</li>
                            <li>Cancela inmediatamente todas las tarjetas bancarias robadas.</li>
                            <li>Contacta con tu embajada/consulado si te robaron el pasaporte.</li>
                            <li>Informa a tu seguro de viaje (necesitarás la denuncia).</li>
                        </ol>
                    </li>
                     <li><strong>Pérdida o Robo de Pertenencias (sin violencia):</strong>
                        <ol>
                            <li>Intenta recordar dónde pudiste perderlo o cuándo notaste la falta.</li>
                            <li>Denuncia a la policía (necesario para el seguro, especialmente si es robo).</li>
                            <li>Cancela tarjetas si aplica.</li>
                            <li>Contacta con tu seguro para iniciar la reclamación (guarda la denuncia y cualquier factura que tengas).</li>
                            <li>Si pierdes el pasaporte, sigue los pasos del consejo específico sobre pérdida de documentos.</li>
                        </ol>
                    </li>
                    <li><strong>Pérdida de Vuelo / Transporte Clave:</strong>
                        <ol>
                            <li>Ve al mostrador de la compañía aérea/tren/bus lo antes posible. Explica calmadamente tu situación. Pregunta por las opciones: ¿puedes ser reubicado en el siguiente servicio? ¿Cuál es el coste del cambio o de un nuevo billete?</li>
                            <li>Revisa las condiciones de tu billete original (¿era flexible?).</li>
                            <li>Consulta la cobertura de tu seguro de viaje. Algunas pólizas cubren estos imprevistos si la causa fue un retraso previo cubierto, un accidente justificado de camino al aeropuerto, etc. Lee las condiciones.</li>
                        </ol>
                    </li>
                    <li><strong>Desastres Naturales (Terremoto, Huracán...) o Situación de Inestabilidad (Protestas, etc.):</strong>
                        <ol>
                            <li>Mantén la calma. Busca un lugar seguro (tu hotel suele serlo).</li>
                            <li>Sigue las indicaciones de las autoridades locales y del personal de tu alojamiento.</li>
                            <li>Mantente informado a través de fuentes fiables (noticias locales, webs oficiales, radio). Evita rumores.</li>
                            <li>Contacta con tu embajada/consulado para informarles de tu situación y seguir sus recomendaciones. Regístrate si te lo piden.</li>
                            <li>Comunícate con tu familia/amigos en casa para tranquilizarles en cuanto sea seguro hacerlo.</li>
                        </ol>
                    </li>
                </ul>
                <p>Tener un plan básico y los contactos adecuados a mano te dará mucha más seguridad y capacidad de reacción si surge un imprevisto.</p>
            `
        },
         'perdida-robo': {
            title: "¡Socorro! He Perdido (o me han Robado) los Documentos Clave",
            body: `
                <p>Perder el pasaporte, DNI o tarjetas bancarias mientras estás de viaje en el extranjero puede generar una gran ansiedad, pero es una situación relativamente común y tiene solución si actúas con rapidez, calma y sigues los pasos adecuados.</p>
                <h4>Pasaporte Perdido o Robado:</h4>
                <ol>
                    <li><strong>Denuncia Inmediata a la Policía Local:</strong> Este es el paso MÁS IMPORTANTE y URGENTE. Ve a la comisaría de policía más cercana al lugar donde te diste cuenta de la pérdida o donde ocurrió el robo. Explica lo sucedido con el mayor detalle posible. Te entregarán una copia de la denuncia ("Police Report"). <strong>Conserva este documento original como oro en paño</strong>, ya que te lo pedirán para todos los trámites posteriores (embajada/consulado, seguro...).</li>
                    <li><strong>Localiza y Contacta tu Embajada o Consulado:</strong> Busca en internet (usa el Wi-Fi si puedes, o pide ayuda en tu alojamiento) la dirección, teléfono y horario de atención al público de la embajada o consulado de tu país en la ciudad o país donde te encuentres. Llama para informar de tu situación y preguntar qué documentación específica necesitas llevar y si es necesario pedir cita previa (en muchos casos sí).</li>
                    <li><strong>Acude a la Embajada/Consulado Preparado:</strong> Generalmente necesitarás presentar:
                        <ul>
                            <li>La <strong>copia original de la denuncia policial</strong>.</li>
                            <li><strong>Fotografías recientes tamaño carnet/pasaporte</strong> (cumpliendo sus requisitos específicos - fondo blanco, tamaño...-; a veces hay fotomatones cerca de la embajada o te pueden indicar dónde hacerlas).</li>
                            <li>Cualquier <strong>otra forma de identificación</strong> que conserves y que acredite tu identidad y nacionalidad (DNI/Cédula de Identidad, carnet de conducir, fotocopias del pasaporte perdido...).</li>
                            <li>Pruebas de tu <strong>nacionalidad</strong> si no tienes otra identificación (certificado de nacimiento, libro de familia...).</li>
                            <li>Pruebas de tu <strong>viaje</strong> (billetes de avión de ida y vuelta, reservas de hotel...).</li>
                            <li>El <strong>formulario de solicitud</strong> correspondiente (te lo darán allí o puede estar disponible para descargar en su web).</li>
                            <li>Dinero en efectivo (normalmente en moneda local o a veces aceptan USD/EUR) para pagar las <strong>tasas consulares</strong> correspondientes a la emisión del nuevo documento. Infórmate del coste antes de ir.</li>
                        </ul>
                    </li>
                    <li><strong>Tramitación del Documento de Viaje de Emergencia:</strong> Una vez que el personal consular verifique tu identidad y nacionalidad (pueden tener que contactar con las autoridades de tu país), procederán a anular oficialmente tu pasaporte perdido/robado para evitar su uso fraudulento. Luego, te emitirán uno de los siguientes documentos temporales:
                        <ul>
                            <li>Un <strong>Salvoconducto:</strong> Es el documento más básico. Suele ser una hoja de papel con tus datos y foto. Tiene una validez muy limitada (generalmente, solo los días estrictamente necesarios para regresar a tu país). Sirve únicamente para volver directamente a tu país de origen por la ruta más directa posible. Normalmente no permite continuar viajando a otros países ni hacer escalas largas que requieran pasar inmigración en un tercer país.</li>
                            <li>O un <strong>Pasaporte de Emergencia:</strong> Es un pasaporte con menos páginas y una validez más corta que uno ordinario (por ejemplo, 6 meses o 1 año). Dependiendo del país y de los acuerdos internacionales, este pasaporte de emergencia **podría permitirte continuar tu viaje** a otros países, pero **¡OJO! debes verificar EXPRESAMENTE** si el siguiente país de tu itinerario acepta este tipo específico de pasaporte para la entrada (algunos países son muy estrictos y no los aceptan o ponen muchas trabas).</li>
                        </ul>
                        El tipo de documento que te emitan, los requisitos exactos y el tiempo que tarden en entregártelo (puede ser desde unas pocas horas si tienen todo claro, hasta varios días si necesitan más verificaciones) dependerá de cada embajada/consulado y de tu situación particular.
                    </li>
                    <li><strong>Informa a tu Seguro de Viaje:</strong> Contacta con ellos. Algunas pólizas cubren los gastos asociados a la pérdida o robo de documentos, como las tasas de emisión del nuevo pasaporte/salvoconducto, los costes de transporte para ir a la embajada/consulado, o incluso gastos de prolongación de estancia si tienes que esperar varios días por el documento. Guarda todos los recibos y la denuncia policial para la reclamación.</li>
                </ol>
                <h4>Tarjetas de Crédito/Débito Perdidas o Robadas:</h4>
                <ol>
                    <li><strong>¡BLOQUÉALAS INMEDIATAMENTE!:</strong> No esperes ni un segundo. Llama sin demora a los números de teléfono de asistencia y cancelación 24 horas de tus bancos (tenlos anotados de forma segura y separada de las tarjetas, o guardados en un gestor de contraseñas online). Informa de la pérdida o robo para que bloqueen las tarjetas y evitar que hagan cargos fraudulentos en tu cuenta.</li>
                    <li><strong>DENUNCIA A LA POLICÍA:</strong> Incluye el robo o pérdida de las tarjetas específicas en la misma denuncia que hiciste por el pasaporte (si fue conjunto) o haz una denuncia aparte si solo perdiste las tarjetas.</li>
                    <li><strong>CONTACTA CON TU BANCO (OFICINA/GESTOR):</strong> Además de la llamada de bloqueo inicial, contacta con tu oficina bancaria o gestor personal (por email o teléfono) para informarles formalmente de la situación. Pregunta sobre el procedimiento para obtener tarjetas de reemplazo (normalmente las enviarán a tu domicilio habitual, rara vez al extranjero) y si tienen alguna opción para obtener efectivo de emergencia en el extranjero (algunas redes como Visa/Mastercard tienen servicios para esto en casos extremos, pero suelen ser lentos y complejos).</li>
                    <li><strong>REVISA TUS MOVIMIENTOS BANCARIOS ONLINE:</strong> Controla de cerca tus cuentas online en los días siguientes para detectar cualquier cargo o transacción no autorizada realizada tras la pérdida/robo. Reclama inmediatamente a tu banco cualquier cargo fraudulento.</li>
                </ol>
                <p><strong>PREVENCIÓN, LA MEJOR ESTRATEGIA:</strong></p>
                <ul>
                    <li>Lleva siempre copias digitales (nube, email) y físicas (separadas) de todos tus documentos importantes.</li>
                    <li>Divide tu dinero y tarjetas: no lleves todo junto. Usa una riñonera interior, bolsillos secretos, la caja fuerte del hotel...</li>
                    <li>Lleva encima solo el efectivo necesario para el día y quizás una sola tarjeta. Deja el resto seguro en el alojamiento.</li>
                    <li>Mantente siempre atento a tu entorno y a tus pertenencias, especialmente en lugares concurridos.</li>
                </ul>
            `
        }
    }; // Fin del objeto tipData

  constructor() { }

  getTipSummaries(): TipSummary[] {
    return Object.keys(this.tipData).map(key => ({
      id: key,
      title: this.tipData[key].title,
      shortDescription: this.extractShortDescription(this.tipData[key].body)
    }));
  }

  getTipDetailById(id: string): TipDetail | undefined {
    return this.tipData[id];
  }

  private extractShortDescription(htmlBody: string): string {
    const paragraphMatch = htmlBody.match(/<p>(.*?)<\/p>/i);
    let shortDesc = paragraphMatch ? paragraphMatch[1] : 'Haz clic para leer más detalles...';
    const maxLength = 120;
    if (shortDesc.length > maxLength) {
        let trimmed = shortDesc.substring(0, maxLength);
        trimmed = trimmed.substring(0, Math.min(trimmed.length, trimmed.lastIndexOf(" ")));
        shortDesc = trimmed + '...';
    }
    return shortDesc.replace(/<[^>]*>/g, '');
  }

  // --- MÉTODO DE BÚSQUEDA EN TIPS (Corregido y Verificado) ---
  public searchTips(query: string): SearchedTip[] {
  if (!query || query.trim() === '') {
    return [];
  }
  const queryWords = query.toLowerCase().trim().split(/\s+/).filter(word => word.length > 0);
  if (queryWords.length === 0) {
    return [];
  }

  const results: SearchedTip[] = [];
  for (const id in this.tipData) {
    if (this.tipData.hasOwnProperty(id)) {
      const tip = this.tipData[id];
      const titleText = tip.title ? tip.title.toLowerCase() : '';
      const bodyText = tip.body ? tip.body.toLowerCase().replace(/<[^>]+>/g, ' ') : '';
      const combinedText = titleText + ' ' + bodyText;

      const allWordsFound = queryWords.every(word => {
        const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return regex.test(combinedText);
      });

      if (allWordsFound) {
        results.push({ id: id, title: tip.title, body: tip.body });
      }
    }
  }
  return results;
}
  // -------------------------------------------------------------------
}