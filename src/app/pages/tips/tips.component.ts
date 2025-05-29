import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser'; // Importar Title y Meta
import { ViewportScroller } from '@angular/common';
import { TipCardComponent, TipSummary } from '../../components/tip-card/tip-card.component';
import { TipDataService, TipDetail } from '../../services/tip-data.service';
import { SidebarComponent } from '../../components/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [CommonModule, TipCardComponent, SidebarComponent],
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {

  tipSummaries: TipSummary[] = [];
  isModalActive: boolean = false;
  selectedTipDetail: TipDetail | null = null;
  private siteName = "Un Rincon del Mundo"; // Para no repetir

    

    // --- Datos de los Consejos (COMPLETOS) ---
    // (El objeto tipData permanece igual que en la respuesta anterior)
    tipData = {
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
                    <li><strong>Define tu Estilo y Prioridades:</strong> ¿Qué tipo de viajero eres? ¿Qué buscas en este viaje específico? ¿Relax total en una playa? ¿Aventura y adrenalina? ¿Inmersión cultural profunda? ¿Recorrer ciudades y museos? ¿Un viaje gastronómico? ¿Presupuesto mochilero ajustado o buscas más confort? Ser honesto contigo mismo sobre tus intereses y presupuesto te ayudará a elegir el destino adecuado, el tipo de alojamiento y las actividades que realmente disfrutarás.</li>
                    <li><strong>Investigación Profunda del Destino:</strong> Una vez elegido el destino (o mientras lo eliges), sumérgete en la investigación:
                        <ul>
                            <li><strong>Mejor época para ir:</strong> Considera el clima (temperaturas, lluvias, humedad, monzones, huracanes), las temporadas turísticas (alta, media, baja - afectan a precios y multitudes) y si hay eventos especiales o festivales que te interesen (o quieras evitar).</li>
                            <li><strong>Cultura y Sociedad:</strong> Lee sobre las costumbres locales, normas de etiqueta (saludos, vestimenta, comportamiento en público), valores importantes, religión(es) predominante(s) y posibles choques culturales. Entender el contexto te ayudará a interactuar con respeto.</li>
                            <li><strong>Seguridad y Salud:</strong> Consulta las recomendaciones de viaje de tu Ministerio de Asuntos Exteriores sobre la situación de seguridad general, zonas a evitar, timos comunes. Investiga sobre recomendaciones sanitarias, vacunas necesarias o recomendadas y precauciones contra enfermedades locales (malaria, dengue...).</li>
                            <li><strong>Idioma:</strong> Averigua qué idioma(s) se hablan. Aprende al menos las frases básicas de cortesía (hola, adiós, por favor, gracias, perdón, sí, no, cuánto cuesta...).</li>
                            <li><strong>Moneda y Presupuesto:</strong> Infórmate sobre la moneda local, el tipo de cambio aproximado, el coste de vida (alojamiento, comida, transporte) y las formas de pago habituales (efectivo, tarjeta).</li>
                            <li><strong>Transporte:</strong> ¿Cómo te moverás dentro del país (vuelos internos, tren, bus, coche de alquiler)? ¿Y dentro de las ciudades? Investiga opciones, precios y cómo reservar.</li>
                            <li><strong>Gastronomía:</strong> ¡Una parte esencial! Descubre los platos típicos, bebidas locales y posibles precauciones alimentarias.</li>
                            <li><strong>Alojamiento:</strong> Tipos disponibles (hoteles, hostels, guesthouses, Airbnb...), precios medios, zonas recomendadas para alojarse según tus intereses y presupuesto.</li>
                        </ul>
                        <em>Fuentes útiles: Guías de viaje actualizadas (Lonely Planet, Rough Guides, Bradt...), blogs de viajes especializados en el destino, foros de viajeros (Tripadvisor, Los Viajeros...), webs oficiales de turismo del país/región, documentales.</em>
                    </li>
                    <li><strong>Esboza un Itinerario Lógico y Flexible:</strong>
                        <ul>
                            <li>Haz una lista realista de lugares y actividades que te gustaría ver/hacer. Prioriza tus "imprescindibles".</li>
                            <li>Organiza estos puntos en un mapa para crear una ruta geográfica lógica que minimice los tiempos y costes de traslado.</li>
                            <li>Establece un ritmo sostenible. No intentes meter demasiadas cosas en poco tiempo. Es mejor disfrutar a fondo de menos lugares. Calcula tiempos de viaje realistas entre puntos, añadiendo margen para imprevistos.</li>
                            <li><strong>¡Deja días libres o tardes sin planes fijos!</strong> La flexibilidad es clave. Permítete descansar, explorar sin rumbo, quedarte más tiempo en un lugar que te encante o aprovechar oportunidades que surjan espontáneamente.</li>
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
                    <li><strong>Reserva Anticipada (Solo lo Necesario):</strong> Reserva con antelación vuelos internacionales, alojamiento en lugares muy populares o si viajas en temporada alta, trenes específicos (ej. nocturnos), coche de alquiler (especialmente si es automático o campervan), y entradas para atracciones con cupos limitados o que generan colas enormes (ej. Alhambra, Torre Eiffel, Vaticano, entradas a Parques Nacionales con reserva previa). Para el resto, a menudo puedes reservar sobre la marcha o con pocos días de antelación, ganando flexibilidad.</li>
                    <li><strong>Prepara un Plan B Mental:</strong> Piensa brevemente qué harías si algo falla (vuelo cancelado, mal tiempo, lugar cerrado...). Tener una alternativa en mente reduce el estrés si ocurre.</li>
                    <li><strong>Disfruta el Proceso:</strong> La planificación y la anticipación son parte de la diversión del viaje. ¡Pero recuerda que el objetivo final es disfrutar de la experiencia una vez estés allí!</li>
                </ul>
            `
        },
         presupuesto: {
            title: "Controla tu Presupuesto: Viaja Más y Mejor Sin Arruinarte",
            body: `
                <p>Un presupuesto bien planificado es la base para disfrutar de tu viaje sin preocupaciones económicas y, a menudo, permite viajar más tiempo o más lejos. No se trata de ser tacaño, sino inteligente con tu dinero.</p>
                <ul>
                    <li><strong>Define tu Límite Total y Sé Realista:</strong> Antes de nada, decide cuánto dinero estás dispuesto y puedes gastar en este viaje concreto. Considera todos los posibles gastos: vuelos, seguro, visados, vacunas, equipo, alojamiento, comida, transporte, actividades, compras, y un colchón para imprevistos.</li>
                    <li><strong>Investiga a Fondo el Coste de Vida del Destino:</strong> Es el paso más crucial. ¿Es un destino caro (Suiza, Japón, Escandinavia), medio (Europa Occidental, EEUU, Australia) o barato (Sudeste Asiático, partes de Latinoamérica o Europa del Este)? Usa webs como Numbeo (compara coste de vida), Price of Travel (índice Backpacker) o busca en blogs de viajes ("presupuesto X días en Y") para estimar costes diarios promedio de:
                        <ul>
                            <li><strong>Alojamiento:</strong> ¿Cuánto cuesta una cama en dormitorio de hostel? ¿Una habitación doble en guesthouse/hotel económico? ¿Un hotel medio?</li>
                            <li><strong>Comida:</strong> ¿Precio de una comida callejera? ¿Un menú en restaurante local? ¿Una cena en restaurante turístico? ¿Compra en supermercado?</li>
                            <li><strong>Transporte Local:</strong> ¿Coste de un billete de metro/bus? ¿Tarifa media de un taxi/tuk-tuk?</li>
                            <li><strong>Actividades y Entradas:</strong> ¿Precio de museos, ruinas, tours organizados, actividades de aventura?</li>
                        </ul>
                    </li>
                    <li><strong>Desglosa y Estima Gastos Principales:</strong>
                        <ul>
                            <li><strong>Gastos Fijos (Pre-viaje):</strong> Vuelos internacionales/principales, seguro de viaje obligatorio, visados, vacunas específicas, equipo esencial que necesites comprar.</li>
                            <li><strong>Gastos Variables (Durante el viaje):</strong> Alojamiento (estima un coste por noche), Comida (estima un coste diario), Transporte interno (vuelos, trenes, buses, alquiler coche/moto), Actividades/Entradas, Compras/Souvenirs, Varios (lavandería, SIM, etc.).</li>
                        </ul>
                    </li>
                    <li><strong>Calcula un Presupuesto Diario Guía:</strong> Resta los gastos fijos pre-viaje de tu presupuesto total. Divide el dinero restante entre el número total de días de tu viaje. Esto te dará una cifra diaria promedio como referencia para cubrir alojamiento, comida, transporte local, actividades y extras. Obviamente, unos días gastarás más y otros menos.</li>
                    <li><strong>Prioriza tus Gastos Según tu Estilo:</strong> ¿Qué es innegociable para ti? ¿Prefieres dormir en hostels básicos para poder permitirte un curso de buceo o un vuelo en globo? ¿O necesitas la comodidad de un hotel privado aunque tengas que comer más sencillo? ¿Eres de museos o de naturaleza? Asigna más presupuesto a lo que más valoras.</li>
                    <li><strong>Busca Activamente Formas de Ahorrar:</strong>
                        <ul>
                            <li><strong>Transporte:</strong> Viaja en temporada baja/media, sé flexible con fechas/aeropuertos, considera escalas, usa transporte público local, camina mucho, considera buses nocturnos (ahorras noche de alojamiento).</li>
                            <li><strong>Alojamiento:</strong> Hostels, guesthouses, Airbnb (habitaciones/apartamentos con cocina), Couchsurfing, housesitting. Reserva con antelación. Evita zonas híper-turísticas.</li>
                            <li><strong>Comida:</strong> Cocina algunas comidas si puedes, come en mercados/puestos callejeros (con precaución), aprovecha menús del día, haz picnics, compra snacks/bebidas en supermercados, limita alcohol/restaurantes caros. Lleva botella reutilizable.</li>
                            <li><strong>Actividades:</strong> Busca días/horas de entrada gratuita a museos, haz free walking tours (dando propina justa), disfruta de parques/naturaleza, busca alternativas locales a tours masivos, usa carnets de descuento (estudiante, joven...).</li>
                        </ul>
                    </li>
                    <li><strong>Registra tus Gastos Diariamente:</strong> Usa una app (Splitwise - genial para grupos, Trabee, Spendee, Fintonic...) o una simple libreta/Excel. Anotar lo que gastas te hace consciente y te permite ajustar si te estás desviando mucho del promedio diario.</li>
                    <li><strong>Gestión Inteligente del Dinero y Tarjetas:</strong>
                        <ul>
                            <li>Avisa a tu banco del viaje para evitar bloqueos.</li>
                            <li>Infórmate sobre comisiones por sacar en cajeros extranjeros (tu banco y el banco local) y por pagar en divisa extranjera.</li>
                            <li>Considera tarjetas específicas para viajeros (Revolut, N26, Wise...) con bajas comisiones y buenos tipos de cambio.</li>
                            <li>Lleva una combinación: algo de efectivo local para pequeños gastos, una tarjeta de débito para sacar de cajeros, y una o dos de crédito para pagos grandes, reservas o emergencias.</li>
                            <li>Guarda dinero/tarjetas en lugares diferentes y seguros.</li>
                        </ul>
                    </li>
                    <li><strong>¡El Colchón para Imprevistos!:</strong> Fundamental. Reserva siempre una parte de tu presupuesto total (un 10-15% es una buena cifra) para gastos inesperados: un taxi de emergencia, una medicina, reemplazar algo perdido, una oportunidad única que no planeaste... Te dará muchísima tranquilidad.</li>
                </ul>
            `
        },
         aeropuerto: {
            title: "Supera el Aeropuerto Sin Estrés: Guía Rápida y Eficaz",
            body: `
                <p>El paso por el aeropuerto puede ser una fuente de estrés, pero con un poco de preparación y conocimiento del proceso, puedes navegarlo sin problemas y empezar tu viaje con buen pie.</p>
                <ol>
                    <li><strong>Check-in Online Anticipado:</strong> Ahorra tiempo y posibles colas haciendo el check-in online desde casa o el hotel, normalmente disponible desde 24 o 48 horas antes del vuelo. Esto te permite elegir asiento (a veces) y obtener tu tarjeta de embarque digital (guárdala en el móvil y haz captura de pantalla) o imprimirla.</li>
                    <li><strong>Llega con Tiempo de Sobra:</strong> Es la regla de oro. No apures. Calcula el tiempo de traslado al aeropuerto (considerando posible tráfico) y suma el tiempo recomendado por la aerolínea:
                        <ul>
                            <li><strong>Vuelos Domésticos / Cortos (ej. dentro Schengen):</strong> Mínimo 1.5 - 2 horas antes de la salida.</li>
                            <li><strong>Vuelos Internacionales:</strong> Mínimo 3 horas antes de la salida.</li>
                        </ul>
                        Es mejor esperar un poco en la puerta de embarque tomando un café que correr el riesgo de perder el vuelo por colas inesperadas en facturación o seguridad.
                    </li>
                    <li><strong>Documentación Esencial Preparada y Accesible:</strong> Ten siempre a mano (en un bolsillo seguro, bolso de mano o cartera de viaje) tu pasaporte (o DNI si aplica) y tu tarjeta de embarque (digital o impresa). No los guardes en la maleta que vas a facturar.</li>
                    <li><strong>Facturación de Equipaje (si aplica):</strong> Si necesitas facturar maleta:
                        <ul>
                            <li>Si hiciste check-in online: Busca los mostradores específicos de "Baggage Drop-off", suelen ser más rápidos.</li>
                            <li>Si no hiciste check-in online: Ve a los mostradores de facturación regulares de tu aerolínea.</li>
                        </ul>
                         Verifica el peso máximo permitido para tu maleta antes de salir de casa para evitar cargos por exceso de equipaje. Coloca una etiqueta identificativa con tus datos en la maleta.
                    </li>
                    <li><strong>Prepara tu Equipaje de Mano para el Control de Seguridad:</strong> Para pasar rápido y sin problemas:
                        <ul>
                            <li><strong>Líquidos (<100ml):</strong> Todos los envases individuales deben ser de 100ml/100g o menos. Deben ir juntos en una única bolsa de plástico transparente con cierre tipo zip (aprox. 1 litro / 20x20cm). Saca esta bolsa de tu equipaje y ponla visible en la bandeja. (Medicamentos líquidos con receta o comida infantil pueden tener excepciones, consulta la normativa).</li>
                            <li><strong>Electrónicos Grandes:</strong> Ordenadores portátiles, tablets y a veces cámaras grandes deben sacarse de sus fundas/mochilas y colocarse en una bandeja separada.</li>
                            <li><strong>Abrigos, Chaquetas, Bufandas, Cinturones, Relojes:</strong> Prepárate para quitártelos y ponerlos en la bandeja.</li>
                            <li><strong>Bolsillos Vacíos:</strong> Asegúrate de no llevar monedas, llaves, móvil u otros objetos metálicos en los bolsillos.</li>
                            <li><strong>Calzado:</strong> En algunos países (ej. EEUU) o si llevas botas altas o calzado con partes metálicas, es muy probable que te pidan descalzarte.</li>
                        </ul>
                    </li>
                     <li><strong>Paso por el Control de Seguridad (Rayos X):</strong> Coloca todo (equipaje de mano, bolsa de líquidos, electrónicos, abrigo, objetos personales...) en las bandejas que te indiquen. Pasa por el arco detector de metales o el escáner corporal siguiendo las instrucciones del personal. Recoge tus pertenencias con calma, verificando que no te dejas nada en las bandejas. Sé paciente, puede haber colas.</li>
                    <li><strong>Control de Pasaportes (Inmigración/Emigración):</strong> Requerido para vuelos internacionales fuera de tu zona de libre circulación (ej. salir/entrar a la zona Schengen, EEUU, etc.). Ten tu pasaporte y tarjeta de embarque listos. Pueden hacerte preguntas sobre tu viaje.</li>
                    <li><strong>Localiza tu Puerta de Embarque (Gate):</strong> Una vez superados los controles, busca tu número de puerta en las pantallas de información ("Departures / Salidas"). Fíjate bien en la terminal y la zona. Sigue las señales. Calcula el tiempo necesario para llegar, algunas terminales son enormes y requieren caminar bastante o incluso tomar trenes internos.</li>
                    <li><strong>Espera y Embarque (Boarding):</strong> Dirígete a tu puerta con tiempo. Verifica la hora de inicio del embarque en tu tarjeta o en las pantallas. Estate atento a los anuncios. Normalmente llaman a embarcar por grupos o zonas (priority, familias, zonas por número de asiento). Ten de nuevo tu tarjeta de embarque y pasaporte/DNI listos para mostrarlos al personal de puerta.</li>
                    <li><strong>¡Relájate y a Volar!:</strong> Una vez en el avión, busca tu asiento, guarda tu equipaje de mano correctamente (en el compartimento superior o bajo el asiento delantero, no bloqueando pasillos o salidas), abróchate el cinturón cuando lo indiquen y prepárate para disfrutar del vuelo.</li>
                </ol>
            `
        },
         vuelo: {
            title: "Haz tu Vuelo Más Agradable: Consejos para Sobrevivir en las Alturas",
            body: `
                <p>Volar puede ser emocionante, pero también agotador, especialmente en vuelos largos. Con estos consejos, puedes hacer la experiencia mucho más cómoda y llevadera, llegando a tu destino más descansado.</p>
                <ul>
                    <li><strong>Selección Estratégica de Asiento:</strong> Si la aerolínea lo permite (a veces pagando un extra), elegir tu asiento puede marcar una gran diferencia en tu comodidad.
                        <ul>
                            <li><strong>Ventanilla:</strong> Ideal para dormir apoyando la cabeza en la pared, disfrutar de las vistas (sobre todo en despegue/aterrizaje si es de día) y no ser molestado por los vecinos que quieran levantarse. Inconveniente: tienes que molestar tú para salir.</li>
                            <li><strong>Pasillo:</strong> Te da libertad para levantarte a estirar las piernas o ir al baño cuando quieras sin molestar. Más fácil acceso al equipaje de mano superior. Ideal si eres alto o necesitas moverte. Inconveniente: te pueden molestar los vecinos al levantarse o el carrito de servicio.</li>
                            <li><strong>Mamparas (Bulkhead) / Salidas de Emergencia:</strong> Ventaja: más espacio para las piernas. Desventajas: a menudo no hay asiento delantero bajo el que guardar objetos pequeños, la mesita y pantalla suelen estar en el reposabrazos (haciéndolo más estrecho), puedes tener restricciones (no niños/bebés, personas con movilidad reducida, a veces requieren entender inglés/idioma local) y puedes sentir más frío.</li>
                            <li><strong>¿Dónde NO sentarse?:</strong> Generalmente, evita las últimas filas (cerca de los baños y la cocina, asientos a veces no reclinables) y las filas justo delante de una salida de emergencia o mampara (pueden no reclinarse). Consulta webs como SeatGuru.com con tu número de vuelo para ver mapas detallados y comentarios sobre asientos específicos.</li>
                        </ul>
                    </li>
                    <li><strong>Vestimenta: Capas, Comodidad y Calcetines:</strong> La clave es vestir cómodo. Usa ropa holgada que no apriete, preferiblemente de tejidos naturales y transpirables. Viste por capas (camiseta, jersey/sudadera, pañuelo/bufanda grande) para adaptarte a la temperatura variable de la cabina. Lleva calcetines cómodos y gruesos; quitarse los zapatos durante un vuelo largo alivia mucho (¡pero por favor, asegúrate de que tus pies no huelan mal!). Considera calcetines de compresión para mejorar la circulación en vuelos muy largos.</li>
                    <li><strong>Hidratación Fundamental:</strong> El aire en la cabina es extremadamente seco (humedad muy baja). Bebe mucha agua antes, durante y después del vuelo para evitar la deshidratación, fatiga y dolores de cabeza. Lleva una botella reutilizable vacía y pide a la tripulación que te la rellene. Limita el consumo de alcohol y cafeína, ya que tienen efecto diurético y deshidratan más.</li>
                    <li><strong>Muévete y Estírate Regularmente:</strong> En vuelos largos (>3-4 horas), no permanezcas sentado todo el tiempo. Levántate cada hora o dos (cuando el servicio lo permita), camina por el pasillo, haz círculos con los tobillos sentado, estira las pantorrillas, el cuello y los hombros. Esto mejora la circulación, previene la rigidez muscular y reduce el riesgo de Trombosis Venosa Profunda (TVP).</li>
                    <li><strong>Tu Kit Personal de Confort y Supervivencia:</strong> Prepara una pequeña bolsa o neceser con artículos esenciales para tener a mano en tu asiento:
                        <ul>
                            <li><strong>Para Dormir:</strong> Antifaz de buena calidad (que bloquee bien la luz), tapones para los oídos (de espuma o silicona) o, mejor aún, auriculares con cancelación activa de ruido.</li>
                            <li><strong>Comodidad:</strong> Almohada de viaje hinchable o viscoelástica (las de cuello en forma de U son populares), una bufanda grande o manta ligera (a veces las del avión no son suficientes o no hay).</li>
                            <li><strong>Higiene y Frescor:</strong> Bálsamo labial, crema hidratante (manos/cara), spray de agua termal, toallitas húmedas, desinfectante de manos, cepillo y pasta de dientes pequeños.</li>
                            <li><strong>Salud:</strong> Medicamentos personales que necesites, analgésicos básicos (paracetamol/ibuprofeno), algo para el mareo si eres propenso.</li>
                            <li><strong>Snacks:</strong> Frutos secos, barritas, fruta deshidratada... por si la comida no llega pronto o no te gusta.</li>
                        </ul>
                    </li>
                    <li><strong>Entretenimiento Descargado Previamente:</strong> No dependas al 100% del sistema de entretenimiento a bordo. Descarga películas, series, episodios de podcasts, playlists de música y libros electrónicos en tu móvil, tablet o e-reader ANTES de salir de casa. Asegúrate de tener batería y lleva tus propios auriculares de calidad.</li>
                    <li><strong>Combate el Jet Lag desde el Aire:</strong> Nada más subir al avión, ajusta tu reloj (y tu mente) a la hora del destino. Intenta comer y dormir siguiendo el horario de llegada. Si llegas de día, intenta mantenerte despierto en el avión. Si llegas de noche, intenta dormir. Usa el antifaz y evita pantallas si quieres dormir.</li>
                    <li><strong>Presión en los Oídos (Despegue/Aterrizaje):</strong> Para aliviar la molestia por el cambio de presión, prueba a bostezar, tragar saliva, masticar chicle, chupar un caramelo o realizar la maniobra de Valsalva (tapar nariz y soplar suavemente con boca cerrada). Tapones especiales (como EarPlanes) también pueden ayudar.</li>
                </ul>
            `
        },
         'bus-tren': {
            title: "Viajes Largos en Bus o Tren: Comodidad y Estrategia Terrestre",
            body: `
                <p>Los viajes largos por tierra en autobús o tren pueden ser una forma fantástica, económica y a menudo escénica de moverse entre destinos. Sin embargo, pasar muchas horas sentado requiere cierta preparación para que la experiencia sea lo más cómoda posible.</p>
                <ul>
                    <li><strong>Reserva Estratégica y Anticipada:</strong> Especialmente para trenes nocturnos (si quieres litera - sleeper berth) o rutas de autobús muy populares (sobre todo en fines de semana o festivos). Reservar con antelación te asegura plaza y, a veces, mejores precios. Si puedes elegir asiento al reservar, considera: ventanilla (vistas, apoyar cabeza), pasillo (levantarse fácil), lejos de los baños, en el sentido de la marcha (si te mareas).</li>
                    <li><strong>Llega con Tiempo a la Estación:</strong> Las estaciones de autobús y tren, especialmente en grandes ciudades, pueden ser enormes, caóticas y confusas. Llega con suficiente margen (al menos 30-45 minutos antes) para encontrar tu andén o dársena, verificar horarios en las pantallas, guardar equipaje si es necesario y localizar tu vehículo/vagón/asiento sin estrés.</li>
                    <li><strong>Equipaje de Mano: Tu Aliado Esencial:</strong> Prepara una mochila o bolso pequeño con todo lo que necesitarás durante el trayecto, ya que tu maleta grande probablemente irá en la bodega del autobús o en compartimentos superiores/específicos del tren, y puede no ser accesible fácilmente. Incluye:
                        <ul>
                            <li>Agua y snacks suficientes.</li>
                            <li>Libro, e-reader, música, podcasts, películas descargadas (¡con auriculares!).</li>
                            <li>Cargador portátil (power bank) completamente cargado y cable.</li>
                            <li>Kit de confort: almohada de viaje (hinchable ocupa menos), antifaz, tapones para los oídos.</li>
                            <li>Algo de abrigo: jersey, chaqueta ligera, bufanda/pañuelo grande (el aire acondicionado puede ser fuerte o hacer frío por la noche).</li>
                            <li>Medicamentos personales, analgésicos básicos, tiritas.</li>
                            <li>Pañuelos de papel, toallitas húmedas, desinfectante de manos.</li>
                            <li>Documentos importantes y objetos de valor (¡nunca en la maleta grande!).</li>
                        </ul>
                    </li>
                    <li><strong>Vístete en Capas y Prioriza la Comodidad:</strong> Ropa holgada, tejidos cómodos (algodón, chándal), zapatos fáciles de quitar (¡pero lleva calcetines!). Las capas te permitirán adaptarte a la temperatura variable del vehículo.</li>
                    <li><strong>Kit de Confort Nocturno (si viajas de noche):</strong> Además de lo anterior, una pequeña manta de viaje o un saco de dormir sábana pueden ser muy útiles. Si vas en litera de tren, suelen proporcionar sábanas y almohada, pero una máscara y tapones siguen siendo recomendables.</li>
                    <li><strong>Alimentación e Hidratación Planificada:</strong> No confíes únicamente en las paradas o el posible servicio a bordo. Lleva suficiente agua y snacks saludables y que no ensucien mucho (fruta, frutos secos, bocadillos, barritas...). Evita comidas muy pesadas o con olores fuertes por respeto a los demás.</li>
                    <li><strong>Entretenimiento Offline Garantizado:</strong> El Wi-Fi a bordo (si existe) suele ser lento o poco fiable. Los enchufes pueden no funcionar o estar ocupados. Asegúrate de descargar todo tu contenido multimedia antes de salir.</li>
                    <li><strong>Seguridad de tus Pertenencias:</strong> Mantén tus objetos de valor (móvil, cartera, pasaporte) siempre contigo, incluso si vas al baño. En paradas, no dejes nada de valor a la vista en tu asiento si te bajas. Si duermes, guarda tus objetos importantes en un lugar seguro (bolsillo interior con cremallera, riñonera bajo la ropa). Considera un candado pequeño para tu mochila de mano.</li>
                    <li><strong>Higiene Básica sobre Ruedas/Rieles:</strong> Un pequeño neceser con cepillo/pasta de dientes, toallitas húmedas y desinfectante te ayudará a sentirte más fresco. Los baños en buses/trenes varían enormemente en limpieza; prepárate para lo básico.</li>
                    <li><strong>Aprovecha las Paradas (con Cautela):</strong> Si el viaje incluye paradas programadas, úsalas para estirar bien las piernas, ir a un baño más decente (si es posible) o comprar algo rápido. PERO, estate MUY atento a la duración anunciada de la parada y a la hora de salida para no quedarte atrás. ¡El bus/tren no espera!</li>
                    <li><strong>Socializa o Aíslate Según tu Ánimo:</strong> Los viajes largos pueden ser una buena oportunidad para charlar con otros viajeros o locales. Pero si prefieres tu espacio, unos auriculares (incluso sin música) suelen ser una señal clara.</li>
                     <li><strong>Respeta el Entorno Compartido:</strong> Sé considerado con los demás. No pongas música alta, evita llamadas telefónicas largas y ruidosas, no invadas el espacio del vecino, mantén tu zona relativamente limpia.</li>
                </ul>
            `
        },
         coche: {
            title: "Road Trips Seguros y Amenos: Disfruta la Libertad de la Carretera",
            body: `
                <p>Un viaje por carretera (road trip) ofrece una libertad y flexibilidad incomparables para explorar a tu propio ritmo, descubrir lugares fuera de ruta y adaptar el viaje sobre la marcha. Para que la experiencia sea segura y placentera, ten en cuenta estos consejos:</p>
                <ul>
                    <li><strong>Revisión Pre-Viaje Exhaustiva del Vehículo:</strong> Antes de emprender un viaje largo, es fundamental asegurarse de que el coche está en buen estado. Revisa (o pide a un mecánico que revise):
                        <ul>
                            <li><strong>Neumáticos:</strong> Presión correcta (incluyendo la rueda de repuesto, si la hay), profundidad del dibujo adecuada (ver indicadores de desgaste), sin cortes ni abultamientos.</li>
                            <li><strong>Niveles:</strong> Aceite del motor, líquido refrigerante (anticongelante), líquido de frenos, líquido limpiaparabrisas. Rellena si es necesario.</li>
                            <li><strong>Luces:</strong> Comprueba que funcionan todas las luces exteriores: posición, cruce (cortas), carretera (largas), intermitentes, freno, marcha atrás y matrícula. Lleva bombillas de repuesto si sabes cambiarlas.</li>
                            <li><strong>Frenos:</strong> El pedal debe tener un tacto firme, sin ruidos extraños al frenar. Comprueba el estado de las pastillas si es posible.</li>
                            <li><strong>Limpiaparabrisas:</strong> Las escobillas deben limpiar bien, sin dejar rastros ni hacer ruido. Rellena el depósito del líquido.</li>
                            <li><strong>Batería:</strong> Sin signos de corrosión en los bornes. Si tiene varios años, considera comprobar su estado.</li>
                        </ul>
                        Si alquilas coche: inspecciónalo detenidamente al recogerlo por cualquier daño preexistente (arañazos, abolladuras) y asegúrate de que quede reflejado en el contrato. Haz fotos/vídeo como prueba. Comprueba que te entregan la documentación, el kit de emergencia obligatorio (triángulos, chaleco) y que entiendes cómo funciona el coche (luces, limpias, combustible...).
                    </li>
                    <li><strong>Planificación Inteligente y Flexible de la Ruta:</strong>
                        <ul>
                            <li>Usa apps de navegación (Google Maps, Waze, Sygic, Maps.me) pero descarga SIEMPRE los mapas offline de toda la zona por la que vas a circular. La cobertura móvil no está garantizada.</li>
                            <li>Divide el viaje en etapas diarias realistas. Evita conducir más de 8-10 horas al día. Considera la velocidad media real (no solo lo que dice el GPS), que suele ser menor por tráfico, paradas, carreteras secundarias...</li>
                            <li>Identifica posibles puntos de parada para descansar (cada 2 horas aprox.), comer, repostar (¡no apures el depósito en zonas remotas!) y visitar lugares de interés por el camino.</li>
                            <li>Consulta el estado del tráfico, posibles obras o cierres de carreteras antes de salir y durante el viaje si tienes conexión.</li>
                            <li>Ten rutas alternativas en mente por si acaso.</li>
                        </ul>
                    </li>
                    <li><strong>Documentación Necesaria a Bordo:</strong> Permiso de conducir válido (nacional y/o Permiso Internacional de Conducción - PIC, según el país), permiso de circulación del vehículo, tarjeta de inspección técnica (ITV si aplica), póliza y recibo del seguro obligatorio (y la Carta Verde si viajas fuera de la UE/Espacio Económico Europeo).</li>
                    <li><strong>Conoce y Respeta las Normas de Tráfico Locales:</strong> ¡Fundamental! Infórmate sobre: límites de velocidad (ciudad, carretera, autopista), si se conduce por la izquierda o derecha, normas de prioridad en cruces y rotondas, tasas de alcoholemia permitidas (¡lo mejor es 0.0!), uso obligatorio de cinturones (todos), sistemas de retención infantil, prohibición de usar el móvil (solo manos libres), normativa sobre luces (diurnas, cruce obligatorias en túneles...), equipamiento obligatorio (triángulos, chalecos...).</li>
                    <li><strong>Peajes y Viñetas:</strong> Investiga si tu ruta incluye autopistas de peaje (cómo se pagan: efectivo, tarjeta, sistema electrónico tipo Via-T/Telepass) o si necesitas comprar una viñeta (pegatina para el parabrisas) para circular por autopistas de ciertos países (Suiza, Austria, Eslovenia...). Cómprala antes de entrar al país o justo en la frontera.</li>
                    <li><strong>Kit de Emergencia Completo:</strong> Además de lo obligatorio (triángulos, chalecos), considera llevar: rueda de repuesto en buen estado (o kit reparapinchazos), gato, llave de ruedas, linterna con pilas, botiquín básico, guantes de trabajo, pinzas de arranque, un pequeño extintor (opcional), agua y algo de comida no perecedera. Ten a mano el teléfono de asistencia en carretera de tu seguro.</li>
                    <li><strong>Conducción Segura y Descansada:</strong> La seguridad es lo primero. No conduzcas cansado, bajo los efectos del alcohol o drogas, o si estás tomando medicación que afecte a la conducción. Haz paradas frecuentes. Mantén la distancia de seguridad. Adapta la velocidad a las condiciones de la vía y del clima. Sé especialmente prudente de noche, con lluvia, niebla o nieve. Si viajas acompañado, turnaos al volante.</li>
                    <li><strong>Entretenimiento y Ambiente Agradable:</strong> Prepara buena música (playlists descargadas), podcasts, audiolibros... algo para todos los gustos de los ocupantes. Juegos de viaje si vas con niños.</li>
                    <li><strong>Organización Interior:</strong> Mantén el habitáculo ordenado. Ten a mano agua, snacks, pañuelos, cargador de móvil, gafas de sol... Usa organizadores de asiento si es necesario. Una bolsa para la basura es esencial.</li>
                    <li><strong>Seguridad al Aparcar:</strong> Cierra siempre el coche. No dejes NADA de valor a la vista (ni siquiera cargadores o soportes de móvil). Guarda el equipaje en el maletero antes de llegar a tu destino final si vas a parar en algún sitio intermedio. Elige aparcamientos seguros e iluminados.</li>
                    <li><strong>Conducción Eficiente:</strong> Ahorra combustible y reduce emisiones manteniendo una velocidad constante, usando marchas largas, anticipando frenadas y evitando acelerones innecesarios. Usa el aire acondicionado con moderación.</li>
                </ul>
            `
        },
         barco: {
            title: "Navegando con Comodidad: Consejos para Ferries y Cruceros",
            body: `
                <p>Ya sea un corto trayecto en ferry entre islas o un largo crucero transatlántico, viajar en barco tiene sus particularidades. Con estos consejos, tu travesía será más placentera y evitarás contratiempos.</p>
                <ul>
                    <li><strong>Reserva y Documentación:</strong> Reserva billetes de ferry con antelación, sobre todo en temporada alta, fines de semana, rutas populares o si viajas con vehículo (las plazas de garaje son limitadas). Para cruceros, la reserva se hace con muchísima más antelación. Verifica qué documentación necesitas para embarcar (DNI/Pasaporte - ¡incluso en ferries dentro de un mismo país a veces lo piden!, billete/confirmación de reserva).</li>
                    <li><strong>Llegada al Puerto y Embarque:</strong> Infórmate sobre la ubicación exacta de la terminal de tu compañía de ferry o crucero dentro del puerto. Llega con la antelación recomendada por la compañía (suele ser mayor si embarcas con vehículo). Los procedimientos de check-in, controles de seguridad (similares a los de aeropuertos en cruceros) y embarque pueden llevar tiempo. Sigue las indicaciones del personal.</li>
                    <li><strong>Prevención y Manejo del Mareo (Mal de Mer):</strong> Es una preocupación común. Si eres propenso/a o tienes dudas:
                        <ul>
                            <li><strong>Medicación Preventiva:</strong> Toma medicamentos contra el mareo (como dimenhidrinato - Biodramina, Cinfamar...) *antes* de sentir los síntomas (idealmente 30-60 min antes de embarcar o zarpar). Consulta a tu médico o farmacéutico sobre la opción más adecuada (algunos producen somnolencia).</li>
                            <li><strong>Pulseras de Acupresión:</strong> Bandas elásticas que presionan el punto P6 Neiguan en la muñeca. Su efectividad varía, pero son inocuas y algunas personas notan alivio.</li>
                            <li><strong>Remedios Naturales:</strong> Jengibre (cápsulas, caramelos, infusión fresca) o menta pueden ayudar a calmar el estómago.</li>
                            <li><strong>Ubicación Estratégica:</strong> Elige asientos o camarotes en las cubiertas más bajas y en el centro del barco, donde el movimiento (cabeceo y balanceo) se siente menos.</li>
                            <li><strong>Mirada al Horizonte y Aire Fresco:</strong> Si empiezas a sentirte mareado, sal a una cubierta exterior, busca un punto fijo en el horizonte y respira aire fresco. Evita espacios cerrados sin ventilación, olores fuertes (comida, combustible) y mirar fijamente objetos cercanos (leer, pantallas).</li>
                            <li><strong>Alimentación Ligera:</strong> Evita comidas pesadas, grasientas, muy dulces o alcohol antes y durante la travesía. Opta por alimentos ligeros y mantente hidratado con agua. Galletas saladas tipo cracker pueden ayudar.</li>
                        </ul>
                    </li>
                    <li><strong>Gestión del Equipaje:</strong> En ferries cortos como pasajero a pie, normalmente llevas todo tu equipaje contigo. En ferries más grandes o nocturnos con camarote, puede haber consignas de pago o dejas la maleta grande en el camarote. Si viajas con coche, el equipaje principal se queda dentro del vehículo en la bodega (asegúrate de coger todo lo que necesites para la travesía, ya que el acceso suele estar prohibido una vez zarpa el barco). En cruceros, funciona similar a un avión: facturas las maletas grandes al llegar al puerto y te las entregan más tarde en tu camarote; prepara un bolso de mano con lo esencial para las primeras horas.</li>
                    <li><strong>Exploración Inicial del Barco:</strong> Nada más embarcar, date una vuelta rápida para localizar puntos clave: tu asiento/camarote, las cubiertas exteriores accesibles, los bares/cafeterías/restaurantes, los baños, la tienda (si hay), y muy importante, los puntos de reunión y chalecos salvavidas en caso de emergencia (mira los carteles informativos). Coge un plano del barco si está disponible en recepción/información.</li>
                    <li><strong>Protección Solar y Ropa de Abrigo:</strong> En las cubiertas exteriores, incluso en días nublados, el sol y su reflejo en el agua pueden quemar rápidamente. Usa protector solar alto. Además, siempre suele hacer más viento y sensación de frío en cubierta, incluso en verano. Lleva una chaqueta cortavientos o un jersey a mano.</li>
                    <li><strong>Calzado Adecuado:</strong> Opta por calzado cómodo, cerrado y con suela antideslizante para moverte con seguridad por las cubiertas, que pueden estar mojadas o inclinarse con el oleaje.</li>
                    <li><strong>Entretenimiento Personalizado:</strong> Lleva libros, e-readers, música, podcasts, juegos de cartas o descargas de vídeo para pasar el tiempo, especialmente en travesías de ferry largas donde el entretenimiento a bordo puede ser básico o inexistente. Los cruceros, en cambio, suelen ofrecer un amplio programa de actividades, espectáculos y servicios.</li>
                    <li><strong>Opciones de Comida y Bebida:</strong> Los ferries suelen tener cafeterías o restaurantes tipo self-service (la calidad y precio varían mucho). Los cruceros ofrecen múltiples opciones, desde buffets incluidos hasta restaurantes de especialidad de pago. Verifica qué está incluido en tu billete/paquete. Considera llevar tus propios snacks y bebidas (sobre todo agua) en ferries para ahorrar y tener lo que te gusta.</li>
                </ul>
            `
        },
         llegada: {
            title: "Primeros Pasos al Llegar: Aterriza (o Desembarca) con Buen Pie",
            body: `
                <p>¡Felicidades, has llegado a tu destino! La emoción es palpable, pero los primeros momentos tras aterrizar o desembarcar pueden ser un poco confusos. Sigue estos pasos para asegurarte una transición suave y empezar a disfrutar cuanto antes.</p>
                <ol>
                    <li><strong>Navega los Controles de Llegada (Inmigración y Aduanas):</strong> Si llegas de un vuelo o trayecto internacional, sigue las señales hacia "Immigration/Passport Control". Ten tu pasaporte y visado (si es necesario) listos. Responde a las preguntas del oficial de forma clara y concisa (motivo del viaje, duración, dónde te alojas...). Una vez sellado el pasaporte, dirígete a "Baggage Claim" para recoger tu equipaje facturado. Finalmente, pasa por Aduanas ("Customs"). Si no tienes nada que declarar (lo más habitual para turistas), sigue el carril verde ("Nothing to Declare"). Si llevas artículos que debes declarar (grandes cantidades de efectivo, ciertos alimentos, etc.), usa el carril rojo.</li>
                    <li><strong>Verifica tu Equipaje Cuidadosamente:</strong> Cuando recojas tu maleta de la cinta, asegúrate de que es realmente la tuya (¡muchas se parecen!). Revisa si tiene algún daño visible importante (roturas, abolladuras graves). Si tu maleta no aparece o está dañada, NO salgas de la zona de recogida de equipajes. Acude INMEDIATAMENTE al mostrador de tu aerolínea o al mostrador general de equipajes perdidos ("Lost & Found" o "Baggage Service") para rellenar un Parte de Irregularidad de Equipaje (PIR - Property Irregularity Report). Es fundamental hacerlo antes de salir para poder reclamar.</li>
                    <li><strong>Conéctate: Wi-Fi, SIM Local o eSIM:</strong> Busca la red Wi-Fi gratuita del aeropuerto o terminal (suele requerir un registro simple). Te permitirá avisar de tu llegada, comprobar mapas o pedir transporte. Si necesitas datos móviles constantes, considera:
                        <ul>
                            <li><strong>Comprar una SIM Local Prepago:</strong> En muchos aeropuertos hay mostradores de operadoras locales donde puedes comprar una SIM con un paquete de datos y llamadas. Necesitarás pasaporte y un móvil liberado.</li>
                            <li><strong>Activar una eSIM:</strong> Si tu móvil es compatible, puedes comprar un plan de datos de una eSIM para tu destino (hazlo antes de viajar o usando el Wi-Fi del aeropuerto). Es muy cómodo ya que no necesitas cambiar la SIM física. Compañías como Holafly, Airalo, Ubigi ofrecen este servicio.</li>
                            <li><strong>Recoger Pocket Wi-Fi:</strong> Si alquilaste un router MiFi portátil, recógelo en el punto acordado (oficina de correos del aeropuerto, mostrador específico...).</li>
                        </ul>
                    </li>
                    <li><strong>Obtén Moneda Local para Empezar:</strong>
                        <ul>
                            <li><strong>Cajero Automático (ATM):</strong> Es la forma más recomendable para obtener efectivo local, ya que suelen ofrecer el mejor tipo de cambio (el oficial de Visa/Mastercard). Busca cajeros de bancos reconocidos dentro de la terminal (evita los genéricos tipo Euronet si puedes, suelen tener peores comisiones/cambio). Saca una cantidad moderada para los primeros gastos (transporte, comida inicial...). Ten en cuenta la comisión de tu banco y la posible comisión del cajero local.</li>
                            <li><strong>Casa de Cambio (Exchange Bureau):</strong> Útil si necesitas cambiar una pequeña cantidad de tu moneda de origen urgentemente o si tu tarjeta no funciona. Compara los tipos de cambio (suelen ser peores que los del ATM) y pregunta por comisiones ocultas. Evita cambiar grandes cantidades aquí.</li>
                        </ul>
                    </li>
                    <li><strong>Transporte Seguro a tu Alojamiento:</strong> ¡Ten decidido cómo vas a ir ANTES de salir de la zona de llegadas! Ignora a quienes te aborden ofreciéndote transporte no oficial.
                        <ul>
                            <li><strong>Transporte Público (Metro/Tren/Bus):</strong> Sigue las señales claras hacia las paradas o estaciones. Compra el billete adecuado en máquinas o taquillas. Es la opción más económica.</li>
                            <li><strong>Taxi Oficial:</strong> Dirígete a la parada oficial señalizada. Confirma si usan taxímetro o si hay tarifa fija (pregúntala o búscala en carteles informativos *antes* de subir). Ten la dirección clara.</li>
                            <li><strong>Apps de Transporte (VTC):</strong> Pide tu Uber, Lyft, Grab, Bolt, etc., desde la app y dirígete al punto de recogida específico que te indique la aplicación (a veces son zonas designadas).</li>
                            <li><strong>Shuttle Reservado:</strong> Busca el mostrador de tu compañía o el punto de encuentro acordado. Ten tu reserva a mano.</li>
                        </ul>
                    </li>
                    <li><strong>Llegada al Alojamiento y Primer Contacto:</strong> Haz el check-in, deja el equipaje y aprovecha para pedir al recepcionista un mapa gratuito, recomendaciones locales o aclarar dudas sobre transporte o seguridad en la zona. Pregunta por la contraseña del Wi-Fi.</li>
                    <li><strong>Paseo de Reconocimiento y Necesidades Básicas:</strong> Date una vuelta corta por los alrededores de tu alojamiento. Localiza una tienda pequeña o supermercado (para comprar agua, snacks...), una farmacia, un cajero automático, restaurantes cercanos y la parada de transporte público más próxima. Te dará seguridad y te ayudará a orientarte.</li>
                </ol>
            `
        },
         ciudad: {
            title: "Muévete por una Ciudad Desconocida como un Local (o casi)",
            body: `
                <p>Explorar una ciudad nueva es una de las partes más emocionantes de viajar. Perderse un poco puede ser divertido, pero saber moverte eficientemente te ahorrará tiempo y frustraciones. Aquí te damos las claves:</p>
                <ul>
                    <li><strong>Mapas Offline: Tu Mejor Guía Silenciosa:</strong> Antes de salir del Wi-Fi de tu alojamiento, descarga SIEMPRE el mapa offline de la zona en Google Maps o, mejor aún, usa una app dedicada como Maps.me (basada en OpenStreetMap, muy detallada y funciona 100% offline). Marca previamente (con estrellas, pines, listas) tu alojamiento, los lugares que quieres visitar, estaciones de transporte clave, restaurantes recomendados... Poder consultar el mapa y tu ubicación GPS sin necesidad de datos es fundamental.</li>
                    <li><strong>Busca Puntos de Referencia Clave:</strong> Al llegar a una zona nueva, fíjate en elementos distintivos y fáciles de reconocer desde lejos: un río, el mar, una montaña cercana, un edificio muy alto o de arquitectura singular (rascacielos, torre de iglesia, monumento...), una gran avenida o una plaza principal. Úsalos para mantener una orientación básica (norte/sur, hacia el río/lejos del río...).</li>
                    <li><strong>Caminar, la Esencia de la Exploración Urbana:</strong> No subestimes el poder de tus pies. Caminar es la mejor manera de absorber la atmósfera de un barrio, descubrir detalles arquitectónicos, tiendas con encanto, cafés escondidos, arte urbano y escenas de la vida cotidiana que te perderías desde un vehículo. Divide la ciudad por zonas o barrios y explora cada uno a pie. ¡Y lleva el calzado más cómodo que tengas!</li>
                    <li><strong>Conviértete en un Experto del Transporte Público Local:</strong>
                        <ul>
                            <li><strong>Investiga las Opciones:</strong> ¿Qué sistema predomina? ¿Metro (subway, underground, U-Bahn)? ¿Autobuses? ¿Tranvías (trams)? ¿Ferries? ¿Trenes suburbanos? ¿Cuál es más útil para los trayectos que planeas? Webs como Rome2Rio o la función de transporte público de Google Maps te dan una idea inicial.</li>
                            <li><strong>Consigue Mapas y Apps Oficiales:</strong> Busca el mapa oficial de la red de transporte (en oficinas de turismo, estaciones, online). Descarga la app oficial de transporte de la ciudad si existe; suelen tener planificadores de ruta, horarios (a veces en tiempo real) y mapas interactivos.</li>
                            <li><strong>Entiende el Sistema de Billetes/Tarifas:</strong> ¿Se paga por trayecto o por tiempo? ¿Hay zonas tarifarias? ¿Qué tipo de billete o abono te conviene más? (Billete sencillo, billete de 10 viajes -carnet-, abono diario, de 3 días, semanal, tarjeta recargable sin contacto -tipo Oyster, Suica, Navigo, etc.-). Aprende dónde y cómo comprar/recargar (máquinas, taquillas, estancos, app...). ¡Y no olvides validar tu billete siempre al empezar el viaje para evitar multas!</li>
                            <li><strong>Observa y Aprende:</strong> Fíjate en cómo suben y bajan los locales, cómo validan, dónde esperan... es la mejor forma de aprender rápido.</li>
                        </ul>
                    </li>
                    <li><strong>Taxis y VTCs: Conoce las Reglas del Juego:</strong> Investiga cómo funcionan los taxis locales. ¿Son fáciles de parar en la calle? ¿Usan taxímetro obligatoriamente? ¿Es común negociar la tarifa antes? ¿Hay colores o licencias oficiales? Ten a mano el teléfono de una compañía de radio-taxi fiable. Las apps de VTC (Uber, Lyft, Grab, Bolt, FreeNow...) son a menudo más cómodas por el precio cerrado y el pago automático, pero verifica su disponibilidad y legalidad en tu destino.</li>
                    <li><strong>Tu "Ancla": Dirección del Alojamiento Siempre a Mano:</strong> Fundamental. Lleva siempre contigo la dirección exacta de tu hotel/apartamento (calle, número, código postal, barrio) anotada en papel y/o en el móvil. Si puedes, tenla también escrita en el idioma local. Te servirá para volver por tu cuenta, pedir indicaciones o dársela a un taxista.</li>
                    <li><strong>Actitud de Explorador, no de Turista Perdido:</strong> Aunque no sepas dónde estás, camina con confianza y propósito. Consulta tu mapa de forma discreta, no en medio de la acera bloqueando el paso. Estar atento a tu entorno te ayuda a orientarte y también es más seguro.</li>
                    <li><strong>Preguntar No Es Vergüenza, Es Inteligencia Viajera:</strong> Si estás realmente perdido o no encuentras algo, pregunta. Es más rápido y efectivo que dar vueltas sin rumbo. Dirígete preferiblemente a personal uniformado (transporte, tiendas), oficinas de información o personas que no parezcan apuradas. Sé educado, empieza con un saludo local. Mostrar el mapa o la dirección escrita ayuda muchísimo si hay barrera idiomática.</li>
                     <li><strong>Combina Métodos:</strong> No tienes que usar solo un medio. Camina para explorar un barrio, toma el metro para distancias largas, usa un bus para una ruta escénica, coge un taxi si es tarde o estás cansado.</li>
                </ul>
            `
        },
         cultura: {
            title: "Respeta la Cultura Local: Clave para un Viaje Enriquecedor y Conectado",
            body: `
                <p>Viajar es una oportunidad increíble para sumergirnos en culturas diferentes a la nuestra. Para que esta experiencia sea positiva tanto para ti como para la comunidad que te acoge, es fundamental actuar con sensibilidad y respeto hacia sus costumbres y tradiciones.</p>
                <h4>Antes de Viajar: Investiga y Aprende</h4>
                <ul>
                    <li><strong>Costumbres Sociales y Etiqueta:</strong> Dedica tiempo a leer sobre las normas básicas de interacción social. ¿Cómo se saluda formal e informalmente? ¿Hay diferencias de trato según edad o género? ¿Es apropiado el contacto físico (dar la mano, abrazos)? ¿Cómo se entrega o recibe un regalo o tarjeta? ¿Se espera puntualidad estricta o hay más flexibilidad?</li>
                    <li><strong>Valores Fundamentales:</strong> Intenta comprender qué es importante para esa sociedad: ¿la familia, la comunidad, la religión, el honor, la jerarquía, el individualismo? Esto te ayudará a interpretar comportamientos y evitar malentendidos.</li>
                    <li><strong>Normas de Vestimenta:</strong> Investiga cuál es el código de vestimenta habitual, tanto en la vida diaria como para ocasiones especiales o al visitar lugares religiosos. En muchos países, especialmente fuera de entornos muy turísticos occidentales, se valora la modestia (cubrir hombros, rodillas, a veces escote). Observa cómo visten los locales de tu mismo género y edad aproximada.</li>
                    <li><strong>Gestos y Lenguaje Corporal:</strong> Un gesto inocente en tu cultura puede ser ofensivo en otra. Infórmate sobre gestos a evitar (ej. señalar con el dedo índice, mostrar la suela del zapato, usar la mano izquierda para comer o entregar objetos en algunas culturas).</li>
                    <li><strong>Temas Sensibles:</strong> Sé prudente al hablar de política, religión, historia reciente o conflictos locales, a menos que la otra persona saque el tema y te sientas cómodo.</li>
                    <li><strong>Idioma Básico:</strong> Aprender aunque sea unas pocas palabras clave (Hola, Adiós, Por favor, Gracias, Perdón, Sí, No) demuestra un enorme respeto e interés, y facilitará mucho tus interacciones cotidianas.</li>
                </ul>
                <h4>Durante el Viaje: Observa, Adapta y Respeta</h4>
                <ul>
                    <li><strong>Sé un Buen Observador:</strong> Fíjate en cómo interactúan los locales entre sí en diferentes situaciones (en tiendas, restaurantes, transporte...) e intenta adaptar tu comportamiento discretamente.</li>
                    <li><strong>Vístete Apropiadamente (Contexto):</strong> Adapta tu ropa a la situación. Ropa de playa para la playa, ropa respetuosa para templos o pueblos rurales. Lleva siempre un pañuelo o chal ligero que te permita cubrirte rápidamente si es necesario.</li>
                    <li><strong>Pide Permiso Antes de Fotografiar Personas:</strong> Es una norma básica de respeto. Una sonrisa y un gesto suelen bastar para preguntar. Si dicen que no, respétalo. Evita fotografiar niños sin permiso de sus padres. Sé especialmente discreto en lugares de culto o ceremonias.</li>
                    <li><strong>Comportamiento en Lugares Sagrados:</strong> Infórmate sobre las normas específicas (descalzarse, cubrirse la cabeza, no fotos, silencio...). Muévete con reverencia y respeto.</li>
                    <li><strong>Propinas y Regateo:</strong> Sigue las costumbres locales que investigaste. No impongas tus propias normas. Regatea con respeto y buen humor si es apropiado, pero no lo hagas si el precio es fijo.</li>
                    <li><strong>Consume de Forma Responsable:</strong> Apoya negocios locales, compra artesanía auténtica (evitando productos ilegales o de explotación), sé consciente del consumo de agua y energía.</li>
                    <li><strong>Gestiona tus Residuos:</strong> No dejes basura. Utiliza papeleras o llévala contigo hasta encontrar una.</li>
                    <li><strong>Actitud General: Humildad y Mente Abierta:</strong> Acepta que las cosas son diferentes a tu hogar. No juzgues, critica o compares constantemente. Mantén una actitud curiosa, paciente y tolerante. Estás allí para aprender y experimentar.</li>
                    <li><strong>Sonríe y Sé Agradecido:</strong> La amabilidad es un lenguaje universal. Una sonrisa sincera y un "gracias" en el idioma local pueden abrir muchas puertas y corazones.</li>
                </ul>
                <p>Viajar con respeto cultural no solo te evitará problemas o malentendidos, sino que enriquecerá profundamente tu experiencia, permitiéndote conectar de forma más auténtica con la gente y el lugar que visitas.</p>
            `
        },
         comida: {
            title: "Come Local (con Precaución): Una Aventura para tu Paladar",
            body: `
                <p>Sumergirse en la gastronomía local es, sin duda, una de las experiencias más placenteras y reveladoras de cualquier viaje. Te permite conectar con la cultura de una forma directa y deliciosa. ¡Anímate a probar, pero siempre con un poco de cabeza para cuidar tu estómago!</p>
                <h4>Dónde Encontrar los Sabores Auténticos:</h4>
                <ul>
                    <li><strong>Mercados Locales:</strong> Son el alma culinaria de cualquier destino. Pasea entre puestos de frutas exóticas, verduras desconocidas, especias aromáticas... Observa qué compra y come la gente local. Muchos mercados tienen zonas de comida preparada o pequeños restaurantes donde probar platos auténticos y económicos.</li>
                    <li><strong>Comida Callejera (Street Food):</strong> ¡La meca de los sabores rápidos, baratos y genuinos! Brochetas, sopas, fideos, empanadas, dulces... cada país tiene sus estrellas callejeras. <strong>La clave para comer seguro es la observación:</strong>
                        <ul>
                            <li>Elige puestos <strong>muy concurridos</strong>, especialmente por locales (indica alta rotación de comida y confianza).</li>
                            <li>Observa que la comida se <strong>cocine al momento</strong> (el calor mata bacterias).</li>
                            <li>Fíjate en la <strong>higiene general</strong> del puesto y de quien cocina (manos limpias, superficies, uso de guantes si aplica...).</li>
                            <li>Empieza probando cosas <strong>bien cocinadas</strong> (frituras, parrillas, guisos calientes) antes de aventurarte con crudos.</li>
                        </ul>
                    </li>
                    <li><strong>Restaurantes Populares Locales (Fonditas, Sodas, Warungs, Trattorias...):</strong> Aléjate unas calles de las plazas y avenidas más turísticas. Busca locales pequeños, sin lujos, a menudo familiares, donde veas comer a gente del lugar. Suelen ofrecer comida casera, sabrosa y a precios mucho más razonables.</li>
                    <li><strong>Menús del Día / Platos Combinados:</strong> En muchos países, especialmente para el almuerzo, ofrecen menús fijos ("menú del día", "plato feito", "set lunch"...) que incluyen varios platos (sopa/entrante, principal, postre) y bebida a un precio muy económico. Es una excelente forma de probar variedad sin gastar mucho.</li>
                    <li><strong>Pregunta por Recomendaciones Fiables:</strong> Pide consejo al personal de tu alojamiento (recepcionistas, dueños de guesthouses), a guías turísticos locales, o incluso a otros viajeros que lleven tiempo en la zona. Suelen conocer los mejores sitios secretos.</li>
                </ul>
                <h4>Consejos para Evitar Problemas Estomacales:</h4>
                <ul>
                    <li><strong>Agua Siempre Segura:</strong> Regla de oro número 1. Bebe <strong>SOLO agua embotellada y sellada</strong> o agua que hayas purificado tú mismo (con filtro, pastillas, UV) si no estás 100% seguro de la potabilidad del agua del grifo. Desconfía de botellas rellenadas.</li>
                    <li><strong>Hielo: El Enemigo Oculto:</strong> Evita el hielo en las bebidas, zumos o cócteles si no estás seguro de que se hizo con agua purificada. En hoteles y restaurantes de buen nivel suele ser seguro, pero en puestos callejeros o lugares más básicos, mejor pedir "sin hielo" (no ice / sin hielo).</li>
                    <li><strong>Frutas y Verduras Crudas: La Regla "Pélalo, Hiérvelo o Evítalo":</strong> Pela tú mismo la fruta siempre que sea posible. Ten precaución con ensaladas crudas, zumos frescos hechos al momento (¿con qué agua lavan la fruta/licuadora?) o verduras sin cocinar, especialmente en países con estándares de higiene más bajos. Opta por verduras cocinadas.</li>
                    <li><strong>Comida Bien Cocinada y Recalentada:</strong> Asegúrate de que la carne, pollo o pescado estén bien hechos. Desconfía de comida que parece llevar mucho tiempo expuesta a temperatura ambiente en buffets o puestos (caldo de cultivo para bacterias). Si recalientan algo, asegúrate de que esté bien caliente por dentro.</li>
                    <li><strong>Marisco Crudo o Poco Hecho:</strong> Delicioso (ceviche, ostras, sushi...), pero consúmelo solo en lugares de confianza, con buena reputación y donde se garantice la máxima frescura y manipulación higiénica.</li>
                    <li><strong>Lávate las Manos (o Usa Desinfectante):</strong> Fundamental antes de comer cualquier cosa, especialmente si has estado tocando dinero, usando transporte público o explorando mercados.</li>
                    <li><strong>Introduce Nuevos Sabores Gradualmente:</strong> No te lances a probar lo más picante o exótico el primer día. Dale tiempo a tu estómago a adaptarse a los nuevos ingredientes y condimentos.</li>
                    <li><strong>Escucha a tu Cuerpo:</strong> Si algo no te huele bien, no tiene buen aspecto o simplemente no te da confianza, no lo comas. Es mejor ser precavido.</li>
                    <li><strong>Prepara tu Botiquín:</strong> Lleva siempre contigo medicamentos básicos para problemas digestivos: antidiarreicos (Loperamida - Fortasec), antiácidos (Almax, Omeprazol), sales de rehidratación oral (muy importantes si tienes diarrea para reponer líquidos y electrolitos).</li>
                </ul>
                <p>¡Con precaución y curiosidad, descubrir la gastronomía local será uno de los grandes placeres de tu viaje!</p>
            `
        },
         vuelta: {
            title: "Organiza tu Regreso: Checklist para un Final de Viaje Sin Sobresaltos",
            body: `
                <p>El final del viaje ha llegado. Aunque la nostalgia empiece a asomar, una buena organización de la vuelta te ahorrará estrés y te permitirá disfrutar hasta el último momento.</p>
                <ol>
                    <li><strong>Confirma los Detalles de tu Transporte de Regreso:</strong> No des nada por sentado. 24-48 horas antes, vuelve a verificar la fecha, hora exacta y lugar de salida (aeropuerto, terminal específica, estación de tren/bus, andén/dársena) de tu transporte principal. Comprueba si ha habido cambios de horario o cancelaciones (revisa emails, web de la compañía, apps).</li>
                    <li><strong>Check-in Online:</strong> Si aplica (especialmente para vuelos), haz el check-in online tan pronto como se abra. Te aseguras tu asiento, evitas colas en el aeropuerto y puedes descargar/imprimir tu tarjeta de embarque.</li>
                    <li><strong>Planifica el Traslado al Punto de Salida con Margen:</strong> Decide con antelación cómo vas a llegar al aeropuerto/estación. ¿Transporte público? Consulta horarios y duración del trayecto, considerando posibles transbordos. ¿Taxi/App? Estima el coste y resérvalo si es necesario, especialmente si sales muy temprano o tarde. ¿Shuttle? Confirma hora y lugar de recogida. Calcula cuánto tiempo necesitas para llegar + el tiempo de antelación recomendado para facturar/pasar controles (2-3 horas para vuelos). ¡Añade siempre un margen extra para imprevistos (tráfico, colas)!</li>
                    <li><strong>Revisión Final del Alojamiento ("Operación Olvido Cero"):</strong> Antes de entregar las llaves, haz una última inspección metódica de la habitación/apartamento: revisa cajones, armarios (¡también los estantes altos!), debajo de la cama, detrás de las puertas, el baño (colgado en la ducha...), enchufes (¡cargadores!). Asegúrate de llevarte todo lo tuyo.</li>
                    <li><strong>Empaqueta Estratégicamente:</strong>
                        <ul>
                            <li>Coloca los líquidos (<100ml en bolsa transparente) accesibles si llevas equipaje de mano.</li>
                            <li>Protege bien los objetos frágiles o souvenirs que hayas comprado (envuélvelos en ropa).</li>
                            <li>Si llevas líquidos que puedan derramarse (vino, aceite, perfumes...), mételos en bolsas de plástico bien cerradas dentro de la maleta facturada.</li>
                            <li>Distribuye el peso si llevas varias maletas. Pesa la maleta facturada si tienes dudas sobre el límite.</li>
                            <li>Deja a mano la ropa de abrigo que necesitarás al llegar a tu destino si el clima es diferente.</li>
                            <li>Recuerda las restricciones de aduanas de tu país sobre lo que puedes traer (alcohol, tabaco, alimentos, souvenirs de origen animal/vegetal...).</li>
                        </ul>
                    </li>
                    <li><strong>Gestiona la Moneda Local Sobrante:</strong> Intenta gastar las monedas y billetes pequeños que te queden (café en el aeropuerto, último souvenir, transporte...). Cambiar pequeñas cantidades de moneda exótica de vuelta a tu moneda suele ser difícil o tener mal tipo de cambio. Puedes guardarlas como recuerdo o donarlas en las urnas que suelen haber en los aeropuertos.</li>
                    <li><strong>Paga Cuentas Pendientes:</strong> Asegúrate de haber saldado la cuenta del hotel (revisa el minibar si lo usaste), posibles tasas turísticas locales, etc.</li>
                    <li><strong>Carga Todos tus Dispositivos:</strong> Móvil, tablet, e-reader, auriculares inalámbricos, power bank... que todo tenga batería para el viaje de vuelta.</li>
                    <li><strong>Documentación Lista y Accesible:</strong> Ten tu pasaporte y tarjeta de embarque en un lugar seguro pero fácil de sacar cuando lo necesites.</li>
                    <li><strong>Disfruta del Último Momento:</strong> Si tienes tiempo antes de ir al aeropuerto/estación, date un último capricho: un último paseo por tu zona favorita, ese café que te encantó, una última comida típica... Despídete del lugar con una buena sensación.</li>
                    <li><strong>Agradece y Despídete:</strong> Si has conectado con personal del alojamiento o locales, agradéceles su hospitalidad.</li>
                    <li><strong>Al Llegar a Casa:</strong> Deshaz la maleta relativamente pronto para volver a la normalidad. Lava la ropa. Organiza tus fotos y recuerdos mientras los tienes frescos. ¡Y empieza a pensar en la próxima aventura!</li>
                </ol>
            `
        },
         emergencia: {
            title: "Qué Hacer en Caso de Emergencia: Guía Rápida para Viajeros",
            body: `
                <p>Nadie planea tener una emergencia durante un viaje, pero saber cómo actuar si ocurre puede marcar una gran diferencia. Lo más importante es intentar mantener la calma para poder tomar decisiones acertadas.</p>
                <h4>Preparación Previa (Clave):</h4>
                <ul>
                    <li><strong>Contactos de Emergencia Guardados:</strong> Antes de salir, investiga y guarda en tu móvil (y si puedes, también en papel) los números de emergencia locales del destino (Policía, Ambulancia, Bomberos - ¡No son universales!).</li>
                    <li><strong>Seguro de Viaje a Mano:</strong> Guarda el número de teléfono de asistencia 24 horas de tu seguro (+ código de país si llamas localmente) y tu número de póliza en un lugar muy accesible (agenda del móvil, email, cartera...). ¡Son tu primer contacto crucial!</li>
                    <li><strong>Embajada/Consulado:</strong> Anota la dirección y teléfono de la embajada o consulado de tu país en el destino. Regístrate en el registro de viajeros de tu Ministerio de Exteriores si existe esa opción.</li>
                    <li><strong>Contactos en Casa:</strong> Ten a mano números de familiares/amigos a quienes contactar. Deja una copia de tu itinerario y datos del seguro con alguien de confianza en casa.</li>
                    <li><strong>Botiquín Básico:</strong> Lleva un pequeño botiquín con analgésicos, antihistamínicos, tiritas, desinfectante, antidiarreicos, sales de rehidratación, y tu medicación personal (con receta si es necesario).</li>
                    <li><strong>Copias de Documentos:</strong> Copias digitales (nube, email) y físicas de pasaporte, visados, DNI, carnet de conducir, billetes, seguro...</li>
                </ul>
                <h4>Actuación Durante la Emergencia:</h4>
                <ul>
                    <li><strong>Emergencia Médica Grave (Accidente, Enfermedad Súbita):</strong>
                        <ol>
                            <li>Evalúa la situación. Si es grave, llama inmediatamente al número de emergencia local para solicitar una ambulancia.</li>
                            <li>Contacta lo antes posible (tú o alguien que te acompañe) con el teléfono de asistencia 24h de tu seguro de viaje. Explica claramente qué ha pasado y dónde estás. Sigue SUS INSTRUCCIONES sobre a qué centro médico dirigirte (hospitales concertados) y cómo proceder con los pagos (ellos suelen gestionar pagos directos en casos graves, pero confirma).</li>
                            <li>Si estás consciente, informa al personal médico sobre alergias, condiciones preexistentes o medicación habitual. Lleva esta información escrita si es posible.</li>
                            <li>Si la situación requiere hospitalización prolongada o es muy grave, informa también a tu embajada/consulado.</li>
                        </ol>
                    </li>
                    <li><strong>Robo con Violencia o Asalto:</strong>
                        <ol>
                            <li>Tu integridad física es lo MÁS IMPORTANTE. No te resistas, no pongas en peligro tu vida por objetos materiales. Entrega lo que te pidan.</li>
                            <li>Intenta memorizar detalles del asaltante o vehículo si es posible, pero sin arriesgarte.</li>
                            <li>En cuanto puedas, busca un lugar seguro (tienda, hotel, estación de policía) y pide ayuda.</li>
                            <li>Acude a la policía para poner una denuncia formal lo antes posible. Es esencial para cualquier reclamación al seguro o trámite consular.</li>
                            <li>Cancela inmediatamente cualquier tarjeta bancaria robada.</li>
                            <li>Contacta con tu embajada/consulado si te robaron el pasaporte.</li>
                            <li>Informa a tu seguro de viaje.</li>
                        </ol>
                    </li>
                     <li><strong>Pérdida o Robo de Pertenencias (sin violencia):</strong>
                        <ol>
                            <li>Intenta recordar dónde pudiste perderlo o cuándo notaste la falta.</li>
                            <li>Denuncia a la policía (necesario para el seguro, especialmente si es robo).</li>
                            <li>Cancela tarjetas si estaban entre lo perdido/robado.</li>
                            <li>Contacta con tu seguro para ver qué cobertura tienes y cómo reclamar (necesitarás la denuncia y quizás facturas).</li>
                            <li>Si pierdes el pasaporte, sigue los pasos del consejo específico.</li>
                        </ol>
                    </li>
                    <li><strong>Pérdida de Vuelo / Transporte Importante:</strong>
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
                <p><strong>Recuerda:</strong> Intenta mantener la calma, evalúa la situación, prioriza tu seguridad, busca ayuda adecuada (emergencias locales, seguro, consulado) y documenta todo lo posible (denuncias, informes médicos, recibos).</p>
            `
        },
         'perdida-robo': {
            title: "¡Socorro! He Perdido (o me han Robado) los Documentos Clave",
            body: `
                <p>Perder el pasaporte, DNI o tarjetas bancarias en el extranjero puede parecer una pesadilla, pero es una situación relativamente común y tiene solución si actúas con rapidez y sigues los pasos adecuados. ¡Que no cunda el pánico!</p>
                <h4>Pasaporte Perdido o Robado:</h4>
                <ol>
                    <li><strong>Denuncia Inmediata a la Policía Local:</strong> Este es el primer paso crucial y obligatorio. Ve a la comisaría de policía más cercana al lugar donde te diste cuenta de la pérdida o donde ocurrió el robo. Explica lo sucedido con el mayor detalle posible. Te entregarán una copia de la denuncia ("Police Report"). <strong>Guárdala bien, es imprescindible para todos los trámites posteriores.</strong></li>
                    <li><strong>Localiza y Contacta tu Embajada o Consulado:</strong> Busca en internet la dirección, teléfono y horario de atención al público de la embajada o consulado de tu país en la ciudad o país donde te encuentres. Llama para informar de tu situación y preguntar qué documentación necesitas llevar y si necesitas cita previa.</li>
                    <li><strong>Acude a la Embajada/Consulado Preparado:</strong> Generalmente necesitarás presentar:
                        <ul>
                            <li>La <strong>copia original de la denuncia</strong> policial.</li>
                            <li><strong>Fotografías</strong> recientes tamaño carnet/pasaporte (cumpliendo sus requisitos específicos; a veces hay fotomatones cerca o te las pueden hacer allí).</li>
                            <li>Cualquier <strong>otra forma de identificación</strong> que conserves (DNI, carnet de conducir, fotocopias del pasaporte perdido...).</li>
                            <li>Pruebas de tu <strong>nacionalidad</strong> y de tu <strong>viaje</strong> (billetes de avión, reservas...).</li>
                            <li>El <strong>formulario de solicitud</strong> correspondiente (te lo darán allí o puede estar online).</li>
                            <li>Dinero en efectivo (normalmente en moneda local o a veces USD/EUR) para pagar las <strong>tasas consulares</strong> por la emisión del nuevo documento.</li>
                        </ul>
                    </li>
                    <li><strong>Tramitación del Documento de Viaje de Emergencia:</strong> Una vez verificada tu identidad y nacionalidad, la embajada/consulado anulará tu pasaporte perdido/robado (para evitar su uso fraudulento) y te emitirá uno de los siguientes documentos:
                        <ul>
                            <li>Un <strong>Salvoconducto:</strong> Es un documento muy básico, con validez muy limitada (normalmente solo para los días necesarios para regresar a tu país). Sirve únicamente para volver directamente a tu país de origen por la ruta más directa. No suele permitir continuar viajando a otros países ni hacer escalas largas donde necesites pasar inmigración.</li>
                            <li>Un <strong>Pasaporte de Emergencia:</strong> Es un pasaporte con menos páginas y una validez más corta (ej. 6 meses o 1 año) que uno ordinario. Puede permitirte continuar tu viaje a otros países, pero **debes verificar** si el siguiente país de destino acepta este tipo de pasaporte para la entrada (algunos no lo hacen o ponen problemas).</li>
                        </ul>
                        El tipo de documento que te emitan y el tiempo que tarden (desde unas horas a varios días) dependerá de la embajada, la urgencia y tu situación.
                    </li>
                    <li><strong>Informa a tu Seguro de Viaje:</strong> Contacta con ellos. Algunas pólizas cubren parte de los gastos asociados a la pérdida/robo de documentos, como las tasas de emisión del nuevo pasaporte o los costes de transporte para ir a la embajada/consulado (guarda todos los recibos).</li>
                </ol>
                <h4>Tarjetas de Crédito/Débito Perdidas o Robadas:</h4>
                <ol>
                    <li><strong>¡BLOQUÉALAS INMEDIATAMENTE!:</strong> Llama sin demora a los números de teléfono de asistencia y cancelación 24 horas de tus bancos (tenlos anotados aparte o guardados de forma segura online). Informa de la pérdida/robo para que bloqueen las tarjetas y evitar cargos fraudulentos.</li>
                    <li><strong>Denuncia a la Policía:</strong> Incluye el robo o pérdida de las tarjetas en la misma denuncia que hiciste por el pasaporte o haz una denuncia específica si solo perdiste las tarjetas.</li>
                    <li><strong>Contacta con tu Banco (Oficina/Gestor):</strong> Además de bloquearlas, contacta con tu oficina o gestor para informarles formalmente y preguntar sobre cómo proceder para obtener tarjetas de reemplazo (normalmente las enviarán a tu domicilio, no al extranjero) o si tienen alguna opción para obtener efectivo de emergencia en el extranjero (algunas redes como Visa/Mastercard ofrecen este servicio en casos extremos).</li>
                    <li><strong>Revisa tus Movimientos Bancarios Online:</strong> Controla tus cuentas en los días siguientes para detectar cualquier cargo no autorizado y reclamarlo inmediatamente a tu banco.</li>
                </ol>
                <p><strong>Lección Aprendida - Prevención para el Futuro:</strong></p>
                <ul>
                    <li>Siempre copias digitales y físicas de todo.</li>
                    <li>Divide documentos, tarjetas y efectivo en diferentes lugares seguros.</li>
                    <li>Usa riñoneras interiores o bolsillos seguros para lo más importante.</li>
                    <li>No lleves encima más efectivo del necesario para el día.</li>
                    <li>Mantente siempre atento a tu entorno y a tus pertenencias.</li>
                </ul>
            `
        }
    }; // Fin del objeto tipData

 constructor(
    private tipDataService: TipDataService,
    private viewportScroller: ViewportScroller,
    private titleService: Title, // Inyectar Title
    private metaService: Meta    // Inyectar Meta
  ) { }

  ngOnInit(): void {
    const pageTitle = `Consejos de Viaje Útiles - ${this.siteName}`;
    this.titleService.setTitle(pageTitle);
    const metaDesc = "Encuentra consejos prácticos sobre planificación, equipaje, vuelos, seguridad y más para que tus viajes sean inolvidables.";
    this.metaService.updateTag({ name: 'description', content: metaDesc });
    this.metaService.updateTag({ property: 'og:title', content: pageTitle });
    this.metaService.updateTag({ property: 'og:description', content: metaDesc });
    this.metaService.updateTag({ property: 'og:url', content: `https://rinconesdelmundo.net/consejos` });
    this.metaService.updateTag({ property: 'og:image', content: `https://rinconesdelmundo.net/images/assets/og-image-consejos.jpg` }); // Imagen general
    this.metaService.updateTag({ property: 'og:type', content: 'website' });


    this.tipSummaries = this.tipDataService.getTipSummaries();
  }

  openModal(tipId: string): void {
    const tipDetail = this.tipDataService.getTipDetailById(tipId);
    if (tipDetail) {
      this.selectedTipDetail = tipDetail;
      this.isModalActive = true;
      document.body.classList.add('modal-open');
    } else {
      console.warn(`No se encontró contenido para el tip-id: ${tipId} en TipsComponent`);
    }
  }

  closeModal(): void {
    this.isModalActive = false;
    this.selectedTipDetail = null;
    const mainMenu = document.getElementById('main-menu');
    if (!mainMenu?.classList.contains('mobile-menu-active')) {
       document.body.classList.remove('modal-open');
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isModalActive) {
        this.closeModal();
    }
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToAnchor('page-top');
  }
}