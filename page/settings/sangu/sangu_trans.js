/**
 * Contains all translations for the property setting editors
 */
var sangu_trans = (function() {
    var sangu_trans = {};
    sangu_trans.nl = {
        main: {
            title: "Hoofdgebouw",
            villageNames: "Standaard dorpsnamen:",
            villageNamesTooltip: "Voeg je veelgebruikte dorpsnamen toe om een dorp met 1 klik te hernoemen.",
            villageNameClick: "Autoclick?",
            villageNameClickTooltip: "Schakel deze feature uit indien je bijvoorbeeld nog een nummer aan een standaard dorpsnaam wil toevoegen.",
            ajaxLoyalty: "Toestemming tonen?"
        },
        global: {
            title: "Op alle pagina's",
            tw_version: "Compatibiliteit met TW versie {version} afdwingen",
            tw_versionTooltip: "Dit gaat enkel de grijze Sangu bol niet meer tonen. Bugs door de TW update gaan niet op een magische manier opgelost zijn!",
            resources: {
                title: "Met kleuren aanduiden hoe vol de opslagplaats is",
                activate: trans.sp.sp.settings.activate,
                blinkWhenStorageFull: "Grondstoffen knipperen wanneer de opslagplaats vol is",
                colors: "Kleurenschakering"
            },
            incomingsTitle: "Binnenkomende aanvallen/ondersteuning links",
            incomingsEditLinks: "Linkdoelwit wijzigen",
            incomingsEditLinksTooltip: "De binnenkomende aanval/ondersteuning link wijzigen zodat de eerste 1000 bevelen getoond worden.",
            incomingsTrack: "Tijdchecker activeren",
            incomingsIndicator: "Tijdchecker tekst",
            incomingsIndicatorTooltip: "Gebruik {current} voor het huidig aantal binnenkomende aanvallen. "
                + "{difference} voor het aantal nieuwe aanvallen. "
                + "{saved} voor het laatst opgeslaan aantal aanvallen.",
            incomingsIndicatorTooltip2: "Tijdchecker tooltip",
            incomingsLastTimeCheckWarningMore: "Tijdchecker tooltip (meer)",
            incomingsLastTimeCheckWarningMoreTooltip: "Gebruik {elapsed} voor de verstreken tijd. Gebruik {time} voor de laatste tijdcheck.",
            incomingsLastTimeCheckWarningLess: "Tijdchecker tooltip (minder)",
            otherSettingsTitle: "Overige configuratie",
            visualizeFriends: "Aangeven welke vrienden momenteel online zijn",
            duplicateLogoffLink: "Voeg links onderaan een extra 'Afmelden' link toe.",
            colorsTitle: "Sangu achtergrondkleuren",
            colorsError: "Waarschuwingen",
            colorsNeutral: "Neutrale indicaties",
            colorsGood: "Positieve indicaties",
            colorsSpecial: "Speciale indicaties",
            jumperTitle: "Kaartspringer",
            jumperAutoOpen: "Het inputveld om coördinaten in te geven direct openen"
        },
        incoming: {
            title: "De standaard TW binnenkomende aanvallen tagger",
            autoOpenTagger: "De tagger direct openen indien het bevel nog niet hernoemd is",
            forceOpenTagger: "De tagger altijd openen",
            renameInputTexbox: "De standaard hernoemde bevelnaam",
            renameInputTexboxTooltip: "Legende: {unit}: korte eenheidnaam; {xy} coördinaten; {player}; {village}; {c} Continent; {fields} Afstand in velden; {night} Indicatie wanneer in nachtbonus. Maak leeg om te deactiveren.",
            invertSort: "De snelheid mogelijkheden sorteren",
            invertSortTooltip: "Vink dit aan om de traagste eenheid bovenaan te plaatsen"
        },
        overviews: {
            addFancyImagesToOverviewLinks: "Icons toevoegen aan de overzichtslinks",
            command: {
                title: "Overzichtsscherm: Troepenoverzicht",
                titleOwnTroopsPage: "Pagina's 'Eigen' en 'In het dorp'",
                middleMouseClickDeletesRow: "Actie bij <img src='graphic/command/attack.png'>"
                    + " aanklikken met de middelste muisknop: Aangevinkt=rij verwijderen. Uitgevinkt: rode rand rond de \"Opdracht\" cell.",
                middleMouseClickDeletesRowTooltip: "Dit werkt enkel in Opera. Vink dit NIET AAN in Firefox of Chrome!! (De rode rand werkt ook niet in Firefox)",
                titleDefensePage: "Pagina's 'Verdediging' en 'Ondersteuning'",
                changeTroopsOverviewLink: "Link wijzigen om direct 'Eigen troepen' te openen",
                filterMinPopulation: "De standaard ingevulde waarde om te filteren op populatie",
                filterOnUnitTypeSeperator: "Eigen/In het dorp: Filteren op aantal eenheden",
                filterMinDefaultType: "De eenheid om te filteren die standaard geselecteerd is",
                filterMinDefault: "Het aantal eenheden om te filteren dat standaard ingevuld is",
                filterMinDefaultTooltip: "Dit aantal wordt ingevuld wanneer de pagina opent. Bij het selecteren van een andere eenheid worden de waarden hieronder gebruikt.",
                filterMinOther: "De standaard waarde voor de overige eenheden",
                filterAutoSort: "De dorpenlijst automatisch sorteren na het ingeven van een doeldorp"
            },
            troopsRestack: {
                title: "Alle pagina's: Stack BBCodes generatie",
                to: "Stack een dorp tot hoeveel populatie",
                requiredDifference: "Vereist verschil in huidige populatie in het dorp en de waarde hierboven",
                fieldsDistanceFilterDefault: "Het standaard ingevuld aantal velden waarop gefilterd wordt",
                filterReverse: "Aangevinkt: Rijen die voldoen aan de zoekopdracht tonen. Anders de rijen verbergen.",
                filterReverseTooltip: "Dit kan op de pagina zelf nog aangepast worden",
                defaultPopulationFilterAmount: "Het standaard ingevuld aantal voor de populatie filter",
                removeRowsWithoutSupport: "Bij het berekenen van de totalen dorpen zonder ondersteuning direct verbergen",
                autohideWithoutSupportAfterFilter: "Automatisch dorpen zonder overige ondersteuning wegfilteren na het toepassen van een filter",
                autohideWithoutSupportAfterFilterTooltip: "Bij de aanvalsfilter worden de dorpen die niet onder aanval zijn sowieso verborgen.",
                calculateDefTotalsAfterFilter: "Automatisch de totale ondersteuning per dorp berekenen na het toepassen van een filter",
                calculateDefTotalsAfterFilterTooltip: "Voor sommige filters moeten de totalen sowieso toch eerst berekend worden."
            },
            commands: {
                title: "Overzichtsscherm: Bevelen",
                sumRow: "Een scheidingsrij tussen verschillende dorpen toevoegen",
                filterFakeMaxPop: "Een bevel met minder dan deze populatie is een fake aanval (en wordt verborgen)",
                requiredTroopAmount: "Bij de export naar BBCodes worden bevelen met minder dan deze populatie overgeslagen."
            },
            resources: {
                title: "Overzichtsscherm: Productie",
                requiredResDefault: "Het aantal grondstoffen dat standaard in het invoerveld ingevuld is",
                requiredMerchants: "Het aantal handelaren dat standaard ingevuld is",
                filterMerchants: "Ook filteren op aantal beschikbare handelaren",
                filterRows: "Aanvinken om rijen te verbergen. Wanneer uitgevinkt wordt achtergrondkleur van de grondstoffen gewijzigd",
                bbcodeMinimumDiff: "Het minimum verschil in grondstoffen tussen het aantal in het dorp en het aantal waarop gefilterd wordt voordat het dorp in de BBcode export opgenomen wordt",
                highlightColor: "De achtergrondkleur die gebruikt wordt om de grondstoffen aan te duiden die voldoen aan de filtercriteria"
            },
            buildings: {
                title: "Overzichtsscherm: Gebouwen",
                minMaxTitle: "Geef de laagst en hoogst aanvaardbare levels voor je gebouwen",
                minLevel: "Min {building}",
                maxLevel: "Max {building}"
            },
            incomings: {
                title: "Overzichtsscherm: Aankomend",
                attackIdTitle: "Groeperen op aanvalsid",
                minValueTooltip: "De te tonen tekst wanneer het verschil in aanvalsid tussen de vorige binnenkomende aanval meer is dan het aangegeven verschil",
                seperatorTitle: "Bij verschil &lt; {minValue}",
                minValue: "Minimum verschil",
                text: "Tekst",
                attackIdHigherDescription: "Te tonen tekst bij groter verschil in aanvalsid"
            }
        },
        place: {
            title: "Plaats: Speciale troepen invul links",
            titleCustom: "Plaats: Extra troepen invul links",
            linkText: "Link tekst",
            link: "Link: {name}",

            scoutTitle: "Verkenner links",
            scoutVillage: "Een dorp krijgt verkenner links als er meer verkenners zijn dan dit",
            scoutPlaceLinks: "Links om zoveel verkenners in te vullen",

            fakePlaceLinkTitle: "Fake troepen link",
            fakePlaceExcludeTroops: "Type troepen te negeren bij selecteren",
            fakePlaceExcludeTroopsTooltip: "Gebruik de namen: spear, sword, axe, archer, sword, spy, light, marcher, heavy, ram, catapult",

            noblePlaceLinkTitle: "Edel links",
            noblePlaceLinkFirstTitle: "Edel link met het meeste troepen",
            noblePlaceLinkFirstNameTooltip: "Er blijven genoeg troepen thuis om voor de resterende edels nog ondersteuning te kunnen sturen. Maak leeg om deze link niet te tonen.",

            noblePlaceLinkSupportTitle: "Edel link met minimale ondersteuning",
            noblePlaceLinksForceShow: "Ook tonen wanneer er slechts 1 edel in het dorp is",
            nobleSupportOffTitle: "Edel ondersteuning voor offensief dorp",
            nobleSupportDefTitle: "Edel ondersteuning voor defensief dorp",
            nobleSupportUnit: "Eenheid",
            nobleSupportAmount: "Aantal eenheden",

            noblePlaceLinkDivideTitle: "Edel link met gelijk verdeelde ondersteuning",
            noblePlaceLinkDivideAddRam: "Rammen mee selecteren",

            customPlaceLinksTitle: "Andere links",
            customPlaceOneTimeTooltip: "Vul een getal in om zoveel te sturen. Vul een negatief getal om zoveel te laten staan.",
            customPlaceSendAlong: "Meesturen tot",
            customPlaceSendAlongTooltip: "Indien er na selectie van bovenstaande troepen minder dan zoveel troepen in het dorp zou overblijven, selecteer dan alle troepen"
        },
        profile: {
            title: "Verfraaien van het profiel van spelers en stammen",
            moveClaim: "Verplaats dorpsclaim zodat alle andere links op dezelfde plaats blijven staan",
            mapLink: {
                title: "Kaarteigenschappen van link naar TWMaps kaart generator",
                fill: "Achtergrondkleur",
                zoom: 'Inzoom niveau',
                grid: 'Continentlijnen',
                gridContinentNumbers: "Continent nummers",
                playerColor: 'Spelerskleur',
                tribeColor: 'Zijn stam kleur',
                centreX: "Centreren op X coördinaat",
                centreY: "Centreren op Y coördinaat",
                ownColor: 'Eigen kleur',
                markedOnly: "Alleen gemarkeerde",
                yourTribeColor: "Eigen stam kleur",
                bigMarkers: "Grotere aanduidingen"
            },
            popup: {
                title: "Overnames popup",
                width: "Breedte van de popup",
                height: "Hoogte van de popup",
                left: "Horizontale positie",
                top: "Verticale positie"
            }
        },
        mainTagger: {
            title: "Tagger op dorpsoverzicht",
            autoOpen: "De tagger automatisch openen bij binnenkomende aanvallen",
            inputBoxWidth: "De breedte van de bevel hernoemings inputvelden",
            defaultDescription: "De naam die standaard in het hernoemings inputveld geplaatst wordt",
            autoOpenCommands: "De bevel hernoemings inputvelden direct tonen",
            minutesDisplayDodgeTimeOnMap: "Aantal minuten dat de laatste dodgetijd op de kaart getoond wordt",
            minutesDisplayDodgeTimeOnMapTooltip: "De laatste dodgetijd is de tijd van het laatste bevel, aangeduidt met gewijzigde achtergrondkleur na het herbenoemen van binnenkomende aanvallen.",
            minutesWithoutAttacksDottedLine: "Elke zoveel minuten zonder een tussenliggende binnenkomende aanval aanduiden met een stippelijn (180 = 3 uur)",
            colorSupport: "Binnenkomende ondersteuning een andere achtergrondkleur geven",
            otherButtons: {
                title: "Andere hernoemings knoppen",
                renameTo: "Hernoemen naar",
                button: "Tekst knop"
            }
        },
        confirm: {
            title: "Bevel comfirmatie pagina",
            addExtraOkButton: "Links bovenaan de pagina een extra OK knop toevoegen",
            replaceNightBonus: "Nachtbonus melding verwerken in de pagina titel",
            replaceTribeClaim: "Dorpsclaim melding verwerken in de pagina titel",
            addCatapultImages: "Gebouws iconen tonen om snel het katapult doelwit te wijzigen"
        },
        villageInfo: {
            title: "Extra links naar het troepenoverzicht",
            title2: "Twee extra links naar het troepenoverzicht op elke dorpsinformatie pagina toevoegen",
            icon: "Kies een icoon",
            off_title: "Extra link voor aanvallen",
            def_title: "Extra link voor verdedigen",
            linkName: "De link die toegevoegd wordt",
            group: "Binnen welk groep id openen (kies 0 voor alle groepen)",
            groupTitle: "Zodra je meer dan 1000 dorpen bezit worden enkel die eerste 1000 getoond & gefilterd. Door een groep id in te geven (vb je groep \"aanvalsdorpen\" of \"verdedigingsdorpen\") wordt de troepenlijst binnen deze groep geopend.",
            activateFilter: "Filter activeren",
            filter: {
                title: "Direct filteren",
                unit: "Eenheid",
                amount: "Minimale hoeveelheid"
            },
            sort: "Dorpenlijst direct sorteren",
            changeSpeed: "Traagste eenheid snelheid wijzigen"
        },
        other: {
            title: "Overige configuratie",
            proStyle: "Pro Style?",
            proStyleTooltip: "Met deze setting worden een heleboel kleinere features aan of uitgeschakeld",
            timeDisplayTitle: "Hoe looptijden weergeven",
            displayDays: "Dagen tonen wanneer de troepen langer dan 24 uur lopen?",
            displayDaysTooltip: "Voorbeeld: toon \"1.18:01:36\" wanneer aangevinkt, zoniet wordt die looptijd als \"42:01:36\" weergegeven",
            walkingTimeDisplay: "Te tonen tekst",
            walkingTimeDisplayTooltip: "Gebruik {duration} voor het aantal uren en {arrival} voor de aankomstdatum",
            calculateSnob: "Berekenen hoeveel edels direct kunnen geproduceerd worden",
            showPlayerProfileOnVillage: "Het uitgebreide spelersprofiel tonen op een dorpsinformatie pagina",
            farmLimitTitle: "Dorpstacks achtergrondkleuren",
            farmLimitStackColors: "Kleurenschakering",
            farmLimitAcceptableOverstack: "Acceptabele overstack voor elke kleurschakering",
            farmLimitAcceptableOverstackTooltip: "Boerderijlimiet: {farmlimit}",
            farmLimitUnlimitedStack: "Aantal populatie voor elke kleurschakering",
            ajaxSeperateSupport: "Dorpsoverzicht: Visualiseer het verschil tussen eigen en ondersteunende troepen in het dorpsoverzicht",
            canHideDiv: "Dorpsoverzicht: Een extra X icon toevoegen om een info kader volledig te verwijderen",
            commandRenamer: "Bevelen automatisch hernoemen",
            commandRenamerActive: "De verzonden troepen in de bevelnaam weergeven",
            commandRenamerAddHaul: "De buit aan de bevelnaam toevoegen"
        }
    };

    //sangu_trans.de = {};

    /*sangu_trans.en = {
        main: {
            title: "Main building",
            villageNames: "Village names:",
            villageNamesTooltip: "Add village names to the village headquarters to quickly edit the village name to a preset name.",
            villageNameClick: "Autoclick?",
            villageNameClickTooltip: "true: one of the previous button clicked automatically changes the village name. false: only fills in the name in the textbox but does not click the button",
            ajaxLoyalty: "Show loyalty?",
            ajaxLoyaltyTooltip: "Get the loyalty at the building construction/destruction page"
        }
    };*/

    return sangu_trans[game_data.market];
}());
