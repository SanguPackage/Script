<?php
header('Content-type: text/html; charset=UTF-8') ;

$currentVersion = '//<!--@@INCLUDE "version.txt" INDENT=0 //-->';
$lastReleaseDate = "//<!--@@INCLUDE CURRENTDATE //-->";
$isLocal = $_SERVER["REMOTE_ADDR"] == "127.0.0.1";
$fileName = "sangupackage.user.js";
?>
<html>
<head>
<title>Sangu Package - Tribal Wars Greasemonkey script voor Opera, Firefox en Chrome</title>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
<script type="text/javascript" src="script.js"></script>
<link rel="stylesheet" type="text/css" href="style.css" />
<link rel="shortcut icon" href="favicon.png" />
<meta name='description' content='Sangu Package is een Greasemonkey script om het spelen van Tribal Wars sneller, efficiënter en aangenamer te laten verlopen' />
<meta name="keywords" content="TribalWars Tribal Wars Stämme Greasemonkey UserScript free Sangu Package TW die-staemme" />
<script type="text/javascript">
<?php
if (!$isLocal) {
?>
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-30075487-3']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
<?php
}
?>
</script>
</head>
<body>
<table width=500 align=center border=0><tr><td>
<table width="100%" border=0>
	<tr>
		<td width="1%"><a href="http://nl.twstats.com/nl10/index.php?page=tribe&id=22147&tab=info" target=_blank><img src="images/sangu.jpeg" /></a></td>
		<td valign=top>
			<h1>Sangu Package</h1>
		
			Het Sangu Package is een Greasemonkey script (voor Opera, Firefox en Chrome) dat beweert het spelen van TW sneller, vlotter en efficiënter te laten verlopen
			en dat, zoals de naam al doet vermoeden, een verzameling is van scripts die de bestaande TW pagina's gaan uitbreiden met vooral extra berekeningen
			(afstanden, tijden, stacks) en sorteer, groepeer- en filtermogelijkheden. Het Sangu Package is gericht naar grote spelers (50+ dorpen)
			en is ook meer actief op PA pagina's.<br>
			<br>
		
			Sangu speelt op een klassieke wereld maar het package is voor alle werelden geconfigureerd en houdt rekening met loopsnelheden, nachtbonus, 
			maximum edelafstand, fake limiet etc.
		</td>
	</tr>
</table>

<h1>Installatie</h1>
Het script downloaden: 
<a href="<?php echo $fileName; ?>" onclick="var that=this;_gaq.push(['_trackEvent','Downloads','LinkClicked','<?php echo $currentVersion; ?>']);setTimeout(function(){location.href=that.href;},200);return false;"><?php echo $fileName; ?></a>
<br>Laatste update: <?php echo $lastReleaseDate; ?> (<?php echo $currentVersion; ?>)

<br><br>
Installeren met <a href="http://forum.tribalwars.nl//showthread.php?t=33076" target=_blank>Opera</a><br>
Installeren met <a href="http://forum.tribalwars.nl//showpost.php?p=689062&postcount=2" target=_blank>Firefox</a><br>
Installeren met <a href="http://forum.tribalwars.nl//showpost.php?p=689085&postcount=3" target=_blank>Chrome</a> (Of via <a href="https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=nl" target=_blank>Tampermonkey</a>)

<h1>Donatie</h1>
<table width=100% border=0>
<tr><td width="1%">
<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="ZJJ7HPMSQ3KAW">
<input type="image" width='74' height='21' src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" title="">
</form>
</td><td>
Je vindt het Sangu Package leuk en die appreciatie wil je met de maker delen? 
<br>Dat kan - volledig vrijblijvend - via mijn
Paypal account of mijn <a href="http://www.amazon.com/wishlist/1RFQ21NSF4PAI/ref=cm_wl_prev_ret?_encoding=UTF8&reveal=" target=_blank>Amazone wishlist</a> :)
</td></tr></table>

<h1>Configuratie</h1>
De meer geavanceerde gebruikers van het script zullen na een tijd bepaalde wijzigingen willen maken aan hun gedownloade versie. Het Sangu Package is hierop 
voorzien door de configuratie van veel features bovenaan het script te definiëren. 

<br><input type=button value="Meer informatie" class=spoilerButton>
<div class=spoiler style="display:none">
Het is dus mogelijk om op een <i>relatief eenvoudige</i> manier features aan of uit te schakelen of om de details van hun werking aan te passen 
aan de eigen noden met mogelijk zelfs verschillende instellingen per wereld.
Als je denkt dat dit allemaal je pet te boven gaat, geen paniek, je kan het Sangu Package perfect gebruiken zonder ooit iets aan te passen!

<br><br>

<b>Tip</b>: Door op de <img src="images/config.jpeg" title="Configuratie"> icons te klikken krijg je te zien welke instellingen betrekking hebben op een bepaalde feature.
<br><b>Tip</b>: Test het script na elke wijziging. Als je tijdens het editeren ook maar één fout maakt zal het volledige package stoppen met werken. Een backup maken voordat je je volledig laat gaan is ook geen slecht idee!
<br><b>Tip</b>: Als je een beetje JavaScript kent dan is het aanpassen van de instellingen heel simpel. Je kan hier een JavaScript <a href="http://www.homepage-maken.nl/javascript/index.php" target=_blank>tutorial</a> vinden. Vooral les 3 is hier relevant :)

<br><br>

Hoe je de broncode van het script precies moet aanpassen, staat hier uitgelegd voor <a href="http://www.howtogeek.com/howto/internet/firefox/change-or-set-the-greasemonkey-script-editor-in-firefox/" target=_blank>Firefox</a>.
Voor Opera moet je het bestand <span class=code>sangupackage.user.js</span> in je UserScript folder openen met Notepad, Kladblok, Wordpad of iets dergelijks. Opgelet: Als je het Sangu Package aanpast met Word zal het daarna niet meer werken!

<br><br>

