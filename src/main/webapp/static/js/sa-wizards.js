/*
 * This file is part of [SpringAtom] Copyright [kornicameister@gmail.com][2013]
 *
 * [SpringAtom] is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * [SpringAtom] is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with [SpringAtom].  If not, see <http://www.gnu.org/licenses/gpl.html>.
 */

(function (SA, $) {

    if (!SA.wizard) {
        SA.wizard = {};
    }

    /*
     * Config:
     * rowClass =
     *      Required
     *      The css class that will identify the top level element of a row
     *      Note also the use of a 'defaultRow' class to be used with rowClass
     *          when a defaultRow is not required
     * addRowId =
     *      Required
     *      The DOM id of the link or button that will initiate the adding of a new row
     * removeRowClass =
     *      Required
     *      The css class that will identify the links or buttons that
     *      when clicked will result in the removal of the row
     * formId =
     *      Required
     *      The DOM id of the form
     * rowContainerId =
     *      Required
     *      It is a requirement that rows be wrapped in a containing element
     *      rowContainerId is the DOM id of this wrapper element
     * indexedPropertyName =
     *      Required
     *      The name of indexed property in the Java bean
     * indexedPropertyMemberNames =
     *      Required
     *      A comma separated list of member variable (property) names
     *      The indexed property wil be a List or Collection containing
     *      a bunch of objects or a praticulr type e.g. List<Person> indexedPropertyName
     *      The Person onject in this case will have member variables
     *      e.g.    private String name;
     *              private String age;
     *      indexedPropertyMemberNames : 'name, age',
     * rowAddedListener =
     *      Optional
     *      The function to be invoked when a row is added
     *      The row element is passed in as an argument.
     *      rowAddedListener : rowAdded,
     *      function rowAdded( element ) {
     *          var rowHtml = $(element).html();
     *      }
     *  rowRemovedListener =
     *      Optional
     *      The function to be invoked when a row is removed
     *      The row element is passed in as an argument.
     *      rowRemovedListener : rowRemoved,
     *      function rowRemoved( element ) {
     *          var rowHtml = $(element).html();
     *      }
     *   beforeSubmit =
     *      Optional
     *      The function to be invoked before the form is submitted
     *      beforeSubmit : validate,
     *      function validate() {
     *          //do validation
     *          return valid;
     *      }
     *      function should return true or false, false will prevent form submission
     */
    SA.wizard.DynamicListHelper = function (config) {

        init();

        var lastRow;

        function init() {
            config.rowClass = makeClass(config.rowClass);
            config.addRowId = makeId(config.addRowId);
            config.removeRowClass = makeClass(config.removeRowClass);
            config.formId = makeId(config.formId);
            config.rowContainerId = makeId(config.rowContainerId);
            addRemoveRowListener();
            addAddRowListener();
            prepRows();
            $(config.formId).submit(function () {
                prepFormForSubmit();
                if (config['beforeSubmit'] != null) {
                    return config['beforeSubmit']();
                } else {
                    return true;
                }
            });
            dealWithPotentialDefaultRow();
        }

        function dealWithPotentialDefaultRow() {
            var defaultRow = $(config.formId).find(config.rowClass + ".defaultRow:last");
            $(defaultRow).removeClass('defaultRow');
            lastRow = defaultRow.clone(true);
            $(defaultRow).remove();
        }

        function prepFormForSubmit() {
            var memberArray = config['indexedPropertyMemberNames'].split(',');
            for (var i in memberArray) {
                var className = '.DynamicListHelper_' + $.trim(memberArray[i]);
                var index = 0;
                $(className).each(function () {
                    $(this).attr('name', config['indexedPropertyName'] + "[" + index + "]." + $.trim(memberArray[i]));
                    index++;
                });
            }
        }

        function prepRows() {
            var memberArray = config['indexedPropertyMemberNames'].split(',');
            for (var i in memberArray) {
                var s = config['indexedPropertyName'] + "[";
                var e = "]." + $.trim(memberArray[i]);
                $(config.rowContainerId).find('*').each(function () {
                    if ($(this).attr('name')) {
                        var bs = ($(this).attr('name').indexOf(s) === 0);
                        var be = ($(this).attr('name').match(e + "$") != null);
                        if (bs && be) {
                            $(this).addClass('DynamicListHelper_' + $.trim(memberArray[i]));
                        }
                    }
                });
            }
        }

        function removeRow(element) {
            lastRow = $(config.formId).find(config.rowClass + ":last").clone(true);
            $(element).closest(config.rowClass).remove();
            prepFormForSubmit();
            if (config['rowRemovedListener'] != null) {
                config['rowRemovedListener'](element);
            }
        }

        function addRow() {
            var row = $(config.formId).find(config.rowClass + ":last").clone(true);
            if (!row.length)
                row = lastRow;
            if (typeof $(row).attr('id') !== 'undefined') {
                $(row).attr('id', $(row).attr('id') + '_1');
            }
            $(row).find('*').each(function () {
                if (typeof $(this).attr('id') !== 'undefined') {
                    $(this).attr('id', $(this).attr('id') + '_1');
                }
            });
            $(config.rowContainerId).append(row);
            prepFormForSubmit();
            if (config['rowAddedListener'] != null) {
                config['rowAddedListener']($(row));
            }
        }

        function addRemoveRowListener() {
            $(config.removeRowClass).click(function () {
                removeRow($(this).closest(config.rowClass));
                return false;
            });
        }

        function addAddRowListener() {
            $(config.addRowId).click(function () {
                addRow();
                return false;
            });
        }

        function makeClass(className) {
            if (className.indexOf('.') != 0)
                className = "." + className;
            return className;
        }

        function makeId(className) {
            if (className.indexOf('#') != 0)
                className = "#" + className;
            return className;
        }

    };

    // expose
    $.fn.dynamicList = function (cfg) {
        cfg['formId'] = this.attr('id');
        return new SA.wizard.DynamicListHelper(cfg);
    };

    /**
     * //TODO missing jsDoc
     * @param cfg
     */
    SA.wizard.applyActionVisibility = function (cfg) {
        var actionsContainer = cfg['container'];
        var actionsElement = cfg['selector'] || 'button';
        var availableActions = cfg['actions'];
        var firstStep = cfg['first'] || false;
        var actions = {};

        $.each(availableActions, function (it, val) {
            actions[val] = true;
        });

        var buttons = $(actionsContainer).find(actionsElement);
        $.each(buttons, function (it, val) {
            var buttonAsJQ = $(val);
            var buttonId = buttonAsJQ.attr('id');
            if (actions[buttonId]) {
                buttonAsJQ.fadeIn();
            } else {
                if (!firstStep) {
                    buttonAsJQ.fadeOut();
                } else {
                    buttonAsJQ.hide();
                }
            }
        });
    };

    SA.wizard.applyDynamicActions = function (cfg) {
        var actionsContainer = cfg['container'];
        var availableActions = cfg['actions'];
        var actions = {};

        var buttons = $(actionsContainer);
        if (buttons.find('.x-wizard-dynamic-action').length > 1) {
            buttons.find('.x-wizard-dynamic-action').remove();
        }

        $.each(availableActions, function (it, val) {
            var button = $('<button></button>');
            button = button.html(val['labelName']);
            button = button
                .attr('id', val['eventName'])
                .attr('type', 'submit')
                .attr('name', val['eventName'])
                .attr('class', 'x-wizard-action x-wizard-dynamic-action');
            buttons.prepend(
                button
            );
        });
    };

    /**
     * //TODO missing jsDoc
     * @param cfg
     */
    SA.wizard.applyStepsState = function (cfg) {
        var state = SA.wizard.genStepHeaderId(cfg['stateId']);
        var descriptor = cfg['descriptor'];
        var header = $(cfg['headerSelector']);

        var stateSpanNode = $(header.find('li').find('span#' + state));
        stateSpanNode.removeClass('disabled');
        stateSpanNode.removeClass('enabled');
        stateSpanNode.removeClass('done');
        stateSpanNode.removeClass('error');
        stateSpanNode.addClass('selected');

        $.each(descriptor['predecessors'], function (it, predecessorSpan) {
            var el = $('span#' + SA.wizard.genStepHeaderId(predecessorSpan));
            el.removeClass('selected');
            el.addClass('done');
        });
        $.each(descriptor['successors'], function (it, successorsSpan) {
            var el = $('span#' + SA.wizard.genStepHeaderId(successorsSpan));
            el.removeClass('disabled');
            el.addClass('enabled');
        });

    };

    SA.wizard.genStepHeaderId = function (val) {
        return SA.core.genId(val, 'wiz-step');
    };

    SA.wizard.applyWebFlowDecorators = function (el, formId) {
        console.log('Applying WF decorator over elements > ' + el);
        $.each(el, function (index, val) {
            Spring.addDecoration(new Spring.AjaxEventDecoration({
                elementId: val,
                event    : 'onclick',
                formId   : formId
            }));
        });
        var not = $('.x-wizard-actions').find('button').not(function (index) {
            var id = $(this).attr('id');
            var match = false;
            $.each(el, function (index, val) {
                if (id === val) {
                    match = true;
                    return false;
                }
                return true;
            });
            return match;
        });
        console.log('Applying AWF decorator over elements > ' + not);
        not.each(function (index, val) {
            console.log('Applying WF decorator over > ' + $(val).attr('id'));
            Spring.addDecoration(new Spring.AjaxEventDecoration({
                elementId: $(val).attr('id'),
                event    : 'onclick',
                formId   : formId,
                popup    : true,
                params   : {
                    fragments: 'wiz.content',
                    mode     : "embedded"
                }
            }));
        })
    };

    SA.wizard.decorateWizard = function (cfg) {
        var wizardId = cfg['wizardId'];
        var wizardHeaderId = cfg['wizardHeaderId'];
        var wizardContentId = cfg['wizardContentId'];
        var wizardActionsId = cfg['wizardActionsId'];

        var decorations = [];

        decorations.push(new Spring.ElementDecoration({
            elementId  : wizardId,
            widgetType : "dijit.layout.BorderContainer",
            widgetAttrs: {
                title        : $('#' + wizardId).attr('title'),
                gutters      : true,
                liveSplitters: true
            }
        }));
        decorations.push(new Spring.ElementDecoration({
            elementId  : wizardHeaderId,
            widgetType : "dijit.layout.ContentPane",
            widgetAttrs: {
                region: 'leading'
            }
        }));
        decorations.push(new Spring.ElementDecoration({
            elementId  : wizardContentId,
            widgetType : "dijit.layout.ContentPane",
            widgetAttrs: {
                region: 'center'
            }
        }));
        decorations.push(new Spring.ElementDecoration({
            elementId  : wizardActionsId,
            widgetType : "dijit.layout.ContentPane",
            widgetAttrs: {
                region: 'bottom'
            }
        }));

        console.log(wizardId + ' with ' + decorations.length + ' decorations');

        $.each(decorations, function (index, val) {
            Spring.addDecoration(val);
        });
    }

}(window.SA = window.SA || {}, jQuery));


