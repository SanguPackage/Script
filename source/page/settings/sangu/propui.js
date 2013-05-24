

// settings.editor: : delimited: "array:string" or "required:boolean" etc

function createArraySettingType(inputHandler, index, editor) {
    return new FormInputHandler(inputHandler.formConfig, {
        getter: function() {
            //q("getting index " + fixedArrayIndex);
            return inputHandler.getValue()[index];
        },
        setter: function(value) {
            //q("setting index:" + fixedArrayIndex + " to " + value);
            if (value.length > 0) {
                inputHandler.getValue()[index    +    0] = value;
            } else {
                inputHandler.getValue().splice(index, 1);
            }
        },
        editor: editor
    });
}

/**
 * Factory for creating different representations of a property
 * @type {string}
 */
function createSettingType(inputHandler, editors) {
    var value = inputHandler.getValue(),
        decorators;

    editors = editors.split(":");
    decorators = editors[0].split("|");

    switch (decorators[0]) {
        case "bool":
            return {
                build: function(id) {
                    assert(typeof value === 'boolean', (typeof value) + ": not a boolean");
                    //q("get bool " + id);
                    return "<input type='checkbox' id='"+id+"' "+(value ? " checked" : "")+" />";
                },
                bind: function(id) {
                    //$(document).on("click", "#" + id, function() {
                    //q("bind " + id + ". Length => " + $("#" + id).length);
                    $("#" + id).click(function() {
                        q("set bool " + id);
                        inputHandler.setValue($(this).is(":checked"));
                    });
                }
            };
        case "text":
        case "color":
            return (function() {
                var htmlString = "<div id='{domId}_container'>",
                    index;

                htmlString += "<input type='" + decorators[0] + "' id='{domId}' size='50' "+(value ? " value='"+value.replace(/'/g, "&#39;")+"'" : "")+" />";
                    //+ " <a href='#' id='{domId}_button' class='rename-icon' title='"+trans.sp.sp.settings.editTooltip+"'></a>";

                if (decorators.length > 1) {
                    for (index = 0; index < decorators.length; index++) {
                        switch (decorators[index]) {
                            case "delete":
                                htmlString += " &nbsp;<a href='#' id='{domId}_delete'><img src='graphic/delete.png' title='"+trans.sp.sp.settings.deleteTooltip+"' /></a>";
                                break;
                        }
                    }
                }

                htmlString += "</div>";

                return {
                    build: function(id) {
                        //assert(typeof value === 'string', (typeof value) + ": not a string");
                        //q("build" + id + " for index " + index);
                        return htmlString.replace(/\{domId\}/g, id);
                    },
                    bind: function(id) {
                        //$(document).on("click", "#" + id + "_button", function() {
                        $("#" + id).change(function() {
                            //q("indx is:"+ $(this).attr("data-index"));
                            //var index = $(this).attr("data-index");
                            //q("bind:" + id + " for index " + index);
                            inputHandler.setValue($("#" + id).val());

                            //q("set");
                            //q(user_data.main.villageNames);

                            return false;
                        });

                        $("#" + id + "_delete").click(function() {
                            inputHandler.setValue("");
                            //$("#" + id + "_container").hide();

                            //q("delete");
                            //q(user_data.main.villageNames);

                            location.reload(false);
                            //window.location = window.location;
                        });
                    }
                };
            })();
        case "array":
            var typesArray = [],
                arrayIndex;

            for (arrayIndex = 0; arrayIndex < value.length; arrayIndex++) {
                (function() {
                    var fixedArrayIndex = arrayIndex;
                    typesArray.push(createArraySettingType(inputHandler, fixedArrayIndex, editors[1]));
                })();
            }

            return {
                build: function(id) {
                    var htmlString = "",
                        arrayIndex,
                        domId;

                    assert(typeof value === 'object', (typeof value) +  ": not an object (array)");

                    for (arrayIndex = 0; arrayIndex < typesArray.length; arrayIndex++) {
                        domId = id + "_" + arrayIndex;
                        htmlString += typesArray[arrayIndex].build(domId);
                    }

                    htmlString += "<a href='#' id='"+id+"_new'>" + trans.sp.sp.settings.addRecord + "</a>";

                    return htmlString;
                },
                bind: function(id) {
                    var domId,
                        arrayIndex;

                    $("#" + id + "_new").click(function() {
                        var domId = id + "_" + typesArray.length,
                            newType;

                        newType = createArraySettingType(inputHandler, typesArray.length, editors[1]);
                        $(this).before(newType.build(domId));
                        newType.bind(domId);

                        typesArray.push(newType);

                        return false;
                    });

                    if (typesArray.length === 0) {
                        $("#" + id + "_new").click();
                    } else {
                        for (arrayIndex = 0; arrayIndex < typesArray.length; arrayIndex++) {
                            domId = id + "_" + arrayIndex;
                            typesArray[arrayIndex].bind(domId);
                        }
                    }
                }
            };
    }
    assert(false, editors[0] + " is not a valid createSettingType");
    return;
}

/**
 *	@constructor
 */
function FormInputHandler(propertyFormConfig, propSettings) {
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
    var strategy = createSettingType(this, propSettings.editor);
    this.build = strategy.build;
    this.bind = strategy.bind;
}

function buildConfigForm(contentPage, propertyFormConfig) {
    var config = propertyFormConfig.properties,
        prop,
        properties = [],
        propIndex,
        form = "",
        formRow;

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
                    // these are other visual indications
                    // ui is handled with if / else below
                }

                properties.push(config[prop]);
            }
        }
    }

    // build form
    form = "<table class='vis' width='100%'>";
    form += "<tr><th colspan='2'>" + propertyFormConfig.title + "</th>";
    form += "</table>";
    form = $(form);
    contentPage.append(form);

    for (propIndex = 0; propIndex < properties.length; propIndex++) {
        var propUI = properties[propIndex];
        if (propUI.type === 'propertyEditor') {
            formRow = "<tr>";

            // label
            formRow += "<td width='25%'>";
            if (typeof propUI.tooltip !== "undefined") {
                formRow += "<img src='graphic/questionmark.png' title='"+propUI.tooltip+"' /> &nbsp; ";
            }
            formRow += propUI.label;
            formRow += "</td>";

            //editor
            formRow += "<td width='75%'>";
            formRow += propUI.propUI.build(propertyFormConfig.id+"_"+propUI.ownName);
            formRow += "</td>";

            formRow += "</tr>";

            form.append(formRow);

            // bind the form to the js variable (with on)
            if (typeof propUI.propUI.bind === 'function') {
                propUI.propUI.bind(propertyFormConfig.id+"_"+propUI.ownName);
            }
        } else {
            switch (propUI.type) {
                case "subtitle":
                    form.append("<tr class='row_b'><td colspan='2'><b>"+propUI.label+"</b></td></tr>");
                    break;
            }
        }
    }

    //form += "</table>";
    //contentPage.append(form);
}