Eenmaal je de broncode geopend hebt kan je de configuratie beginnen aan te passen vanaf de volgende lijn:
<br><span class=code>// De overige settings en de settings voor alle andere werelden:
<br>$j.extend(user_data, {</span>

<br>
<h3>Een aantal voorbeelden</h3>
<span class=code>calculateSnob: <i>true</i>,</span>
<br>Gaat in de Adelshoeve berekenen hoeveel edels onmiddelijk kunnen gemaakt worden met het aantal beschikbare pakketjes.
<br>"calculateSnob" is hier de naam of sleutel van de instelling. Elke instelling heeft zijn unieke sleutel.
De mogelijkheden zijn hier <span class=code>true</span> (=ja / waar) en <span class=code>false</span> (=nee / onwaar).
Bij true wordt deze feature ingeschakeld, bij false wordt deze feature uitgeschakeld. De meeste instellingen kunnen aangepast worden met ja/nee, maar bij sommige komt er iets meer bij kijken...

<br><br><span class=code>aanvalScout: [5, 100, 500], </span>
<br>De getallen tussen [ en ] zijn een array of een verzameling van elementen. In dit geval het aantal scouts waarvoor er links worden gemaakt in de verzamelplaats. 
<br><b>Tip</b>: Tussen alle elementen moet er een <span class=code>,</span> komen. Let op dat er bij het verwijderen van elementen er geen , blijft haken na het laatste element. 
Het script zal stoppen met werken als dat wel het geval is!

<br><br><span class=code>Unit: 'light'</span>
<br>Bij veel instellingen moeten er TW eenheden ingevuld worden. Je kan hierbij kiezen tussen de volgende eenheden:<pre>spear        // Speerman
sword        // Zwaardman
axe          // Bijlstrijder
archer       // Boogschutter
spy          // Verkenners
light        // Lichte cavalrie
marcher      // Bereden boogschutter
heavy        // Zware cavalrie
ram          // Ram
catapult     // Katapult
knight       // Ridder
snob         // Edelman</pre>

<br><span class=code>colorOs: 'rgb(255, 245, 218)'</span>
<br>Bij een aantal instellingen zijn de kleuren configureerbaar. Je kan een kleur op verschillende manieren duiden. In dit voorbeeld wordt er gewerkt met <span class=code>RGB(RED, GREEN, BLUE)</span>.
RED, GREEN en BLUE zijn daarbij waarden tussen 0 en 255. RGB(0, 0, 0) is zwart. RGB(255, 255, 255) is wit. Je kan dit ook via de alternatieve hexidecimale notatie doen. Zwart: <span class=code>#000000</span>.
Op <a href="http://javascript.internet.com/page-details/color-chart.html" target=_blank>deze pagina</a> vind je een boel voorbeelden van kleuren. Er zijn ook een aantal zogenaamde "named colors". Je kan 
<a href="http://jdstiles.com/colorchart.html" target=_blank>hier</a> een lijst terugvinden.
<br><b>Tip</b>: Elke kleur moet steevast tussen enkele ' of dubbele " quotes staan!

<h3>Instellingen per wereld</h3>
Nog boven de algemene instellingen kun je ook instellingen specifiek voor een bepaalde wereld gaan instellen. De instellingen voor een bepaalde wereld gaat de standaard configuratie overschrijven als je
momenteel op die wereld ingelogd bent. Je kan dus perfect verschillende verzamelplaats links hebben op verschillende werelden, een andere dorpuitbouw etc...
<br>Deze configuratie is terug te vinden onder volgende lijnen:

<br><span class=code>// Instellingen specifiek gaan instellen per wereld
<br>switch ($j.game_data.world)</span>

<br><br><span class=code>case 'nl10':</span>
<br>Door nl10 te wijzigen naar bijvoorbeeld nl18 begin je de instellingen voor wereld 18 aan te passen. Alle mogelijkheden in <span class=code>user_data</span> kunnen hier overruled worden.
</div>

<h1>Features</h1>

<b>Legende</b>
<br><img src="images/screenshot.jpeg" title="Screenshot"> De link bevat een screenshot van de feature.
<br><img src="images/config.jpeg" title="Configuratie"> De link bevat informatie hoe de feature aan/uit te schakelen en/of hoe de details aan te passen.

<ul>
<li><a href=#overzichttroepen>Troepen overzichtspagina</a> - Het paradepaardje
<li><a href=#aanval>Aanval en verdediging</a> - Bevelen, verzamelplaats, binnenkomende aanvallen, ...
<li><a href=#overzichtprod>Markt en grondstoffen</a> - Grondstoffen zoeken en sturen
<li><a href=#jumper>Kaart Springer</a> - Centreer de kaart op je "favoriete" coördinaten
<li><a href=#andere>Andere features</a> - De rest
</ul>
<!--<li><a href=#></a> - -->


<a name=overzichttroepen><h2>Troepen overzichtspagina</h2></a>
<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Het Sangu script is actief op de "Eigen" en "In het dorp" troepenoverzichtpagina's.
<div class=config style="display:none">
<b>user_data.filterMinDefault</b>: Het standaard aantal ingevuld in de troepenfilter textbox.
<br><b>user_data.filterMinDefaultType</b>: Welke unit standaard geselecteerd is in de troepenfilter combobox. Mogelijkheden zijn <span class=code>spear, sword, axe, archer, spy, light, marcher, heavy, ram, catapult, knight, snob</span>
<br><b>user_data.filterMinPopulation</b>: De populatie die standaard ingevuld wordt in de "Filter populatie" textbox.
<br><b>user_data.filterMin</b>: De waarden die standaard geplakt worden als het filteraantal bij het selecteren van een andere eenheid.
<br><b>user_data.filterMinOther</b>: Alle eenheden die niet in de filterMin lijst voorkomen krijgen dit aantal bij selectie van de unit in de troepenfilter combobox.
<br><b>user_data.filterAutoSort</b>: Geeft weer of de sorteer checkbox standaard aangevinkt is.
<br><b>user_data.displayDays</b>: Bij true worden de looptijden in dagen weergegeven, bij false in uren. Vb: 26 uur kan worden weergegeven als "26:00:00" of als "1.02:00:00".
</div>
<br><img src="images/troepenoverzicht.jpg">


<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a>
Extra totalenberekening bij het "Verdediging" troepenoverzichtscherm.
<div class=spoiler style="display:none">
<img src="images/overzichtverdediging.jpg" />
</div>

<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Mogelijkheid om bb codes voor een restack te genereren vanuit het "Verdediging" troepenoverzichtscherm.
<div class=config style="display:none"><pre>restack: {
	to: 72000,
	requiredDifference: 1000
},</pre>

<b>restack.to</b>: Het gewenst aantal troepen in het dorp.
<br><b>restack.requiredDifference</b>: Als het verschil tussen de troepen in het dorp en de restack.to kleiner is dan dit worden er geen bbcodes gegenereerd voor het dorp.
</div>

<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Via een speciale snellijst invoer kan je een troepenoverzicht onmiddelijk bij het laden van de pagina gaan filteren / sorteren.
<div class=config style="display:none">
<b>Snellijst URL voor dorpen met 7000+ bijl</b>:<br>
<pre>{game}&screen=overview_villages&type=own_home&mode=units&page=-1&group=<b>GROEPID</b>&unit=2&amount=7000&sort=false&changeSpeed=ram</pre>
<br><b>Snellijst URL voor dorpen met 3000+ speer</b></b>:
<br><pre>{game}&screen=overview_villages&type=own_home&mode=units&page=-1&group=<b>GROEPID</b>&unit=0&amount=3000&sort=true&changeSpeed=spear</pre>

<br><img src="images/urltroepenfilter.jpg" />
<br><br>

</div>





<br><a name=aanval><h2>Aanval en verdediging</h2></a>
<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a>
De coördinaten van het laatst aangevallen en van het doeldorp zijn hier zichtbaar (De looptijd en aankomsttijd wordt uitgerekend). 
Plus de mogelijkheid om de snelheid tot het laatste/doeldorp te wijzigen.
<div class=spoiler style="display:none">
<img src="images/plaats.jpg" />
</div>

<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Naast "Alle troepen" worden er extra links toegevoegd om automatisch eenheden in te vullen.

<div class="config" style="display:none">
<h3>Naamgeving</h3>
<b>attackLinkNames</b>: De omschrijving van de standaard invullinks.
<br>Standaard configuratie: <span class=code>{fake: 'Fake', verkenner: 'Ver', edelMax: 'EdelEerst', edelMin: 'EdelTrein'},</span>

<h3>Verkenners</h3>
<b>unit_data.scoutVillage</b>: Vanaf dit aantal verkenners worden de verkenner links toegevoegd.
<br><b>unit_data.aanvalScout</b>: Een array van aantallen. Bijvoorbeeld bij <span class=code>[100],</span> wordt er 1 scout link toegevoegd voor 100 verkenners. 
Bij <span class=code>[5, 100, 500],</span> worden er 3 links toegevoegd voor 5, 100 en 500 verkenners. Uitschakelen met <span class=code>[],</span>.

<h3>Edelmannen</h3>
<b>unit_data.aanvalEdel</b>: Geeft weer of de edelmannen links moeten toegevoegd worden.
<br><b>unit_data.aanvalEdelTreinAltijdTonen</b>: Geeft weer of de 2 edelmannen links ook moeten toegevoegd worden als er maar 1 edelman in het dorp aanwezig is.
<br><b>unit_data.snobSupport</b>: De troepen die samen met een edelman gestuurd worden.
<br>De standaard instelling <span class=code>[{Population: 200, Unit: 'light', VillageType: 'off'}, {Population: 600, Unit: 'heavy', VillageType: 'def'}],</span> gaat 50 lichte cavalrie sturen met een edelman in een offensief dorp. Of 100 zware cavalrie in een defensief dorp.
<br>Om dit te wijzigen naar 250 bijlstrijders voor offensief: <span class=code>[{Population: 250, Unit: 'axe', VillageType: 'off'}, {Population: 600, Unit: 'heavy', VillageType: 'def'}],</span>
<br>Om dit te wijzigen naar 250 bijlstrijders én 50 lichte cavalrie voor offensief: <span class=code>[{Population: 250, Unit: 'axe', VillageType: 'off'}, {Population: 200, Unit: 'light', VillageType: 'off'}, {Population: 600, Unit: 'heavy', VillageType: 'def'}],</span>

<h3>Andere</h3>
<pre>aanvalCustom:
[
	{active: true, type:'def', name: 'AlleDef', spear: 25000, heavy: 5000, archer: 25000, sendAlong: 0},
	{active: false, type:'def', name: 'AlleDef', spear: 25000, sword: 25000, heavy: 5000, archer: 25000, sendAlong: 0},
	{active: true, type:'def', name: 'HelftZc', spear: 4000, heavy: 1000, sendAlong: 500},
	{active: false, type:'def', name: '3deZc', spear: 2500, heavy: 650, sendAlong: 0},
	{active: false, type:'def', name: '4deZc', spear: 2000, heavy: 500, sendAlong: 0},
	{active: false, type:'def', name: 'HelftZw', spear: 5000, sword: 5000, sendAlong: 500},
	{active: false, type:'def', name: '3deZw', spear: 3300, sword: 3300, sendAlong: 0},
	{active: false, type:'def', name: '4deZw', spear: 2500, sword: 2500, sendAlong: 0},
	{active: true, type:'off', name: 'Smart', spear: 25000, sword: -10, ..., ram: 5000, catapult: 5000, sendAlong: 0},
	{active: true, type:'off', name: 'Bijl', spear: 25000, axe: 25000, ..., heavy: 5000, marcher: 5000, sendAlong: 0},
	{active: true, type:'off', name: 'Zwaard', spear: 25000, sword: -10, ..., heavy: 5000, marcher: 5000, sendAlong: 0}
], </pre>

<b>aanvalCustom.active</b>: Bij false wordt de link niet toegevoegd.
<br><b>aanvalCustom.type</b>: Mogelijkheden <span class=code>'def'</span>, <span class=code>'off'</span> en <span class=code>'all'</span>. Afhankelijk hiervan wordt de link in een offensief of defensief dorp toegevoegd.
<br><b>aanvalCustom.name</b>: De omschrijving van de link.
<br><b>aanvalCustom.sendAlong</b>: Als je ingeeft 2000 speer en je zet sendAlong op 200. Dan gaat de link tot 2200 selecteren als er maar zoveel speer in het dorp aanwezig is.
<br><b>aanvalCustom.required</b>: Een minimale eenheid die in het dorp moet aanwezig zijn of de link verschijnt niet in het dorp. Syntax: <span class=code>required: ['sword', 1],</span>.
<br>Hiermee wordt aangegeven welke en hoeveel eenheden moeten geselecteerd worden.
<br><b>aanvalCustom.EENHEID</b>: De mogelijkheden zijn: <span class=code>spear, sword, axe, archer, spy, light, marcher, heavy, ram, catapult, snob</span>.
<br>Voor het selecteren van een vast getal geef dit getal in: vb 600 speer. Als er niet zoveel eenheden in het dorp aanwezig zijn worden ze allemaal geselecteerd.
<br>Kies dus een groot genoeg getal zoals vb "25000" voor het selecteren van alle eenheden.
<br>Geef een negatief getal in om zoveel eenheden in het dorp achter te laten. "-1" gaat dus alle eenheden behalve 1 selecteren.
</div>

<br>
<img src="images/plaatsoff.jpg" />


<br><br>
<img src="images/plaatsdef.jpg" />


<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
De ingebouwde tw tagger verder uitbouwen
<div class="config" style="display:none"><pre>incoming:
{
	sorteerOpLooptijd: true,
	autoOpenTagger: true,
	hernoemInputTexbox: "{unit} ({xy}) {player} F{fields}",
	villageBoxSize: 600
},</pre>

<b>incoming.sorteerOpLooptijd</b>: Geeft weer of de verschillende eenheden in de tabel op loopsnelheid gesorteerd worden.
<br><b>incoming.autoOpenTagger</b>: Gaat de tagger automatisch openen bij het openen van de tw tagger.
<br><b>incoming.hernoemInputTexbox</b>: Gaat de text in de inputvelden aanpassen. Zet op <span class=code>"",</span> om uit te schakelen.
<br><br>
Standaard configuratie: <span class=code>"{unit} ({xy}) {player} F{fields}",</span>
<br><b>Mogelijkheden</b>:
<br>{unit}: Korte omschrijving van de traagste eenheid.
<br>{xy}: De coördinaten van het dorp onder aanval.
<br>{player}: De speler die de aanval verstuurd heeft.
<br>{fields}: Afstand tussen de twee dorpen.
<br>{c}: Het continent van het dorp onder aanval.
<br>{dorp}: Volledige dorpsnaam.
<br>{id}: Het TW ID van de aanval. (Technisch)
</div>
	
<img src="images/tagger.jpg">


<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a> <a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Ook op het dorpsoverzicht zijn er extra tagmogelijkheden toegevoegd
<div class=spoiler style="display:none">
<img src="images/maintagger.jpg" />
</div>
<div class=config style="display:none"><pre>mainTagger:
{
	active: true,
	inputBoxWidth: 400,
	standaardOmschrijving: "DONE",
	andereOmschrijvingen: 
		[
		{name: "DODGED", prefix: false}, 
		{name: "BLOCKED", prefix: false}, 
		{name: "REVIEW", prefix: false}, 
		{name: "DODGE EDELS", prefix: true}, 
		{name: "DODGE", prefix: true}, 
		{name: "CHECK STACK", prefix: true}
		],
	prefix: "-----------------------------------------",
	autoOpenCommands: true
},</pre>

<b>mainTagger.active</b>: Uitschakelen of activeren van deze feature.
<br><b>mainTagger.inputBoxWidth</b>: De breedte van de inputvelden voor het hernoemen van een aanval vergroten.
<br><b>mainTagger.standaardOmschrijving</b>: De standaard omschrijving in de tagger.
<br><b>mainTagger.prefix</b>: Een prefix die voor de effectieve nieuwe bevelnaam gezet wordt. 
Dit gebeurt bij de <span class=code>standaardOmschrijving</span> als de checkbox is aangevinkt of bij de <span class=code>andereOmschrijvingen</span>
bij <span class=code>prefix: true</span>. Standaard is dit een resem '-' tekens zodat deze opvallen in de lijst met binnenkomende aanvallen.
<br><b>mainTagger.autoOpenCommands</b>: Automatisch de textboxen tonen zodat deze niet meer moeten opengeklikt worden.
<br><b>mainTagger.andereOmschrijvingen</b>: Een lijst met andere omschrijvingen. Voor elke omschrijving wordt een extra hernoem-knop toegevoegd.
<br>Syntax: <span class=code>{name: "MijnFancyNaam", prefix: true}</span>
</div>


<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a> <a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Groepeermogelijkheid bij overzicht bevelen.
<div class=spoiler style="display:none">
<img src="images/bevelen.jpg" />
</div>
<div class=config style="display:none">
<b>user_data.commandSommatie</b>: Gaat de "Somlijn" checkbox standaard aanvinken.
</div>


<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a> <a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
De verstuurde eenheden automatisch in de bevelnaam zetten.
<div class=spoiler style="display:none">
<img src="images/aanvalhernoem.jpg" />
</div>
<div class=config style="display:none">
<b>user_data.aanvalAutoRename</b>: Uitschakelen van deze feature.
<br><b>user_date.rallyPointAttackBoxWidth</b>: Breedte instellen van de tabel met aanvallen op de verzamelplaats.
</div>

<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a>
Extra totaalberekening bij overzicht Bevelen > Ondersteuning.
<div class=spoiler style="display:none">
<img src="images/bevelenos.jpg" />
</div>

<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a>
Totalenberekening bij de verzamelplaats > Troepen.
<div class=spoiler style="display:none">
<img src="images/osbuitenaf.jpg" />
</div>

<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a>
Totalenberekening bij het versturen van ondersteuning.
<div class=spoiler style="display:none">
<img src="images/ossturen.jpg" />
</div>




<br><a name=overzichtprod><h2>Markt en grondstoffen</h2></a>
<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Extra filtermogelijkheden op het productie overzichtscherm.
<div class="config" style="display:none"><pre>resources:
{
	requiredResDefault: 250000,
	requiredHandelaar: 50,
	filterHandelaar: true,
	filterRows: true,
	bbcodeMinimumDiff: 50000
},</pre>

<b>resources.requiredResDefault</b>: Het aantal grondstoffen dat standaard ingevuld wordt.
<br><b>resources.requiredHandelaar</b>: Het aantal handelaren dat standaard ingevuld wordt.
<br><b>resources.filterHandelaar</b>: Geeft weer of de checkbox voor het duiden van handelaren standaard aangevinkt is.
<br><b>resources.filterRows</b>: Geeft weer of de filter checkbox standaard aangevinkt is.
<br><b>resources.bbcodeMinimumDiff</b>: Gaat enkel bb codes genereren voor dorpen die minstens dit getal afwijken van de filter.
</div>

<br><img src="images/overzichtres.jpg">
<br><br>

<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a>
Inputboxen met de coördinaten van het laatst aangevallen (of ondersteunde) dorp en het doeldorp zijn toegevoegd.
<div class=spoiler style="display:none">
<img src="images/markt.jpg" />
</div>


<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a>
Totaal aantal binnenkomende grondstoflevering wordt uitgerekend.
<div class=spoiler style="display:none">
<img src="images/markttotaal.jpg" />
</div>









<br><a name=jumper><h2>Kaart Springer</h2></a>
<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Met deze feature kan je rechtstreeks naar bepaalde coördinaten op de kaart springen.
<div class="config" style="display:none"><pre>user_data.jumper:
		{
			enabled: true,
			favs: [],
			left: 880,
			top: 196,
			daysActive: 100,
			width: 200,
			addDoel: true,
			addLaatste: true
		},
</pre>
<br><br>
<b>enabled</b>: Activeren (true) of deactiveren (false) van de springer.
<br><b>width</b>: De breedte van de popup.
<br><b>favs</b>: Favoriete locaties die niet in de cookies opgeslaan zijn en dus ook nooit kunnen verdwijnen. Syntax: <span class=code>["500|500", "300|300", "666|555"],</span>
<br><b>left & top</b>: Vormen samen de locatie van de springer popup. Dit is enkel de originele locatie, de popup zal daarna steeds verschijnen waar de gebruiker hem het laatst positioneerde/sleepte.
<br><b>daysActive</b>: Na zoveel dagen worden de favorieten in de cookies gewist.
<br><b>addDoel</b>: Gaat het doeldorp (zoals bepaald in het troepenoverzicht scherm) toevoegen aan de favorieten popup.
<br><b>addLaatste</b>: Gaat het laatst aangevallen of ondersteunde dorp ook toevoegen aan de favorieten.
</div>
<br><br><img src="images/jumper.jpg" />

<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a>
Op de kaart kan je zelf coördinaten aan je lijst van favorieten toevoegen.
<div class=spoiler style="display:none">
<img src="images/kaartjumper.jpg" />
</div>




<br><a name=andere><h2>Andere features</h2></a>
<b>De navigatie- en infoheader</b> 
<li>Deze wordt uitgebreid met een aan/uit knop en de Kaart Springer zoals hierboven beschreven:
<img src="images/header.jpg" />

<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
De achtergrondkleur van de grondstoffen wordt donkerder (roder) naarmate de opslagplaats meer gevuld is. 
<div class=config style="display:none">
<b>user_data.gsStorageShow</b>: Uitschakelen van deze feature.
<br><b>user_data.gsStorageBackground</b>: De kleuren zelf configureren. 
</div>

<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Gaat volle opslagplaatsen eenmaal doen blinken. 
<div class=config style="display:none">
<b>user_data.overviewBlinkResources</b>: Uitschakelen van deze feature.
</div>

<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
De links naar de aankomende aanvallen en ondersteuning wordt gewijzigd. Alle groepen en alle pagina's worden getoond. 
<div class=config style="display:none">
<b>user_data.editAttackLink</b>: Uitschakelen van deze feature.
</div>


<br><br><b>Andere overzichten</b>:
<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a> <a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Gebouwen overzicht filteren op niet volledig uitgebouwde dorpen.
<div class=spoiler style="display:none">
<img src="images/gebouwoverzicht.jpg" />
</div>
<div class=config style="display:none"><pre>buildings:
{
	main: [20, 20], // Hoofdgebouw
	barracks: [25, 25], // Kazerne
	stable: [20, 20], // Stal
	garage: [1, 5], // Werkplaats
	church: [0, 1], // Kerk
	church_f: [0, 1], // Eerste kerk
	snob: [1, 3], // Adelshoeve
	smith: [20, 20],  // Smederij
	place: [1, 1], // Verzamelplaats
	statue: [0, 1], // Standbeeld
	market: [10, 20], // Markt
	wood: [30, 30], // Houthakkers
	stone: [30, 30], // Leemgroeve
	iron: [30, 30], // IJzermijn
	farm: [30, 30], // Boerderij
	storage: [30, 30], // Opslagplaats
	hide: [0, 10], // Schuiplaats
	wall: [20, 20], // Muur
}
});</pre>

