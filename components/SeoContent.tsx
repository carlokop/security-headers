import React, { useState, useEffect, useRef } from 'react';

const ExternalLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline">
        {children}
    </a>
);

const ChevronIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className="border border-dark-border rounded-lg overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center text-left p-4 bg-dark-card hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            >
                <h3 className="text-xl font-semibold text-white">
                    {title}
                </h3>
                <ChevronIcon className={`w-6 h-6 text-dark-text-secondary transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-4 border-t border-dark-border">
                    {children}
                </div>
            </div>
        </div>
    );
};


const accordionData = [
    {
        title: "Strict-Transport-Security",
        content: (
            <div className="space-y-4">
                <p>
                    De <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security">HTTP Strict Transport Security (HSTS)</ExternalLink> header is een krachtige beveiligingsmaatregel die websites beschermt tegen <ExternalLink href="https://owasp.org/www-community/attacks/Man-in-the-middle_attack">man-in-the-middle-aanvallen</ExternalLink>, zoals protocol-downgrade-aanvallen en cookie-hijacking. In essentie is het een instructie van de webserver aan de browser om uitsluitend via een veilige, versleutelde HTTPS-verbinding te communiceren en nooit via het onveilige HTTP. Deze instructie wordt door de browser onthouden voor een door de website gespecificeerde periode.
                </p>
                <p>
                    Het voornaamste gevaar dat HSTS aanpakt, is "SSL stripping". Stel u voor dat een gebruiker verbinding maakt met een openbaar Wi-Fi-netwerk in een koffiebar. Een aanvaller op hetzelfde netwerk kan de eerste, onbeveiligde HTTP-aanvraag van de gebruiker onderscheppen. Zelfs als de website normaal gesproken doorverwijst naar HTTPS, kan de aanvaller deze doorverwijzing blokkeren en een onversleutelde verbinding met de gebruiker onderhouden, terwijl hij zelf een versleutelde verbinding met de server opzet. De gebruiker merkt hier niets van, maar de aanvaller kan nu al het verkeer, inclusief wachtwoorden en persoonlijke gegevens, in platte tekst meelezen. HSTS voorkomt dit scenario volledig. Zodra een browser de HSTS-header van een domein heeft ontvangen, zal het alle toekomstige pogingen om via HTTP verbinding te maken, automatisch en intern omzetten naar HTTPS, nog voordat de aanvraag het netwerk verlaat. De aanvaller krijgt simpelweg nooit de kans om de verbinding te onderscheppen.
                </p>
                <p>
                    De implementatie van HSTS gebeurt via de header zelf, die verschillende directieven kan bevatten. De belangrijkste is `max-age`, die in seconden aangeeft hoe lang de browser de HSTS-regel moet onthouden. Een typische aanbevolen waarde is 31536000, wat overeenkomt met één jaar. Een ander krachtig directief is `includeSubDomains`. Indien aanwezig, geldt de HSTS-regel niet alleen voor het hoofddomein (bijv. `www.voorbeeld.nl`), maar ook voor alle subdomeinen (zoals `blog.voorbeeld.nl` en `api.voorbeeld.nl`). Dit is een cruciale toevoeging, maar vereist wel dat alle subdomeinen volledig via HTTPS bereikbaar zijn. De ultieme bescherming wordt geboden door het `preload` directief. Als een website voldoet aan strenge eisen, kan het worden opgenomen in de <ExternalLink href="https://hstspreload.org/">"HSTS preload list"</ExternalLink>, een lijst die hardcoded is in grote browsers zoals Chrome, Firefox en Safari. Dit betekent dat zelfs de allereerste verbinding van een gebruiker met de website direct wordt geforceerd naar HTTPS, waardoor er geen enkel venster van kwetsbaarheid overblijft.
                </p>
            </div>
        )
    },
    {
        title: "Content-Security-Policy",
        content: (
            <div className="space-y-4">
                <p>
                    De <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">Content-Security-Policy (CSP)</ExternalLink> is een van de meest krachtige en essentiële verdedigingsmechanismen tegen een breed scala aan content-injectieaanvallen, met als voornaamste doel het mitigeren van <ExternalLink href="https://owasp.org/www-community/attacks/xss/">Cross-Site Scripting (XSS)</ExternalLink>. In een notendop stelt CSP een websitebeheerder in staat om een strikte 'whitelist' van vertrouwde bronnen te definiëren. Alleen content die afkomstig is van deze expliciet goedgekeurde domeinen mag door de browser worden geladen en uitgevoerd. Dit omvat scripts, stylesheets, afbeeldingen, fonts, iframes en meer. Alles wat niet op deze lijst staat, wordt door de browser genadeloos geblokkeerd, waardoor de aanvalsvector voor veelvoorkomende kwetsbaarheden drastisch wordt verkleind.
                </p>
                <p>
                    Om de kracht van CSP te begrijpen, moet men eerst de dreiging van XSS begrijpen. Een XSS-aanval vindt plaats wanneer een aanvaller erin slaagt kwaadaardige code, meestal JavaScript, te injecteren in een legitieme website. Dit kan gebeuren via een reactieveld, een zoekbalk of een gemanipuleerde URL. Wanneer een andere gebruiker de besmette pagina bezoekt, wordt dit script uitgevoerd in hun browser, met dezelfde rechten als de website zelf. De aanvaller kan hiermee sessie-cookies stelen, inloggegevens onderscheppen, de pagina visueel aanpassen of de gebruiker omleiden naar een phishing-site. CSP pakt dit probleem bij de wortel aan. Zelfs als een aanvaller een kwaadaardig script injecteert, zal een goed geconfigureerde CSP de browser instrueren om dit script niet uit te voeren, omdat het niet afkomstig is van een goedgekeurde bron. Standaard blokkeert CSP ook inline scripts en `eval()`-achtige functies, die veelgebruikte technieken zijn bij XSS-aanvallen.
                </p>
                <p>
                    Het configureren van een CSP gebeurt via een reeks 'directieven' in de headerwaarde. Elk directief beheert een specifiek type content. Zo bepaalt `script-src` welke bronnen scripts mogen leveren, `style-src` regelt stylesheets, en `img-src` beheert afbeeldingen. Het `default-src` directief fungeert als een fallback voor de meeste andere directieven. Veelgebruikte bronwaarden zijn `'self'` (wat verwijst naar het eigen domein), specifieke domeinen (zoals `https://apis.google.com`), en `'none'` (wat niets toestaat). Het implementeren van een CSP vereist zorgvuldige planning, omdat een te strikte policy legitieme functionaliteit kan breken. Daarom biedt CSP ook een `report-only` modus. In deze modus worden overtredingen niet geblokkeerd, maar wordt er wel een rapport gestuurd naar een door de ontwikkelaar gespecificeerde URL via het `report-uri` of `report-to` directief. Dit stelt teams in staat om hun policy te testen en te verfijnen in een productieomgeving zonder de gebruikerservaring te verstoren.
                </p>
            </div>
        )
    },
    {
        title: "X-Content-Type-Options",
        content: (
            <div className="space-y-4">
                <p>
                    De <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options">`X-Content-Type-Options`</ExternalLink> header is een schijnbaar eenvoudige, maar uiterst effectieve beveiligingsmaatregel die een specifieke en verraderlijke aanvalsvector blokkeert: MIME-type sniffing. Met slechts één mogelijke, geldige waarde, `nosniff`, geeft deze header een duidelijke en ondubbelzinnige instructie aan de browser: vertrouw de `Content-Type` header die door de server wordt meegestuurd en probeer onder geen enkele omstandigheid zelf te raden wat voor type bestand je ontvangt. Deze simpele regel is een fundamentele verdediging tegen een klasse van aanvallen die misbruik maken van de neiging van browsers om "behulpzaam" te zijn.
                </p>
                <p>
                    De kern van het probleem is <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#mime_sniffing">"MIME sniffing"</ExternalLink>. Webservers sturen een `Content-Type` header mee met elk bestand om de browser te vertellen wat het is (bijv. `text/html`, `image/jpeg`, `application/javascript`). Oudere browsers probeerden echter soms slimmer te zijn dan de server. Als een server bijvoorbeeld een bestand stuurde met `Content-Type: text/plain`, maar de inhoud leek op HTML, dan kon de browser besluiten om het toch als HTML te renderen. Hoewel dit bedoeld was om verkeerd geconfigureerde servers te corrigeren, creëerde het een gevaarlijke kwetsbaarheid. Een aanvaller kan hier misbruik van maken door een bestand te uploaden dat op het eerste gezicht onschuldig lijkt, maar in werkelijkheid kwaadaardige code bevat.
                </p>
                <p>
                    Een klassiek aanvalsscenario ziet er als volgt uit: een aanvaller uploadt een bestand naar een website, bijvoorbeeld als profielfoto. Dit bestand heeft de extensie `.jpg` en bevat geldige afbeeldingsdata, maar er is ook kwaadaardige JavaScript-code in verborgen. De server ziet de `.jpg`-extensie, vertrouwt dit, en serveert het bestand met `Content-Type: image/jpeg`. Wanneer een slachtoffer deze "afbeelding" bekijkt, zou een browser zonder de `nosniff`-instructie het bestand kunnen inspecteren. De browser detecteert de JavaScript-code en besluit, ondanks de `Content-Type` header, dat het een script is en voert het uit. Omdat dit script wordt uitgevoerd binnen de context van de website, heeft het toegang tot de sessie van de gebruiker, wat kan leiden tot een volledige overname van het account via Cross-Site Scripting (XSS).
                </p>
                <p>
                    De `X-Content-Type-Options: nosniff` header stopt deze aanval volledig. De browser krijgt nu de expliciete opdracht: "Als de server zegt dat dit een `image/jpeg` is, behandel het dan als een afbeelding en niets anders." De browser zal niet langer proberen de inhoud te "sniffen" en zal de verborgen JavaScript-code negeren. De implementatie is triviaal – het is simpelweg het toevoegen van een enkele header aan alle serverantwoorden. Het is een perfect voorbeeld van een "defense-in-depth" principe: zelfs als andere beveiligingslagen (zoals bestandsvalidatie bij het uploaden) falen, biedt deze header een robuuste laatste verdedigingslinie. Het is een essentiële, laagdrempelige maatregel die op elke moderne website aanwezig zou moeten zijn.
                </p>
            </div>
        )
    },
    {
        title: "X-Frame-Options",
        content: (
             <div className="space-y-4">
                <p>
                    De <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options">`X-Frame-Options`</ExternalLink> header is een cruciale beveiligingsmaatregel die specifiek is ontworpen om een verraderlijke aanval genaamd <ExternalLink href="https://owasp.org/www-community/attacks/Clickjacking">"clickjacking"</ExternalLink> te voorkomen. Clickjacking, ook wel bekend als een "UI redress attack", is een techniek waarbij een aanvaller een gebruiker misleidt om op iets anders te klikken dan wat de gebruiker waarneemt. Dit wordt meestal bereikt door een onzichtbare of transparante webpagina (of een deel ervan) in een iframe over de zichtbare pagina te leggen. De gebruiker denkt dat hij op een onschuldige knop klikt, zoals "Win een prijs", maar in werkelijkheid wordt zijn klik geregistreerd op de onzichtbare pagina eronder, bijvoorbeeld op een "Verwijder mijn account" knop van een website waarop hij op dat moment is ingelogd.
                </p>
                <p>
                    De `X-Frame-Options` header biedt een eenvoudige maar effectieve manier om te bepalen of een browser een pagina mag weergeven binnen inbeddingselementen zoals frames of iframes. Door deze header in de HTTP-respons van een webpagina op te nemen, kan de server de browser instrueren hoe deze verzoeken moet behandelen. Er zijn twee veelgebruikte, en één verouderde, directieven die kunnen worden gebruikt. De meest restrictieve en veiligste optie is `DENY`. Deze waarde verbiedt het weergeven van de pagina in een frame volledig, ongeacht welke website dit probeert te doen. Dit is de beste keuze voor pagina's met zeer gevoelige acties die nooit ingebed zouden moeten worden, zoals pagina's voor het wijzigen van wachtwoorden of het uitvoeren van financiële transacties.
                </p>
                <p>
                    Een meer flexibele, en zeer gangbare, optie is `SAMEORIGIN`. Dit directief staat toe dat de pagina in een frame wordt weergegeven, maar alleen als de website die de pagina probeert in te bedden, dezelfde oorsprong (domein) heeft als de pagina zelf. Dit is bijzonder nuttig voor webapplicaties die iframes gebruiken voor hun eigen legitieme functionaliteit, zoals het tonen van modale vensters of het integreren van verschillende onderdelen van dezelfde applicatie, terwijl het inbedden door externe, potentieel kwaadaardige websites wordt voorkomen. Een derde, verouderde optie is `ALLOW-FROM uri`, waarmee een specifieke URL kon worden opgegeven die de pagina mocht framen. Deze optie is echter nooit breed ondersteund door alle browsers en wordt nu als verouderd beschouwd.
                </p>
                 <p>
                    Hoewel `X-Frame-Options` nog steeds zeer relevant en effectief is, is het belangrijk op te merken dat de modernere `Content-Security-Policy` (CSP) een <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors">`frame-ancestors`</ExternalLink> directief bevat. Dit directief wordt beschouwd als de opvolger van `X-Frame-Options`, omdat het meer flexibiliteit biedt (zoals het specificeren van meerdere toegestane domeinen). Echter, vanwege de brede ondersteuning en eenvoud, blijft het implementeren van `X-Frame-Options` een aanbevolen 'defense-in-depth' strategie, vooral om compatibiliteit met oudere browsers te garanderen. Door deze header correct te configureren, wordt een hele klasse van UI-gebaseerde aanvallen effectief geneutraliseerd.
                </p>
            </div>
        )
    },
    {
        title: "Referrer-Policy",
        content: (
            <div className="space-y-4">
                <p>
                    De <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy">`Referrer-Policy`</ExternalLink> header is een essentieel instrument voor het beschermen van de privacy van gebruikers door te bepalen welke informatie wordt meegestuurd in de `Referer`-header (let op de historische spelfout) wanneer een gebruiker van de ene naar de andere pagina navigeert. Standaard stuurt een browser de volledige URL van de vorige pagina mee naar de nieuwe pagina. Hoewel dit nuttig is voor analytics en het begrijpen van verkeersstromen, creëert het een aanzienlijk privacyrisico. URL's kunnen gevoelige informatie bevatten, zoals zoektermen, gebruikers-ID's, of zelfs tokens voor het resetten van wachtwoorden. Het doorsturen van deze data naar externe partijen, zonder medeweten van de gebruiker, is een datalek dat kan worden misbruikt.
                </p>
                <p>
                    De `Referrer-Policy` geeft website-eigenaren de mogelijkheid om dit gedrag nauwkeurig te sturen met behulp van verschillende directieven. De keuze voor een directief is een afweging tussen privacy en functionaliteit. Een van de strengste opties is `no-referrer`. Zoals de naam al aangeeft, wordt de `Referer`-header in dit geval volledig weggelaten bij alle uitgaande verzoeken. Dit biedt maximale privacy, maar maakt het voor de ontvangende site onmogelijk om te zien waar het verkeer vandaan komt, wat de analyse van verkeersbronnen kan bemoeilijken. Een andere veelgebruikte, privacyvriendelijke optie is `strict-origin-when-cross-origin`. Dit is vaak een goede standaardkeuze. Het gedraagt zich als volgt: bij navigatie binnen dezelfde website (bijv. van `voorbeeld.nl/pagina1` naar `voorbeeld.nl/pagina2`) wordt de volledige URL meegestuurd. Echter, bij navigatie naar een andere website (cross-origin), wordt alleen de basis-URL (de origin, bijv. `https://voorbeeld.nl/`) meegestuurd, en alleen als de verbinding even veilig is (HTTPS naar HTTPS).
                </p>
                <p>
                    Andere directieven bieden meer granulaire controle. `same-origin` zorgt ervoor dat de referrer alleen wordt meegestuurd voor verzoeken binnen dezelfde website; voor alle andere verzoeken wordt deze weggelaten. `strict-origin` stuurt alleen de basis-URL mee, maar doet dit, in tegenstelling tot `strict-origin-when-cross-origin`, ook voor navigatie binnen dezelfde site. Aan de andere kant van het spectrum staat `unsafe-url`, wat, zoals de naam al aangeeft, onveilig is. Dit directief stuurt altijd de volledige URL mee, inclusief queryparameters, zelfs bij onveilige (HTTP) verzoeken. Het gebruik hiervan wordt sterk afgeraden. Door bewust een `Referrer-Policy` te kiezen, nemen website-eigenaren de verantwoordelijkheid voor de data van hun gebruikers. Het implementeren van een restrictieve policy, zoals `strict-origin-when-cross-origin`, is een eenvoudige stap die de privacy aanzienlijk verbetert zonder essentiële functionaliteit te breken.
                </p>
            </div>
        )
    },
    {
        title: "Permissions-Policy",
        content: (
            <div className="space-y-4">
                <p>
                    De <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy">`Permissions-Policy`</ExternalLink> header is een moderne en krachtige beveiligingsfunctie die websitebeheersers gedetailleerde controle geeft over welke browserfuncties en API's op een pagina gebruikt mogen worden. Deze header, die de oudere `Feature-Policy` vervangt, is gebaseerd op het 'principle of least privilege': een stuk code zou alleen de rechten moeten hebben die absoluut noodzakelijk zijn om zijn taak uit te voeren. Door expliciet te definiëren welke functies zijn toegestaan, kunnen ontwikkelaars de 'attack surface' van hun website aanzienlijk verkleinen en de privacy van gebruikers beter beschermen.
                </p>
                <p>
                    Moderne webapplicaties maken steeds vaker gebruik van krachtige browser-API's, zoals toegang tot de camera (`camera`), microfoon (`microphone`), geolocatie (`geolocation`), fullscreen-modus (`fullscreen`), en het verwerken van betalingen (`payment`). Hoewel deze functies innovatieve gebruikerservaringen mogelijk maken, vormen ze ook een potentieel risico. Een kwetsbaarheid in een script van derden, zoals een advertentie- of analytics-script dat op uw pagina wordt geladen, zou misbruikt kunnen worden om ongewenst toegang te krijgen tot deze gevoelige API's. Een gebruiker zou bijvoorbeeld onbewust kunnen worden gevraagd om microfoontoegang te verlenen aan een onbetrouwbaar script dat meelift op uw legitieme website.
                </p>
                <p>
                    De `Permissions-Policy` pakt dit probleem aan door een duidelijk beleid te specificeren. De header bestaat uit een reeks directieven, waarbij elk directief een specifieke functie vertegenwoordigt. Voor elke functie kan een lijst van toegestane 'origins' (domeinen) worden opgegeven. Als een website bijvoorbeeld geen toegang tot de microfoon nodig heeft, kan de ontwikkelaar dit expliciet uitschakelen met `permissions-policy: microphone=()`. De lege haakjes `()` betekenen dat de functie voor alle partijen (inclusief de eigen site en alle iframes) is uitgeschakeld. Als een functie alleen door de eigen website gebruikt mag worden, kan dit worden ingesteld met `microphone=('self')`. Dit zorgt ervoor dat ingebedde iframes van derden, zoals een YouTube-video, geen toegang tot de microfoon kunnen vragen.
                </p>
                <p>
                    De echte kracht van `Permissions-Policy` ligt in de granulaire controle over content van derden. U kunt een specifiek domein toestemming geven, bijvoorbeeld `permissions-policy: camera=('self' https://trusted-partner.com)`. Dit zorgt ervoor dat alleen uw eigen site en een vertrouwde partner de camera mogen gebruiken. Alle andere iframes worden geblokkeerd. Het implementeren van een strikte `Permissions-Policy` is een best practice voor moderne webontwikkeling. Het dwingt ontwikkelaars om bewust na te denken over welke functionaliteit hun applicatie echt nodig heeft en biedt een robuuste verdedigingslaag tegen misbruik van browser-API's. Dit resulteert in een veiligere ervaring voor de gebruiker en versterkt het vertrouwen in uw platform.
                </p>
            </div>
        )
    },
    {
        title: "X-XSS-Protection",
        content: (
            <div className="space-y-4">
                 <p>
                    De <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection">`X-XSS-Protection`</ExternalLink> header is een stukje internetgeschiedenis; een beveiligingsmaatregel die ooit werd geïntroduceerd in browsers als Internet Explorer, Chrome en Safari als een eerste verdedigingslinie tegen 'reflected' Cross-Site Scripting (XSS) aanvallen. Hoewel de intentie goed was, is de header inmiddels verouderd en wordt deze door alle moderne browsers afgeraden en zelfs genegeerd. De functionaliteit is volledig vervangen door de veel robuustere en configureerbare `Content-Security-Policy` (CSP). Het begrijpen van de werking en de tekortkomingen van `X-XSS-Protection` biedt echter waardevol inzicht in de evolutie van webbeveiliging.
                </p>
                <p>
                    De header was ontworpen om een specifieke aanvalsvector te blokkeren: een <ExternalLink href="https://owasp.org/www-community/attacks/xss/#reflected-xss-attacks">'reflected' XSS-aanval</ExternalLink>. Dit type aanval vindt plaats wanneer kwaadaardige code, via een URL-parameter of formulierinvoer, door de server wordt 'gereflecteerd' en direct in de HTML-respons wordt opgenomen. De `X-XSS-Protection` header activeerde een ingebouwde 'auditor' of 'filter' in de browser. Deze filter gebruikte heuristieken om te detecteren of scriptcode in de aanvraag (bijvoorbeeld in de URL) ook letterlijk in de HTML van de pagina verscheen. Als dit het geval was, concludeerde de browser dat er een aanval plaatsvond.
                </p>
                <p>
                    De header kon verschillende waarden hebben. De standaardwaarde was `1`, wat de filter activeerde. Bij detectie van een aanval probeerde de browser de pagina te 'saneren' door de kwaadaardige code te verwijderen of te neutraliseren. Dit bleek echter een gevaarlijke aanpak. Aanvallers ontdekten manieren om deze saneringsmechanismen te omzeilen en konden in sommige gevallen zelfs kwetsbaarheden creëren die zonder de filter niet bestonden. Een veiligere optie was `1; mode=block`. In deze modus zou de browser, bij het detecteren van een aanval, het renderen van de pagina volledig stoppen en een lege pagina tonen. Dit voorkwam de uitvoering van het script, maar bood een slechte gebruikerservaring. De waarde `0` schakelde de filter expliciet uit.
                </p>
                <p>
                    Uiteindelijk werd de header afgeschaft om meerdere redenen. De filters waren onbetrouwbaar, konden worden omzeild, en veroorzaakten soms 'false positives' die legitieme websites braken. Belangrijker nog, de opkomst van `Content-Security-Policy` bood een fundamenteel superieure aanpak. In plaats van te proberen aanvallen te 'raden' op basis van onbetrouwbare heuristieken, stelt CSP ontwikkelaars in staat om een strikte 'whitelist' van vertrouwde codebronnen te definiëren. Dit 'deny by default'-model is inherent veiliger. Hoewel u de `X-XSS-Protection` header nog steeds op oudere websites kunt tegenkomen, is het voor moderne webontwikkeling geen actieve beveiligingsmaatregel meer. De focus ligt nu volledig op een sterke en goed geconfigureerde CSP.
                </p>
            </div>
        )
    },
];

