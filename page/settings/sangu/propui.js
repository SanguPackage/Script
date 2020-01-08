

// settings.editor: : delimited: "array:string" or "required:boolean" etc

function createArraySettingType(inputHandler, index, editor) {
    var propertyValueType = editor.split("|")[0];

    function deleter() {
        inputHandler.getValue().splice(index, 1);
    }

    switch (propertyValueType) {
        case "number":
            return new FormInputHandler(inputHandler.formConfig, {
                getter: function() {
                    return inputHandler.getValue()[index];
                },
                setter: function(value) {
                    value = parseInt(value, 10);
                    if (!isNaN(value)) {
                        inputHandler.getValue()[index] = value;
                    } else {
                        inputHandler.getValue()[index] = 0;
                    }
                },
                deleter: deleter,
                editor: editor
            });

        case "text":
        case "color":
            return new FormInputHandler(inputHandler.formConfig, {
                getter: function() {
                    return inputHandler.getValue()[index];
                },
                setter: function(value) {
                    inputHandler.getValue()[index] = value;
                },
                deleter: deleter,
                editor: editor
            });

        case "float":
            return new FormInputHandler(inputHandler.formConfig, {
                getter: function() {
                    return inputHandler.getValue()[index];
                },
                setter: function(value) {
                    value = parseFloat(value.replace(",", "."));
                    if (!isNaN(value)) {
                        inputHandler.getValue()[index] = value;
                    } else {
                        inputHandler.getValue()[index] = 0;
                    }
                },
                deleter: deleter,
                editor: editor
            });
    }

    alert(propertyValueType + " not supported");
}

/**
 * Factory for creating different representations of a property
 * @type {string}
 */
