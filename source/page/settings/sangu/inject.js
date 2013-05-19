var user_data_configs = [];

user_data_configs.push({
    id: "global",
    title: sangu_trans.global.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        resourcesTitle: {
            type: "subtitle",
            label: sangu_trans.global.resources.title
        },
        resourcesActivate: {
            label: sangu_trans.global.resources.activate,
            propUI: {
                getter: function() { return user_data.global.resources.active; },
                setter: function(value) { user_data.global.resources.active = value; },
                editor: "bool"
            }
        },
        resourcesBlinkWhenFull: {
            label: sangu_trans.global.resources.blinkWhenStorageFull,
            propUI: {
                getter: function() { return user_data.global.resources.blinkWhenStorageFull; },
                setter: function(value) { user_data.global.resources.blinkWhenStorageFull = value; },
                editor: "bool"
            }
        },
        otherSettingsTitle: {
            type: "subtitle",
            label: sangu_trans.global.otherSettingsTitle
        },
        visualizeFriends: {
            label: sangu_trans.global.visualizeFriends,
            propUI: {
                getter: function() { return user_data.global.visualizeFriends; },
                setter: function(value) { user_data.global.visualizeFriends = value; },
                editor: "bool"
            }
        }
    }
});




user_data_configs.push({
    id: "main",
    title: sangu_trans.main.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        villageNames: {
             tooltip: sangu_trans.main.villageNamesTooltip,
             label: sangu_trans.main.villageNames,
             propUI: {
                 getter: function() { return user_data.main.villageNames; },
                 setter: function(value) { user_data.main.villageNames = value; },
                 editor: "array:string"
             }
        },
        villageNameClick: {
            tooltip: sangu_trans.main.villageNameClickTooltip,
            label: sangu_trans.main.villageNameClick,
            propUI: {
                getter: function() { return user_data.main.villageNameClick; },
                setter: function(value) { user_data.main.villageNameClick = value; },
                editor: "bool"
            }
        },
        ajaxLoyalty: {
            label: sangu_trans.main.ajaxLoyalty,
            show: server_settings.ajaxAllowed,
            propUI: {
                getter: function() { return user_data.main.ajaxLoyalty; },
                setter: function(value) { user_data.main.ajaxLoyalty = value; },
                editor: "bool"
            }
        }
    }
});

user_data_configs.push({
    id: "other",
    title: sangu_trans.other.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        proStyle: {
            tooltip: sangu_trans.other.proStyleTooltip,
            label: sangu_trans.other.proStyle,
            propUI: {
                getter: function() { return user_data.proStyle; },
                setter: function(value) { user_data.proStyle = value; },
                editor: "bool"
            }
        },
        displayDays: {
            label: sangu_trans.other.displayDays,
            propUI: {
                getter: function() { return user_data.displayDays; },
                setter: function(value) { user_data.displayDays = value; },
                editor: "bool"
            }
        }
    }
});




// Inject in page
var contentPage = $("#content_value table:first td:last").attr("width", "99%");
contentPage.html("<h3>" + trans.sp.sp.configuration + "</h3>");
for (var configId = 0; configId < user_data_configs.length; configId++) {
    buildConfigForm(contentPage, user_data_configs[configId]);
    contentPage.append("<br>");
}