interface SeoContentProps {
    headerToFocus: string | null;
    setHeaderToFocus: (header: string | null) => void;
}

export const SeoContent: React.FC<SeoContentProps> = ({ headerToFocus, setHeaderToFocus }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (headerToFocus) {
            const focusIndex = accordionData.findIndex(item => item.title === headerToFocus);
            if (focusIndex !== -1) {
                setOpenIndex(focusIndex);
                setTimeout(() => {
                    accordionRefs.current[focusIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100); // Small delay to allow accordion to start opening
                setHeaderToFocus(null); // Reset focus state
            }
        }
    }, [headerToFocus, setHeaderToFocus]);


    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mt-12 text-dark-text-secondary">
            <h2 className="text-2xl font-semibold text-white mb-4">
                Waarom zijn Security Headers Belangrijk?
            </h2>
            <p className="mb-4">
                HTTP security headers zijn een fundamenteel onderdeel van websitebeveiliging. Ze stellen webservers in staat om browsers te instrueren hoe ze zich moeten gedragen bij het verwerken van de content van een website. Dit helpt bij het voorkomen van veelvoorkomende aanvallen zoals Cross-Site Scripting (XSS), clickjacking, en man-in-the-middle aanvallen. Door headers zoals <strong>Content-Security-Policy</strong>, <strong>Strict-Transport-Security</strong>, en <strong>X-Frame-Options</strong> correct te implementeren, voegt u een cruciale verdedigingslaag toe aan uw applicatie. Dit beschermt niet alleen uw website, maar ook de gegevens en de privacy van uw gebruikers.
            </p>

            <div className="space-y-4 mt-8">
                {accordionData.map((item, index) => (
                    // FIX: Changed ref callback from an implicit return to a block body to ensure a void return type, which is required for ref callbacks.
                    <div key={item.title} ref={el => { accordionRefs.current[index] = el; }}>
                        <AccordionItem
                            title={item.title}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        >
                            {item.content}
                        </AccordionItem>
                    </div>
                ))}
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-8">
                Hoe Werkt Deze Tool?
            </h3>
            <p>
                Deze tool analyseert de URL die u invoert en controleert op de aanwezigheid en correcte configuratie van de belangrijkste security headers. We geven een duidelijk overzicht van welke headers aanwezig zijn en welke ontbreken. Daarnaast bieden we een gedetailleerde uitleg van het doel van elke header en de risico's die u loopt als deze niet aanwezig is. Gebruik deze analyse om de beveiliging van uw website te verbeteren.
            </p>
        </div>
    );
};