<b>Syntax</b>: <span class=code>gebouwType: [minLevelOk, maxLevelOk]</span>
<br><b>minLevelOk</b>: De laagste level die niet geduidt wordt. Als de level van het gebouw in het dorp lager is dan wordt de level in het rood geplaatst.
<br><b>maxLevelOk</b>: De hoogste level die niet geduidt wordt. Als de level van het gebouw in het dorp hoger is dan wordt de level in het groen geplaatst.
<br><b>Voorbeeld</b>: <span class=code>garage: [1, 5],</span>. De level wordt rood gekleurd wanneer er geen werkplaats (=garage) is en wanneer de werkplaats level 6 of hoger is.
</div>


<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a> <a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Ontwikkeling overzicht filteren op niet correcte smederijlevels.
<div class=spoiler style="display:none">
<img src="images/techoverview.jpg" />
</div>
<div class=config style="display:none"><pre>smithy:
[
['offense', {spear: [3,3], sword: [1,1], axe: [3,3], spy: [0,0], light: [3,3], heavy: [3,3], ram: [2,2], catapult: [0,0]}],
['defense', {spear: [3,3], sword: [1,3], axe: [0,3], spy: [0,3], light: [0,3], heavy: [3,3], ram: [1,2], catapult: [0,0]}],
['catapult', {spear: [2,2], sword: [1,1], axe: [3,3], spy: [3,3], light: [0,0], heavy: [3,3], ram: [0,0], catapult: [3,3]}]
],</pre>

