

// settings.editor: : delimited: "array:string" or "required:boolean" etc

/**
 * Factory for creating different representations of a property
 * @type {string}
 */
function createSettingType(inputHandler, editors, index) {
    var value = inputHandler.getValue(index);
    editors = editors.split(":");

    switch (editors[0]) {
        case "bool":
            return {
                build: function(id) {
                    assert(typeof value === 'boolean', (typeof value) + ": not a boolean");
                    return "<input type='checkbox' id='"+id+"' "+(value ? " checked" : "")+" />";
                },
                bind: function(id) {
                    $(document).on("click", "#" + id, function() {
                        inputHandler.setValue($(this).is(":checked"), index);
                    });
                }
            };
        case "string":
            return {
                build: function(id) {
                    assert(typeof value === 'string', (typeof value) + ": not a string");
                    q("build" + id);
                    return "<input type='text' id='"+id+"' "+(value ? " value='"+value.replace(/'/g, "&#39;")+"'" : "")+" />"
                        + " <a href='#' id='"+id+"_button' class='rename-icon'></a>";
                        //+ "<input type='button' id='"+id+"_button' value='OK' />";
                },
                bind: function(id) {
                    $(document).on("click", "#" + id + "_button", function() {
                        q("bind:" + id);
                        inputHandler.setValue($("#" + id).val(), index);

                        // TODO we zaten hier:
                        // index is hier undefined
                        // misschien heeft het te maken met die $.on ?
                    });
                }
            };
        case "array":
            return {
                build: function(id) {
                    var arrayType,
                        htmlString = "",
                        arrayIndex,
                        domId;

                    assert(typeof value === 'object', (typeof value) +  ": not an object (array)");

                    for (arrayIndex = 0; arrayIndex < value.length; arrayIndex++) {
                        arrayType = new FormInputHandler(inputHandler.formConfig, {
                            getter: function(index) { q("getting index " + index); return user_data.main.villageNames[index]; },
                            setter: function(value, index) {
                                q("setting index:" + index + " to " + value);
                                if (value.length > 0) {
                                    user_data.main.villageNames[index] = value;
                                } else {
                                    user_data.main.villageNames.splice(index, 1);
                                }
                            },
                            editor: editors[1]
                        }, arrayIndex);

                        domId = id + "_" + arrayIndex;
                        htmlString += "<img src='graphic/delete.png' title='' id='"+domId+"_delete' /> &nbsp;";
                        htmlString += arrayType.build(domId);
                        htmlString += "<br>";

                        arrayType.bind(domId);
                    }

                    return htmlString;
                },
                bind: function() {

                }
            };
    }
    assert(false, editors[0] + " is not a valid createSettingType");
    return;
}

/**
 *	@constructor
 */
function FormInputHandler(propertyFormConfig, propSettings, index) {
	assert(typeof propSettings.getter === 'function', 'getter should be a function');
	assert(typeof propSettings.setter === 'function', 'setter should be a function');
	//assert(!(typeof propSettings.getter() === 'undefined'), "value can't be undefined");

    this.formConfig = propertyFormConfig;
    if (typeof propertyFormConfig.save === 'undefined') {
        this.setValue = propSettings.setter;
    } else {
        this.setValue = function(value) {
            propSettings.setter(value);
            propertyFormConfig.save();
        };
    }

    this.getValue = propSettings.getter;
    //q("FormInputHandler.index" + index);
    var strategy = createSettingType(this, propSettings.editor, index);
    this.build = strategy.build;
    this.bind = strategy.bind;
}

function buildConfigForm(contentPage, propertyFormConfig) {
    var config = propertyFormConfig.properties,
        prop,
        properties = [],
        propIndex,
        binder,
        form = "<table class=vis width='100%'>";

    // show only relevant properties
    // has side-effects
    for (prop in config) {
        if (config.hasOwnProperty(prop)) {
            if (typeof config[prop].show === "undefined" || config[prop].show) {
                config[prop].ownName = prop;
                if (typeof config[prop].type === 'undefined') {
                    // this is a variable <-> input form mapping
                    config[prop].type = "propertyEditor";
                    config[prop].propUI = new FormInputHandler(propertyFormConfig, config[prop].propUI);

                } else {
                    // this are other visual indications
                    // ui is handled with if/else below
                }

                properties.push(config[prop]);
            }
        }
    }

    // build form
    form += "<tr><th colspan='2'>" + propertyFormConfig.title + "</th>";
    for (propIndex = 0; propIndex < properties.length; propIndex++) {
        var propUI = properties[propIndex];
        if (propUI.type === 'propertyEditor') {
            form += "<tr>";

            // label
            form += "<td width='25%'>";
            if (typeof propUI.tooltip !== "undefined") {
                form += "<img src='graphic/icons/configuration.png' title='"+propUI.tooltip+"' /> &nbsp; ";
            }
            form += propUI.label;
            form += "</td>";

            //editor
            form += "<td width='75%'>";
            form += propUI.propUI.build(propertyFormConfig.id+"_"+propUI.ownName);
            form += "</td>";

            form += "</tr>";

            // bind the form to the js variable (with on)
            if (typeof propUI.propUI.bind === 'function') {
                propUI.propUI.bind(propertyFormConfig.id+"_"+propUI.ownName);
            }
        } else {
            switch (propUI.type) {
                case "subtitle":
                    form += "<tr class='row_b'><td colspan='2'><b>"+propUI.label+"</b></td></tr>";
                    break;
            }
        }

    }
    form += "</table>";
    contentPage.append(form);
}