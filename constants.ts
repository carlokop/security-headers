export const HEADERS_TO_CHECK = [
  'Strict-Transport-Security',
  'Content-Security-Policy',
  'X-Content-Type-Options',
  'X-Frame-Options',
  'Referrer-Policy',
  'Permissions-Policy',
  'X-XSS-Protection'
];

export const HEADER_EXPLANATIONS: { [key: string]: string } = {
  'Strict-Transport-Security': `De HTTP Strict-Transport-Security (HSTS) header is een cruciale beveiligingsmaatregel die een webserver kan sturen om browsers te instrueren alleen via HTTPS (versleutelde verbinding) te communiceren.

**Doel:**
Het hoofddoel is het voorkomen van "man-in-the-middle" aanvallen, zoals protocol-downgrade-aanvallen en cookie-hijacking. Zodra een browser de HSTS-header van een website ontvangt, zal het voor een gespecificeerde periode (de 'max-age') automatisch alle pogingen om die site via onveilig HTTP te benaderen, omzetten naar HTTPS.

**Risico's bij afwezigheid:**
Zonder HSTS kan een aanvaller een gebruiker misleiden om verbinding te maken via HTTP, zelfs als de gebruiker HTTPS intypte. Dit stelt de aanvaller in staat om alle verzonden gegevens, inclusief wachtwoorden en persoonlijke informatie, te onderscheppen en te lezen.`,

  'Content-Security-Policy': `De Content-Security-Policy (CSP) is een van de meest krachtige en flexibele verdedigingsmechanismen tegen Cross-Site Scripting (XSS) en andere data-injectieaanvallen.

**Doel:**
Met CSP kan een websitebeheerder een 'whitelist' definiëren van vertrouwde bronnen. Alleen content (zoals scripts, afbeeldingen, en stylesheets) van deze goedgekeurde bronnen mag door de browser worden geladen en uitgevoerd. Alles wat niet expliciet is toegestaan, wordt geblokkeerd.

**Risico's bij afwezigheid:**
Zonder een strikte CSP kan een aanvaller kwaadaardige scripts injecteren in uw website. Deze scripts kunnen dan worden uitgevoerd in de browser van uw bezoekers, waardoor de aanvaller sessie-cookies kan stelen, toetsaanslagen kan registreren, of de inhoud van de pagina kan manipuleren.`,

  'X-Content-Type-Options': `Dit is een eenvoudige maar zeer effectieve header die browsers beschermt tegen een specifiek type aanval gerelateerd aan MIME-types.

**Doel:**
De enige geldige waarde voor deze header is 'nosniff'. Dit instrueert de browser om het opgegeven 'Content-Type' in de serverrespons strikt te volgen en niet te proberen zelf het bestandstype te raden ('MIME sniffing'). Dit voorkomt dat een browser bijvoorbeeld een onschuldig ogend tekstbestand interpreteert en uitvoert als een kwaadaardig script.

**Risico's bij afwezigheid:**
Als deze header ontbreekt, kan een browser proberen "slim" te zijn. Als een aanvaller erin slaagt een bestand te uploaden dat lijkt op een afbeelding maar scriptcode bevat, kan de browser dit script uitvoeren, wat leidt tot een XSS-kwetsbaarheid.`,

  'X-Frame-Options': `Deze header beschermt bezoekers tegen een aanval genaamd "Clickjacking".

**Doel:**
Clickjacking is een techniek waarbij een aanvaller een onzichtbare <iframe> van uw website over een legitiem ogende knop of link op een andere website plaatst. Wanneer een gebruiker op de zichtbare knop klikt, klikt hij in werkelijkheid onbewust op een element op uw website. De X-Frame-Options header vertelt de browser of het is toegestaan om uw website binnen een <frame> of <iframe> te tonen. De aanbevolen waarden zijn 'DENY' (nooit toestaan) of 'SAMEORIGIN' (alleen toestaan op uw eigen domein).

**Risico's bij afwezigheid:**
Zonder deze header kan uw website worden gebruikt in een clickjacking-aanval, waarbij gebruikers kunnen worden misleid om onbedoelde acties uit te voeren, zoals het verwijderen van hun account of het overmaken van geld.`,

  'Referrer-Policy': `Deze header geeft controle over hoeveel informatie over de herkomst (de 'referrer') wordt meegestuurd wanneer een gebruiker van de ene naar de andere pagina navigeert.

**Doel:**
Het doel is om de privacy van gebruikers te beschermen. Soms kunnen URL's gevoelige informatie bevatten (zoals sessie-ID's of zoekopdrachten). Met de Referrer-Policy kunt u bepalen of deze informatie wordt doorgestuurd naar de volgende website. Strikte waarden zoals 'no-referrer' of 'strict-origin-when-cross-origin' worden aanbevolen.

**Risico's bij afwezigheid:**
Zonder een duidelijke policy kan gevoelige informatie in URL's per ongeluk lekken naar externe partijen, wat een privacyrisico vormt voor uw gebruikers.`,

  'Permissions-Policy': `Dit is een moderne en krachtige header die de oudere 'Feature-Policy' vervangt. Het geeft een website de mogelijkheid om het gebruik van krachtige browserfuncties te beheren.

**Doel:**
Met Permissions-Policy kunt u expliciet toestaan of blokkeren welke functies uw website (en eventuele ingebedde iframes) mag gebruiken. Dit omvat toegang tot de camera, microfoon, geolocatie, fullscreen-modus, en meer. U kunt functies die uw site niet nodig heeft uitschakelen om de 'attack surface' te verkleinen.

**Risico's bij afwezigheid:**
Als deze header niet is ingesteld, kan een kwaadaardig script of een onbetrouwbare derde partij die op uw site is ingebed, mogelijk toegang proberen te krijgen tot gevoelige browser-API's, wat de privacy en veiligheid van de gebruiker in gevaar kan brengen.`,

  'X-XSS-Protection': `Dit is een verouderde header die is ontworpen om bescherming te bieden tegen Cross-Site Scripting (XSS) in oudere browsers.

**Doel:**
In browsers die het ondersteunden, kon deze header een ingebouwde XSS-filter activeren. De aanbevolen waarde was '1; mode=block', wat de browser instrueerde om het renderen van de pagina te stoppen als een aanval werd gedetecteerd.

**Huidige Status:**
Moderne browsers hebben deze header afgeschaft en de ingebouwde filters verwijderd. De Content-Security-Policy (CSP) wordt nu beschouwd als de superieure en standaard methode voor XSS-preventie. Hoewel deze header niet langer effectief is in moderne browsers, schaadt de aanwezigheid ervan niet. Het wordt echter niet langer als een actieve beveiligingsmaatregel beschouwd.`
};