<b>Syntax</b>: <span class=code>['NaamVanDeGroep', {unitType: [minLevelOk, maxLevelOk], unitType2: [minLevelOk, maxLevelOk]}]</span>
<br><b>unitType</b>: Mogelijkheden zijn <span class=code>spear, sword, axe, archer, spy, light, marcher, heavy, ram, catapult</span>.
<br><b>minLevelOk</b>: De laagste level die niet geduidt wordt. Als de tech level in het dorp lager is dan wordt de level in het rood geplaatst.
<br><b>maxLevelOk</b>: De hoogste level die niet geduidt wordt. Als de tech level in het dorp hoger is dan wordt de level in het groen geplaatst.
</div>




<br><br><b>Spelersprofiel</b>:
<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
De profielpagina's uitbreiden met extra informatie, links en grafieken.
<div class=config style="display:none"><pre>profile: {
	show: true,
	moveClaim: true,
	mapLink: {
		show: true,                // Deze feature aan of uitschakelen
		fill: '000000',            // De achtergrondkleur van de kaart
		zoom: '200',               // De zoomlevel (100 = de hele wereld)
		grid: true,                // De continentlijnen zien?
		playerColor: 'ffff00',     // De kleur van de speler
		tribeColor: '0000FF',      // De kleur van de stam van de speler
		centreX: 500,              // De X coördinaat
		centreY: 500,
		ownColor: 'FFFFFF',        // De kleur van jezelf
		markedOnly: true,          // Enkel gemarkeerde spelers/stammen tonen?
		yourTribeColor: "FF0000"}, // De kleur van je stam
			
	spelerGrafiek: 
	[
		["points", 'big', true], // Puntengrafiek
		["villages", 'big'],     // Aantal dorpen
		["od", 'big'],           // OD
		["oda", false],          // OD Aanval
		["odd", false],          // OD Verdediging
		["rank", false]          // Ranglijst
	], // small / big / false
	stamGrafiek:
	[
		["points", false],         // Punten
		["villages", 'big'],       // Aantal dorpen
		["od", false],
		["oda", false], 
		["odd", false],
		["rank", false], 
		["members", 'big', true]  // Aantal leden in de stam
	],
	popup: {
		show: true, 	// Activeren of deactiveren van deze feature
		width: 900, 	// De breedte van de popup
		height: 865		// De hoogte van de popup
	}
},</pre>