function createSettingType(inputHandler, editors, editorIndex, arrayOptions) {
    var value = inputHandler.getValue(),
        decorators,
        inputType,
        propName;

    //array|addNew:number|delete|step=1000
    //color=color+number=stack

    //q("with -> " + editors + ". isArray: " + isArrayType);
    //q(arrayOptions);

    if (!arrayOptions.isArrayType) {
        decorators = editors.split("|");
        inputType = decorators[0];
        if (inputType.indexOf("=") > -1) {
            propName = inputType.split("=")[1];
            inputType = inputType.split("=")[0];
        }

        //q("isArray: " + propName + "=> " + inputType);
        //q(decorators);

        switch (inputType) {
            case "bool":
                return {
                    build: function(id) {
                        //assert(typeof value === 'boolean', (typeof value) + ": not a boolean");
                        return "<input type='checkbox' id='"+id+"' "+(value ? " checked" : "")+" />";
                    },
                    bind: function(id) {
                        $("#" + id).click(function() {
                            inputHandler.setValue($(this).is(":checked"));
                        });
                    }
                };
            case "unit":
                return {
                    build: function(id) {
                        var i,
                            html = "<select id='"+id+"'>";

                        for (i = 0; i < world_data.units.length; i++) {
                            html += "<option "+(value == world_data.units[i] ? " selected" : "")+">"+world_data.units[i]+"</option>";
                        }
                        html += "</select>";

                        return html;
                    },
                    bind: function(id) {
                        $("#" + id).click(function() {
                            inputHandler.setValue($(this).val());
                        });
                    }
                };
            case "text":
            case "color":
            case "number":
            case "float":
                return (function() {
                    var htmlString = "",
                        index,
                        inputBoxSize = 13,
                        extraInputAttributes = "",
                        extraHtml = "",
                        inputTypeAttribute = inputType === "float" ? "number" : inputType;

                    switch (inputType) {
                        case "text":
                            if (typeof value === 'string') {
                                value = value.toString().replace(/'/g, "&#39;");
                            }
                            inputBoxSize = 50;
                            break;
                    }
                    if (decorators.length > 1) {
                        (function() {
                            var keyValuePair;
                            for (index = 0; index < decorators.length; index++) {
                                keyValuePair = decorators[index].split("=");
                                switch (keyValuePair[0]) {
                                    case "delete":
                                        extraHtml += " &nbsp;<a href='#' id='{domId}_delete'><img src='graphic/delete.png' title='"+trans.sp.sp.settings.deleteTooltip+"' /></a>";
                                        break;
                                    case "step":
                                        assert(inputType === "float" || inputType === "number", "step only works with numeric inputs");
                                        assert(keyValuePair.length === 2, "expected input: step=value");
                                        extraInputAttributes += " step='"+keyValuePair[1]+"'";
                                        break;
                                    case "width":
                                        inputBoxSize = keyValuePair[1];
                                        break;
                                }
                            }
                        })();
                    }

                    htmlString +=
                        "<input type='" + inputTypeAttribute + "' id='{domId}' size='" + inputBoxSize +"' "
                            + (typeof value !== 'undefined' ? " value='"+value+"'" : "")
                            + extraInputAttributes +" />"
                            + extraHtml;

                    return {
                        build: function(id) {
                            return htmlString.replace(/\{domId\}/g, id);
                        },
                        bind: function(id) {
                            $("#" + id).change(function() {
                                var newValue = $("#" + id).val();
                                inputHandler.setValue(newValue, editorIndex);
                                return false;
                            });

                            $("#" + id + "_delete").click(function() {
                                inputHandler.deleteValue();
                                location.reload(false);
                            });
                        }
                    };
                })();
        }

    } else {
        return (function() {
            var typesArray = [],
                arrayIndex,
                canAddNew = false,
                inlineDiv = false;

            decorators = arrayOptions.decorators;

            //q(editors);
            //q(decorators);
            //q("----");

            if (decorators.length > 0) {
                for (arrayIndex = 0; arrayIndex < decorators.length; arrayIndex++) {
                    switch (decorators[arrayIndex]) {
                        case "addNew":
                            canAddNew = true;
                            break;
                        case "inline":
                            inlineDiv = true;
                            break;
                    }
                }
            }

            for (arrayIndex = 0; arrayIndex < value.length; arrayIndex++) {
                (function() {
                    var fixedArrayIndex = arrayIndex;
                    //q("createArraySettingType for" + fixedArrayIndex + "=" +editors);
                    typesArray.push(createArraySettingType(inputHandler, fixedArrayIndex, editors));
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

                        htmlString += "<div" + (inlineDiv ? " style='display: inline'> &nbsp;" : ">");
                        htmlString += typesArray[arrayIndex].build(domId);
                        htmlString += "</div>";
                    }

                    if (canAddNew) {
                        htmlString += "<a href='#' id='"+id+"_new'>" + trans.sp.sp.settings.addRecord + "</a>";
                    }

                    return htmlString;
                },
                bind: function(id) {
                    var domId,
                        arrayIndex;

                    if (canAddNew) {
                        $("#" + id + "_new").click(function() {
                            var domId = id + "_" + typesArray.length,
                                newType;

                            newType = createArraySettingType(inputHandler, typesArray.length, editors);
                            $(this).before("<div>" + newType.build(domId) + "</div>");
                            newType.bind(domId);
                            typesArray.push(newType);

                            $("#"+domId).focus();
                            return false;
                        });
                    }

                    if (typesArray.length === 0 && canAddNew) {
                        $("#" + id + "_new").click();
                    } else {
                        for (arrayIndex = 0; arrayIndex < typesArray.length; arrayIndex++) {
                            domId = id + "_" + arrayIndex;
                            typesArray[arrayIndex].bind(domId);
                        }
                    }
                }
            };
        })();
    }

    assert(false, editors + " is not a valid editor");
    return;
}

/**
 *	@constructor
 */
function FormInputHandler(propertyFormConfig, propSettings, editorIndex) {
    var arraySplit = propSettings.editor.split(":"),
        editors,
        arrayOptions = {isArrayType: arraySplit[0].indexOf('array') === 0},
        strategy;

	assert(typeof propSettings.getter === 'function', 'getter should be a function');
	assert(typeof propSettings.setter === 'function', 'setter should be a function');

    if (arrayOptions.isArrayType) {
        editors = arraySplit[1].split("+");
    } else {
        editors = arraySplit[0].split("+");
    }

    //q(editors);

    this.formConfig = propertyFormConfig;
    if (typeof propertyFormConfig.save === 'undefined') {
        this.setValue = propSettings.setter;
        this.deleteValue = propSettings.deleter;
    } else {
        this.setValue = function(value, editorIndex) {
            propSettings.setter(value, editorIndex);
            propertyFormConfig.save();
        };

        this.deleteValue = function() {
            propSettings.deleter();
            propertyFormConfig.save();
        };
    }

    this.getValue = propSettings.getter;
    if (true) {
        //q("createSettingType for " + editors[0] + " index " + editorIndex);
            if (arrayOptions.isArrayType) {
                arrayOptions.decorators = arraySplit[0].split("|");
                arrayOptions.decorators.splice(0, 1);
            }

            strategy = createSettingType(this, editors[0], editorIndex, arrayOptions);
            this.build = strategy.build;
            this.bind = strategy.bind;
    } else {
        (function(inputHandler) {
            var handlers = [],
                index;

            for (index = 0; index < editors.length; index++) {
                handlers.push(new FormInputHandler(propertyFormConfig, propSettings, index));
            }

            inputHandler.build = function(id) {
                var i, htmlString = "";
                for (i = 0; i < handlers.length; i++) {
                    htmlString += handlers[i].build(id + '_col' + i);
                    htmlString += " &nbsp;";
                }
                return htmlString;
            };

            inputHandler.bind = function(id) {
                var i;
                for (i = 0; i < handlers.length; i++) {
                    handlers[i].bind(id + '_col' + i);
                }
            };
        })(this);
    }
}

function buildConfigForm(contentPage, propertyFormConfig) {
    var config = propertyFormConfig.properties,
        prop,
        properties = [],
        propIndex,
        form = "",
        formRow,
        container;

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

    container = $("<div class='propertyEditFormContainer' id='"+propertyFormConfig.id+"' style='display: none' />");
    container.append(form).append("<br>");

    contentPage.append(container);

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
            if(propUI.label == sangu_trans.mainTagger.otherButtons.hitKey) {
		formRow += "<td width='75%'>ctrl + ";
	    } else {
		formRow += "<td width='75%'>";
	    }
            formRow += propUI.propUI.build(propertyFormConfig.id+"_"+propUI.ownName);
            formRow += "</td>";

            formRow += "</tr>";

            form.append(formRow);

            // bind the form to the js variable
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
}