<b>profile.show</b>: De profielpagina uitbreidingen activeren?
<br><b>profile.mapLink</b>: De instellingen voor de link naar TW Stats kaart.
<br><b>profile.spelerGrafiek</b>: TW Stats grafieken toevoegen naast het "Persoonlijke wapen".
<br><b>profile.stamGrafiek</b>: TW Stats grafieken toevoegen.
<br><b>profile.popup</b>: Tonen van de overnames uit TW Stats in een popup.
<br><br>
<b>Syntax grafieken</b>: <span class=code>["WelkeGrafiek", 'grootteVanDeGrafiek', directOpenklappen]</span>
<br><b>WelkeGrafiek</b>: Het type grafiek. Mogelijkheden zijn <span class=code>points, villages, od, oda, odd, rank</span> en ook <span class=code>members</span> (enkel op het stamprofiel).
<br><b>grootteVanDeGrafiek</b>: TW Stats biedt twee soorten grafieken aan. <span class=code>'big'</span> is het "Standaardbeeld", <span class=code>'small'</span> is het "Alternatief beeld".
<br><b>directOpenklappen</b>: true/false: Direct openklappen? Bij <span class=code>false</span> komt er enkel een spoiler button waardoor de grafiek kan zichtbaar gemaakt worden. Bij <span class=code>true</span> is de grafiek onmiddelijk zichtbaar.
</div>

<img src="images/profiel.gif" />


<br><br><b>Dorpsoverzicht</b>:
<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a> <a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
De stack in het dorp wordt uitgerekend waarbij er rekening gehouden wordt met de boerderij limiet, als er een is.
<div class=spoiler style="display:none">
<img src="images/boerderijlimiet.jpg" />
</div>
<div class=config style="display:none">
<b>user_data.calculateBoerderijLimiet</b>: Uitschakelen van deze feature.
<br><b>user_data.acceptableOverstack</b>: Aanvaardbare overstack.
</div>

<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a> <a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Binnenkomende ondersteuning wordt een andere achtergrondkleur gegeven dan de binnenkomende aanvallen. 
<div class=spoiler style="display:none">
<img src="images/dorpoverzichtos.jpg" />
</div>
<div class=config>
<b>user_data.colorOs</b>: Uitschakelen of kleur configureren. Uischakelen door gelijk te stellen aan <span class=code>null</span> of <span class=code>false</span>.
</div>

<br><br><b>Andere pagina's</b>:
<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a> <a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Hoofdgebouw: Knoppen toevoegen die het dorp naar een vaste naam hernoemen. 
<div class=spoiler style="display:none">
<img src="images/hoofdgebouw.jpg" />
</div>
<div class=config>
<b>user_data.villageName</b>: Uitschakelen of dorpsnamen configureren. Uitschakelen door gelijk te stellen aan <span class=code>null,</span> of <span class=code>[],</span>
<br>Configuratie voor 1 naam: <span class=code>["Bledap"],</span>
<br>Configuratie voor meerdere dorpsnamen: <span class=code>["Bledap", "Mealm", "Yalek"],</span>
<br><b>user_data.villageNameClick</b>: Enkel de naam invullen, niet klikken.
</div>

<li><a href="#" class=showSpoiler><img src="images/screenshot.jpeg" title="Screenshot"></a> <a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Adelshoeve: Berekenen hoeveel edels onmiddelijk kunnen gemaakt worden met het aantal beschikbare pakketjes.
<div class=spoiler style="display:none">
<img src="images/adelshoeve.jpg" />
<br><br><b>Tip</b>: Tussen haakjes wordt weergegeven hoeveel pakketjes er overblijven bij het produceren van alle edels.
</div>
<div class=config style="display:none">
<b>unit_data.user_data.calculateSnob</b>: Uitschakelen van deze feature.
</div>


<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Bericht Publiceren: Automatisch de checkboxes om alles in het rapport te tonen aanvinken. 
<div class=config>
<b>user_data.reportPublish</b>: Configureren welke checkboxen automatisch aangevinkt worden.
<br>Standaard configuratie: <span class=code>["own_units", "own_losses", "opp_units", "opp_losses", "carry"],</span>
<br>Uitschakelen door gelijk te stellen aan <span class=code>null,</span> of <span class=code>[],</span>
<br>"own_units": Eigen eenheden tonen.
<br>"own_losses": Eigen verliezen tonen.
<br>"opp_units": Vijandelijke eenheden tonen.
<br>"opp_losses": Vijandelijke verliezen tonen.
<br>"carry": Buit tonen.
<br><br>
Om alles te tonen behalve de eigen eenheden en verliezen: <span class=code>["opp_units", "opp_losses", "carry"],</span>
</div>


<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Gaat het profiel (TW stats grafieken en links) van de speler op het dorp van die speler tonen.
<div class=config style="display:none">
<b>user_data.showPlayerProfileOnVillage</b>: Activeren van deze feature.
</div>

<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Gaat de inputtextboxen bij het bewerken van de snellijst vergroten.
<div class=config style="display:none">
<b>user_data.snellijstGrootte</b>: De nieuwe breedte van de snellijst textboxen. Uischakelen door gelijk te stellen aan <span class=code>null,</span> of <span class=code>0,</span>
<br><b>user_data.snellijstScriptRijen</b>: Het aantal lijnen van de URL textbox. Handig wanneer je een snellijst script wil wijzigen.
</div>

<li><a href="#" class=showConfig><img src="images/config.jpeg" title="Configuratie"></a>
Het Sangu Package kan een heleboel elementen in TW herpositioneren zodat de OK button of bepaalde links altijd op dezelfde plaats staan om 2enter beter te ondersteunen.
<div class=config style="display:none">
<b>user_data.proStyle</b>: Gaat al dit soort features activeren of uitschakelen.
<br><b>user_data.marketResizeImage</b>: Gaat de grootte van de markt foto op het marktscherm gelijk stellen. (De foto van level 19 en 20 markt zijn verschillend van grootte)
<br><b>user_data.replaceNachtbonus</b>: Gaat op de aanvalconfirmatie pagina de melding dat een aanval in de nachtbonus toekomt wijzigen.
<br><b>user_data.replaceStamClaim</b>: Gaat op een dorp de "Dorp claimen" link verplaatsen. (Zodat "Troepen sturen" op dezelfde plaats blijft staan)
<br><b>user_data.autoMarketFocus</b>: De focus bij het versturen van grondstoffen op de OK knop zetten op het confirmatie scherm.
<br><b>user_data.autoAttackFocus</b>: De focus bij het versturen van troepen op de OK knop zetten op het confirmatie scherm.
<br><b>user_data.incoming.villageBoxSize</b>: Gaat de grootte van de tabel bij een binnenkomende aanval vergroten.
</div>

<!--
<h2>Easter Egg</h2>
De easter egg is reeds uit het package verwijderd na beschuldigingen allerhande.
Wat de "hidden feature" precies deed en de gevolgen kan je in de spoiler ontdekken.
<br>

<input type=button value="Wanneer je tegenstander jouw tool gebruikt" class=spoilerButton>
<div class=spoiler style="display:none">
Jawel er zit een easter egg in het Sangu Package, speciaal voor onze vrienden van Temp!
<br>
Als aan volgende voorwaarden voldaan is:
<br>- Je speelt op Wereld 10 en je stam heet "Templar".
<br>- Je bent momenteel de vv van iemand aan het doen.
<br>- Je bent op de Instellingen > Vakantiemodus pagina.

<br>
<b>Dan wordt in de tabel "Geschiedenis van vakantievervangers" een vv willekeurig gekozen en
vervangen door een van volgende namen: Grote Smurf, Iras, hoendroe, Diokhan, djanako, Edgile, sjarlowitsky, RUUULER, floris 5 of Kezmania.</b>

<br><h3>Hilariteit ten top!</h3>
Priory, de leider van Temp, <a href="http://forum.tribalwars.nl//showpost.php?p=2580072&postcount=118" style="color: white">vraagt zich af welke bug dit nu weer is (link)</a>.
<br>
En ook Rikoh, de (nacht) vv-er van Templar was volledig in de war :)
<pre>
Rikoh op 07.02. om 10:48 uur
Hoi Grote Smurf,

We vinden het best leuk wat Sangu nu doet met die oorlog.
Toch willen we het wel graag netjes houden, vandaar ook deze PM.

Wij hebben een onregelmatigheid geconstateerd in het spel.
Kan een bug zijn van TW, of misschien wel een bug in het Sangu Package.
Jij als creator van dat Package zou jij daar eens naar kunnen kijken?
Priory heeft ook al gekeken maar kon er niks vreemds aan ontdekken.

Uiteraard hebben we dit gemeld bij TW, maar zij zien niet echt vreemds ook. 
Ze hebben nog niet echt diep gegeraven en ik weet ook niet of ze dat wel kunnen.
Ik zal je de PM wisseling posten zodat je zelf kan zien wat er aan de hand is.

Het schijnt alleen bij Sangu spelers voor te komen, wat voor ons erg vreemd is. Vandaar dat wij dachten aan het Sangu Package.
Gisteren hoorde ik zelfs dat het ook op account [player]16bit[/player]
Dit voorgekomen is. Hij had plots [player]Hoendroe[/player] in zijn aanmeldings lijst staan.
Het blijkt ook dat zowel 16bit als ik het Sangu Package gebruik.

Nogmaals we willen geen rotzooi en het gewoon netjes houden.
Vandaar deze PM.

Riko (Rikoh)</pre>

</a><a href="#" onclick="$('#supportheh').toggle(); return false;" style="color:white">De support aanvraag in de spoiler. (link)</a>
<div id=supportheh style="display:none; color:black" class=config>
<h3>Rikoh</h3>
 op 07.02. om 10:48 uur
<br>Aanvraag: Login tijden
<br>Rikoh
<br>2011-02-03 13:25:47
<br>Hallo,
<br>
<br>Volgens ons klopt er ergens iets niet of er wordt ontzettend vals gespeeld.
<br>
<br>" vakantievervangers Start Einde
<br>Priory vandaag om 10:43 uur
<br>Rikoh vandaag om 00:21 uur vandaag om 10:43 uur
<br>Rikoh op 01.02.2011 om 00:35 uur op 01.02.2011 om 20:14 uur
<br>Rikoh op 29.01.2011 om 11:00 uur op 31.01.2011 om 22:15 uur
<br>Rikoh op 28.01.2011 om 00:31 uur op 28.01.2011 om 19:57 uur
<br>Rikoh op 27.01.2011 om 18:04 uur op 27.01.2011 om 20:24 uur
<br>Rikoh op 25.01.2011 om 10:15 uur op 26.01.2011 om 20:23 uur
<br><br>Rikoh op 24.01.2011 om 00:18 uur op 24.01.2011 om 20:44 uur
<br><b>Ruuuler op 23.01.2011 om 13:07 uur op 23.01.2011 om 16:52 uur</b>
<br>Rikoh op 23.01.2011 om 01:26 uur op 23.01.2011 om 12:42 uur"

<br>
<br>malakigirl heeft een vakantievervanging aangevraagd herbenoemen 23.01.11 20:28
<br>malakigirl heeft jouw vakantievervanging beëindigd herbenoemen 23.01.11 16:52
<br>malakigirl heeft een vakantievervanging aangevraagd herbenoemen 23.01.11 12:50
<br>malakigirl heeft jouw vakantievervanging beëindigd herbenoemen 23.01.11 12:42
<br>
<br>Hoe kan het zijn dat Ruuler's vv eindigde op dezelfde tijd dat mijn vv beeindigd werd?
<br>
<br>Dan kijken we een dag later weer eens.
<br>Wat zien we dan opeens?
<br>Kezmania zit er ineens tussen...
<br>
<br>Rikoh vandaag om 00:30 uur
<br>Priory op 02.02.2011 om 10:43 uur vandaag om 00:30 uur
<br>Rikoh op 02.02.2011 om 00:21 uur op 02.02.2011 om 10:43 uur
<br>Rikoh op 01.02.2011 om 00:35 uur op 01.02.2011 om 20:14 uur
<br>Rikoh op 29.01.2011 om 11:00 uur op 31.01.2011 om 22:15 uur
<br><b>Kezmania op 28.01.2011 om 00:31 uur op 28.01.2011 om 19:57 uur</b>
<br>Rikoh op 27.01.2011 om 18:04 uur op 27.01.2011 om 20:24 uur
<br>Rikoh op 25.01.2011 om 10:15 uur op 26.01.2011 om 20:23 uur
<br>Rikoh op 24.01.2011 om 00:18 uur op 24.01.2011 om 20:44 uur
<br>Rikoh op 23.01.2011 om 13:07 uur op 23.01.2011 om 16:52 uur
<br>
<br>Ook hier geldt dat op het moment dat Kezmania de vv zou hebben beiendigd ikzelf een berichtje krijg dat MIJN vv beindigd wordt.
<br>
<br>malakigirl heeft een vakantievervanging aangevraagd herbenoemen (nieuw) 28.01.11 21:05
<br>malakigirl heeft jouw vakantievervanging beëindigd herbenoemen (nieuw) 28.01.11 19:57
<br>malakigirl heeft een vakantievervanging aangevraagd herbenoemen (nieuw) 27.01.11 21:17
<br>
<br>Nu vraag ik me echt af waar Sangu mee bezig is?
<br>Dit stinkt enorm naar ontzettend vals spel.
<br>
<br>Ik hoor graag van iemand hoe dat dit allemaal ineens kan.
<br>
<br>Met vriendelijke groet,
<br>
<br>Rikoh
<br>Stamleiding Templar/ R.S.
<br><br>
<br><h3>stafke</h3>
<br>2011-02-06 15:32:37
<br>Beste Rikoh,
<br>
<br>Excuus voor het late antwoord.
<br>
<br>Ik heb de geschiedenis van het vv-en voor het account malakigirl gecontroleerd, hierin komen de spelers Ruuuler en Kezmania niet in voor.
<br>In de lijsten sta jij alleen als vv-er op de tijden ervoor en erna. Er is dus geen "gelijke" vv-er op het account actief geweest. 
<br>Ook bij een IP controle kom ik geen andere IP's tegen dan die van jou en de eigenaar op de tijden van het beëindigen van de vv.
<br>
<br>Ik denk persoonlijk dat het een fout in de update is.
<br>
<br>Met vriendelijke groeten,
<br>
<br>Roland (Stafke)
<br>Support Tribalwars.nl
<br><br>
<br><h3>Rikoh</h3>
<br>2011-02-06 21:10:44
<br>Hallo Roland,
<br>
<br>Fout in de update denk jij?
<br>Dan is mijn mening dat er toch eens een grondig onderzoek nodig is.
<br><b>Deze "fout" kan namenlijk heel vlug hele grote gevolgen hebben voor het spel.
<br>Wij hadden account Malakigirl al bijna uit de stam verwijderd voor dit. VV geven buiten de eigen stam.</b>
<br>
<br>Dan nog blijft dat deze geschiedenis een vreemde bijsmaak krijgt bij mij.
<br>Templar is nu recent in oorlog met Sangu.
<br>Eerst zien we dus Ruuler's naam op de lijst staan, die van Sangu is en een dag later staat er ineens Kezmania op die ook van Sangu is.
<br>Hoe verklaar je dat deze " bug" net twee van de 18 accounts van Sangu treft?
<br>
<br>Dus sorry Roland, Jouw persoonlijk mening kunnnen wij in dit geval geen genoegen mee nemen.
<br>Wij wensen dan ook dat dit verder onderzocht wordt en men een gefundeerd antwoord kan geven op deze gebeurtenissen.
<br>
<br>Riko (Rikoh)
<br>Stamleiding Templar
<br>Stam oprichter R.S.

<pre>Heh heh. Sangu = evil :)</pre>

You can fool some of the people all the time, and those are the ones you want to concentrate on. 
<br>- George W. Bush
</div>
<br><br>

<br><h3>Grote Smurf</h3> op 07.02. om 12:58 uur
<br>Hmm, netjes houden zeg je, maar jullie hebben vandaag wel een dorp overgenomen van RUUULER...
<br>

<font size=-4>
<br><h3>Rikoh</h3> op 07.02. om 13:03 uur
<br>waren er twee.
<br>
<br>Maar heeft niks te maken met onderstaande wat ons aangaat.
<br>Als jullie het spel op zich er wel bij betrekken vind ik het ook prima hoor.
<br>Dan wachten we wel wat TW er zelf van zegt.
<br>
<br><h3>Grote Smurf</h3> 
op 07.02. om 13:31 uur
<br>Ik kan daar ook niet veel over zeggen he, waarom contacteer je hoendroe of kez zelf niet. 
<br>Ik ga in ieder geval geen tijd stoppen in het uitzoeken of zij al dan niet de vv gehad hebben.. 
<br>Hopelijk heb je daar begrip voor; ik heb al genoeg problemen met alles hier intern in orde te houden :)
<br>
<br><h3>Rikoh</h3> op 07.02. om 13:39 uur
<br>uitzoeken wie de vv gehad heeft hoeft niet meer.
<br>heeft TW al gedaan voor ons.
<br>Blijkt dus niks mee te zijn.
<br>
<br>vandaar dat wij denken dat het in het Sangu Package zit.
<br>mocht TW in dat package iets vinden zou het dus zomaar kunnen zijn dat het gebanned wordt.
<br>Vandaar dat ik jou hierover rechtstreeks benader.
<br>
<br><h3>Grote Smurf</h3> op 08.02. om 00:40 uur
<br>Je weet wel dat TBR map ook zijn naam heeft van een stam (op w2). 
<br>Alle vijanden van TBR die hun script gebruiken geven dus in feite al hun rapporten door aan een server die beheerd wordt door
<br>een speler van TBR.
<br>
<br>TBR heeft misschien een apart script dat de rapporten niet filtert op stam zodat ze de berichten zien van de hele wereld?
<br>
<br>... Gewoon iets waarvan ik dacht dat ik het mijn vriend Rikoh moest delen :)
<br>
<br><h3>Rikoh</h3> op 08.02. om 00:55 uur
<br>ik vind alles prima.
<br>We komen er toch wel achter hoe dat deze bug tot stand is gekomen.
<br>
<br>Ik wilde je alleen maar een soort van waarschuwing geven, dat het misschien wel eens in de door jouw ontwikkelde software zat.
<br>
</font>

<br><h3>Grote Smurf</h3> op 08.02. om 01:06 uur
<br>Als je het zaakje niet vertrouwd kun je ook gewoon stoppen met het sangu package te gebruiken.
</span>
<br>

-->
</td></tr></table>
<?php
// Don't increment counter when developing :)
if (!$isLocal)
{
	?>
	<!-- Counter geïnstalleerd op 01/08/11 -->
	<a href="http://www.rapidcounter.com/signup.php" target="_top"><img border="0" alt="Counters" src="http://counter.rapidcounter.com/counter/1312324683/a"; ALIGN="middle" HSPACE="4" VSPACE="2"></a><script src=http://counter.rapidcounter.com/script/1312324683></script><br><a style="font-size:12" href="http://www.rapidcounter.com/" target="_top"><font style="font-size:12"color="#666666">Counters</font></a>
	<?php
}
?>
</body>
</html>	