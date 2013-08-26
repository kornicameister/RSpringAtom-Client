/*
 * Extensible 1.6.0-b1
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
Ext.define("Extensible", {singleton: true, version: "1.6.0-b1", versionDetails: {major: 1, minor: 6, patch: 0}, extVersion: "4.0.1", hasBorderRadius: Ext.supports.CSS3BorderRadius, log: function (a) {
}, getScrollWidth                  : function () {
    return Ext.getScrollbarSize ? Ext.getScrollbarSize().width : Ext.getScrollBarWidth()
}, constructor                     : function () {
    Ext.onReady(function () {
        if (Extensible.getScrollWidth() < 3) {
            Ext.getBody().addCls("x-no-scrollbar")
        }
        if (Ext.isWindows) {
            Ext.getBody().addCls("x-win")
        }
        var a = Ext.getVersion();
        if (a.isLessThan("4.1")) {
            Ext.getBody().addCls("x-4-0")
        }
    })
}, Date                            : {use24HourTime: false, diff: function (e, a, c) {
    var b = 1, d = a.getTime() - e.getTime();
    if (c === "s" || c === "seconds") {
        b = 1000
    } else {
        if (c === "m" || c === "minutes") {
            b = 1000 * 60
        } else {
            if (c === "h" || c === "hours") {
                b = 1000 * 60 * 60
            }
        }
    }
    return Math.round(d / b)
}, diffDays                                        : function (e, b) {
    var c = 1000 * 60 * 60 * 24, a = Ext.Date.clearTime, d = a(b, true).getTime() - a(e, true).getTime();
    return Math.ceil(d / c)
}, copyTime                                        : function (c, b) {
    var a = Ext.Date.clone(b);
    a.setHours(c.getHours(), c.getMinutes(), c.getSeconds(), c.getMilliseconds());
    return a
}, compare                                         : function (c, b, a) {
    var e = c, d = b;
    if (a !== true) {
        e = Ext.Date.clone(c);
        e.setMilliseconds(0);
        d = Ext.Date.clone(b);
        d.setMilliseconds(0)
    }
    return d.getTime() - e.getTime()
}, maxOrMin                                        : function (a) {
    var e = a ? 0 : Number.MAX_VALUE, c = 0, b = arguments[1], d = b.length;
    for (; c < d; c++) {
        e = Math[a ? "max" : "min"](e, b[c].getTime())
    }
    return new Date(e)
}, max                                             : function () {
    return this.maxOrMin.apply(this, [true, arguments])
}, min                                             : function () {
    return this.maxOrMin.apply(this, [false, arguments])
}, isInRange                                       : function (a, c, b) {
    return(a >= c && a <= b)
}, rangesOverlap                                   : function (f, b, e, a) {
    var c = (f >= e && f <= a), d = (b >= e && b <= a), g = (f <= e && b >= a);
    return(c || d || g)
}, isWeekend                                       : function (a) {
    return a.getDay() % 6 === 0
}, isWeekday                                       : function (a) {
    return a.getDay() % 6 !== 0
}, isMidnight                                      : function (a) {
    return a.getHours() === 0 && a.getMinutes() === 0
}, isToday                                         : function (a) {
    return this.diffDays(a, this.today()) === 0
}, today                                           : function () {
    return Ext.Date.clearTime(new Date())
}, add                                             : function (c, d) {
    if (!d) {
        return c
    }
    var b = Ext.Date, a = b.add, e = b.clone(c);
    if (d.years) {
        e = a(e, b.YEAR, d.years)
    }
    if (d.months) {
        e = a(e, b.MONTH, d.months)
    }
    if (d.weeks) {
        d.days = (d.days || 0) + (d.weeks * 7)
    }
    if (d.days) {
        e = a(e, b.DAY, d.days)
    }
    if (d.hours) {
        e = a(e, b.HOUR, d.hours)
    }
    if (d.minutes) {
        e = a(e, b.MINUTE, d.minutes)
    }
    if (d.seconds) {
        e = a(e, b.SECOND, d.seconds)
    }
    if (d.millis) {
        e = a(e, b.MILLI, d.millis)
    }
    return d.clearTime ? b.clearTime(e) : e
}, clearTime                                       : function (a, b) {
    return Ext.Date.clearTime(a, b)
}}});
Ext.require(["Ext.picker.Color", "Ext.form.Basic", "Ext.data.proxy.Memory"]);
Extensible.applyOverrides = function () {
    Ext.DomHelper = Ext.core.DomHelper;
    var a = Ext.getVersion();
    if (Ext.layout.container.AbstractCard) {
        Ext.layout.container.AbstractCard.override({renderChildren: function () {
            if (!this.deferredRender) {
                this.getActiveItem();
                this.callParent()
            }
        }})
    }
    Ext.Component.override({getId: function () {
        var b = this, c;
        if (!b.id) {
            c = b.getXType();
            c = c ? c.replace(/[\.,\s]/g, "-") : "ext-comp";
            b.id = c + "-" + b.getAutoId()
        }
        return b.id
    }});
    if (Ext.picker && Ext.picker.Color) {
        Ext.picker.Color.override({constructor: function () {
            this.renderTpl = this.renderTpl || Ext.create("Ext.XTemplate", '<tpl for="colors"><a href="#" class="color-{.}" hidefocus="on"><em><span style="background:#{.}" unselectable="on">&#160;</span></em></a></tpl>');
            this.callParent(arguments)
        }})
    }
    if (a.isLessThan("4.1")) {
        if (Ext.data && Ext.data.reader && Ext.data.reader.Reader) {
            Ext.data.reader.Reader.override({extractData: function (k) {
                var j = this, l = [], f = [], e = j.model, g = 0, c = k.length, m = j.getIdProperty(), d, b, h;
                if (!k.length && Ext.isObject(k)) {
                    k = [k];
                    c = 1
                }
                for (; g < c; g++) {
                    d = k[g];
                    l = j.extractValues(d);
                    b = j.getId(l);
                    h = new e(l, b, d);
                    f.push(h);
                    if (j.implicitIncludes) {
                        j.readAssociated(h, d)
                    }
                }
                return f
            }})
        }
    }
    if (Ext.form && Ext.form.Basic) {
        Ext.form.Basic.override({reset: function () {
            var b = this;
            b.getFields().each(function (c) {
                c.reset()
            });
            return b
        }})
    }
    if (Ext.data && Ext.data.proxy && Ext.data.proxy.Memory) {
        Ext.data.proxy.Memory.override({updateOperation: function (b, d, c) {
            Ext.each(b.records, function (e) {
                e.commit()
            });
            b.setCompleted();
            b.setSuccessful();
            Ext.callback(d, c || this, [b])
        }, create                                      : function () {
            this.updateOperation.apply(this, arguments)
        }, update                                      : function () {
            this.updateOperation.apply(this, arguments)
        }, destroy                                     : function () {
            this.updateOperation.apply(this, arguments)
        }})
    }
    if (a.isLessThan("4.1") && Ext.form && Ext.form.CheckboxGroup) {
        Ext.form.CheckboxGroup.override({resetOriginalValue: function () {
            var b = this;
            b.eachBox(function (c) {
                c.resetOriginalValue()
            });
            b.originalValue = b.getValue();
            b.checkDirty()
        }})
    }
};
Ext.onReady(Extensible.applyOverrides);
Ext.define("Extensible.lang.Number", {statics: {getOrdinalSuffix: function (a) {
    if (!Ext.isNumber(a)) {
        return""
    }
    switch (a) {
        case 1:
        case 21:
        case 31:
            return"st";
        case 2:
        case 22:
            return"nd";
        case 3:
        case 23:
            return"rd";
        default:
            return"th"
    }
}}}, function () {
    Extensible.Number = Extensible.lang.Number
});
Ext.define("Extensible.data.Model", {extend: "Ext.data.Model", requires: ["Ext.util.MixedCollection"], mappingClass: null, mappingIdProperty: null, inheritableStatics: {reconfigure: function () {
    var e = this.prototype, g = Ext.ClassManager.get(e.mappingClass || ""), c = e.mappingIdProperty, f, b = [], d = 0, a = 0;
    if (!g) {
        throw"The mappingClass for " + this.$className + " is undefined or invalid"
    }
    e.idProperty = c || e.idProperty || "id";
    for (f in g) {
        if (g.hasOwnProperty(f)) {
            b.push(g[f])
        }
    }
    e.fields.clear();
    a = b.length;
    for (; d < a; d++) {
        e.fields.add(Ext.create("Ext.data.Field", b[d]))
    }
    return this
}}, clone                                  : function (b) {
    var c = Ext.create(this.$className), a = this.persistenceProperty;
    c[a] = Ext.Object.merge({}, this[a]);
    if (b !== true) {
        delete c[a][this.idProperty]
    }
    return c
}});
Ext.define("Extensible.form.recurrence.AbstractOption", {extend: "Ext.form.FieldContainer", mixins: {field: "Ext.form.field.Field"}, layout: "hbox", defaults: {margins: "0 5 0 0"}, key: undefined, dateValueFormat: "Ymd\\THis\\Z", optionDelimiter: ";", initComponent: function () {
    var a = this;
    a.addEvents("change");
    a.startDate = a.startDate || new Date();
    a.items = a.getItemConfigs();
    a.callParent(arguments);
    a.initRefs();
    a.initField()
}, formatDate                                                  : function (a) {
    return Ext.Date.format(a, this.dateValueFormat)
}, parseDate                                                   : function (d, b) {
    b = b || {};
    try {
        var a = Ext.Date.parse(d, b.format || this.dateValueFormat, b.strict);
        if (a) {
            return a
        }
    } catch (c) {
    }
    return b.defaultValue || new Date()
}, afterRender                                                 : function () {
    this.callParent(arguments);
    this.updateLabel()
}, initRefs                                                    : Ext.emptyFn, setFrequency: function (a) {
    this.frequency = a
}, setStartDate                                                : function (a) {
    this.startDate = a;
    return this
}, getStartDate                                                : function () {
    return this.startDate || Extensible.Date.today()
}, getDefaultValue                                             : function () {
    return""
}, preSetValue                                                 : function (b, a) {
    var c = this;
    if (!b) {
        b = c.getDefaultValue()
    }
    if (!a) {
        c.on("afterrender", function () {
            c.setValue(b)
        }, c, {single: true});
        return false
    }
    c.value = b;
    return true
}});
Ext.define("Extensible.form.recurrence.option.Duration", {extend: "Extensible.form.recurrence.AbstractOption", alias: "widget.extensible.recurrence-duration", requires: ["Ext.form.Label", "Ext.form.field.ComboBox", "Ext.form.field.Number", "Ext.form.field.Date"], minOccurrences: 1, maxOccurrences: 999, defaultEndDateOffset: 5, minDateOffset: 1, maxEndDate: new Date("12/31/9999"), endDateWidth: 120, cls: "extensible-recur-duration", getItemConfigs: function () {
    var b = this, a = b.getStartDate();
    return[
        {xtype: "label", text: "and continuing"},
        {xtype: "combo", itemId: b.id + "-duration-combo", mode: "local", width: 85, triggerAction: "all", forceSelection: true, value: "forever", store: ["forever", "for", "until"], listeners: {change: Ext.bind(b.onComboChange, b)}},
        {xtype: "datefield", itemId: b.id + "-duration-date", showToday: false, width: b.endDateWidth, format: b.endDateFormat || Ext.form.field.Date.prototype.format, maxValue: b.maxEndDate, allowBlank: false, hidden: true, minValue: Ext.Date.add(a, Ext.Date.DAY, b.minDateOffset), value: b.getDefaultEndDate(a), listeners: {change: Ext.bind(b.onEndDateChange, b)}},
        {xtype: "numberfield", itemId: b.id + "-duration-num", value: 5, width: 55, minValue: b.minOccurrences, maxValue: b.maxOccurrences, allowBlank: false, hidden: true, listeners: {change: Ext.bind(b.onOccurrenceCountChange, b)}},
        {xtype: "label", itemId: b.id + "-duration-num-label", text: "occurrences", hidden: true}
    ]
}, initRefs                                                     : function () {
    var a = this;
    a.untilCombo = a.down("#" + a.id + "-duration-combo");
    a.untilDateField = a.down("#" + a.id + "-duration-date");
    a.untilNumberField = a.down("#" + a.id + "-duration-num");
    a.untilNumberLabel = a.down("#" + a.id + "-duration-num-label")
}, onComboChange                                                : function (b, a) {
    this.toggleFields(a);
    this.checkChange()
}, toggleFields                                                 : function (a) {
    var b = this;
    b.untilCombo.setValue(a);
    if (a === "until") {
        if (!b.untilDateField.getValue()) {
            b.initUntilDate()
        }
        b.untilDateField.show()
    } else {
        b.untilDateField.hide();
        b.untilDateIsSet = false
    }
    if (a === "for") {
        b.untilNumberField.show();
        b.untilNumberLabel.show()
    } else {
        b.untilNumberField.hide();
        b.untilNumberLabel.hide()
    }
}, onOccurrenceCountChange                                      : function (c, b, a) {
    this.checkChange()
}, onEndDateChange                                              : function (c, b, a) {
    this.checkChange()
}, setStartDate                                                 : function (b) {
    var a = this, c = a.getValue();
    if (b.getTime() !== a.startDate.getTime()) {
        a.callParent(arguments);
        a.untilDateField.setMinValue(b);
        if (!c || a.untilDateField.getValue() < b) {
            a.initUntilDate(b)
        }
    }
    return a
}, setFrequency                                                 : function () {
    this.callParent(arguments);
    this.initUntilDate();
    return this
}, initUntilDate                                                : function (a) {
    if (!this.untilDateIsSet) {
        this.untilDateIsSet = true;
        var b = this.getDefaultEndDate(a || this.getStartDate());
        this.untilDateField.setValue(b)
    }
    return this
}, getDefaultEndDate                                            : function (a) {
    var b = {}, c;
    switch (this.frequency) {
        case"WEEKLY":
        case"WEEKDAYS":
            c = "weeks";
            break;
        case"MONTHLY":
            c = "months";
            break;
        case"YEARLY":
            c = "years";
            break;
        default:
            c = "days"
    }
    b[c] = this.defaultEndDateOffset;
    return Extensible.Date.add(a, b)
}, getValue                                                     : function () {
    var a = this;
    if (a.untilCombo) {
        if (a.untilNumberField.isVisible()) {
            return"COUNT=" + a.untilNumberField.getValue()
        } else {
            if (a.untilDateField.isVisible()) {
                return"UNTIL=" + a.formatDate(this.adjustUntilDateValue(a.untilDateField.getValue()))
            }
        }
    }
    return""
}, adjustUntilDateValue                                         : function (a) {
    return Extensible.Date.add(a, {days: 1, seconds: -1})
}, setValue                                                     : function (a) {
    var c = this;
    if (!c.preSetValue(a, c.untilCombo)) {
        return c
    }
    if (!a) {
        c.toggleFields("forever");
        return c
    }
    var b = Ext.isArray(a) ? a : a.split(c.optionDelimiter), e = false, d;
    Ext.each(b, function (f) {
        d = f.split("=");
        if (d[0] === "COUNT") {
            c.untilNumberField.setValue(d[1]);
            c.toggleFields("for");
            e = true;
            return
        } else {
            if (d[0] === "UNTIL") {
                c.untilDateField.setValue(c.parseDate(d[1]));
                c.untilDateField.validate();
                c.toggleFields("until");
                e = true;
                return
            }
        }
    }, c);
    if (!e) {
        c.toggleFields("forever")
    }
    return c
}});
Ext.define("Extensible.form.recurrence.option.Interval", {extend: "Extensible.form.recurrence.AbstractOption", alias: "widget.extensible.recurrence-interval", dateLabelFormat: "l, F j", unit: "day", minValue: 1, maxValue: 999, cls: "extensible-recur-interval", getItemConfigs: function () {
    var a = this;
    return[
        {xtype: "label", text: "Repeat every"},
        {xtype: "numberfield", itemId: a.id + "-interval", value: 1, width: 55, minValue: a.minValue, maxValue: a.maxValue, allowBlank: false, enableKeyEvents: true, listeners: {change: Ext.bind(a.onIntervalChange, a)}},
        {xtype: "label", itemId: a.id + "-date-label"}
    ]
}, initRefs                                                     : function () {
    var a = this;
    a.intervalField = a.down("#" + a.id + "-interval");
    a.dateLabel = a.down("#" + a.id + "-date-label")
}, onIntervalChange                                             : function (c, b, a) {
    this.checkChange();
    this.updateLabel()
}, getValue                                                     : function () {
    if (this.intervalField) {
        return"INTERVAL=" + this.intervalField.getValue()
    }
    return""
}, setValue                                                     : function (a) {
    var c = this;
    if (!c.preSetValue(a, c.intervalField)) {
        return c
    }
    if (!a) {
        c.intervalField.setValue(c.minValue);
        return c
    }
    var b = Ext.isArray(a) ? a : a.split(c.optionDelimiter), d;
    Ext.each(b, function (e) {
        d = e.split("=");
        if (d[0] === "INTERVAL") {
            c.intervalField.setValue(d[1]);
            c.updateLabel();
            return
        }
    }, c);
    return c
}, setStartDate                                                 : function (a) {
    this.startDate = a;
    this.updateLabel();
    return this
}, setUnit                                                      : function (a) {
    this.unit = a;
    this.updateLabel();
    return this
}, updateLabel                                                  : function (c) {
    var b = this;
    if (b.intervalField) {
        var a = b.intervalField.getValue() === 1 ? "" : "s";
        b.unit = c ? c.toLowerCase() : b.unit || "day";
        if (b.dateLabel) {
            b.dateLabel.update(b.unit + a + " beginning " + Ext.Date.format(b.getStartDate(), b.dateLabelFormat))
        }
    }
    return b
}});
Ext.define("Extensible.form.recurrence.option.Monthly", {extend: "Extensible.form.recurrence.AbstractOption", alias: "widget.extensible.recurrence-monthly", requires: ["Ext.form.field.ComboBox", "Extensible.lang.Number"], cls: "extensible-recur-monthly", nthComboWidth: 150, unit: "month", afterRender: function () {
    this.callParent(arguments);
    this.isYearly = (this.unit === "year");
    this.initNthCombo()
}, getItemConfigs                                              : function () {
    return[
        {xtype: "label", text: "on the"},
        {xtype: "combobox", itemId: this.id + "-nth-combo", queryMode: "local", width: this.nthComboWidth, triggerAction: "all", forceSelection: true, displayField: "text", valueField: "value", store: Ext.create("Ext.data.ArrayStore", {fields: ["text", "value"], idIndex: 0, data: []}), listeners: {change: Ext.bind(this.onComboChange, this)}},
        {xtype: "label", text: "of each " + this.unit}
    ]
}, initRefs                                                    : function () {
    this.nthCombo = this.down("#" + this.id + "-nth-combo")
}, onComboChange                                               : function (b, a) {
    this.checkChange()
}, setStartDate                                                : function (a) {
    if (a.getTime() !== this.startDate.getTime()) {
        this.callParent(arguments);
        this.initNthCombo()
    }
    return this
}, initNthCombo                                                : function () {
    if (!this.rendered) {
        return
    }
    var j = this, f = j.nthCombo, m = f.store, d = j.getStartDate(), o = Ext.Date.getLastDateOfMonth(d).getDate(), i = Ext.Date.format(d, "jS") + " day", e = d.getDate(), a = Math.ceil(e / 7), n = Ext.Date.format(d, "D").substring(0, 2).toUpperCase(), c = a + Extensible.Number.getOrdinalSuffix(a) + Ext.Date.format(d, " l"), k = j.isYearly ? " in " + Ext.Date.format(d, "F") : "", g = j.isYearly ? "BYMONTH=" + Ext.Date.format(d, "n") : "", b = j.isYearly ? j.optionDelimiter : "", h = [
        [i + k, j.isYearly ? g : "BYMONTHDAY=" + e],
        [c + k, g + b + "BYDAY=" + a + n]
    ], l = m.find("value", f.getValue());
    if (o - e < 7) {
        h.push(["last " + Ext.Date.format(d, "l") + k, g + b + "BYDAY=-1" + n])
    }
    if (o === e) {
        h.push(["last day" + k, g + b + "BYMONTHDAY=-1"])
    }
    m.removeAll();
    f.clearValue();
    m.loadData(h);
    if (l > h.length - 1) {
        l = h.length - 1
    }
    f.setValue(m.getAt(l > -1 ? l : 0).data.value);
    return j
}, getValue                                                    : function () {
    var a = this;
    if (a.nthCombo) {
        return a.nthCombo.getValue()
    }
    return""
}, setValue                                                    : function (c) {
    var e = this;
    if (!e.preSetValue(c, e.nthCombo)) {
        return e
    }
    if (!c) {
        var a = e.nthCombo.store.getAt(0);
        if (a) {
            e.nthCombo.setValue(a.data.value)
        }
        return e
    }
    var d = Ext.isArray(c) ? c : c.split(e.optionDelimiter), f, b = [];
    Ext.each(d, function (g) {
        f = g.split("=");
        if (f[0] === "BYMONTH") {
            b.unshift(g)
        }
        if (f[0] === "BYMONTHDAY" || f[0] === "BYDAY") {
            b.push(g)
        }
    }, e);
    if (b.length) {
        e.nthCombo.setValue(b.join(e.optionDelimiter))
    }
    return e
}});
Ext.define("Extensible.form.recurrence.option.Weekly", {extend: "Extensible.form.recurrence.AbstractOption", alias: "widget.extensible.recurrence-weekly", requires: ["Ext.form.field.Checkbox", "Ext.form.CheckboxGroup"], dayValueDelimiter: ",", cls: "extensible-recur-weekly", getItemConfigs: function () {
    var a = this.id;
    return[
        {xtype: "label", text: "on:"},
        {xtype      : "checkboxgroup", itemId: a + "-days", flex: 1, items: [
            {boxLabel: "Sun", name: "SU", id: a + "-SU"},
            {boxLabel: "Mon", name: "MO", id: a + "-MO"},
            {boxLabel: "Tue", name: "TU", id: a + "-TU"},
            {boxLabel: "Wed", name: "WE", id: a + "-WE"},
            {boxLabel: "Thu", name: "TH", id: a + "-TH"},
            {boxLabel: "Fri", name: "FR", id: a + "-FR"},
            {boxLabel: "Sat", name: "SA", id: a + "-SA"}
        ], listeners: {change: Ext.bind(this.onSelectionChange, this)}}
    ]
}, initValue                                                  : function () {
    this.callParent(arguments);
    if (!this.value) {
        this.selectByDate()
    }
}, initRefs                                                   : function () {
    this.daysCheckboxGroup = this.down("#" + this.id + "-days")
}, onSelectionChange                                          : function (c, b, a) {
    this.checkChange();
    this.updateLabel()
}, selectByDate                                               : function (b) {
    var a = Ext.Date.format(b || this.getStartDate(), "D").substring(0, 2).toUpperCase();
    this.setValue("BYDAY=" + a)
}, clearValue                                                 : function () {
    this.value = undefined;
    if (this.daysCheckboxGroup) {
        this.daysCheckboxGroup.setValue({SU: 0, MO: 0, TU: 0, WE: 0, TH: 0, FR: 0, SA: 0})
    }
}, getValue                                                   : function () {
    var a = this;
    if (a.daysCheckboxGroup) {
        var c = a.daysCheckboxGroup.getValue(), d = [], b;
        for (b in c) {
            if (c.hasOwnProperty(b)) {
                d.push(b)
            }
        }
        return d.length > 0 ? "BYDAY=" + d.join(a.dayValueDelimiter) : ""
    }
    return""
}, setValue                                                   : function (a) {
    var c = this;
    if (!c.preSetValue(a, c.daysCheckboxGroup)) {
        return c
    }
    if (!a) {
        c.daysCheckboxGroup.setValue(null);
        return c
    }
    var b = Ext.isArray(a) ? a : a.split(c.optionDelimiter), e = {}, d, f;
    Ext.each(b, function (g) {
        d = g.split("=");
        if (d[0] === "BYDAY") {
            f = d[1].split(c.dayValueDelimiter);
            Ext.each(f, function (h) {
                e[h] = true
            }, c);
            c.daysCheckboxGroup.setValue(e);
            return
        }
    }, c);
    return c
}});
Ext.define("Extensible.form.recurrence.option.Yearly", {extend: "Extensible.form.recurrence.option.Monthly", alias: "widget.extensible.recurrence-yearly", cls: "extensible-recur-yearly", nthComboWidth: 200, unit: "year"});
Ext.define("Extensible.form.recurrence.FrequencyCombo", {extend: "Ext.form.ComboBox", alias: "widget.extensible.recurrence-frequency", requires: ["Ext.data.ArrayStore"], fieldLabel: "Repeats", queryMode: "local", triggerAction: "all", forceSelection: true, displayField: "pattern", valueField: "id", cls: "extensible-recur-frequency", frequencyText: {none: "Does not repeat", daily: "Daily", weekdays: "Every weekday (Mon-Fri)", weekly: "Weekly", monthly: "Monthly", yearly: "Yearly"}, initComponent: function () {
    var a = this;
    a.addEvents("frequencychange");
    a.frequencyOptions = a.frequencyOptions || [
        ["NONE", a.frequencyText.none],
        ["DAILY", a.frequencyText.daily],
        ["WEEKDAYS", a.frequencyText.weekdays],
        ["WEEKLY", a.frequencyText.weekly],
        ["MONTHLY", a.frequencyText.monthly],
        ["YEARLY", a.frequencyText.yearly]
    ];
    a.store = a.store || Ext.create("Ext.data.ArrayStore", {fields: ["id", "pattern"], idIndex: 0, data: a.frequencyOptions});
    a.on("select", a.onSelect, a);
    a.callParent(arguments)
}, onSelect                                                    : function (b, a) {
    this.fireEvent("frequencychange", a[0].data.id)
}});
Ext.define("Extensible.form.recurrence.Fieldset", {extend: "Ext.form.FieldContainer", alias: "widget.extensible.recurrencefield", mixins: {field: "Ext.form.field.Field"}, requires: ["Ext.form.Label", "Extensible.form.recurrence.FrequencyCombo", "Extensible.form.recurrence.option.Interval", "Extensible.form.recurrence.option.Weekly", "Extensible.form.recurrence.option.Monthly", "Extensible.form.recurrence.option.Yearly", "Extensible.form.recurrence.option.Duration"], options: ["daily", "weekly", "weekdays", "monthly", "yearly"], displayStyle: "field", fieldLabel: "Repeats", fieldContainerWidth: 400, startDate: Ext.Date.clearTime(new Date()), monitorChanges: true, cls: "extensible-recur-field", frequencyWidth: null, layout: "anchor", defaults: {anchor: "100%"}, initComponent: function () {
    var a = this;
    if (!a.height || a.displayStyle === "field") {
        delete a.height;
        a.autoHeight = true
    }
    a.items = [
        {xtype: "extensible.recurrence-frequency", hideLabel: true, width: this.frequencyWidth, itemId: this.id + "-frequency", listeners: {frequencychange: {fn: this.onFrequencyChange, scope: this}}},
        {xtype: "container", itemId: this.id + "-inner-ct", cls: "extensible-recur-inner-ct", autoHeight: true, layout: "anchor", hideMode: "offsets", hidden: true, width: this.fieldContainerWidth, defaults: {hidden: true}, items: [
            {xtype: "extensible.recurrence-interval", itemId: this.id + "-interval"},
            {xtype: "extensible.recurrence-weekly", itemId: this.id + "-weekly"},
            {xtype: "extensible.recurrence-monthly", itemId: this.id + "-monthly"},
            {xtype: "extensible.recurrence-yearly", itemId: this.id + "-yearly"},
            {xtype: "extensible.recurrence-duration", itemId: this.id + "-duration"}
        ]}
    ];
    a.callParent(arguments);
    a.initField()
}, afterRender                                           : function () {
    this.callParent(arguments);
    this.initRefs()
}, initRefs                                              : function () {
    var a = this, b = a.id;
    a.innerContainer = a.down("#" + b + "-inner-ct");
    a.frequencyCombo = a.down("#" + b + "-frequency");
    a.intervalField = a.down("#" + b + "-interval");
    a.weeklyField = a.down("#" + b + "-weekly");
    a.monthlyField = a.down("#" + b + "-monthly");
    a.yearlyField = a.down("#" + b + "-yearly");
    a.durationField = a.down("#" + b + "-duration");
    a.initChangeEvents()
}, initChangeEvents                                      : function () {
    var a = this;
    a.intervalField.on("change", a.onChange, a);
    a.weeklyField.on("change", a.onChange, a);
    a.monthlyField.on("change", a.onChange, a);
    a.yearlyField.on("change", a.onChange, a);
    a.durationField.on("change", a.onChange, a)
}, onChange                                              : function () {
    this.fireEvent("change", this, this.getValue())
}, onFrequencyChange                                     : function (a) {
    this.setFrequency(a);
    this.onChange()
}, initValue                                             : function () {
    var a = this;
    a.originalValue = a.lastValue = a.value;
    a.suspendCheckChange++;
    a.setStartDate(a.startDate);
    if (a.value !== undefined) {
        a.setValue(a.value)
    } else {
        if (a.frequency !== undefined) {
            a.setValue("FREQ=" + a.frequency)
        } else {
            a.setValue("")
        }
    }
    a.suspendCheckChange--;
    Ext.defer(a.doLayout, 1, a);
    a.onChange()
}, setStartDate                                          : function (b) {
    var a = this;
    a.startDate = b;
    if (a.innerContainer) {
        a.innerContainer.items.each(function (c) {
            if (c.setStartDate) {
                c.setStartDate(b)
            }
        })
    } else {
        a.on("afterrender", function () {
            a.setStartDate(b)
        }, a, {single: true})
    }
    return a
}, getStartDate                                          : function () {
    return this.startDate
}, isRecurring                                           : function () {
    return this.getValue() !== ""
}, getValue                                              : function () {
    if (!this.innerContainer) {
        return this.value
    }
    if (this.frequency === "NONE") {
        return""
    }
    var a, b;
    if (this.frequency === "WEEKDAYS") {
        a = ["FREQ=WEEKLY", "BYDAY=MO,TU,WE,TH,FR"]
    } else {
        a = ["FREQ=" + this.frequency]
    }
    this.innerContainer.items.each(function (c) {
        if (c.isVisible() && c.getValue) {
            b = c.getValue();
            if (this.includeItemValue(b)) {
                a.push(b)
            }
        }
    }, this);
    return a.length > 1 ? a.join(";") : a[0]
}, includeItemValue                                      : function (b) {
    if (b) {
        if (b === "INTERVAL=1") {
            return false
        }
        var a = Ext.Date.format(this.startDate, "D").substring(0, 2).toUpperCase();
        if (b === ("BYDAY=" + a)) {
            return false
        }
        return true
    }
    return false
}, getDescription                                        : function () {
    var a = this.getValue(), b = "";
    return"Friendly text : " + b
}, setValue                                              : function (b) {
    var a = this;
    a.value = (!b || b === "NONE" ? "" : b);
    if (!a.frequencyCombo || !a.innerContainer) {
        a.on("afterrender", function () {
            a.setValue(b)
        }, a, {single: true});
        return
    }
    var c = a.value.split(";");
    if (a.value === "") {
        a.setFrequency("NONE")
    } else {
        Ext.each(c, function (d) {
            if (d.indexOf("FREQ") > -1) {
                var e = d.split("=")[1];
                a.setFrequency(e);
                a.checkChange();
                return
            }
        }, a)
    }
    a.innerContainer.items.each(function (d) {
        if (d.setValue) {
            d.setValue(a.value)
        }
    });
    a.checkChange();
    return a
}, setFrequency                                          : function (b) {
    var a = this;
    a.frequency = b;
    if (a.frequencyCombo) {
        a.frequencyCombo.setValue(b);
        a.showOptions(b);
        this.innerContainer.items.each(function (c) {
            c.setFrequency(b)
        })
    } else {
        a.on("afterrender", function () {
            a.frequencyCombo.setValue(b);
            a.showOptions(b)
        }, a, {single: true})
    }
    return a
}, showOptions                                           : function (c) {
    var b = this, a = "day";
    if (c === "NONE") {
        b.innerContainer.hide()
    } else {
        b.intervalField.show();
        b.durationField.show();
        b.innerContainer.show()
    }
    switch (c) {
        case"DAILY":
        case"WEEKDAYS":
            b.weeklyField.hide();
            b.monthlyField.hide();
            b.yearlyField.hide();
            if (c === "WEEKDAYS") {
                a = "week"
            }
            break;
        case"WEEKLY":
            b.weeklyField.show();
            b.monthlyField.hide();
            b.yearlyField.hide();
            a = "week";
            break;
        case"MONTHLY":
            b.monthlyField.show();
            b.weeklyField.hide();
            b.yearlyField.hide();
            a = "month";
            break;
        case"YEARLY":
            b.yearlyField.show();
            b.weeklyField.hide();
            b.monthlyField.hide();
            a = "year";
            break
    }
    b.intervalField.updateLabel(a)
}});
Ext.define("Extensible.form.recurrence.RangeEditPanel", {extend: "Ext.form.Panel", alias: "widget.extensible.recurrence-rangeeditpanel", cls: "extensible-recur-edit-options", headerText: "There are multiple events in this series. How would you like your changes applied?", optionSingleButtonText: "Single", optionSingleDescription: "Apply to this event only. No other events in the series will be affected.", optionFutureButtonText: "Future", optionFutureDescription: "Apply to this and all following events only. Past events will be unaffected.", optionAllButtonText: "All Events", optionAllDescription: "Apply to every event in this series.", editModes: {SINGLE: "single", FUTURE: "future", ALL: "all"}, border: false, layout: {type: "vbox", align: "stretch"}, initComponent: function () {
    var a = this;
    a.editMode = a.editMode || a.editModes.ALL;
    a.items = [a.getHeaderConfig(), a.getOptionPanelConfig(), a.getSummaryConfig()];
    a.callParent(arguments)
}, getHeaderConfig                                             : function () {
    return{xtype: "component", html: this.headerText, height: 55, padding: 15}
}, getSummaryConfig                                            : function () {
    return{xtype: "component", itemId: this.id + "-summary", html: this.optionAllDescription, flex: 1, padding: 15}
}, getOptionPanelConfig                                        : function () {
    return{xtype: "panel", border: false, layout: {type: "hbox", pack: "center"}, items: this.getOptionButtonConfigs()}
}, getOptionButtonConfigs                                      : function () {
    var c = this, a = {xtype: "button", iconAlign: "top", enableToggle: true, scale: "large", width: 80, toggleGroup: "recur-toggle", toggleHandler: c.onToggle, scope: c}, b = [Ext.apply({itemId: c.id + "-single", text: c.optionSingleButtonText, iconCls: "recur-edit-single", pressed: c.editMode === c.editModes.SINGLE}, a), Ext.apply({itemId: c.id + "-future", text: c.optionFutureButtonText, iconCls: "recur-edit-future", pressed: c.editMode === c.editModes.FUTURE}, a), Ext.apply({itemId: c.id + "-all", text: c.optionAllButtonText, iconCls: "recur-edit-all", pressed: c.editMode === c.editModes.ALL}, a)];
    return b
}, getEditMode                                                 : function () {
    return this.editMode
}, showEditModes                                               : function (e) {
    e = e || [];
    var d = this, c = 0, b, a = e.length;
    d.down("#" + d.id + "-single")[a ? "hide" : "show"]();
    d.down("#" + d.id + "-future")[a ? "hide" : "show"]();
    d.down("#" + d.id + "-all")[a ? "hide" : "show"]();
    for (; c < a; c++) {
        b = d.down("#" + d.id + "-" + e[c]);
        if (b) {
            b.show()
        }
    }
}, onToggle                                                    : function (a) {
    var c = this, b = c.getComponent(c.id + "-summary").getEl();
    if (a.itemId === c.id + "-single") {
        b.update(c.optionSingleDescription);
        c.editMode = c.editModes.SINGLE
    } else {
        if (a.itemId === c.id + "-future") {
            b.update(c.optionFutureDescription);
            c.editMode = c.editModes.FUTURE
        } else {
            b.update(c.optionAllDescription);
            c.editMode = c.editModes.ALL
        }
    }
}});
Ext.define("Extensible.form.recurrence.RangeEditWindow", {extend: "Ext.window.Window", alias: "widget.extensible.recurrence-rangeeditwindow", singleton: true, requires: ["Extensible.form.recurrence.RangeEditPanel"], title: "Recurring Event Options", width: 350, height: 240, saveButtonText: "Save", cancelButtonText: "Cancel", closeAction: "hide", modal: true, resizable: false, constrain: true, buttonAlign: "right", layout: "fit", formPanelConfig: {border: false}, initComponent: function () {
    this.items = [
        {xtype: "extensible.recurrence-rangeeditpanel", itemId: this.id + "-recur-panel"}
    ];
    this.fbar = this.getFooterBarConfig();
    this.callParent(arguments)
}, getRangeEditPanel                                            : function () {
    return this.down("#" + this.id + "-recur-panel")
}, prompt                                                       : function (a) {
    this.callbackFunction = Ext.bind(a.callback, a.scope || this);
    this.getRangeEditPanel().showEditModes(a.editModes);
    this.show()
}, getFooterBarConfig                                           : function () {
    var a = ["->", {text: this.saveButtonText, itemId: this.id + "-save-btn", disabled: false, handler: this.onSaveAction, scope: this}, {text: this.cancelButtonText, itemId: this.id + "-cancel-btn", disabled: false, handler: this.onCancelAction, scope: this}];
    return a
}, onSaveAction                                                 : function () {
    var a = this.getComponent(this.id + "-recur-panel").getEditMode();
    this.callbackFunction(a);
    this.close()
}, onCancelAction                                               : function () {
    this.callbackFunction(false);
    this.close()
}});
Ext.ns("Extensible.calendar.data");
Extensible.calendar.data.EventMappings = {EventId: {name: "EventId", mapping: "id", type: "string"}, CalendarId: {name: "CalendarId", mapping: "cid", type: "string"}, Title: {name: "Title", mapping: "title", type: "string"}, StartDate: {name: "StartDate", mapping: "start", type: "date", dateFormat: "c"}, EndDate: {name: "EndDate", mapping: "end", type: "date", dateFormat: "c"}, Location: {name: "Location", mapping: "loc", type: "string"}, Notes: {name: "Notes", mapping: "notes", type: "string"}, Url: {name: "Url", mapping: "url", type: "string"}, IsAllDay: {name: "IsAllDay", mapping: "ad", type: "boolean"}, Reminder: {name: "Reminder", mapping: "rem", type: "string"}, RRule: {name: "RRule", mapping: "rrule", type: "string"}, Duration: {name: "Duration", mapping: "duration", defaultValue: -1, type: "int"}, OriginalEventId: {name: "OriginalEventId", mapping: "origid", type: "string"}, RInstanceStartDate: {name: "RInstanceStartDate", mapping: "ristart", type: "date", dateFormat: "c"}, REditMode: {name: "REditMode", mapping: "redit", type: "string"}};
Ext.ns("Extensible.calendar.data");
Extensible.calendar.data.CalendarMappings = {CalendarId: {name: "CalendarId", mapping: "id", type: "string"}, Title: {name: "Title", mapping: "title", type: "string"}, Description: {name: "Description", mapping: "desc", type: "string"}, ColorId: {name: "ColorId", mapping: "color", type: "int"}, IsHidden: {name: "IsHidden", mapping: "hidden", type: "boolean"}};
Ext.define("Extensible.calendar.template.BoxLayout", {extend: "Ext.XTemplate", requires: ["Ext.Date"], firstWeekDateFormat: "D j", otherWeeksDateFormat: "j", singleDayDateFormat: "l, F j, Y", multiDayFirstDayFormat: "M j, Y", multiDayMonthStartFormat: "M j", constructor: function (a) {
    Ext.apply(this, a);
    var b = this.showWeekLinks ? '<div id="{weekLinkId}" class="ext-cal-week-link">{weekNum}</div>' : "";
    Extensible.calendar.template.BoxLayout.superclass.constructor.call(this, '<tpl for="weeks">', '<div id="{[this.id]}-wk-{[xindex-1]}" class="ext-cal-wk-ct" style="top:{[this.getRowTop(xindex, xcount)]}%; height:{[this.getRowHeight(xcount)]}%;">', b, '<table class="ext-cal-bg-tbl" cellpadding="0" cellspacing="0">', "<tbody>", "<tr>", '<tpl for=".">', '<td id="{[this.id]}-day-{date:date("Ymd")}" class="{cellCls}">&#160;</td>', "</tpl>", "</tr>", "</tbody>", "</table>", '<table class="ext-cal-evt-tbl" cellpadding="0" cellspacing="0">', "<tbody>", "<tr>", '<tpl for=".">', '<td id="{[this.id]}-ev-day-{date:date("Ymd")}" class="{titleCls}"><div>{title}</div></td>', "</tpl>", "</tr>", "</tbody>", "</table>", "</div>", "</tpl>", {getRowTop: function (c, d) {
        return((c - 1) * (100 / d))
    }, getRowHeight                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     : function (c) {
        return 100 / c
    }})
}, applyTemplate                                            : function (m) {
    Ext.apply(this, m);
    var j = 0, t = "", f = true, u = false, h = false, s = false, a = false, l = false, e = m.weekendCls, n = m.prevMonthCls, r = m.nextMonthCls, b = m.todayCls, g = [
        []
    ], q = Extensible.Date.today(), k = Ext.Date.clone(this.viewStart), c = this.startDate.getMonth();
    for (; j < this.weekCount || this.weekCount == -1; j++) {
        if (k > this.viewEnd) {
            break
        }
        g[j] = [];
        for (var p = 0; p < this.dayCount; p++) {
            u = k.getTime() === q.getTime();
            h = f || (k.getDate() == 1);
            s = (k.getMonth() < c) && this.weekCount == -1;
            a = (k.getMonth() > c) && this.weekCount == -1;
            l = k.getDay() % 6 === 0;
            if (k.getDay() == 1) {
                g[j].weekNum = this.showWeekNumbers ? Ext.Date.format(k, "W") : "&#160;";
                g[j].weekLinkId = "ext-cal-week-" + Ext.Date.format(k, "Ymd")
            }
            if (h) {
                if (u) {
                    t = this.getTodayText()
                } else {
                    t = Ext.Date.format(k, this.dayCount == 1 ? this.singleDayDateFormat : (f ? this.multiDayFirstDayFormat : this.multiDayMonthStartFormat))
                }
            } else {
                var i = (j == 0 && this.showHeader !== true) ? this.firstWeekDateFormat : this.otherWeeksDateFormat;
                t = u ? this.getTodayText() : Ext.Date.format(k, i)
            }
            g[j].push({title: t, date: Ext.Date.clone(k), titleCls: "ext-cal-dtitle " + (u ? " ext-cal-dtitle-today" : "") + (j == 0 ? " ext-cal-dtitle-first" : "") + (s ? " ext-cal-dtitle-prev" : "") + (a ? " ext-cal-dtitle-next" : ""), cellCls: "ext-cal-day " + (u ? " " + b : "") + (p == 0 ? " ext-cal-day-first" : "") + (s ? " " + n : "") + (a ? " " + r : "") + (l && e ? " " + e : "")});
            k = Extensible.Date.add(k, {days: 1});
            f = false
        }
    }
    if (Ext.getVersion().isLessThan("4.1")) {
        return Extensible.calendar.template.BoxLayout.superclass.applyTemplate.call(this, {weeks: g})
    } else {
        return this.applyOut({weeks: g}, []).join("")
    }
}, getTodayText                                             : function () {
    var b = Extensible.Date.use24HourTime ? "G:i " : "g:ia ", c = this.showTodayText !== false ? this.todayText : "", a = this.showTime !== false ? ' <span id="' + this.id + '-clock" class="ext-cal-dtitle-time" aria-live="off">' + Ext.Date.format(new Date(), b) + "</span>" : "", d = c.length > 0 || a.length > 0 ? " &#8212; " : "";
    if (this.dayCount == 1) {
        return Ext.Date.format(new Date(), this.singleDayDateFormat) + d + c + a
    }
    fmt = this.weekCount == 1 ? this.firstWeekDateFormat : this.otherWeeksDateFormat;
    return c.length > 0 ? c + a : Ext.Date.format(new Date(), fmt) + a
}}, function () {
    this.createAlias("apply", "applyTemplate")
});
Ext.define("Extensible.calendar.template.DayHeader", {extend: "Ext.XTemplate", requires: ["Extensible.calendar.template.BoxLayout"], constructor: function (a) {
    Ext.apply(this, a);
    this.allDayTpl = Ext.create("Extensible.calendar.template.BoxLayout", a);
    this.allDayTpl.compile();
    Extensible.calendar.template.DayHeader.superclass.constructor.call(this, '<div class="ext-cal-hd-ct">', '<table class="ext-cal-hd-days-tbl" cellspacing="0" cellpadding="0">', "<tbody>", "<tr>", '<td class="ext-cal-gutter"></td>', '<td class="ext-cal-hd-days-td"><div class="ext-cal-hd-ad-inner">{allDayTpl}</div></td>', '<td class="ext-cal-gutter-rt"></td>', "</tr>", "</tbody>", "</table>", "</div>")
}, applyTemplate                                            : function (b) {
    var a = {allDayTpl: this.allDayTpl.apply(b)};
    if (Ext.getVersion().isLessThan("4.1")) {
        return Extensible.calendar.template.DayHeader.superclass.applyTemplate.call(this, a)
    } else {
        return this.applyOut(a, []).join("")
    }
}}, function () {
    this.createAlias("apply", "applyTemplate")
});
Ext.define("Extensible.calendar.template.DayBody", {extend: "Ext.XTemplate", constructor: function (a) {
    Ext.apply(this, a);
    Extensible.calendar.template.DayBody.superclass.constructor.call(this, '<table class="ext-cal-bg-tbl" cellspacing="0" cellpadding="0" style="height:{dayHeight}px;">', "<tbody>", '<tr height="1">', '<td class="ext-cal-gutter"></td>', '<td colspan="{dayCount}">', '<div class="ext-cal-bg-rows">', '<div class="ext-cal-bg-rows-inner">', '<tpl for="times">', '<div class="ext-cal-bg-row ext-row-{[xindex]}" style="height:{parent.hourHeight}px;">', '<div class="ext-cal-bg-row-div {parent.hourSeparatorCls}" style="height:{parent.hourSeparatorHeight}px;"></div>', "</div>", "</tpl>", "</div>", "</div>", "</td>", "</tr>", "<tr>", '<td class="ext-cal-day-times">', '<tpl for="times">', '<div class="ext-cal-bg-row" style="height:{parent.hourHeight}px;">', '<div class="ext-cal-day-time-inner"  style="height:{parent.hourHeight-1}px;">{.}</div>', "</div>", "</tpl>", "</td>", '<tpl for="days">', '<td class="ext-cal-day-col">', '<div class="ext-cal-day-col-inner">', '<div id="{[this.id]}-day-col-{.:date("Ymd")}" class="ext-cal-day-col-gutter" style="height:{parent.dayHeight}px;"></div>', "</div>", "</td>", "</tpl>", "</tr>", "</tbody>", "</table>")
}, applyTemplate                                          : function (d) {
    this.today = Extensible.Date.today();
    this.dayCount = this.dayCount || 1;
    var j = 0, l = [], e = Ext.Date.clone(d.viewStart);
    for (; j < this.dayCount; j++) {
        l[j] = Extensible.Date.add(e, {days: j})
    }
    var a = [], b = this.viewStartHour, h = this.viewEndHour, c = this.hourIncrement, k = this.hourHeight * (h - b), f = Extensible.Date.use24HourTime ? "G:i" : "ga", g;
    e = Extensible.Date.add(new Date("5/26/1972"), {hours: b});
    for (j = b; j < h; j++) {
        a.push(Ext.Date.format(e, f));
        e = Extensible.Date.add(e, {minutes: c})
    }
    g = {days: l, dayCount: l.length, times: a, hourHeight: this.hourHeight, hourSeparatorCls: this.showHourSeparator ? "" : "no-sep", dayHeight: k, hourSeparatorHeight: (this.hourHeight / 2)};
    if (Ext.getVersion().isLessThan("4.1")) {
        return Extensible.calendar.template.DayBody.superclass.applyTemplate.call(this, g)
    } else {
        return this.applyOut(g, []).join("")
    }
}}, function () {
    this.createAlias("apply", "applyTemplate")
});
Ext.define("Extensible.calendar.template.Month", {extend: "Ext.XTemplate", requires: ["Extensible.calendar.template.BoxLayout"], dayHeaderFormat: "D", dayHeaderTitleFormat: "l, F j, Y", constructor: function (a) {
    Ext.apply(this, a);
    this.weekTpl = Ext.create("Extensible.calendar.template.BoxLayout", a);
    this.weekTpl.compile();
    var b = this.showWeekLinks ? '<div class="ext-cal-week-link-hd">&#160;</div>' : "";
    Extensible.calendar.template.Month.superclass.constructor.call(this, '<div class="ext-cal-inner-ct {extraClasses}">', '<div class="ext-cal-hd-ct ext-cal-month-hd">', b, '<table class="ext-cal-hd-days-tbl" cellpadding="0" cellspacing="0">', "<tbody>", "<tr>", '<tpl for="days">', '<th class="ext-cal-hd-day{[xindex==1 ? " ext-cal-day-first" : ""]}" title="{title}">{name}</th>', "</tpl>", "</tr>", "</tbody>", "</table>", "</div>", '<div class="ext-cal-body-ct">{weeks}</div>', "</div>")
}, applyTemplate                                        : function (c) {
    var k = [], b = this.weekTpl.apply(c), e = c.viewStart, a = Extensible.Date, f;
    for (var h = 0; h < 7; h++) {
        var j = a.add(e, {days: h});
        k.push({name: Ext.Date.format(j, this.dayHeaderFormat), title: Ext.Date.format(j, this.dayHeaderTitleFormat)})
    }
    var g = this.showHeader === true ? "" : "ext-cal-noheader";
    if (this.showWeekLinks) {
        g += " ext-cal-week-links"
    }
    f = {days: k, weeks: b, extraClasses: g};
    if (Ext.getVersion().isLessThan("4.1")) {
        return Extensible.calendar.template.Month.superclass.applyTemplate.call(this, f)
    } else {
        return this.applyOut(f, []).join("")
    }
}}, function () {
    this.createAlias("apply", "applyTemplate")
});
Ext.define("Ext.dd.ScrollManager", {singleton: true, requires: ["Ext.dd.DragDropManager"], constructor: function () {
    var a = Ext.dd.DragDropManager;
    a.fireEvents = Ext.Function.createSequence(a.fireEvents, this.onFire, this);
    a.stopDrag = Ext.Function.createSequence(a.stopDrag, this.onStop, this);
    this.doScroll = Ext.Function.bind(this.doScroll, this);
    this.ddmInstance = a;
    this.els = {};
    this.dragEl = null;
    this.proc = {}
}, onStop                                    : function (a) {
    this.dragEl = null;
    this.clearProc()
}, triggerRefresh                            : function () {
    if (this.ddmInstance.dragCurrent) {
        this.ddmInstance.refreshCache(this.ddmInstance.dragCurrent.groups)
    }
}, doScroll                                  : function () {
    if (this.ddmInstance.dragCurrent) {
        var a = this.proc, b = a.el, c = a.el.ddScrollConfig, d = c ? c.increment : this.increment;
        if (!this.animate) {
            if (b.scroll(a.dir, d)) {
                this.triggerRefresh()
            }
        } else {
            b.scroll(a.dir, d, true, this.animDuration, this.triggerRefresh)
        }
    }
}, clearProc                                 : function () {
    var a = this.proc;
    if (a.id) {
        clearInterval(a.id)
    }
    a.id = 0;
    a.el = null;
    a.dir = ""
}, startProc                                 : function (b, a) {
    this.clearProc();
    this.proc.el = b;
    this.proc.dir = a;
    var d = b.ddScrollConfig ? b.ddScrollConfig.ddGroup : undefined, c = (b.ddScrollConfig && b.ddScrollConfig.frequency) ? b.ddScrollConfig.frequency : this.frequency;
    if (d === undefined || this.ddmInstance.dragCurrent.ddGroup == d) {
        this.proc.id = setInterval(this.doScroll, c)
    }
}, onFire                                    : function (g, j) {
    if (j || !this.ddmInstance.dragCurrent) {
        return
    }
    if (!this.dragEl || this.dragEl != this.ddmInstance.dragCurrent) {
        this.dragEl = this.ddmInstance.dragCurrent;
        this.refreshCache()
    }
    var k = g.getXY(), l = g.getPoint(), h = this.proc, f = this.els;
    for (var b in f) {
        var d = f[b], a = d._region;
        var i = d.ddScrollConfig ? d.ddScrollConfig : this;
        if (a && a.contains(l) && d.isScrollable()) {
            if (a.bottom - l.y <= i.vthresh) {
                if (h.el != d) {
                    this.startProc(d, "down")
                }
                return
            } else {
                if (a.right - l.x <= i.hthresh) {
                    if (h.el != d) {
                        this.startProc(d, "left")
                    }
                    return
                } else {
                    if (l.y - a.top <= i.vthresh) {
                        if (h.el != d) {
                            this.startProc(d, "up")
                        }
                        return
                    } else {
                        if (l.x - a.left <= i.hthresh) {
                            if (h.el != d) {
                                this.startProc(d, "right")
                            }
                            return
                        }
                    }
                }
            }
        }
    }
    this.clearProc()
}, register                                  : function (c) {
    if (Ext.isArray(c)) {
        for (var b = 0, a = c.length; b < a; b++) {
            this.register(c[b])
        }
    } else {
        c = Ext.get(c);
        this.els[c.id] = c
    }
}, unregister                                : function (c) {
    if (Ext.isArray(c)) {
        for (var b = 0, a = c.length; b < a; b++) {
            this.unregister(c[b])
        }
    } else {
        c = Ext.get(c);
        delete this.els[c.id]
    }
}, vthresh                                   : 25, hthresh: 25, increment: 100, frequency: 500, animate: true, animDuration: 0.4, ddGroup: undefined, refreshCache: function () {
    var a = this.els, b;
    for (b in a) {
        if (typeof a[b] == "object") {
            a[b]._region = a[b].getRegion()
        }
    }
}});
Ext.define("Extensible.calendar.dd.StatusProxy", {extend: "Ext.dd.StatusProxy", moveEventCls: "ext-cal-dd-move", addEventCls: "ext-cal-dd-add", renderTpl: ['<div class="' + Ext.baseCSSPrefix + 'dd-drop-icon"></div>', '<div class="ext-dd-ghost-ct">', '<div id="{id}-ghost" class="' + Ext.baseCSSPrefix + 'dd-drag-ghost"></div>', '<div id="{id}-message" class="ext-dd-msg"></div>', "</div>"], childEls: ["ghost", "message"], constructor: function (a) {
    if (Ext.getVersion().isLessThan("4.1")) {
        this.preComponentConstructor(a)
    } else {
        this.callParent(arguments)
    }
}, preComponentConstructor                              : function (a) {
    var b = this;
    Ext.apply(b, a);
    b.id = b.id || Ext.id();
    b.proxy = Ext.createWidget("component", {floating: true, id: b.id || Ext.id(), html: b.renderTpl.join(""), cls: Ext.baseCSSPrefix + "dd-drag-proxy " + b.dropNotAllowed, shadow: !a || a.shadow !== false, renderTo: document.body});
    b.el = b.proxy.el;
    b.el.show();
    b.el.setVisibilityMode(Ext.core.Element.VISIBILITY);
    b.el.hide();
    b.ghost = Ext.get(b.el.dom.childNodes[1].childNodes[0]);
    b.message = Ext.get(b.el.dom.childNodes[1].childNodes[1]);
    b.dropStatus = b.dropNotAllowed
}, update                                               : function (a) {
    this.callParent(arguments);
    var b = this.ghost.dom.firstChild;
    if (b) {
        Ext.fly(b).setHeight("auto")
    }
}, updateMsg                                            : function (a) {
    this.message.update(a)
}});
Ext.define("Extensible.calendar.dd.DragZone", {extend: "Ext.dd.DragZone", requires: ["Extensible.calendar.dd.StatusProxy", "Extensible.calendar.data.EventMappings"], ddGroup: "CalendarDD", eventSelector: ".ext-cal-evt", eventSelectorDepth: 10, constructor: function (b, a) {
    if (!Extensible.calendar._statusProxyInstance) {
        Extensible.calendar._statusProxyInstance = Ext.create("Extensible.calendar.dd.StatusProxy")
    }
    this.proxy = Extensible.calendar._statusProxyInstance;
    this.callParent(arguments)
}, getDragData                                       : function (b) {
    var a = b.getTarget(this.eventSelector, this.eventSelectorDepth);
    if (a) {
        var c = this.view.getEventRecordFromEl(a);
        if (!c) {
            return
        }
        return{type: "eventdrag", ddel: a, eventStart: c.data[Extensible.calendar.data.EventMappings.StartDate.name], eventEnd: c.data[Extensible.calendar.data.EventMappings.EndDate.name], proxy: this.proxy}
    }
    a = this.view.getDayAt(b.getX(), b.getY());
    if (a.el) {
        return{type: "caldrag", start: a.date, proxy: this.proxy}
    }
    return null
}, onInitDrag                                        : function (a, d) {
    if (this.dragData.ddel) {
        var b = this.dragData.ddel.cloneNode(true), c = Ext.fly(b).down("dl");
        Ext.fly(b).setWidth("auto");
        if (c) {
            c.setHeight("auto")
        }
        this.proxy.update(b);
        this.onStartDrag(a, d)
    } else {
        if (this.dragData.start) {
            this.onStartDrag(a, d)
        }
    }
    this.view.onInitDrag();
    return true
}, afterRepair                                       : function () {
    if (Ext.enableFx && this.dragData.ddel) {
        Ext.fly(this.dragData.ddel).highlight(this.hlColor || "c3daf9")
    }
    this.dragging = false
}, getRepairXY                                       : function (a) {
    if (this.dragData.ddel) {
        return Ext.fly(this.dragData.ddel).getXY()
    }
}, afterInvalidDrop                                  : function (a, b) {
    Ext.select(".ext-dd-shim").hide()
}, destroy                                           : function () {
    this.callParent(arguments);
    delete Extensible.calendar._statusProxyInstance
}});
Ext.define("Extensible.calendar.dd.DropZone", {extend: "Ext.dd.DropZone", requires: ["Ext.Layer", "Extensible.calendar.data.EventMappings"], ddGroup: "CalendarDD", eventSelector: ".ext-cal-evt", dateRangeFormat: "{0}-{1}", dateFormat: "n/j", shims: [], getTargetFromEvent: function (b) {
    var a = this.dragOffset || 0, f = b.getPageY() - a, c = this.view.getDayAt(b.getPageX(), f);
    return c.el ? c : null
}, onNodeOver                                        : function (c, j, h, f) {
    var a = Extensible.Date, i = (h.ctrlKey || h.altKey) ? this.copyText : this.moveText, b = f.type == "eventdrag" ? c.date : a.min(f.start, c.date), d = f.type == "eventdrag" ? a.add(c.date, {days: a.diffDays(f.eventStart, f.eventEnd)}) : a.max(f.start, c.date);
    if (!this.dragStartDate || !this.dragEndDate || (a.diffDays(b, this.dragStartDate) != 0) || (a.diffDays(d, this.dragEndDate) != 0)) {
        this.dragStartDate = b;
        this.dragEndDate = a.add(d, {days: 1, millis: -1, clearTime: true});
        this.shim(b, d);
        var g = Ext.Date.format(b, this.dateFormat);
        if (a.diffDays(b, d) > 0) {
            d = Ext.Date.format(d, this.dateFormat);
            g = Ext.String.format(this.dateRangeFormat, g, d)
        }
        this.currentRange = g
    }
    f.proxy.updateMsg(Ext.String.format(f.type === "eventdrag" ? i : this.createText, this.currentRange));
    return this.dropAllowed
}, shim                                              : function (b, f) {
    this.currWeek = -1;
    var c = Ext.Date.clone(b), g = 0, e, h, a = Extensible.Date, d = a.diffDays(c, f) + 1;
    Ext.each(this.shims, function (i) {
        if (i) {
            i.isActive = false
        }
    });
    while (g++ < d) {
        var j = this.view.getDayEl(c);
        if (j) {
            var k = this.view.getWeekIndex(c), e = this.shims[k];
            if (!e) {
                e = this.createShim();
                this.shims[k] = e
            }
            if (k != this.currWeek) {
                e.boxInfo = j.getBox();
                this.currWeek = k
            } else {
                h = j.getBox();
                e.boxInfo.right = h.right;
                e.boxInfo.width = h.right - e.boxInfo.x
            }
            e.isActive = true
        }
        c = a.add(c, {days: 1})
    }
    Ext.each(this.shims, function (i) {
        if (i) {
            if (i.isActive) {
                i.show();
                i.setBox(i.boxInfo)
            } else {
                if (i.isVisible()) {
                    i.hide()
                }
            }
        }
    })
}, createShim                                        : function () {
    var a = this.view.ownerCalendarPanel ? this.view.ownerCalendarPanel : this.view;
    if (!this.shimCt) {
        this.shimCt = Ext.get("ext-dd-shim-ct-" + a.id);
        if (!this.shimCt) {
            this.shimCt = document.createElement("div");
            this.shimCt.id = "ext-dd-shim-ct-" + a.id;
            a.getEl().parent().appendChild(this.shimCt)
        }
    }
    var b = document.createElement("div");
    b.className = "ext-dd-shim";
    this.shimCt.appendChild(b);
    return Ext.create("Ext.Layer", {shadow: false, useDisplay: true, constrain: false}, b)
}, clearShims                                        : function () {
    Ext.each(this.shims, function (a) {
        if (a) {
            a.hide()
        }
    })
}, onContainerOver                                   : function (a, c, b) {
    return this.dropAllowed
}, onCalendarDragComplete                            : function () {
    delete this.dragStartDate;
    delete this.dragEndDate;
    this.clearShims()
}, onNodeDrop                                        : function (g, a, d, c) {
    if (g && c) {
        if (c.type == "eventdrag") {
            var f = this.view.getEventRecordFromEl(c.ddel), b = Extensible.Date.copyTime(f.data[Extensible.calendar.data.EventMappings.StartDate.name], g.date);
            this.view.onEventDrop(f, b, (d.ctrlKey || d.altKey) ? "copy" : "move");
            this.onCalendarDragComplete();
            return true
        }
        if (c.type == "caldrag") {
            if (!this.dragEndDate) {
                this.dragStartDate = Ext.Date.clearTime(c.start);
                this.dragEndDate = Extensible.Date.add(this.dragStartDate, {days: 1, millis: -1, clearTime: true})
            }
            this.view.onCalendarEndDrag(this.dragStartDate, this.dragEndDate, Ext.bind(this.onCalendarDragComplete, this));
            return true
        }
    }
    this.onCalendarDragComplete();
    return false
}, onContainerDrop                                   : function (a, c, b) {
    this.onCalendarDragComplete();
    return false
}, destroy                                           : function () {
    Ext.each(this.shims, function (a) {
        if (a) {
            Ext.destroy(a)
        }
    });
    Ext.removeNode(this.shimCt);
    delete this.shimCt;
    this.shims.length = 0
}});
Ext.define("Extensible.calendar.dd.DayDragZone", {extend: "Extensible.calendar.dd.DragZone", ddGroup: "DayViewDD", resizeSelector: ".ext-evt-rsz", getDragData: function (c) {
    var a = c.getTarget(this.resizeSelector, 2, true);
    if (a) {
        var b = a.parent(this.eventSelector), d = this.view.getEventRecordFromEl(b);
        if (!d) {
            return
        }
        return{type: "eventresize", xy: c.getXY(), ddel: b.dom, eventStart: d.data[Extensible.calendar.data.EventMappings.StartDate.name], eventEnd: d.data[Extensible.calendar.data.EventMappings.EndDate.name], proxy: this.proxy}
    }
    var a = c.getTarget(this.eventSelector, this.eventSelectorDepth);
    if (a) {
        var d = this.view.getEventRecordFromEl(a);
        if (!d) {
            return
        }
        return{type: "eventdrag", xy: c.getXY(), ddel: a, eventStart: d.data[Extensible.calendar.data.EventMappings.StartDate.name], eventEnd: d.data[Extensible.calendar.data.EventMappings.EndDate.name], proxy: this.proxy}
    }
    a = this.view.getDayAt(c.getX(), c.getY());
    if (a.el) {
        return{type: "caldrag", dayInfo: a, proxy: this.proxy}
    }
    return null
}});
Ext.define("Extensible.calendar.dd.DayDropZone", {extend: "Extensible.calendar.dd.DropZone", ddGroup: "DayViewDD", dateRangeFormat: "{0}-{1}", dateFormat: "n/j", onNodeOver: function (c, m, k, h) {
    var b, o = this.createText, g = Extensible.Date.use24HourTime ? "G:i" : "g:ia";
    if (h.type == "caldrag") {
        if (!this.dragStartMarker) {
            this.dragStartMarker = c.el.parent().createChild({style: "position:absolute;"});
            this.dragStartMarker.setBox(h.dayInfo.timeBox);
            this.dragCreateDt = h.dayInfo.date
        }
        var j, i = this.dragStartMarker.getBox();
        i.height = Math.ceil(Math.abs(k.getY() - i.y) / c.timeBox.height) * c.timeBox.height;
        if (k.getY() < i.y) {
            i.height += c.timeBox.height;
            i.y = i.y - i.height + c.timeBox.height;
            j = Extensible.Date.add(this.dragCreateDt, {minutes: this.ddIncrement})
        } else {
            c.date = Extensible.Date.add(c.date, {minutes: this.ddIncrement})
        }
        this.shim(this.dragCreateDt, i);
        var l = Extensible.Date.diff(this.dragCreateDt, c.date), r = Extensible.Date.add(this.dragCreateDt, {millis: l});
        this.dragStartDate = Extensible.Date.min(this.dragCreateDt, r);
        this.dragEndDate = j || Extensible.Date.max(this.dragCreateDt, r);
        b = Ext.String.format(this.dateRangeFormat, Ext.Date.format(this.dragStartDate, g), Ext.Date.format(this.dragEndDate, g))
    } else {
        var q = Ext.get(h.ddel), p = q.parent().parent(), i = q.getBox();
        i.width = p.getWidth();
        if (h.type == "eventdrag") {
            if (this.dragOffset === undefined) {
                var d = this.view.getDayAt(h.xy[0], h.xy[1]).timeBox;
                this.dragOffset = d.y - i.y
            } else {
                i.y = c.timeBox.y
            }
            b = Ext.Date.format(c.date, (this.dateFormat + " " + g));
            i.x = c.el.getLeft();
            this.shim(c.date, i);
            o = (k.ctrlKey || k.altKey) ? this.copyText : this.moveText
        }
        if (h.type == "eventresize") {
            if (!this.resizeDt) {
                this.resizeDt = c.date
            }
            i.x = p.getLeft();
            i.height = Math.ceil(Math.abs(k.getY() - i.y) / c.timeBox.height) * c.timeBox.height;
            if (k.getY() < i.y) {
                i.y -= i.height
            } else {
                c.date = Extensible.Date.add(c.date, {minutes: this.ddIncrement})
            }
            this.shim(this.resizeDt, i);
            var l = Extensible.Date.diff(this.resizeDt, c.date), r = Extensible.Date.add(this.resizeDt, {millis: l}), a = Extensible.Date.min(h.eventStart, r), f = Extensible.Date.max(h.eventStart, r);
            h.resizeDates = {StartDate: a, EndDate: f};
            b = Ext.String.format(this.dateRangeFormat, Ext.Date.format(a, g), Ext.Date.format(f, g));
            o = this.resizeText
        }
    }
    h.proxy.updateMsg(Ext.String.format(o, b));
    return this.dropAllowed
}, shim                                                 : function (b, a) {
    Ext.each(this.shims, function (d) {
        if (d) {
            d.isActive = false;
            d.hide()
        }
    });
    var c = this.shims[0];
    if (!c) {
        c = this.createShim();
        this.shims[0] = c
    }
    c.isActive = true;
    c.show();
    c.setBox(a)
}, onNodeDrop                                           : function (f, a, c, b) {
    if (f && b) {
        if (b.type == "eventdrag") {
            var d = this.view.getEventRecordFromEl(b.ddel);
            this.view.onEventDrop(d, f.date, (c.ctrlKey || c.altKey) ? "copy" : "move");
            this.onCalendarDragComplete();
            delete this.dragOffset;
            return true
        }
        if (b.type == "eventresize") {
            var d = this.view.getEventRecordFromEl(b.ddel);
            this.view.onEventResize(d, b.resizeDates);
            this.onCalendarDragComplete();
            delete this.resizeDt;
            return true
        }
        if (b.type == "caldrag") {
            Ext.destroy(this.dragStartMarker);
            delete this.dragStartMarker;
            delete this.dragCreateDt;
            this.view.onCalendarEndDrag(this.dragStartDate, this.dragEndDate, Ext.bind(this.onCalendarDragComplete, this));
            return true
        }
    }
    this.onCalendarDragComplete();
    return false
}});
Ext.define("Extensible.calendar.data.EventModel", {extend: "Extensible.data.Model", requires: ["Extensible.calendar.data.EventMappings"], mappingClass: "Extensible.calendar.data.EventMappings", mappingIdProperty: "EventId", inheritableStatics: {resolution: "minutes"}, isRecurring: function () {
    var a = Extensible.calendar.data.EventMappings.RRule;
    if (a) {
        var b = this.get(a.name);
        return(b !== undefined && b !== "")
    }
    return false
}, getStartDate                                          : function () {
    return this.get(Extensible.calendar.data.EventMappings.StartDate.name)
}, getEndDate                                            : function () {
    var c = Extensible.calendar.data.EventMappings, a = c.Duration ? this.get(c.Duration.name) : null;
    if (a !== null && a > -1) {
        var b = {};
        b[Extensible.calendar.data.EventModel.resolution] = a;
        return Extensible.Date.add(this.getStartDate(), b)
    }
    return this.get(c.EndDate.name)
}, clearRecurrence                                       : function () {
    var a = this, b = Extensible.calendar.data.EventMappings;
    delete a.data[b.OriginalEventId.name];
    delete a.data[b.RRule.name];
    delete a.data[b.RInstanceStartDate.name];
    delete a.data[b.REditMode.name];
    return a
}}, function () {
    this.reconfigure()
});
Ext.define("Extensible.calendar.data.EventStore", {extend: "Ext.data.Store", model: "Extensible.calendar.data.EventModel", constructor: function (a) {
    a = a || {};
    this.deferLoad = a.autoLoad;
    a.autoLoad = false;
    this.callParent(arguments)
}, load                                                  : function (a) {
    Extensible.log("store load");
    a = a || {};
    if (a.params) {
        delete this.initialParams
    }
    if (this.initialParams) {
        a.params = a.params || {};
        Ext.apply(a.params, this.initialParams);
        delete this.initialParams
    }
    this.callParent(arguments)
}});
Ext.define("Extensible.calendar.data.CalendarModel", {extend: "Extensible.data.Model", requires: ["Extensible.calendar.data.CalendarMappings"], mappingClass: "Extensible.calendar.data.CalendarMappings", mappingIdProperty: "CalendarId"}, function () {
    this.reconfigure()
});
Ext.define("Extensible.calendar.data.MemoryCalendarStore", {extend: "Ext.data.Store", model: "Extensible.calendar.data.CalendarModel", requires: ["Ext.data.proxy.Memory", "Ext.data.reader.Json", "Ext.data.writer.Json", "Extensible.calendar.data.CalendarModel", "Extensible.calendar.data.CalendarMappings"], proxy: {type: "memory", reader: {type: "json", root: "calendars"}, writer: {type: "json"}}, autoLoad: true, initComponent: function () {
    this.sorters = this.sorters || [
        {property: Extensible.calendar.data.CalendarMappings.Title.name, direction: "ASC"}
    ];
    this.idProperty = this.idProperty || Extensible.calendar.data.CalendarMappings.CalendarId.name || "id";
    this.fields = Extensible.calendar.data.CalendarModel.prototype.fields.getRange();
    this.callParent(arguments)
}});
Ext.define("Extensible.calendar.data.MemoryEventStore", {extend: "Ext.data.Store", model: "Extensible.calendar.data.EventModel", requires: ["Ext.data.proxy.Memory", "Ext.data.reader.Json", "Ext.data.writer.Json", "Extensible.calendar.data.EventModel", "Extensible.calendar.data.EventMappings"], proxy: {type: "memory", reader: {type: "json", root: "evts"}, writer: {type: "json"}}, idSeed: 2000, constructor: function (a) {
    a = a || {};
    this.callParent(arguments);
    this.sorters = this.sorters || [
        {property: Extensible.calendar.data.EventMappings.StartDate.name, direction: "ASC"}
    ];
    this.idProperty = this.idProperty || Extensible.calendar.data.EventMappings.EventId.mapping || "id";
    this.fields = Extensible.calendar.data.EventModel.prototype.fields.getRange();
    if (a.autoMsg !== false) {
        this.on("write", this.onWrite, this)
    }
    this.autoMsg = a.autoMsg;
    this.onCreateRecords = Ext.Function.createInterceptor(this.onCreateRecords, this.interceptCreateRecords);
    this.initRecs()
}, interceptCreateRecords                                      : function (c, b, f) {
    if (f) {
        var d = 0, e, a = c.length;
        for (; d < a; d++) {
            c[d].data[Extensible.calendar.data.EventMappings.EventId.name] = this.idSeed++
        }
    }
}, initRecs                                                    : function () {
    this.each(function (a) {
        a.store = this;
        a.phantom = false
    }, this)
}, onWrite                                                     : function (b, a) {
    var c = this;
    if (Extensible.example && Extensible.example.msg) {
        var f = a.wasSuccessful(), e = a.records[0], d = e.data[Extensible.calendar.data.EventMappings.Title.name];
        switch (a.action) {
            case"create":
                Extensible.example.msg("Add", 'Added "' + Ext.value(d, "(No title)") + '"');
                break;
            case"update":
                Extensible.example.msg("Update", 'Updated "' + Ext.value(d, "(No title)") + '"');
                break;
            case"destroy":
                Extensible.example.msg("Delete", 'Deleted "' + Ext.value(d, "(No title)") + '"');
                break
        }
    }
}, onProxyLoad                                                 : function (b) {
    var d = this, e = b.wasSuccessful(), c = b.getResultSet(), a = [];
    if (d.data && d.data.length > 0) {
        d.totalCount = d.data.length;
        a = d.data.items
    } else {
        if (c) {
            a = c.records;
            d.totalCount = c.total
        }
        if (e) {
            d.loadRecords(a, b)
        }
    }
    d.loading = false;
    d.fireEvent("load", d, a, e)
}});
Ext.define("Extensible.calendar.util.WeekEventRenderer", {requires: ["Ext.core.DomHelper"], statics: {getEventRow: function (a, b, g) {
    var e = 1, f = Ext.get(a + "-wk-" + b), d, c;
    if (f) {
        c = f.child(".ext-cal-evt-tbl", true);
        d = c.tBodies[0].childNodes[g + e];
        if (!d) {
            d = Ext.core.DomHelper.append(c.tBodies[0], "<tr></tr>")
        }
    }
    return Ext.get(d)
}, renderEvent                                                                                                   : function (d, j, b, c, a, f, e) {
    var i = Extensible.calendar.data.EventMappings, m = d.data || d.event.data, n = Ext.Date.clone(f), o = Extensible.Date.add(n, {days: a - b, millis: -1}), g = this.getEventRow(e.viewId, j, c), l = (d.event || d).getEndDate(), k = Extensible.Date.diffDays(f, l) + 1, h = Math.min(k, a - b);
    m._weekIndex = j;
    m._renderAsAllDay = m[i.IsAllDay.name] || d.isSpanStart;
    m.spanLeft = m[i.StartDate.name].getTime() < n.getTime();
    m.spanRight = l.getTime() > o.getTime();
    m.spanCls = (m.spanLeft ? (m.spanRight ? "ext-cal-ev-spanboth" : "ext-cal-ev-spanleft") : (m.spanRight ? "ext-cal-ev-spanright" : ""));
    var p = {tag: "td", cls: "ext-cal-ev", cn: e.tpl.apply(e.templateDataFn(m))};
    if (h > 1) {
        p.colspan = h
    }
    Ext.core.DomHelper.append(g, p)
}, render                                                                                                        : function (s) {
    var u = this, v = "&#160;", p = 0, f = s.eventGrid, g = Ext.Date.clone(s.viewStart), j = "", k = s.tpl, n = s.maxEventsPerDay != undefined ? s.maxEventsPerDay : 999, q = s.weekCount < 1 ? 6 : s.weekCount, l = s.weekCount == 1 ? s.dayCount : 7, r, m, a, d, e, o, c, i, h, b;
    for (; p < q; p++) {
        m = 0;
        a = f[p];
        for (; m < l; m++) {
            j = Ext.Date.format(g, "Ymd");
            if (a && a[m]) {
                d = 0;
                e = 0;
                o = a[m];
                c = o.length;
                for (; d < c; d++) {
                    if (!o[d]) {
                        if (d >= n) {
                            continue
                        }
                        r = u.getEventRow(s.viewId, p, d);
                        Ext.core.DomHelper.append(r, {tag: "td", cls: "ext-cal-ev", html: v, id: s.viewId + "-empty-" + c + "-day-" + j})
                    } else {
                        if (d >= n) {
                            e++;
                            continue
                        }
                        i = o[d];
                        if (!i.isSpan || i.isSpanStart) {
                            u.renderEvent(i, p, m, d, l, g, s)
                        }
                    }
                }
                if (e > 0) {
                    r = u.getEventRow(s.viewId, p, n);
                    Ext.core.DomHelper.append(r, {tag: "td", cls: "ext-cal-ev-more", id: "ext-cal-ev-more-" + Ext.Date.format(g, "Ymd"), cn: {tag: "a", html: Ext.String.format(s.getMoreText(e), e)}})
                } else {
                    if (c < s.evtMaxCount[p]) {
                        r = u.getEventRow(s.viewId, p, c);
                        if (r) {
                            h = {tag: "td", cls: "ext-cal-ev", html: v, id: s.viewId + "-empty-" + (c + 1) + "-day-" + j};
                            var t = s.evtMaxCount[p] - c;
                            if (t > 1) {
                                h.rowspan = t
                            }
                            Ext.core.DomHelper.append(r, h)
                        }
                    }
                }
            } else {
                r = u.getEventRow(s.viewId, p, 0);
                if (r) {
                    h = {tag: "td", cls: "ext-cal-ev", html: v, id: s.viewId + "-empty-day-" + j};
                    if (s.evtMaxCount[p] > 1) {
                        h.rowspan = s.evtMaxCount[p]
                    }
                    Ext.core.DomHelper.append(r, h)
                }
            }
            g = Extensible.Date.add(g, {days: 1})
        }
    }
}}});
Ext.define("Extensible.calendar.form.field.CalendarCombo", {extend: "Ext.form.field.ComboBox", alias: "widget.extensible.calendarcombo", requires: ["Extensible.calendar.data.CalendarMappings"], fieldLabel: "Calendar", triggerAction: "all", queryMode: "local", forceSelection: true, selectOnFocus: true, defaultCls: "x-cal-default", hiddenCalendarCls: "ext-cal-hidden", initComponent: function () {
    this.valueField = Extensible.calendar.data.CalendarMappings.CalendarId.name;
    this.displayField = Extensible.calendar.data.CalendarMappings.Title.name;
    this.listConfig = Ext.apply(this.listConfig || {}, {getInnerTpl: this.getListItemTpl});
    this.store.on("update", this.refreshColorCls, this);
    this.callParent(arguments)
}, getListItemTpl                                                 : function (a) {
    return'<div class="x-combo-list-item x-cal-{' + Extensible.calendar.data.CalendarMappings.ColorId.name + '}"><div class="ext-cal-picker-icon">&#160;</div>{' + a + "}</div>"
}, afterRender                                                    : function () {
    this.callParent(arguments);
    this.wrap = this.el.down(".x-form-item-body");
    this.wrap.addCls("ext-calendar-picker");
    this.icon = Ext.core.DomHelper.append(this.wrap, {tag: "div", cls: "ext-cal-picker-icon ext-cal-picker-mainicon"})
}, refreshColorCls                                                : function () {
    var a = this, d = Extensible.calendar.data.CalendarMappings, c = "", b = a.getValue();
    if (!a.wrap) {
        return a
    }
    if (a.currentStyleClss !== undefined) {
        a.wrap.removeCls(a.currentStyleClss)
    }
    if (!Ext.isEmpty(b)) {
        if (Ext.isArray(b)) {
            b = b[0]
        }
        if (!b.data) {
            b = this.store.findRecord(d.CalendarId.name, b)
        }
        c = "x-cal-" + (b.data ? b.data[d.ColorId.name] : b)
    }
    a.currentStyleClss = c;
    a.wrap.addCls(c);
    return a
}, setValue                                                       : function (a) {
    if (!a && this.store.getCount() > 0) {
        a = this.store.getAt(0).data[Extensible.calendar.data.CalendarMappings.CalendarId.name]
    }
    this.callParent(arguments);
    this.refreshColorCls()
}});
Ext.define("Extensible.form.field.DateRangeLayout", {extend: "Ext.layout.container.Container", alias: ["layout.extensible.daterange"], onLayout: function () {
    var c = this, d = c.getShadowCt(), b = c.owner, a = b.isSingleLine();
    c.owner.suspendLayout = true;
    if (a) {
        d.getComponent("row1").add(b.startDate, b.startTime, b.toLabel, b.endTime, b.endDate, b.allDay)
    } else {
        d.getComponent("row1").add(b.startDate, b.startTime, b.toLabel);
        d.getComponent("row2").add(b.endDate, b.endTime, b.allDay)
    }
    if (!d.rendered) {
        d.render(c.getRenderTarget())
    }
    d.doComponentLayout();
    b.setHeight(d.getHeight() - 5);
    delete c.owner.suspendLayout
}, getShadowCt                                             : function () {
    var b = this, a = [];
    if (!b.shadowCt) {
        b.shadowCt = Ext.createWidget("container", {layout: "auto", anchor: "100%", ownerCt: b.owner, items: [
            {xtype: "container", itemId: "row1", layout: "hbox", defaults: {margins: "0 5 0 0"}},
            {xtype: "container", itemId: "row2", layout: "hbox", defaults: {margins: "0 5 0 0"}}
        ]})
    }
    return b.shadowCt
}, renderItems                                             : Ext.emptyFn});
Ext.define("Extensible.form.field.DateRange", {extend: "Ext.form.FieldContainer", alias: "widget.extensible.daterangefield", requires: ["Ext.form.field.Date", "Ext.form.field.Time", "Ext.form.Label", "Ext.form.field.Checkbox"], toText: "to", allDayText: "All day", singleLine: true, dateFormat: "n/j/Y", fieldLayout: {type: "hbox", defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}, initComponent: function () {
    var a = this;
    a.timeFormat = a.timeFormat || (Extensible.Date.use24HourTime ? "G:i" : "g:i A");
    a.addCls("ext-dt-range");
    if (a.singleLine) {
        a.layout = a.fieldLayout;
        a.items = a.getFieldConfigs()
    } else {
        a.items = [
            {xtype: "container", layout: a.fieldLayout, items: [a.getStartDateConfig(), a.getStartTimeConfig(), a.getDateSeparatorConfig()]},
            {xtype: "container", layout: a.fieldLayout, items: [a.getEndDateConfig(), a.getEndTimeConfig(), a.getAllDayConfig()]}
        ]
    }
    a.callParent(arguments);
    a.initRefs()
}, initRefs                                          : function () {
    var a = this;
    a.startDate = a.down("#" + a.id + "-start-date");
    a.startTime = a.down("#" + a.id + "-start-time");
    a.endTime = a.down("#" + a.id + "-end-time");
    a.endDate = a.down("#" + a.id + "-end-date");
    a.allDay = a.down("#" + a.id + "-allday");
    a.toLabel = a.down("#" + a.id + "-to-label")
}, getFieldConfigs                                   : function () {
    var a = this;
    return[a.getStartDateConfig(), a.getStartTimeConfig(), a.getDateSeparatorConfig(), a.getEndTimeConfig(), a.getEndDateConfig(), a.getAllDayConfig()]
}, getLayoutItems                                    : function (a) {
    var b = this;
    return a ? b.items.items : [
        [b.startDate, b.startTime, b.toLabel],
        [b.endDate, b.endTime, b.allDay]
    ]
}, getStartDateConfig                                : function () {
    return{xtype: "datefield", id: this.id + "-start-date", format: this.dateFormat, width: 100, listeners: {change: {fn: function () {
        this.onFieldChange("date", "start")
    }, scope                                                                                                            : this}}}
}, getStartTimeConfig                                : function () {
    return{xtype: "timefield", id: this.id + "-start-time", hidden: this.showTimes === false, labelWidth: 0, hideLabel: true, width: 90, format: this.timeFormat, listeners: {select: {fn: function () {
        this.onFieldChange("time", "start")
    }, scope                                                                                                                                                                             : this}}}
}, getEndDateConfig                                  : function () {
    return{xtype: "datefield", id: this.id + "-end-date", format: this.dateFormat, hideLabel: true, width: 100, listeners: {change: {fn: function () {
        this.onFieldChange("date", "end")
    }, scope                                                                                                                           : this}}}
}, getEndTimeConfig                                  : function () {
    return{xtype: "timefield", id: this.id + "-end-time", hidden: this.showTimes === false, labelWidth: 0, hideLabel: true, width: 90, format: this.timeFormat, listeners: {select: {fn: function () {
        this.onFieldChange("time", "end")
    }, scope                                                                                                                                                                           : this}}}
}, getAllDayConfig                                   : function () {
    return{xtype: "checkbox", id: this.id + "-allday", hidden: this.showTimes === false || this.showAllDay === false, boxLabel: this.allDayText, margins: {top: 2, right: 5, bottom: 0, left: 0}, handler: this.onAllDayChange, scope: this}
}, onAllDayChange                                    : function (a, b) {
    this.startTime.setVisible(!b);
    this.endTime.setVisible(!b)
}, getDateSeparatorConfig                            : function () {
    return{xtype: "label", id: this.id + "-to-label", text: this.toText, margins: {top: 4, right: 5, bottom: 0, left: 0}}
}, isSingleLine                                      : function () {
    var c = this;
    if (c.calculatedSingleLine === undefined) {
        if (c.singleLine == "auto") {
            var d = c.ownerCt.getEl(), a = c.ownerCt.getWidth() - d.getPadding("lr"), b = d.down(".x-panel-body");
            if (b) {
                a -= b.getPadding("lr")
            }
            b = d.down(".x-form-item-label");
            if (b) {
                a -= b.getWidth() - b.getPadding("lr")
            }
            singleLine = a <= c.singleLineMinWidth ? false : true
        } else {
            c.calculatedSingleLine = c.singleLine !== undefined ? c.singleLine : true
        }
    }
    return c.calculatedSingleLine
}, onFieldChange                                     : function (a, b) {
    this.checkDates(a, b);
    this.fireEvent("change", this, this.getValue())
}, checkDates                                        : function (e, h) {
    var g = this, f = e === "date" ? "Date" : "Time", d = this["start" + f], b = this["end" + f], c = g.getDT("start"), a = g.getDT("end");
    if (c > a) {
        if (h == "start") {
            b.setValue(c)
        } else {
            d.setValue(a);
            g.checkDates(e, "start")
        }
    }
    if (e == "date") {
        g.checkDates("time", h)
    }
}, getValue                                          : function () {
    return[this.getDT("start"), this.getDT("end"), this.allDay.getValue()]
}, getDT                                             : function (d) {
    var b = this[d + "Time"].getValue(), a = this[d + "Date"].getValue();
    if (Ext.isDate(a)) {
        a = Ext.Date.format(a, this[d + "Date"].format)
    } else {
        return null
    }
    if (b && b != "") {
        b = Ext.Date.format(b, this[d + "Time"].format);
        var c = Ext.Date.parseDate(a + " " + b, this[d + "Date"].format + " " + this[d + "Time"].format);
        return c
    }
    return Ext.Date.parseDate(a, this[d + "Date"].format)
}, setValue                                          : function (a) {
    if (!a) {
        return
    }
    var c = this, b = Extensible.calendar.data.EventMappings, d = b.StartDate.name;
    if (Ext.isArray(a)) {
        c.setDT(a[0], "start");
        c.setDT(a[1], "end");
        c.allDay.setValue(!!a[2])
    } else {
        if (Ext.isDate(a)) {
            c.setDT(a, "start");
            c.setDT(a, "end");
            c.allDay.setValue(false)
        } else {
            if (a[d]) {
                c.setDT(a[d], "start");
                if (!c.setDT(a[b.EndDate.name], "end")) {
                    c.setDT(a[d], "end")
                }
                c.allDay.setValue(!!a[b.IsAllDay.name])
            }
        }
    }
}, setDT                                             : function (a, b) {
    if (a && Ext.isDate(a)) {
        this[b + "Date"].setValue(a);
        this[b + "Time"].setValue(Ext.Date.format(a, this[b + "Time"].format));
        return true
    }
}, isDirty                                           : function () {
    var a = false;
    if (this.rendered && !this.disabled) {
        this.items.each(function (b) {
            if (b.isDirty()) {
                a = true;
                return false
            }
        })
    }
    return a
}, reset                                             : function () {
    this.delegateFn("reset")
}, delegateFn                                        : function (a) {
    this.items.each(function (b) {
        if (b[a]) {
            b[a]()
        }
    })
}, beforeDestroy                                     : function () {
    Ext.destroy(this.fieldCt);
    this.callParent(arguments)
}, getRawValue                                       : Ext.emptyFn, setRawValue: Ext.emptyFn});
Ext.define("Extensible.calendar.form.field.ReminderCombo", {extend: "Ext.form.field.ComboBox", alias: "widget.extensible.remindercombo", requires: ["Ext.data.ArrayStore"], fieldLabel: "Reminder", queryMode: "local", triggerAction: "all", forceSelection: true, displayField: "desc", valueField: "value", noneText: "None", atStartTimeText: "At start time", reminderValueFormat: "{0} {1} before start", minutesText: "minutes", hourText: "hour", hoursText: "hours", dayText: "day", daysText: "days", weekText: "week", weeksText: "weeks", initComponent: function () {
    this.store = this.store || Ext.create("Ext.data.ArrayStore", {fields: ["value", "desc"], idIndex: 0, data: this.getValueList()});
    this.callParent(arguments)
}, getValueList                                                   : function () {
    var c = this, a = c.reminderValueFormat, b = Ext.String.format;
    return[
        ["", c.noneText],
        ["0", c.atStartTimeText],
        ["5", b(a, "5", c.getMinutesText(5))],
        ["15", b(a, "15", c.getMinutesText(15))],
        ["30", b(a, "30", c.getMinutesText(30))],
        ["60", b(a, "1", c.getHoursText(1))],
        ["90", b(a, "1.5", c.getHoursText(1.5))],
        ["120", b(a, "2", c.getHoursText(2))],
        ["180", b(a, "3", c.getHoursText(3))],
        ["360", b(a, "6", c.getHoursText(6))],
        ["720", b(a, "12", c.getHoursText(12))],
        ["1440", b(a, "1", c.getDaysText(1))],
        ["2880", b(a, "2", c.getDaysText(2))],
        ["4320", b(a, "3", c.getDaysText(3))],
        ["5760", b(a, "4", c.getDaysText(4))],
        ["7200", b(a, "5", c.getDaysText(5))],
        ["10080", b(a, "1", c.getWeeksText(1))],
        ["20160", b(a, "2", c.getWeeksText(2))]
    ]
}, getMinutesText                                                 : function (a) {
    return a === 1 ? this.minuteText : this.minutesText
}, getHoursText                                                   : function (a) {
    return a === 1 ? this.hourText : this.hoursText
}, getDaysText                                                    : function (a) {
    return a === 1 ? this.dayText : this.daysText
}, getWeeksText                                                   : function (a) {
    return a === 1 ? this.weekText : this.weeksText
}, initValue                                                      : function () {
    if (this.value !== undefined) {
        this.setValue(this.value)
    } else {
        this.setValue("")
    }
    this.originalValue = this.getValue()
}});
Ext.define("Extensible.calendar.util.ColorPicker", {extend: "Ext.picker.Color", alias: "widget.extensible.calendarcolorpicker", requires: ["Ext.XTemplate"], colorCount: 32, constructor: function () {
    this.renderTpl = Ext.create("Ext.XTemplate", '<tpl for="colors"><a href="#" class="x-cal-{.}" hidefocus="on"><em><span unselectable="on">&#160;</span></em></a></tpl>');
    this.callParent(arguments)
}, initComponent                                          : function () {
    this.callParent(arguments);
    this.addCls("x-calendar-palette");
    if (this.handler) {
        this.on("select", this.handler, this.scope || this, {delegate: "a"})
    }
    this.colors = [];
    for (var a = 1; a <= this.colorCount; a++) {
        this.colors.push(a)
    }
}, handleClick                                            : function (b, a) {
    b.preventDefault();
    var c = a.className.split("x-cal-")[1];
    this.select(c)
}, select                                                 : function (f, a) {
    var c = this, e = c.selectedCls, d = c.value;
    if (!c.rendered) {
        c.value = f;
        return
    }
    if (f != d || c.allowReselect) {
        var b = c.el;
        if (c.value) {
            b.down(".x-cal-" + d).removeCls(e)
        }
        b.down(".x-cal-" + f).addCls(e);
        c.value = f;
        if (a !== true) {
            c.fireEvent("select", c, f)
        }
    }
}});
Ext.define("Extensible.calendar.gadget.CalendarListMenu", {extend: "Ext.menu.Menu", alias: "widget.extensible.calendarlistmenu", requires: ["Extensible.calendar.util.ColorPicker"], hideOnClick: true, ignoreParentClicks: true, displayOnlyThisCalendarText: "Display only this calendar", enableScrolling: false, initComponent: function () {
    this.addEvents("showcalendar", "hidecalendar", "radiocalendar", "colorchange");
    Ext.apply(this, {items: [
        {text: this.displayOnlyThisCalendarText, iconCls: "extensible-cal-icon-cal-show", handler: Ext.bind(this.handleRadioCalendarClick, this)},
        "-",
        {xtype: "extensible.calendarcolorpicker", id: this.id + "-calendar-color-picker", handler: Ext.bind(this.handleColorSelect, this)}
    ]});
    this.addClass("x-calendar-list-menu");
    this.callParent(arguments)
}, afterRender                                                   : function () {
    this.callParent(arguments);
    this.palette = this.down("#" + this.id + "-calendar-color-picker");
    if (this.colorId) {
        this.palette.select(this.colorId, true)
    }
}, handleRadioCalendarClick                                      : function (b, a) {
    this.fireEvent("radiocalendar", this, this.calendarId)
}, handleColorSelect                                             : function (b, a) {
    this.fireEvent("colorchange", this, this.calendarId, a, this.colorId);
    this.colorId = a;
    this.menuHide()
}, setCalendar                                                   : function (b, a) {
    this.calendarId = b;
    this.colorId = a;
    if (this.rendered) {
        this.palette.select(a, true)
    }
    return this
}, menuHide                                                      : function () {
    if (this.hideOnClick) {
        this.hide()
    }
}});
Ext.define("Extensible.calendar.gadget.CalendarListPanel", {extend: "Ext.panel.Panel", alias: "widget.extensible.calendarlist", requires: ["Ext.XTemplate", "Extensible.calendar.gadget.CalendarListMenu"], title: "Calendars", collapsible: true, autoHeight: true, layout: "fit", menuSelector: "em", width: 100, initComponent: function () {
    this.addCls("x-calendar-list");
    this.callParent(arguments)
}, afterRender                                                    : function (b, a) {
    this.callParent(arguments);
    if (this.store) {
        this.setStore(this.store, true)
    }
    this.refresh();
    this.body.on("click", this.onClick, this);
    this.body.on("mouseover", this.onMouseOver, this, {delegate: "li"});
    this.body.on("mouseout", this.onMouseOut, this, {delegate: "li"})
}, getListTemplate                                                : function () {
    if (!this.tpl) {
        this.tpl = !(Ext.isIE || Ext.isOpera) ? Ext.create("Ext.XTemplate", '<ul class="x-unselectable"><tpl for=".">', '<li id="{cmpId}" class="ext-cal-evr {colorCls} {hiddenCls}">{title}<em>&#160;</em></li>', "</tpl></ul>") : Ext.create("Ext.XTemplate", '<ul class="x-unselectable"><tpl for=".">', '<li id="{cmpId}" class="ext-cal-evo {colorCls} {hiddenCls}">', '<div class="ext-cal-evm">', '<div class="ext-cal-evi">{title}<em>&#160;</em></div>', "</div>", "</li>", "</tpl></ul>");
        this.tpl.compile()
    }
    return this.tpl
}, setStore                                                       : function (a, b) {
    if (!b && this.store) {
        this.store.un("load", this.refresh, this);
        this.store.un("add", this.refresh, this);
        this.store.un("remove", this.refresh, this);
        this.store.un("update", this.onUpdate, this);
        this.store.un("clear", this.refresh, this)
    }
    if (a) {
        a.on("load", this.refresh, this);
        a.on("add", this.refresh, this);
        a.on("remove", this.refresh, this);
        a.on("update", this.onUpdate, this);
        a.on("clear", this.refresh, this)
    }
    this.store = a
}, onUpdate                                                       : function (b, c, a) {
    if (a == Ext.data.Record.COMMIT) {
        this.refresh()
    }
}, refresh                                                        : function () {
    if (this.skipRefresh) {
        return
    }
    var e = [], c = 0, f = null, b = Extensible.calendar.data.CalendarMappings, d = this.store.getRange(), a = d.length;
    for (; c < a; c++) {
        f = {cmpId: this.id + "__" + d[c].data[b.CalendarId.name], title: d[c].data[b.Title.name], colorCls: this.getColorCls(d[c].data[b.ColorId.name])};
        if (d[c].data[b.IsHidden.name] === true) {
            f.hiddenCls = "ext-cal-hidden"
        }
        e[e.length] = f
    }
    this.getListTemplate().overwrite(this.body, e)
}, getColorCls                                                    : function (a) {
    return"x-cal-" + a + "-ad"
}, toggleCalendar                                                 : function (c, b) {
    var a = this.store.findRecord(Extensible.calendar.data.CalendarMappings.CalendarId.name, c);
    CM = Extensible.calendar.data.CalendarMappings, isHidden = a.data[CM.IsHidden.name];
    a.set(CM.IsHidden.name, !isHidden);
    if (b !== false) {
        a.commit()
    }
}, showCalendar                                                   : function (c, b) {
    var a = this.store.findRecord(Extensible.calendar.data.CalendarMappings.CalendarId.name, c);
    if (a.data[Extensible.calendar.data.CalendarMappings.IsHidden.name] === true) {
        this.toggleCalendar(c, b)
    }
}, hideCalendar                                                   : function (c, b) {
    var a = this.store.findRecord(Extensible.calendar.data.CalendarMappings.CalendarId.name, c);
    if (a.data[Extensible.calendar.data.CalendarMappings.IsHidden.name] !== true) {
        this.toggleCalendar(c, b)
    }
}, radioCalendar                                                  : function (f) {
    var b = 0, e, c = Extensible.calendar.data.CalendarMappings.CalendarId.name, d = this.store.getRange(), a = d.length;
    for (; b < a; b++) {
        e = d[b].data[c];
        if (e == f) {
            this.showCalendar(e, false)
        } else {
            this.hideCalendar(e, false)
        }
    }
    this.skipRefresh = true;
    this.store.sync();
    delete this.skipRefresh;
    this.refresh()
}, onMouseOver                                                    : function (b, a) {
    Ext.fly(a).addCls("hover")
}, onMouseOut                                                     : function (b, a) {
    Ext.fly(a).removeCls("hover")
}, getCalendarId                                                  : function (a) {
    return a.id.split("__")[1]
}, getCalendarItemEl                                              : function (a) {
    return Ext.get(this.id + "__" + a)
}, onClick                                                        : function (c, a) {
    var b;
    if (b = c.getTarget(this.menuSelector, 3, true)) {
        this.showEventMenu(b, c.getXY())
    } else {
        if (b = c.getTarget("li", 3, true)) {
            this.toggleCalendar(this.getCalendarId(b))
        }
    }
}, handleColorChange                                              : function (d, e, c, a) {
    var b = this.store.findRecord(Extensible.calendar.data.CalendarMappings.CalendarId.name, e);
    b.data[Extensible.calendar.data.CalendarMappings.ColorId.name] = c;
    b.commit()
}, handleRadioCalendar                                            : function (a, b) {
    this.radioCalendar(b)
}, showEventMenu                                                  : function (a, b) {
    var d = this.getCalendarId(a.parent("li")), c = this.store.findRecord(Extensible.calendar.data.CalendarMappings.CalendarId.name, d);
    colorId = c.data[Extensible.calendar.data.CalendarMappings.ColorId.name];
    if (!this.menu) {
        this.menu = Ext.create("Extensible.calendar.gadget.CalendarListMenu");
        this.menu.on("colorchange", this.handleColorChange, this);
        this.menu.on("radiocalendar", this.handleRadioCalendar, this)
    }
    this.menu.setCalendar(d, colorId);
    this.menu.showAt(b)
}});
Ext.define("Extensible.calendar.menu.Event", {extend: "Ext.menu.Menu", alias: "widget.extensible.eventcontextmenu", requires: ["Ext.menu.DatePicker"], hideOnClick: true, ignoreParentClicks: true, editDetailsText: "Edit Details", deleteText: "Delete", moveToText: "Move to...", copyToText: "Copy to...", enableScrolling: false, initComponent: function () {
    this.addEvents("editdetails", "eventdelete", "eventmove", "eventcopy");
    this.buildMenu();
    this.callParent(arguments)
}, buildMenu                                        : function () {
    var a = this;
    if (a.rendered) {
        return
    }
    a.dateMenu = Ext.create("Ext.menu.DatePicker", {scope: a, handler: a.onEventMoveSelected});
    a.copyMenu = Ext.create("Ext.menu.DatePicker", {scope: a, handler: a.onEventCopySelected});
    Ext.apply(a, {items: [
        {text: a.editDetailsText, iconCls: "extensible-cal-icon-evt-edit", scope: a, handler: function () {
            a.fireEvent("editdetails", a, a.rec, a.ctxEl)
        }},
        {text: a.deleteText, iconCls: "extensible-cal-icon-evt-del", scope: a, handler: function () {
            a.fireEvent("eventdelete", a, a.rec, a.ctxEl)
        }},
        "-",
        {text: a.moveToText, iconCls: "extensible-cal-icon-evt-move", menu: a.dateMenu},
        {text: a.copyToText, iconCls: "extensible-cal-icon-evt-copy", menu: a.copyMenu}
    ]})
}, onEventMoveSelected                              : function (b, a) {
    this.doCopyOrMove(a, "move")
}, onEventCopySelected                              : function (b, a) {
    this.doCopyOrMove(a, "copy")
}, doCopyOrMove                                     : function (a, b) {
    a = Extensible.Date.copyTime(this.rec.data[Extensible.calendar.data.EventMappings.StartDate.name], a);
    this.fireEvent("event" + b, this, this.rec, a)
}, showForEvent                                     : function (e, b, d) {
    var c = this, a = e.data[Extensible.calendar.data.EventMappings.StartDate.name];
    c.rec = e;
    c.ctxEl = b;
    c.dateMenu.picker.setValue(a);
    c.copyMenu.picker.setValue(a);
    c.showAt(d)
}, onHide                                           : function () {
    this.callParent(arguments);
    delete this.ctxEl
}});
Ext.define("Extensible.calendar.form.EventDetails", {extend: "Ext.form.Panel", alias: "widget.extensible.eventeditform", requires: ["Extensible.form.field.DateRange", "Extensible.calendar.form.field.ReminderCombo", "Extensible.calendar.data.EventMappings", "Extensible.calendar.form.field.CalendarCombo", "Extensible.form.recurrence.Fieldset", "Ext.layout.container.Column", "Extensible.form.recurrence.RangeEditWindow"], labelWidth: 65, labelWidthRightCol: 65, colWidthLeft: ".9", colWidthRight: ".1", title: "Event Form", titleTextAdd: "Add Event", titleTextEdit: "Edit Event", titleLabelText: "Title", datesLabelText: "When", reminderLabelText: "Reminder", notesLabelText: "Notes", locationLabelText: "Location", webLinkLabelText: "Web Link", calendarLabelText: "Calendar", repeatsLabelText: "Repeats", saveButtonText: "Save", deleteButtonText: "Delete", cancelButtonText: "Cancel", bodyStyle: "padding:20px 20px 10px;", border: false, buttonAlign: "center", autoScroll: true, recurrence: false, allowDefaultAdd: true, layout: "column", initComponent: function () {
    this.addEvents({eventadd: true, eventupdate: true, eventdelete: true, eventcancel: true});
    this.titleField = Ext.create("Ext.form.TextField", {fieldLabel: this.titleLabelText, name: Extensible.calendar.data.EventMappings.Title.name, anchor: "70%"});
    this.dateRangeField = Ext.create("Extensible.form.field.DateRange", {fieldLabel: this.datesLabelText, singleLine: false, anchor: "70%", listeners: {change: Ext.bind(this.onDateChange, this)}});
    this.reminderField = Ext.create("Extensible.calendar.form.field.ReminderCombo", {name: Extensible.calendar.data.EventMappings.Reminder.name, fieldLabel: this.reminderLabelText, anchor: "70%"});
    this.notesField = Ext.create("Ext.form.TextArea", {fieldLabel: this.notesLabelText, name: Extensible.calendar.data.EventMappings.Notes.name, grow: true, growMax: 150, anchor: "70%"});
    this.locationField = Ext.create("Ext.form.TextField", {fieldLabel: this.locationLabelText, name: Extensible.calendar.data.EventMappings.Location.name, anchor: "70%"});
    this.urlField = Ext.create("Ext.form.TextField", {fieldLabel: this.webLinkLabelText, name: Extensible.calendar.data.EventMappings.Url.name, anchor: "70%"});
    var c = [], b = [this.titleField, this.dateRangeField, this.reminderField, this.notesField, this.locationField, this.urlField];
    if (this.recurrence) {
        this.recurrenceField = Ext.create("Extensible.form.recurrence.Fieldset", {recurrenceOptions: this.recurrence, name: Extensible.calendar.data.EventMappings.RRule.name, fieldLabel: this.repeatsLabelText, anchor: "70%"});
        b.splice(2, 0, this.recurrenceField)
    }
    if (this.calendarStore) {
        this.calendarField = Ext.create("Extensible.calendar.form.field.CalendarCombo", {store: this.calendarStore, fieldLabel: this.calendarLabelText, name: Extensible.calendar.data.EventMappings.CalendarId.name, anchor: "70%"});
        b.splice(2, 0, this.calendarField)
    }
    var a = Math.max(this.labelWidthRightCol, this.labelWidth);
    this.items = [
        {id: this.id + "-left-col", columnWidth: this.colWidthLeft, layout: "anchor", fieldDefaults: {labelWidth: a}, border: false, items: b},
        {id: this.id + "-right-col", columnWidth: this.colWidthRight, layout: "anchor", fieldDefaults: {labelWidth: a}, border: false, items: c}
    ];
    this.fbar = [
        {text: this.saveButtonText, scope: this, handler: this.onSave},
        {itemId: this.id + "-del-btn", text: this.deleteButtonText, scope: this, handler: this.onDelete},
        {text: this.cancelButtonText, scope: this, handler: this.onCancel}
    ];
    this.addCls("ext-evt-edit-form");
    Ext.apply(this.initialConfig, {trackResetOnLoad: true});
    this.callParent(arguments)
}, onDateChange                                            : function (a, b) {
    if (this.recurrenceField) {
        this.recurrenceField.setStartDate(b[0])
    }
}, loadRecord                                              : function (c) {
    var a = this, b = Extensible.calendar.data.EventMappings;
    a.form.reset().loadRecord.apply(a.form, arguments);
    a.activeRecord = c;
    a.dateRangeField.setValue(c.data);
    if (a.recurrenceField) {
        a.recurrenceField.setStartDate(c.data[b.StartDate.name]);
        a.recurrenceField.setValue(c.data[b.RRule.name]);
        if (!c.data[b.RInstanceStartDate.name]) {
            c.data[b.RInstanceStartDate.name] = c.getStartDate()
        }
    }
    if (a.calendarField) {
        a.calendarField.setValue(c.data[b.CalendarId.name])
    }
    if (c.phantom) {
        a.setTitle(a.titleTextAdd);
        a.down("#" + a.id + "-del-btn").hide()
    } else {
        a.setTitle(a.titleTextEdit);
        a.down("#" + a.id + "-del-btn").show()
    }
    a.form.getFields().each(function (d) {
        d.resetOriginalValue()
    });
    a.titleField.focus()
}, updateRecord                                            : function (f) {
    var h = f.fields, i = this.getForm().getValues(), a = Extensible.calendar.data.EventMappings, c, e = {};
    h.each(function (l) {
        c = l.name;
        if (c in i) {
            e[c] = i[c]
        }
    });
    var b = this.dateRangeField.getValue(), j = e[a.IsAllDay.name] = b[2], d = j ? Extensible.Date.clearTime(b[0]) : b[0], g = j ? Extensible.Date.clearTime(b[1]) : b[1], k = {days: 1};
    k[Extensible.calendar.data.EventModel.resolution] = -1;
    e[a.StartDate.name] = d;
    e[a.EndDate.name] = j ? Extensible.Date.add(g, k) : g;
    if (a.Duration) {
        e[a.Duration.name] = Extensible.Date.diff(d, e[a.EndDate.name], Extensible.calendar.data.EventModel.resolution)
    }
    f.set(e);
    return f.dirty || (f.phantom && this.allowDefaultAdd)
}, onCancel                                                : function () {
    this.cleanup(true);
    this.fireEvent("eventcancel", this, this.activeRecord)
}, cleanup                                                 : function (a) {
    if (this.activeRecord) {
        this.activeRecord.reject()
    }
    delete this.activeRecord;
    if (this.form.isDirty()) {
        this.form.reset()
    }
}, onSave                                                  : function () {
    var b = this, a = b.activeRecord.isRecurring();
    if (!b.form.isValid() && !b.allowDefaultAdd) {
        return
    }
    if (!b.updateRecord(b.activeRecord)) {
        b.onCancel();
        return
    }
    if (b.activeRecord.phantom) {
        b.fireEvent("eventadd", b, b.activeRecord)
    } else {
        if (a) {
            b.onRecurrenceUpdate()
        } else {
            b.fireEvent("eventupdate", b, b.activeRecord)
        }
    }
}, onRecurrenceUpdate                                      : function () {
    Extensible.form.recurrence.RangeEditWindow.prompt({callback: this.onRecurrenceEditModeSelected, scope: this})
}, onRecurrenceEditModeSelected                            : function (b) {
    var a = this;
    if (b) {
        a.activeRecord.data[Extensible.calendar.data.EventMappings.REditMode.name] = b;
        a.fireEvent("eventupdate", a, a.activeRecord, a.animateTarget)
    }
}, onDelete                                                : function () {
    this.fireEvent("eventdelete", this, this.activeRecord)
}});
Ext.define("Extensible.calendar.form.EventWindow", {extend: "Ext.window.Window", alias: "widget.extensible.eventeditwindow", requires: ["Ext.form.Panel", "Extensible.calendar.data.EventModel", "Extensible.calendar.data.EventMappings", "Extensible.form.recurrence.RangeEditWindow"], titleTextAdd: "Add Event", titleTextEdit: "Edit Event", width: 600, labelWidth: 65, detailsLinkText: "Edit Details...", savingMessage: "Saving changes...", deletingMessage: "Deleting event...", saveButtonText: "Save", deleteButtonText: "Delete", cancelButtonText: "Cancel", titleLabelText: "Title", datesLabelText: "When", calendarLabelText: "Calendar", closeAction: "hide", modal: false, resizable: false, constrain: true, buttonAlign: "left", editDetailsLinkClass: "edit-dtl-link", enableEditDetails: true, layout: "fit", formPanelConfig: {border: false}, allowDefaultAdd: true, initComponent: function () {
    this.addEvents({eventadd: true, eventupdate: true, eventdelete: true, eventcancel: true, editdetails: true});
    this.fbar = this.getFooterBarConfig();
    this.callParent(arguments)
}, getFooterBarConfig                                     : function () {
    var a = ["->", {text: this.saveButtonText, itemId: this.id + "-save-btn", disabled: false, handler: this.onSave, scope: this}, {text: this.deleteButtonText, itemId: this.id + "-delete-btn", disabled: false, handler: this.onDelete, scope: this, hideMode: "offsets"}, {text: this.cancelButtonText, itemId: this.id + "-cancel-btn", disabled: false, handler: this.onCancel, scope: this}];
    if (this.enableEditDetails !== false) {
        a.unshift({xtype: "tbtext", itemId: this.id + "-details-btn", text: '<a href="#" class="' + this.editDetailsLinkClass + '">' + this.detailsLinkText + "</a>"})
    }
    return a
}, onRender                                               : function (b, a) {
    this.formPanel = Ext.create("Ext.FormPanel", Ext.applyIf({fieldDefaults: {labelWidth: this.labelWidth}, items: this.getFormItemConfigs()}, this.formPanelConfig));
    this.add(this.formPanel);
    this.callParent(arguments)
}, getFormItemConfigs                                     : function () {
    var a = [
        {xtype: "textfield", itemId: this.id + "-title", name: Extensible.calendar.data.EventMappings.Title.name, fieldLabel: this.titleLabelText, anchor: "100%"},
        {xtype: "extensible.daterangefield", itemId: this.id + "-dates", name: "dates", anchor: "95%", singleLine: true, fieldLabel: this.datesLabelText}
    ];
    if (this.calendarStore) {
        a.push({xtype: "extensible.calendarcombo", itemId: this.id + "-calendar", name: Extensible.calendar.data.EventMappings.CalendarId.name, anchor: "100%", fieldLabel: this.calendarLabelText, store: this.calendarStore})
    }
    return a
}, afterRender                                            : function () {
    this.callParent(arguments);
    this.el.addCls("ext-cal-event-win");
    this.initRefs();
    var a = this.getDockedItems("toolbar")[0].items.items[0];
    if (a.el.hasCls("x-component-default")) {
        Ext.destroy(a)
    }
}, initRefs                                               : function () {
    this.saveButton = this.down("#" + this.id + "-save-btn");
    this.deleteButton = this.down("#" + this.id + "-delete-btn");
    this.cancelButton = this.down("#" + this.id + "-cancel-btn");
    this.detailsButton = this.down("#" + this.id + "-details-btn");
    if (this.detailsButton) {
        this.detailsButton.getEl().on("click", this.onEditDetailsClick, this)
    }
    this.titleField = this.down("#" + this.id + "-title");
    this.dateRangeField = this.down("#" + this.id + "-dates");
    this.calendarField = this.down("#" + this.id + "-calendar")
}, onEditDetailsClick                                     : function (a) {
    a.stopEvent();
    this.updateRecord(this.activeRecord, true);
    this.fireEvent("editdetails", this, this.activeRecord, this.animateTarget)
}, show                                                   : function (g, f) {
    var c = this, e = Extensible.calendar.data.EventMappings, b, d;
    c.animateTarget = (Ext.isIE8 && Ext.isStrict) ? null : f;
    c.callParent([c.animateTarget, function () {
        c.titleField.focus(false, 100)
    }, c]);
    b = c.formPanel.form;
    c.deleteButton[g.data && g.data[e.EventId.name] ? "show" : "hide"]();
    if (g.data) {
        d = g;
        c.setTitle(d.phantom ? c.titleTextAdd : c.titleTextEdit);
        b.loadRecord(d)
    } else {
        c.setTitle(c.titleTextAdd);
        var h = g[e.StartDate.name], a = g[e.EndDate.name] || Extensible.Date.add(h, {hours: 1});
        d = Ext.create("Extensible.calendar.data.EventModel");
        d.data[e.StartDate.name] = h;
        d.data[e.EndDate.name] = a;
        d.data[e.IsAllDay.name] = !!g[e.IsAllDay.name] || (h.getDate() !== Extensible.Date.add(a, {millis: 1}).getDate());
        d.data[e.CalendarId.name] = c.calendarStore ? c.calendarStore.getAt(0).data[Extensible.calendar.data.CalendarMappings.CalendarId.name] : "";
        if (e.Duration) {
            d.data[e.Duration.name] = Extensible.Date.diff(h, a, Extensible.calendar.data.EventModel.resolution)
        }
        b.reset();
        b.loadRecord(d)
    }
    if (e.RInstanceStartDate) {
        d.data[e.RInstanceStartDate.name] = d.getStartDate()
    }
    c.dateRangeField.setValue(d.data);
    c.activeRecord = d;
    b.getFields().each(function (i) {
        i.resetOriginalValue()
    });
    return c
}, roundTime                                              : function (b, c) {
    c = c || 15;
    var a = parseInt(b.getMinutes(), 10);
    return b.add("mi", c - (a % c))
}, onCancel                                               : function () {
    this.cleanup(true);
    this.fireEvent("eventcancel", this, this.activeRecord, this.animateTarget)
}, cleanup                                                : function (a) {
    if (this.activeRecord) {
        this.activeRecord.reject()
    }
    delete this.activeRecord;
    if (a === true) {
        this.hide()
    }
}, updateRecord                                           : function (f, m) {
    var h = f.fields, j = this.formPanel.getForm().getValues(), a = Extensible.calendar.data.EventMappings, c, e = {}, i;
    h.each(function (n) {
        c = n.name;
        if (c in j) {
            e[c] = j[c]
        }
    });
    var b = this.dateRangeField.getValue(), k = e[a.IsAllDay.name] = b[2], d = k ? Extensible.Date.clearTime(b[0]) : b[0], g = k ? Extensible.Date.clearTime(b[1]) : b[1], l = {days: 1};
    l[Extensible.calendar.data.EventModel.resolution] = -1;
    e[a.StartDate.name] = d;
    e[a.EndDate.name] = k ? Extensible.Date.add(g, l) : g;
    if (a.Duration) {
        e[a.Duration.name] = Extensible.Date.diff(d, e[a.EndDate.name], Extensible.calendar.data.EventModel.resolution)
    }
    f.beginEdit();
    f.set(e);
    if (!m || !i) {
        f.endEdit()
    }
    return f.dirty || (f.phantom && this.allowDefaultAdd)
}, onSave                                                 : function () {
    var c = this, b = c.formPanel.form, a = c.activeRecord.isRecurring();
    if (!b.isDirty() && !c.allowDefaultAdd) {
        c.onCancel();
        return
    }
    if (!b.isValid()) {
        return
    }
    if (!c.updateRecord(c.activeRecord)) {
        c.onCancel();
        return
    }
    if (c.activeRecord.phantom) {
        c.fireEvent("eventadd", c, c.activeRecord, c.animateTarget)
    } else {
        if (a) {
            c.onRecurrenceUpdate()
        } else {
            c.fireEvent("eventupdate", c, c.activeRecord, c.animateTarget)
        }
    }
}, onRecurrenceUpdate                                     : function () {
    Extensible.form.recurrence.RangeEditWindow.prompt({callback: this.onRecurrenceEditModeSelected, scope: this})
}, onRecurrenceEditModeSelected                           : function (b) {
    var a = this;
    if (b) {
        a.activeRecord.data[Extensible.calendar.data.EventMappings.REditMode.name] = b;
        a.fireEvent("eventupdate", a, a.activeRecord, a.animateTarget)
    }
}, onDelete                                               : function () {
    this.fireEvent("eventdelete", this, this.activeRecord, this.animateTarget)
}});
Ext.define("Extensible.calendar.view.AbstractCalendar", {extend: "Ext.Component", requires: ["Ext.CompositeElement", "Extensible.calendar.form.EventDetails", "Extensible.calendar.form.EventWindow", "Extensible.calendar.menu.Event", "Extensible.calendar.dd.DragZone", "Extensible.calendar.dd.DropZone", "Extensible.form.recurrence.RangeEditWindow"], recurrence: false, recurrenceOptions: {expansionMode: "remote", expansionParam: {name: "singleEvents", value: true}}, startDay: 0, spansHavePriority: false, trackMouseOver: true, enableFx: true, enableAddFx: true, enableUpdateFx: false, enableRemoveFx: true, enableDD: true, enableContextMenus: true, suppressBrowserContextMenu: false, monitorResize: true, todayText: "Today", ddCreateEventText: "Create event for {0}", ddCopyEventText: "Copy event to {0}", ddMoveEventText: "Move event to {0}", ddResizeEventText: "Update event to {0}", defaultEventTitleText: "(No title)", dateParamStart: "startDate", dateParamEnd: "endDate", dateParamFormat: "Y-m-d", editModal: false, enableEditDetails: true, weekendCls: "ext-cal-day-we", prevMonthCls: "ext-cal-day-prev", nextMonthCls: "ext-cal-day-next", todayCls: "ext-cal-day-today", hideMode: "offsets", notifyOnExceptionTitle: "Server Error", notifyOnExceptionText: "The action failed with the following response:", notifyOnExceptionDefaultMessage: "An unknown error occurred", weekCount: 1, dayCount: 1, eventSelector: ".ext-cal-evt", eventSelectorDepth: 10, eventOverClass: "ext-evt-over", eventElIdDelimiter: "-evt-", dayElIdDelimiter: "-day-", recurringInstanceIdDelimiter: "-rid-", getEventBodyMarkup: Ext.emptyFn, getEventTemplate: Ext.emptyFn, initComponent: function () {
    this.setStartDate(this.startDate || new Date());
    this.callParent(arguments);
    if (this.readOnly === true) {
        this.addCls("ext-cal-readonly")
    }
    this.addEvents({eventsrendered: true, eventclick: true, eventover: true, eventout: true, beforedatechange: true, datechange: true, rangeselect: true, beforeeventcopy: true, eventcopy: true, beforeeventmove: true, eventmove: true, initdrag: true, dayover: true, dayout: true, editdetails: true, eventadd: true, eventupdate: true, eventcancel: true, beforeeventdelete: true, eventdelete: true, eventexception: true})
}, afterRender                                                 : function () {
    this.callParent(arguments);
    this.renderTemplate();
    if (this.store) {
        this.setStore(this.store, true);
        if (this.store.deferLoad) {
            this.reloadStore(this.store.deferLoad);
            delete this.store.deferLoad
        } else {
            this.store.initialParams = this.getStoreParams()
        }
    }
    if (this.calendarStore) {
        this.setCalendarStore(this.calendarStore, true)
    }
    this.on("resize", this.onResize, this);
    this.el.on({mouseover: this.onMouseOver, mouseout: this.onMouseOut, click: this.onClick, scope: this});
    if (this.enableContextMenus && this.readOnly !== true) {
        this.el.on("contextmenu", this.onContextMenu, this)
    }
    this.el.unselectable();
    if (this.enableDD && this.readOnly !== true && this.initDD) {
        this.initDD()
    }
    this.on("eventsrendered", this.onEventsRendered);
    Ext.defer(this.forceSize, 100, this)
}, getStoreDateParams                                          : function () {
    var a = {};
    a[this.dateParamStart] = Ext.Date.format(this.viewStart, this.dateParamFormat);
    a[this.dateParamEnd] = Ext.Date.format(this.viewEnd, this.dateParamFormat);
    return a
}, getStoreParams                                              : function () {
    var a = this.getStoreDateParams();
    return a
}, reloadStore                                                 : function (b) {
    Extensible.log("reloadStore");
    var a = this.recurrenceOptions;
    b = Ext.isObject(b) ? b : {};
    b.params = b.params || {};
    Ext.apply(b.params, this.getStoreParams());
    if (this.recurrence && a.expansionParam && a.expansionMode === "remote") {
        b.params[a.expansionParam.name] = a.expansionParam.value
    }
    this.store.load(b)
}, onEventsRendered                                            : function () {
    this.forceSize()
}, forceSize                                                   : function () {
    var b = this.el;
    if (b && b.down) {
        var e = b.down(".ext-cal-hd-ct"), c = b.down(".ext-cal-body-ct");
        if (!c || !e) {
            return
        }
        var a = e.getHeight(), d = b.parent().getSize();
        c.setHeight(d.height - a)
    }
}, refresh                                                     : function (a) {
    if (!this.isActiveView()) {
        Extensible.log("refresh (AbstractCalendar), skipped for non-active view (" + this.id + ")");
        return
    }
    Extensible.log("refresh (AbstractCalendar), reload = " + a);
    if (a === true) {
        this.reloadStore()
    } else {
        this.prepareData();
        this.renderTemplate();
        this.renderItems()
    }
}, getWeekCount                                                : function () {
    var a = Extensible.Date.diffDays(this.viewStart, this.viewEnd);
    return Math.ceil(a / this.dayCount)
}, prepareData                                                 : function () {
    var c = Ext.Date.getLastDateOfMonth(this.startDate), g = 0, e = 0, j = 0, f = Ext.Date.clone(this.viewStart), a = this.weekCount < 1 ? 6 : this.weekCount;
    this.eventGrid = [
        []
    ];
    this.allDayGrid = [
        []
    ];
    this.evtMaxCount = [];
    var b = this.store.queryBy(function (d) {
        return this.isEventVisible(d.data)
    }, this);
    var i = function (n) {
        var m = Extensible.calendar.data.EventMappings, k = Ext.Date.clearTime(n.data[m.StartDate.name], true), l = f.getTime() === k.getTime(), d = (g === 0 && e === 0 && (f > n.data[m.StartDate.name]));
        return l || d
    };
    for (; g < a; g++) {
        this.evtMaxCount[g] = this.evtMaxCount[g] || 0;
        if (this.weekCount === -1 && f > c) {
            break
        }
        this.eventGrid[g] = this.eventGrid[g] || [];
        this.allDayGrid[g] = this.allDayGrid[g] || [];
        for (e = 0; e < this.dayCount; e++) {
            if (b.getCount() > 0) {
                var h = b.filterBy(i, this);
                this.sortEventRecordsForDay(h);
                this.prepareEventGrid(h, g, e)
            }
            f = Extensible.Date.add(f, {days: 1})
        }
    }
    this.currentWeekCount = g
}, prepareEventGrid                                            : function (b, a, h) {
    var f = this, g = 0, e = Ext.Date.clone(f.viewStart), c;
    b.each(function (i) {
        var j = Extensible.calendar.data.EventMappings;
        if (Extensible.Date.diffDays(i.data[j.StartDate.name], i.data[j.EndDate.name]) > 0) {
            var d = Extensible.Date.diffDays(Extensible.Date.max(f.viewStart, i.data[j.StartDate.name]), Extensible.Date.min(f.viewEnd, i.data[j.EndDate.name])) + 1;
            f.prepareEventGridSpans(i, f.eventGrid, a, h, d);
            f.prepareEventGridSpans(i, f.allDayGrid, a, h, d, true)
        } else {
            g = f.findEmptyRowIndex(a, h);
            f.eventGrid[a][h] = f.eventGrid[a][h] || [];
            f.eventGrid[a][h][g] = i;
            if (i.data[j.IsAllDay.name]) {
                g = f.findEmptyRowIndex(a, h, true);
                f.allDayGrid[a][h] = f.allDayGrid[a][h] || [];
                f.allDayGrid[a][h][g] = i
            }
        }
        f.setMaxEventsForDay(a, h);
        return true
    }, f)
}, setMaxEventsForDay                                          : function (d, c) {
    var a = (this.maxEventsPerDay + 1) || 999;
    var b = this[this.isHeaderView ? "allDayGrid" : "eventGrid"][d][c] || [];
    this.evtMaxCount[d] = this.evtMaxCount[d] || 0;
    if (b.length && this.evtMaxCount[d] < b.length) {
        this.evtMaxCount[d] = Math.min(a, b.length)
    }
}, prepareEventGridSpans                                       : function (i, a, h, g, j, k) {
    var f = h, b = g, l = this.findEmptyRowIndex(h, g, k), e = Ext.Date.clone(this.viewStart);
    var c = {event: i, isSpan: true, isSpanStart: true, spanLeft: false, spanRight: (g === 6)};
    a[h][g] = a[h][g] || [];
    a[h][g][l] = c;
    this.setMaxEventsForDay(h, g);
    while (--j) {
        e = Extensible.Date.add(e, {days: 1});
        if (e > this.viewEnd) {
            break
        }
        if (++b > 6) {
            b = 0;
            f++;
            l = this.findEmptyRowIndex(f, 0)
        }
        a[f] = a[f] || [];
        a[f][b] = a[f][b] || [];
        a[f][b][l] = {event: i, isSpan: true, isSpanStart: (b === 0), spanLeft: (f > h) && (b % 7 === 0), spanRight: (b === 6) && (j > 1)};
        this.setMaxEventsForDay(f, b)
    }
}, findEmptyRowIndex                                           : function (c, h, b) {
    var g = b ? this.allDayGrid : this.eventGrid, e = g[c] ? g[c][h] || [] : [], f = 0, a = e.length;
    for (; f < a; f++) {
        if (e[f] === null) {
            return f
        }
    }
    return a
}, renderTemplate                                              : function () {
    if (this.tpl) {
        this.tpl.overwrite(this.el, this.getTemplateParams());
        this.lastRenderStart = Ext.Date.clone(this.viewStart);
        this.lastRenderEnd = Ext.Date.clone(this.viewEnd)
    }
}, getTemplateParams                                           : function () {
    return{viewStart: this.viewStart, viewEnd: this.viewEnd, startDate: this.startDate, dayCount: this.dayCount, weekCount: this.weekCount, weekendCls: this.weekendCls, prevMonthCls: this.prevMonthCls, nextMonthCls: this.nextMonthCls, todayCls: this.todayCls}
}, disableStoreEvents                                          : function () {
    this.monitorStoreEvents = false;
    return this
}, enableStoreEvents                                           : function (a) {
    this.monitorStoreEvents = true;
    if (a === true) {
        this.refresh()
    }
    return this
}, onResize                                                    : function () {
    this.refresh(false)
}, onInitDrag                                                  : function () {
    this.fireEvent("initdrag", this)
}, onEventDrop                                                 : function (c, a, b) {
    this[(b || "move") + "Event"](c, a)
}, onCalendarEndDrag                                           : function (e, a, d) {
    this.dragPending = true;
    var c = {}, b = Ext.bind(this.onCalendarEndDragComplete, this, [d]);
    c[Extensible.calendar.data.EventMappings.StartDate.name] = e;
    c[Extensible.calendar.data.EventMappings.EndDate.name] = a;
    if (this.fireEvent("rangeselect", this, c, b) !== false) {
        this.showEventEditor(c, null);
        if (this.editWin) {
            this.editWin.on("hide", b, this, {single: true})
        } else {
            b()
        }
    } else {
        this.onCalendarEndDragComplete(b)
    }
}, onCalendarEndDragComplete                                   : function (a) {
    a();
    this.dragPending = false
}, storeReloadRequired                                         : function (b, a) {
    return a.records[0].isRecurring()
}, onUpdate                                                    : function (c, b, a) {
    if (this.hidden === true || this.monitorStoreEvents === false) {
        return
    }
    if (a === Ext.data.Record.COMMIT) {
        Extensible.log("onUpdate");
        this.dismissEventEditor();
        this.refresh(this.storeReloadRequired("update", b));
        var d = b.records[0];
        if (this.enableFx && this.enableUpdateFx) {
            this.doUpdateFx(this.getEventEls(d.data[Extensible.calendar.data.EventMappings.EventId.name]), {scope: this})
        }
    }
}, doUpdateFx                                                  : function (a, b) {
    this.highlightEvent(a, null, b)
}, onAdd                                                       : function (b, a) {
    var c = a.records[0];
    if (this.hidden === true || this.monitorStoreEvents === false) {
        return
    }
    Extensible.log("onAdd");
    this.dismissEventEditor();
    this.refresh(this.storeReloadRequired("create", a))
}, doAddFx                                                     : function (a, b) {
    a.fadeIn(Ext.apply(b, {duration: 2000}))
}, onRemove                                                    : function (b, a) {
    if (this.hidden === true || this.monitorStoreEvents === false) {
        return
    }
    Extensible.log("onRemove");
    this.dismissEventEditor();
    var d = this.storeReloadRequired("delete", a), c = a.records[0];
    if (this.enableFx && this.enableRemoveFx) {
        this.doRemoveFx(this.getEventEls(c.data[Extensible.calendar.data.EventMappings.EventId.name]), {remove: true, scope: this, callback: Ext.bind(this.refresh, this, [d])})
    } else {
        this.getEventEls(c.data[Extensible.calendar.data.EventMappings.EventId.name]).remove();
        this.refresh(d)
    }
}, doRemoveFx                                                  : function (a, b) {
    if (a.getCount() === 0 && Ext.isFunction(b.callback)) {
        b.callback.call(b.scope || this)
    } else {
        a.fadeOut(b)
    }
}, highlightEvent                                              : function (c, b, d) {
    if (this.enableFx) {
        if (Ext.isIE || Ext.isOpera) {
            var a;
            c.each(function (f) {
                f.highlight(b, Ext.applyif({attr: "color"}, d));
                var e = f.down(".ext-cal-evm");
                if (e) {
                    e.highlight(b, d)
                }
            }, this)
        } else {
            c.highlight(b, d)
        }
    }
}, getEventIdFromEl                                            : function (c) {
    c = Ext.get(c);
    var d, e = "", a, b = c.dom.className.split(" ");
    Ext.each(b, function (f) {
        d = f.split(this.eventElIdDelimiter);
        if (d.length > 1) {
            e = d[1];
            return false
        }
    }, this);
    return e
}, getEventId                                                  : function (a) {
    if (a === undefined && this.tempEventId) {
        a = this.tempEventId
    }
    return a
}, getEventSelectorCls                                         : function (c, a) {
    var d = a ? "." : "", e = this.getEventId(c), b = d + this.id + this.eventElIdDelimiter + e;
    return b
}, getEventEls                                                 : function (b) {
    var a = this.el.select(this.getEventSelectorCls(this.getEventId(b), true), false);
    return Ext.create("Ext.CompositeElement", a)
}, isToday                                                     : function () {
    var a = Ext.Date.clearTime(new Date()).getTime();
    return this.viewStart.getTime() <= a && this.viewEnd.getTime() >= a
}, isEventVisible                                              : function (c) {
    var h = Extensible.calendar.data.EventMappings, e = c.data || c, b = this.calendarStore ? this.calendarStore.findRecord(h.CalendarId.name, c[h.CalendarId.name]) : null;
    if (b && b.data[Extensible.calendar.data.CalendarMappings.IsHidden.name] === true) {
        return false
    }
    var g = this.viewStart.getTime(), a = this.viewEnd.getTime(), f = e[h.StartDate.name].getTime(), d = e[h.EndDate.name].getTime();
    return Extensible.Date.rangesOverlap(g, a, f, d)
}, isOverlapping                                               : function (k, j) {
    var i = k.data ? k.data : k, h = j.data ? j.data : j, e = Extensible.calendar.data.EventMappings, c = i[e.StartDate.name].getTime(), f = Extensible.Date.add(i[e.EndDate.name], {seconds: -1}).getTime(), b = h[e.StartDate.name].getTime(), d = Extensible.Date.add(h[e.EndDate.name], {seconds: -1}).getTime(), g = Extensible.Date.diff(i[e.StartDate.name], h[e.StartDate.name], "m");
    if (f < c) {
        f = c
    }
    if (d < b) {
        d = b
    }
    var m = Extensible.Date.rangesOverlap(c, f, b, d), l = this.minEventDisplayMinutes || 0, a = l > 0 && (g > -l && g < l);
    return(m || a)
}, isEventSpanning                                             : function (a) {
    var d = Extensible.calendar.data.EventMappings, b = a.data || a, c;
    c = Extensible.Date.diffDays(b[d.StartDate.name], b[d.EndDate.name]);
    return c > 0
}, getDayEl                                                    : function (a) {
    return Ext.get(this.getDayId(a))
}, getDayId                                                    : function (a) {
    if (Ext.isDate(a)) {
        a = Ext.Date.format(a, "Ymd")
    }
    return this.id + this.dayElIdDelimiter + a
}, getStartDate                                                : function () {
    return this.startDate
}, setStartDate                                                : function (h, f) {
    var e = this;
    Extensible.log("setStartDate (base) " + Ext.Date.format(h, "Y-m-d"));
    var c = Ext.Date.clone, b = e.startDate ? c(e.startDate) : null, d = c(h), a = e.viewStart ? c(e.viewStart) : null, g = e.viewEnd ? c(e.viewEnd) : null;
    if (e.fireEvent("beforedatechange", e, b, d, a, g) !== false) {
        e.startDate = Ext.Date.clearTime(h);
        e.setViewBounds(h);
        if (e.ownerCalendarPanel && e.ownerCalendarPanel.startDate !== e.startDate) {
            e.ownerCalendarPanel.startDate = e.startDate
        }
        if (e.rendered) {
            e.refresh(f)
        }
        e.fireEvent("datechange", e, c(e.startDate), c(e.viewStart), c(e.viewEnd))
    }
}, setViewBounds                                               : function (a) {
    var c = this, f = a || c.startDate, e = f.getDay() - c.startDay, d = Extensible.Date;
    if (e < 0) {
        e += 7
    }
    switch (this.weekCount) {
        case 0:
        case 1:
            c.viewStart = c.dayCount < 7 && !c.startDayIsStatic ? f : d.add(f, {days: -e, clearTime: true});
            c.viewEnd = d.add(c.viewStart, {days: c.dayCount || 7, seconds: -1});
            return;
        case -1:
            f = Ext.Date.getFirstDateOfMonth(f);
            e = f.getDay() - c.startDay;
            if (e < 0) {
                e += 7
            }
            c.viewStart = d.add(f, {days: -e, clearTime: true});
            var b = d.add(f, {months: 1, seconds: -1});
            e = c.startDay;
            if (e > b.getDay()) {
                e -= 7
            }
            c.viewEnd = d.add(b, {days: 6 - b.getDay() + e});
            return;
        default:
            c.viewStart = d.add(f, {days: -e, clearTime: true});
            c.viewEnd = d.add(c.viewStart, {days: c.weekCount * 7, seconds: -1})
    }
}, getViewBounds                                               : function () {
    return{start: this.viewStart, end: this.viewEnd}
}, sortEventRecordsForDay                                      : function (a) {
    if (a.length < 2) {
        return
    }
    a.sortBy(Ext.bind(function (f, e) {
        var d = f.data, c = e.data, h = Extensible.calendar.data.EventMappings;
        if (d[h.IsAllDay.name]) {
            return -1
        } else {
            if (c[h.IsAllDay.name]) {
                return 1
            }
        }
        if (this.spansHavePriority) {
            var g = Extensible.Date.diffDays;
            if (g(d[h.StartDate.name], d[h.EndDate.name]) > 0) {
                if (g(c[h.StartDate.name], c[h.EndDate.name]) > 0) {
                    if (d[h.StartDate.name].getTime() === c[h.StartDate.name].getTime()) {
                        return c[h.EndDate.name].getTime() - d[h.EndDate.name].getTime()
                    }
                    return d[h.StartDate.name].getTime() - c[h.StartDate.name].getTime()
                }
                return -1
            } else {
                if (g(c[h.StartDate.name], c[h.EndDate.name]) > 0) {
                    return 1
                }
            }
            return d[h.StartDate.name].getTime() - c[h.StartDate.name].getTime()
        } else {
            return d[h.StartDate.name].getTime() - c[h.StartDate.name].getTime()
        }
    }, this))
}, moveTo                                                      : function (b, a) {
    if (Ext.isDate(b)) {
        this.setStartDate(b, a);
        return this.startDate
    }
    return b
}, moveNext                                                    : function (a) {
    return this.moveTo(Extensible.Date.add(this.viewEnd, {days: 1}), a)
}, movePrev                                                    : function (a) {
    var b = Extensible.Date.diffDays(this.viewStart, this.viewEnd) + 1;
    return this.moveDays(-b, a)
}, moveMonths                                                  : function (b, a) {
    return this.moveTo(Extensible.Date.add(this.startDate, {months: b}), a)
}, moveWeeks                                                   : function (b, a) {
    return this.moveTo(Extensible.Date.add(this.startDate, {days: b * 7}), a)
}, moveDays                                                    : function (b, a) {
    return this.moveTo(Extensible.Date.add(this.startDate, {days: b}), a)
}, moveToday                                                   : function (a) {
    return this.moveTo(new Date(), a)
}, setStore                                                    : function (a, b) {
    var c = this.store;
    if (!b && c) {
        c.un("load", this.onEventStoreLoad, this);
        c.un("clear", this.refresh, this);
        c.un("write", this.onWrite, this);
        c.getProxy().un("exception", this.onException, this)
    }
    if (a) {
        a.on("load", this.onEventStoreLoad, this);
        a.on("clear", this.refresh, this);
        a.on("write", this.onWrite, this);
        a.getProxy().on("exception", this.onException, this)
    }
    this.store = a
}, onEventStoreLoad                                            : function (a, b, c) {
    Extensible.log("AbstractCalendar.onEventStoreLoad: store loaded");
    this.refresh(false)
}, onDataChanged                                               : this.onEventStoreLoad, onException: function (c, b, a) {
    Ext.each(a.records, function (d) {
        if (d.dirty) {
            if (d.phantom) {
                d.unjoin(this.eventStore)
            } else {
                d.reject()
            }
        }
    }, this);
    if (this.fireEvent("eventexception", this, b, a) !== false) {
        this.notifyOnException(b, a)
    }
}, getExceptionMessage                                         : function (a) {
    var b = "";
    if (a.responseText) {
        b += "<br><b>responseText</b>: " + Ext.decode(a.responseText).message
    }
    if (a.message) {
        b += "<br><b>message</b>: " + a.message
    }
    if (a.status) {
        b += "<br><b>status</b>: " + a.status
    }
    if (a.statusText) {
        b += "<br><b>statusText</b>: " + a.statusText
    }
    return b || ("<br>" + this.notifyOnExceptionDefaultMessage)
}, notifyOnException                                           : function (b, a) {
    Ext.Msg.alert(this.notifyOnExceptionTitle, this.notifyOnExceptionText + "<br>" + this.getExceptionMessage(b))
}, setCalendarStore                                            : function (a, b) {
    if (!b && this.calendarStore) {
        this.calendarStore.un("datachanged", this.refresh, this);
        this.calendarStore.un("add", this.refresh, this);
        this.calendarStore.un("remove", this.refresh, this);
        this.calendarStore.un("update", this.refresh, this)
    }
    if (a) {
        a.on("datachanged", this.refresh, this);
        a.on("add", this.refresh, this);
        a.on("remove", this.refresh, this);
        a.on("update", this.refresh, this)
    }
    this.calendarStore = a
}, getEventRecord                                              : function (b) {
    var a = this.store.find(Extensible.calendar.data.EventMappings.EventId.name, b, 0, false, true, true);
    return this.store.getAt(a)
}, getEventRecordFromEl                                        : function (a) {
    return this.getEventRecord(this.getEventIdFromEl(a))
}, getEventEditor                                              : function () {
    this.editWin = this.editWin || Ext.WindowMgr.get("ext-cal-editwin");
    if (!this.editWin) {
        this.editWin = Ext.create("Extensible.calendar.form.EventWindow", {id: "ext-cal-editwin", calendarStore: this.calendarStore, modal: this.editModal, enableEditDetails: this.enableEditDetails, listeners: {eventadd: {fn: function (c, d, b, a) {
            c.currentView.onEventEditorAdd(null, d, a)
        }, scope                                                                                                                                                                                                                : this}, eventupdate: {fn: function (c, d, b, a) {
            c.currentView.onEventEditorUpdate(null, d, a)
        }, scope                                                                                                                                                                                                                                         : this}, eventdelete: {fn: function (c, d, b, a) {
            c.currentView.onEventEditorDelete(null, d, a)
        }, scope                                                                                                                                                                                                                                                                  : this}, editdetails: {fn: function (c, d, b, a) {
            c.animateTarget = null;
            c.hide();
            c.currentView.fireEvent("editdetails", c.currentView, d)
        }, scope                                                                                                                                                                                                                                                                                           : this}, eventcancel: {fn: function (b, c, a) {
            this.dismissEventEditor(null, a);
            b.currentView.onEventEditorCancel()
        }, scope                                                                                                                                                                                                                                                                                                                    : this}}})
    }
    this.editWin.currentView = this;
    return this.editWin
}, showEventEditor                                             : function (b, a) {
    this.getEventEditor().show(b, a, this);
    return this
}, dismissEventEditor                                          : function (b, c) {
    if (this.newRecord && this.newRecord.phantom) {
        this.store.remove(this.newRecord)
    }
    delete this.newRecord;
    var a = Ext.WindowMgr.get("ext-cal-editwin");
    if (a) {
        a[b ? b : "hide"](c)
    }
    return this
}, save                                                        : function () {
    if (!this.store.autoSync) {
        this.store.sync()
    }
}, onWrite                                                     : function (b, a) {
    if (a.wasSuccessful()) {
        switch (a.action) {
            case"create":
                this.onAdd(b, a);
                break;
            case"update":
                this.onUpdate(b, a, Ext.data.Record.COMMIT);
                break;
            case"destroy":
                this.onRemove(b, a);
                break
        }
    }
}, onEventEditorAdd                                            : function (a, b) {
    this.newRecord = b;
    if (this.store.indexOf(b) === -1) {
        this.store.add(b)
    }
    this.save();
    this.fireEvent("eventadd", this, b)
}, onEventEditorUpdate                                         : function (a, b) {
    this.save();
    this.fireEvent("eventupdate", this, b)
}, onEventEditorDelete                                         : function (a, b) {
    b._deleting = true;
    this.deleteEvent(b)
}, onEventEditorCancel                                         : function (a, b) {
    this.fireEvent("eventcancel", this, b)
}, onDayClick                                                  : function (c, b, a) {
    if (this.readOnly === true) {
        return
    }
    if (this.fireEvent("dayclick", this, Ext.Date.clone(c), b, a) !== false) {
        var e = Extensible.calendar.data.EventMappings, d = {};
        d[e.StartDate.name] = c;
        d[e.IsAllDay.name] = b;
        this.showEventEditor(d, a)
    }
}, showEventMenu                                               : function (a, c) {
    var b = this;
    if (!b.eventMenu) {
        b.eventMenu = Ext.create("Extensible.calendar.menu.Event", {listeners: {editdetails: Ext.bind(b.onEditDetails, b), eventdelete: Ext.bind(b.onDeleteEvent, b), eventmove: Ext.bind(b.onMoveEvent, b), eventcopy: Ext.bind(b.onCopyEvent, b)}})
    }
    b.eventMenu.showForEvent(b.getEventRecordFromEl(a), a, c);
    b.menuActive = true
}, onCopyEvent                                                 : function (c, b, a) {
    this.menuActive = false;
    this.shiftEvent(b, a, "copy")
}, onMoveEvent                                                 : function (c, b, a) {
    this.menuActive = false;
    this.shiftEvent(b, a, "move")
}, copyEvent                                                   : function (b, a) {
    this.shiftEvent(b, a, "copy")
}, moveEvent                                                   : function (b, a) {
    this.shiftEvent(b, a, "move")
}, shiftEvent                                                  : function (d, c, e) {
    var b = this, a;
    if (e === "move") {
        if (Extensible.Date.compare(d.getStartDate(), c) === 0) {
            return
        }
        a = d
    } else {
        a = d.clone()
    }
    if (b.fireEvent("beforeevent" + e, b, a, Ext.Date.clone(c)) !== false) {
        if (a.isRecurring()) {
            b.onRecurrenceEditModeSelected("single", a, c, e)
        } else {
            b.doShiftEvent(a, c, e)
        }
    }
}, onRecurrenceEditModeSelected                                : function (b, d, a, e) {
    var c = Extensible.calendar.data.EventMappings;
    if (b) {
        if (e === "copy") {
            d.clearRecurrence()
        }
        d.data[c.REditMode.name] = b;
        d.data[c.RInstanceStartDate.name] = d.getStartDate();
        this.doShiftEvent(d, a, e)
    }
}, doShiftEvent                                                : function (e, b, f) {
    var d = Extensible.calendar.data.EventMappings, c = b.getTime() - e.getStartDate().getTime(), a = {};
    a[d.StartDate.name] = b;
    a[d.EndDate.name] = Extensible.Date.add(e.getEndDate(), {millis: c});
    e.set(a);
    if (e.phantom) {
        this.store.add(e)
    }
    this.save();
    this.fireEvent("event" + f, this, e)
}, onEditDetails                                               : function (c, b, a) {
    this.fireEvent("editdetails", this, b, a);
    this.menuActive = false
}, onDeleteEvent                                               : function (c, b, a) {
    b._deleting = true;
    this.deleteEvent(b, a);
    this.menuActive = false
}, deleteEvent                                                 : function (c, a) {
    var b = this;
    if (b.fireEvent("beforeeventdelete", b, c, a) !== false) {
        if (c.isRecurring()) {
            Extensible.form.recurrence.RangeEditWindow.prompt({callback: Ext.bind(b.onRecurrenceDeleteModeSelected, b, [c, a], true), scope: b})
        } else {
            b.doDeleteEvent(c, a)
        }
    }
}, onRecurrenceDeleteModeSelected                              : function (b, c, a) {
    if (b) {
        c.data[Extensible.calendar.data.EventMappings.REditMode.name] = b;
        c.data[Extensible.calendar.data.EventMappings.RInstanceStartDate.name] = c.getStartDate();
        this.doDeleteEvent(c, a)
    }
}, doDeleteEvent                                               : function (b, a) {
    this.store.remove(b);
    this.save();
    this.fireEvent("eventdelete", this, b, a)
}, onContextMenu                                               : function (d, b) {
    var c = d.getTarget(this.eventSelector, 5, true), a = false;
    if (c) {
        this.dismissEventEditor().showEventMenu(c, d.getXY());
        a = true
    }
    if (a || this.suppressBrowserContextMenu === true) {
        d.preventDefault()
    }
}, onClick                                                     : function (d, a) {
    var c = this, b = d.getTarget(c.eventSelector, 5);
    if (c.dropZone) {
        c.dropZone.clearShims()
    }
    if (c.menuActive === true) {
        c.menuActive = false;
        return true
    }
    if (b) {
        var g = c.getEventIdFromEl(b), f = c.getEventRecord(g);
        if (f && c.fireEvent("eventclick", c, f, b) !== false) {
            if (c.readOnly !== true) {
                c.showEventEditor(f, b)
            }
        }
        return true
    }
}, onMouseOver                                                 : function (b, a) {
    if (this.trackMouseOver !== false && (this.dragZone === undefined || !this.dragZone.dragging)) {
        if (!this.handleEventMouseEvent(b, a, "over")) {
            this.handleDayMouseEvent(b, a, "over")
        }
    }
}, onMouseOut                                                  : function (b, a) {
    if (this.trackMouseOver !== false && (this.dragZone === undefined || !this.dragZone.dragging)) {
        if (!this.handleEventMouseEvent(b, a, "out")) {
            this.handleDayMouseEvent(b, a, "out")
        }
    }
}, handleEventMouseEvent                                       : function (g, c, f) {
    var d = g.getTarget(this.eventSelector, this.eventSelectorDepth, true);
    if (d) {
        var a = Ext.get(g.getRelatedTarget());
        if (d === a || d.contains(a)) {
            return true
        }
        var h = this.getEventIdFromEl(d);
        if (this.eventOverClass !== "") {
            var b = this.getEventEls(h);
            b[f === "over" ? "addCls" : "removeCls"](this.eventOverClass)
        }
        this.fireEvent("event" + f, this, this.getEventRecord(h), d);
        return true
    }
    return false
}, getDateFromId                                               : function (c, b) {
    var a = c.split(b);
    return a[a.length - 1]
}, handleDayMouseEvent                                         : function (i, d, g) {
    d = i.getTarget("td", 3);
    if (d) {
        if (d.id && d.id.indexOf(this.dayElIdDelimiter) > -1) {
            var h = this.getDateFromId(d.id, this.dayElIdDelimiter), a = Ext.get(i.getRelatedTarget()), c, b;
            if (a) {
                c = a.is("td") ? a : a.up("td", 3);
                b = c && c.id ? this.getDateFromId(c.id, this.dayElIdDelimiter) : ""
            }
            if (!a || h !== b) {
                var f = this.getDayEl(h);
                if (f && this.dayOverClass !== "") {
                    f[g === "over" ? "addCls" : "removeCls"](this.dayOverClass)
                }
                this.fireEvent("day" + g, this, Ext.Date.parseDate(h, "Ymd"), f)
            }
        }
    }
}, renderItems                                                 : function () {
    throw"This method must be implemented by a subclass"
}, isActiveView                                                : function () {
    var a = this.ownerCalendarPanel;
    return(a && a.getActiveView().id === this.id)
}, destroy                                                     : function () {
    this.callParent(arguments);
    if (this.el) {
        this.el.un("contextmenu", this.onContextMenu, this)
    }
    Ext.destroy(this.editWin, this.eventMenu, this.dragZone, this.dropZone)
}});
Ext.define("Extensible.calendar.view.MonthDayDetail", {extend: "Ext.Component", alias: "widget.extensible.monthdaydetailview", requires: ["Ext.XTemplate", "Extensible.calendar.view.AbstractCalendar"], initComponent: function () {
    this.callParent(arguments);
    this.addEvents({eventsrendered: true})
}, afterRender                                               : function () {
    this.tpl = this.getTemplate();
    this.callParent(arguments);
    this.el.on({click: this.view.onClick, mouseover: this.view.onMouseOver, mouseout: this.view.onMouseOut, scope: this.view})
}, getTemplate                                               : function () {
    if (!this.tpl) {
        this.tpl = Ext.create("Ext.XTemplate", '<div class="ext-cal-mdv x-unselectable">', '<table class="ext-cal-mvd-tbl" cellpadding="0" cellspacing="0">', "<tbody>", '<tpl for=".">', '<tr><td class="ext-cal-ev">{markup}</td></tr>', "</tpl>", "</tbody>", "</table>", "</div>")
    }
    this.tpl.compile();
    return this.tpl
}, update                                                    : function (a) {
    this.date = a;
    this.refresh()
}, refresh                                                   : function () {
    if (!this.rendered) {
        return
    }
    var a = this.view.getEventTemplate(), b = [];
    evts = this.store.queryBy(function (d) {
        var f = Ext.Date.clearTime(this.date, true).getTime(), i = Extensible.calendar.data.EventMappings, h = Ext.Date.clearTime(d.data[i.StartDate.name], true).getTime(), e = (f == h), g = false, k = d.data[i.CalendarId.name], c = this.calendarStore ? this.calendarStore.getById(k) : null;
        if (c && c.data[Extensible.calendar.data.CalendarMappings.IsHidden.name] === true) {
            return false
        }
        if (!e) {
            var j = Ext.Date.clearTime(d.data[i.EndDate.name], true).getTime();
            g = h < f && j >= f
        }
        return e || g
    }, this);
    Extensible.calendar.view.AbstractCalendar.prototype.sortEventRecordsForDay.call(this, evts);
    evts.each(function (c) {
        var d = c.data, e = Extensible.calendar.data.EventMappings;
        d._renderAsAllDay = d[e.IsAllDay.name] || Extensible.Date.diffDays(d[e.StartDate.name], d[e.EndDate.name]) > 0;
        d.spanLeft = Extensible.Date.diffDays(d[e.StartDate.name], this.date) > 0;
        d.spanRight = Extensible.Date.diffDays(this.date, d[e.EndDate.name]) > 0;
        d.spanCls = (d.spanLeft ? (d.spanRight ? "ext-cal-ev-spanboth" : "ext-cal-ev-spanleft") : (d.spanRight ? "ext-cal-ev-spanright" : ""));
        b.push({markup: a.apply(this.getTemplateEventData(d))})
    }, this);
    this.tpl.overwrite(this.el, b);
    this.fireEvent("eventsrendered", this, this.date, evts.getCount())
}, getTemplateEventData                                      : function (a) {
    var b = this.view.getTemplateEventData(a);
    b._elId = "dtl-" + b._elId;
    return b
}});
Ext.define("Extensible.calendar.view.Month", {extend: "Extensible.calendar.view.AbstractCalendar", alias: "widget.extensible.monthview", requires: ["Ext.XTemplate", "Extensible.calendar.template.Month", "Extensible.calendar.util.WeekEventRenderer", "Extensible.calendar.view.MonthDayDetail"], moreText: "+{0} more...", detailsTitleDateFormat: "F j", showTime: true, showTodayText: true, showHeader: false, showWeekLinks: false, showWeekNumbers: false, weekLinkOverClass: "ext-week-link-over", morePanelMinWidth: 220, daySelector: ".ext-cal-day", moreSelector: ".ext-cal-ev-more", weekLinkSelector: ".ext-cal-week-link", weekCount: -1, dayCount: 7, moreElIdDelimiter: "-more-", weekLinkIdDelimiter: "ext-cal-week-", initComponent: function () {
    this.callParent(arguments);
    this.addEvents({dayclick: true, weekclick: true, dayover: true, dayout: true})
}, initDD                                           : function () {
    var a = {view: this, createText: this.ddCreateEventText, copyText: this.ddCopyEventText, moveText: this.ddMoveEventText, ddGroup: this.ddGroup || this.id + "-MonthViewDD"};
    this.dragZone = Ext.create("Extensible.calendar.dd.DragZone", this.el, a);
    this.dropZone = Ext.create("Extensible.calendar.dd.DropZone", this.el, a)
}, onDestroy                                        : function () {
    Ext.destroy(this.ddSelector);
    Ext.destroy(this.dragZone);
    Ext.destroy(this.dropZone);
    this.callParent(arguments)
}, afterRender                                      : function () {
    if (!this.tpl) {
        this.tpl = Ext.create("Extensible.calendar.template.Month", {id: this.id, showTodayText: this.showTodayText, todayText: this.todayText, showTime: this.showTime, showHeader: this.showHeader, showWeekLinks: this.showWeekLinks, showWeekNumbers: this.showWeekNumbers});
        this.tpl.compile()
    }
    this.addCls("ext-cal-monthview ext-cal-ct");
    this.callParent(arguments)
}, onResize                                         : function () {
    if (this.monitorResize) {
        this.maxEventsPerDay = this.getMaxEventsPerDay();
        this.refresh(false)
    }
}, forceSize                                        : function () {
    if (this.showWeekLinks && this.el) {
        var e = this.el.down(".ext-cal-hd-days-tbl"), d = this.el.select(".ext-cal-bg-tbl"), c = this.el.select(".ext-cal-evt-tbl"), b = this.el.down(".ext-cal-week-link").getWidth(), a = this.el.getWidth() - b;
        e.setWidth(a);
        d.setWidth(a);
        c.setWidth(a)
    }
    this.callParent(arguments)
}, initClock                                        : function () {
    if (Ext.fly(this.id + "-clock") !== null) {
        this.prevClockDay = new Date().getDay();
        if (this.clockTask) {
            Ext.TaskManager.stop(this.clockTask)
        }
        this.clockTask = Ext.TaskManager.start({run: function () {
            var b = Ext.fly(this.id + "-clock"), a = new Date();
            if (a.getDay() == this.prevClockDay) {
                if (b) {
                    b.update(Ext.Date.format(a, Extensible.Date.use24HourTime ? "G:i" : "g:ia"))
                }
            } else {
                this.prevClockDay = a.getDay();
                this.moveTo(a)
            }
        }, scope                                   : this, interval: 1000})
    }
}, getMoreText                                      : function (a) {
    return this.moreText
}, getEventBodyMarkup                               : function () {
    if (!this.eventBodyMarkup) {
        this.eventBodyMarkup = ["{Title}", '<tpl if="_isReminder">', '<i class="ext-cal-ic ext-cal-ic-rem">&#160;</i>', "</tpl>", '<tpl if="_isRecurring">', '<i class="ext-cal-ic ext-cal-ic-rcr">&#160;</i>', "</tpl>", '<tpl if="spanLeft">', '<i class="ext-cal-spl">&#160;</i>', "</tpl>", '<tpl if="spanRight">', '<i class="ext-cal-spr">&#160;</i>', "</tpl>"].join("")
    }
    return this.eventBodyMarkup
}, getEventTemplate                                 : function () {
    if (!this.eventTpl) {
        var b, a = this.getEventBodyMarkup();
        b = !(Ext.isIE || Ext.isOpera) ? Ext.create("Ext.XTemplate", '<div class="{_extraCls} {spanCls} ext-cal-evt ext-cal-evr">', a, "</div>") : Ext.create("Ext.XTemplate", '<tpl if="_renderAsAllDay">', '<div class="{_extraCls} {spanCls} ext-cal-evt ext-cal-evo">', '<div class="ext-cal-evm">', '<div class="ext-cal-evi">', "</tpl>", '<tpl if="!_renderAsAllDay">', '<div class="{_extraCls} ext-cal-evt ext-cal-evr">', "</tpl>", a, '<tpl if="_renderAsAllDay">', "</div>", "</div>", "</tpl>", "</div>");
        b.compile();
        this.eventTpl = b
    }
    return this.eventTpl
}, getTemplateEventData                             : function (i) {
    var g = Extensible.calendar.data.EventMappings, e = [this.getEventSelectorCls(i[g.EventId.name])], f = {}, b = i[g.RRule.name] != "", a = "x-cal-default", h = i[g.Title.name], c = Extensible.Date.use24HourTime ? "G:i " : "g:ia ";
    if (this.calendarStore && i[g.CalendarId.name]) {
        var d = this.calendarStore.findRecord(Extensible.calendar.data.CalendarMappings.CalendarId.name, i[g.CalendarId.name]);
        if (d) {
            a = "x-cal-" + d.data[Extensible.calendar.data.CalendarMappings.ColorId.name]
        }
    }
    a += (i._renderAsAllDay ? "-ad" : "");
    e.push(a);
    if (i._renderAsAllDay) {
        e.push("ext-evt-block")
    }
    if (this.getEventClass) {
        var d = this.getEventRecord(i[g.EventId.name]), j = this.getEventClass(d, !!i._renderAsAllDay, f, this.store);
        e.push(j)
    }
    f._extraCls = e.join(" ");
    f._isRecurring = i[g.RRule.name] && i[g.RRule.name] != "";
    f._isReminder = i[g.Reminder.name] && i[g.Reminder.name] != "";
    f.Title = (i[g.IsAllDay.name] ? "" : Ext.Date.format(i[g.StartDate.name], c)) + (!h || h.length == 0 ? this.defaultEventTitleText : h);
    return Ext.applyIf(f, i)
}, refresh                                          : function (a) {
    Extensible.log("refresh (MonthView)");
    if (this.detailPanel) {
        this.detailPanel.hide()
    }
    this.callParent(arguments);
    if (this.showTime !== false) {
        this.initClock()
    }
}, renderItems                                      : function () {
    Extensible.calendar.util.WeekEventRenderer.render({eventGrid: this.allDayOnly ? this.allDayGrid : this.eventGrid, viewStart: this.viewStart, tpl: this.getEventTemplate(), maxEventsPerDay: this.maxEventsPerDay, viewId: this.id, templateDataFn: Ext.bind(this.getTemplateEventData, this), evtMaxCount: this.evtMaxCount, weekCount: this.weekCount, dayCount: this.dayCount, getMoreText: Ext.bind(this.getMoreText, this)});
    this.fireEvent("eventsrendered", this)
}, getDayEl                                         : function (a) {
    return Ext.get(this.getDayId(a))
}, getDayId                                         : function (a) {
    if (Ext.isDate(a)) {
        a = Ext.Date.format(a, "Ymd")
    }
    return this.id + this.dayElIdDelimiter + a
}, getWeekIndex                                     : function (b) {
    var a = this.getDayEl(b).up(".ext-cal-wk-ct");
    return parseInt(a.id.split("-wk-")[1])
}, getDaySize                                       : function (f) {
    var c = this.el.getBox(), e = this.getViewPadding(), a = (c.width - e.width) / this.dayCount, b = (c.height - e.height) / this.getWeekCount();
    if (f) {
        var d = this.el.select(".ext-cal-dtitle").last().parent("tr");
        b = d ? b - d.getHeight(true) : b
    }
    return{height: b, width: a}
}, getEventHeight                                   : function () {
    if (!this.eventHeight) {
        var a = this.el.select(".ext-cal-evt").first();
        if (a) {
            this.eventHeight = a.parent("td").getHeight()
        } else {
            return 16
        }
    }
    return this.eventHeight
}, getMaxEventsPerDay                               : function () {
    var b = this.getDaySize(true).height, c = this.getEventHeight(), a = Math.max(Math.floor((b - c) / c), 0);
    return a
}, getViewPadding                                   : function (d) {
    var d = d || "tlbr", f = d.indexOf("t") > -1, e = d.indexOf("l") > -1, b = d.indexOf("r") > -1, a = this.showHeader && f ? this.el.select(".ext-cal-hd-days-tbl").first().getHeight() : 0, c = 0;
    if (this.isHeaderView) {
        if (e) {
            c = this.el.select(".ext-cal-gutter").first().getWidth()
        }
        if (b) {
            c += this.el.select(".ext-cal-gutter-rt").first().getWidth()
        }
    } else {
        if (this.showWeekLinks && e) {
            c = this.el.select(".ext-cal-week-link").first().getWidth()
        }
    }
    return{height: a, width: c}
}, getDayAt                                         : function (h, e) {
    var c = this.el.getBox(), f = this.getViewPadding("tl"), g = this.getDaySize(), d = Math.floor(((h - c.x - f.width) / g.width)), b = Math.floor(((e - c.y - f.height) / g.height)), i = (b * 7) + d, a = Extensible.Date.add(this.viewStart, {days: i});
    return{date: a, el: this.getDayEl(a)}
}, moveNext                                         : function () {
    return this.moveMonths(1, true)
}, movePrev                                         : function () {
    return this.moveMonths(-1, true)
}, onInitDrag                                       : function () {
    this.callParent(arguments);
    Ext.select(this.daySelector).removeCls(this.dayOverClass);
    if (this.detailPanel) {
        this.detailPanel.hide()
    }
}, onMoreClick                                      : function (a) {
    if (!this.detailPanel) {
        this.detailPanel = Ext.create("Ext.Panel", {id: this.id + "-details-panel", title: Ext.Date.format(a, this.detailsTitleDateFormat), layout: "fit", floating: true, renderTo: Ext.getBody(), hideMode: "offsets", tools: [
            {type: "close", handler: function (d, b, c) {
                c.ownerCt.hide()
            }}
        ], items                                      : {xtype: "extensible.monthdaydetailview", id: this.id + "-details-view", date: a, view: this, store: this.store, calendarStore: this.calendarStore, listeners: {eventsrendered: Ext.bind(this.onDetailViewUpdated, this)}}});
        if (this.enableContextMenus && this.readOnly !== true) {
            this.detailPanel.body.on("contextmenu", this.onContextMenu, this)
        }
    } else {
        this.detailPanel.setTitle(Ext.Date.format(a, this.detailsTitleDateFormat))
    }
    this.detailPanel.getComponent(this.id + "-details-view").update(a)
}, onDetailViewUpdated                              : function (i, b, j) {
    var a = this.detailPanel, g = this.getDayEl(b), f = g.getBox(), m = a.el.down(".ext-cal-mdv").getHeight(), e = a.getDockedItems("header")[0], d = a.frameSize || {top: 0, bottom: 0}, c = d.top + d.bottom + e.getHeight(), l = m + c + 5, k = Ext.getBody().getHeight() - 20, h = Math.min(l, k);
    if (h === k) {
        a.body.addCls("ext-cal-overflow-y")
    } else {
        a.body.removeCls("ext-cal-overflow-y")
    }
    a.setWidth(Math.max(f.width, this.morePanelMinWidth));
    a.setHeight(h);
    a.show();
    a.getPositionEl().alignTo(g, "t-t?")
}, onHide                                           : function () {
    this.callParent(arguments);
    if (this.detailPanel) {
        this.detailPanel.hide()
    }
}, onClick                                          : function (d, a) {
    if (this.detailPanel) {
        this.detailPanel.hide()
    }
    if (el = d.getTarget(this.moreSelector, 3)) {
        var b = el.id.split(this.moreElIdDelimiter)[1];
        this.onMoreClick(Ext.Date.parseDate(b, "Ymd"));
        return
    }
    if (el = d.getTarget(this.weekLinkSelector, 3)) {
        var b = el.id.split(this.weekLinkIdDelimiter)[1];
        this.fireEvent("weekclick", this, Ext.Date.parseDate(b, "Ymd"));
        return
    }
    if (Extensible.calendar.view.Month.superclass.onClick.apply(this, arguments)) {
        return
    }
    if (el = d.getTarget("td", 3)) {
        if (el.id && el.id.indexOf(this.dayElIdDelimiter) > -1) {
            var c = el.id.split(this.dayElIdDelimiter), b = c[c.length - 1];
            this.onDayClick(Ext.Date.parseDate(b, "Ymd"), false, Ext.get(this.getDayId(b)));
            return
        }
    }
}, handleDayMouseEvent                              : function (d, a, c) {
    var b = d.getTarget(this.weekLinkSelector, 3, true);
    if (b) {
        b[c == "over" ? "addCls" : "removeCls"](this.weekLinkOverClass);
        return
    }
    this.callParent(arguments)
}, destroy                                          : function () {
    this.callParent(arguments);
    if (this.detailsPanel) {
        this.detailPanel.body.un("contextmenu", this.onContextMenu, this)
    }
}});
Ext.define("Extensible.calendar.view.DayHeader", {extend: "Extensible.calendar.view.Month", alias: "widget.extensible.dayheaderview", requires: ["Extensible.calendar.template.DayHeader"], weekCount: 1, dayCount: 1, allDayOnly: true, monitorResize: false, isHeaderView: true, afterRender: function () {
    if (!this.tpl) {
        this.tpl = Ext.create("Extensible.calendar.template.DayHeader", {id: this.id, showTodayText: this.showTodayText, todayText: this.todayText, showTime: this.showTime})
    }
    this.tpl.compile();
    this.addCls("ext-cal-day-header");
    this.callParent(arguments)
}, forceSize                                            : Ext.emptyFn, refresh: function (a) {
    Extensible.log("refresh (DayHeaderView)");
    this.callParent(arguments);
    this.recalcHeaderBox()
}, recalcHeaderBox                                      : function () {
    var b = this.el.down(".ext-cal-evt-tbl"), a = b.getHeight();
    this.el.setHeight(a + 7);
    this.el.down(".ext-cal-hd-ad-inner").setHeight(a + 5);
    this.el.down(".ext-cal-bg-tbl").setHeight(a + 5)
}, moveNext                                             : function () {
    return this.moveDays(this.dayCount, false)
}, movePrev                                             : function () {
    return this.moveDays(-this.dayCount, false)
}, onClick                                              : function (d, a) {
    if (el = d.getTarget("td", 3)) {
        if (el.id && el.id.indexOf(this.dayElIdDelimiter) > -1) {
            var c = el.id.split(this.dayElIdDelimiter), b = c[c.length - 1];
            this.onDayClick(Ext.Date.parseDate(b, "Ymd"), true, Ext.get(this.getDayId(b, true)));
            return
        }
    }
    this.callParent(arguments)
}, isActiveView                                         : function () {
    var a = this.ownerCalendarPanel;
    return(a && a.getActiveView().isDayView)
}});
Ext.define("Extensible.calendar.view.DayBody", {extend: "Extensible.calendar.view.AbstractCalendar", alias: "widget.extensible.daybodyview", requires: ["Ext.XTemplate", "Extensible.calendar.template.DayBody", "Extensible.calendar.data.EventMappings", "Extensible.calendar.dd.DayDragZone", "Extensible.calendar.dd.DayDropZone"], dayColumnElIdDelimiter: "-day-col-", hourIncrement: 60, initComponent: function () {
    this.callParent(arguments);
    if (this.readOnly === true) {
        this.enableEventResize = false
    }
    this.incrementsPerHour = this.hourIncrement / this.ddIncrement;
    this.minEventHeight = this.minEventDisplayMinutes / (this.hourIncrement / this.hourHeight);
    this.addEvents({beforeeventresize: true, eventresize: true, dayclick: true})
}, initDD                                             : function () {
    var a = {view: this, createText: this.ddCreateEventText, copyText: this.ddCopyEventText, moveText: this.ddMoveEventText, resizeText: this.ddResizeEventText, ddIncrement: this.ddIncrement, ddGroup: this.ddGroup || this.id + "-DayViewDD"};
    this.el.ddScrollConfig = {vthresh: Ext.isIE || Ext.isOpera ? 100 : 40, hthresh: -1, frequency: 50, increment: 100, ddGroup: this.ddGroup || this.id + "-DayViewDD"};
    this.dragZone = Ext.create("Extensible.calendar.dd.DayDragZone", this.el, Ext.apply({}, a));
    this.dropZone = Ext.create("Extensible.calendar.dd.DayDropZone", this.el, a)
}, refresh                                            : function (a) {
    Extensible.log("refresh (DayBodyView)");
    var b = this.el.getScroll().top;
    this.callParent(arguments);
    if (this.scrollReady) {
        this.scrollTo(b)
    }
}, scrollTo                                           : function (b, a) {
    a = a || (Ext.isIE || Ext.isOpera);
    if (a) {
        Ext.defer(function () {
            this.el.scrollTo("top", b);
            this.scrollReady = true
        }, 10, this)
    } else {
        this.el.scrollTo("top", b);
        this.scrollReady = true
    }
}, afterRender                                        : function () {
    if (!this.tpl) {
        this.tpl = Ext.create("Extensible.calendar.template.DayBody", {id: this.id, dayCount: this.dayCount, showTodayText: this.showTodayText, todayText: this.todayText, showTime: this.showTime, showHourSeparator: this.showHourSeparator, viewStartHour: this.viewStartHour, viewEndHour: this.viewEndHour, hourIncrement: this.hourIncrement, hourHeight: this.hourHeight})
    }
    this.tpl.compile();
    this.addCls("ext-cal-body-ct");
    this.callParent(arguments);
    var b = Math.max(this.scrollStartHour, this.viewStartHour), a = Math.max(0, b - this.viewStartHour);
    if (a > 0) {
        this.scrollTo(a * this.hourHeight)
    }
}, forceSize                                          : Ext.emptyFn, onEventResize: function (e, b) {
    var a = this, d = Extensible.calendar.data.EventMappings, c = Extensible.Date.compare;
    if (c(e.getStartDate(), b[d.StartDate.name]) === 0 && c(e.getEndDate(), b[d.EndDate.name]) === 0) {
        return
    }
    if (a.fireEvent("beforeeventresize", a, e, b) !== false) {
        if (e.isRecurring()) {
            if (a.recurrenceOptions.editSingleOnResize) {
                a.onRecurrenceResizeModeSelected("single", e, b)
            } else {
                Extensible.form.recurrence.RangeEditWindow.prompt({callback: Ext.bind(a.onRecurrenceResizeModeSelected, a, [e, b], true), scope: a})
            }
        } else {
            a.doEventResize(e, b)
        }
    }
}, onRecurrenceResizeModeSelected                     : function (b, d, a) {
    var c = Extensible.calendar.data.EventMappings;
    if (b) {
        d.data[c.REditMode.name] = b;
        d.data[c.RInstanceStartDate.name] = d.getStartDate();
        this.doEventResize(d, a)
    }
}, doEventResize                                      : function (e, c) {
    var d = Extensible.calendar.data.EventMappings, b = d.StartDate.name, f = d.EndDate.name, a = {};
    a[b] = c[b];
    a[f] = c[f];
    if (d.Duration) {
        a[d.Duration.name] = Extensible.Date.diff(c[b], c[f], Extensible.calendar.data.EventModel.resolution)
    }
    e.set(a);
    this.save();
    this.fireEvent("eventupdate", this, e);
    this.fireEvent("eventresize", this, e)
}, getEventBodyMarkup                                 : function () {
    if (!this.eventBodyMarkup) {
        this.eventBodyMarkup = ["{Title}", '<tpl if="_isReminder">', '<i class="ext-cal-ic ext-cal-ic-rem">&#160;</i>', "</tpl>", '<tpl if="_isRecurring">', '<i class="ext-cal-ic ext-cal-ic-rcr">&#160;</i>', "</tpl>"].join("")
    }
    return this.eventBodyMarkup
}, getEventTemplate                                   : function () {
    if (!this.eventTpl) {
        this.eventTpl = !(Ext.isIE || Ext.isOpera) ? Ext.create("Ext.XTemplate", '<div id="{_elId}" class="{_extraCls} ext-cal-evt ext-cal-evr" ', 'style="left: {_left}%; width: {_width}%; top: {_top}px; height: {_height}px;">', '<div class="ext-evt-bd">', this.getEventBodyMarkup(), "</div>", this.enableEventResize ? '<div class="ext-evt-rsz"><div class="ext-evt-rsz-h">&#160;</div></div>' : "", "</div>") : Ext.create("Ext.XTemplate", '<div id="{_elId}" class="ext-cal-evt {_extraCls}" ', 'style="left: {_left}%; width: {_width}%; top: {_top}px;">', '<div class="ext-cal-evb">&#160;</div>', '<dl style="height: {_height}px;" class="ext-cal-evdm">', '<dd class="ext-evt-bd">', this.getEventBodyMarkup(), "</dd>", this.enableEventResize ? '<div class="ext-evt-rsz"><div class="ext-evt-rsz-h">&#160;</div></div>' : "", "</dl>", '<div class="ext-cal-evb">&#160;</div>', "</div>");
        this.eventTpl.compile()
    }
    return this.eventTpl
}, getEventAllDayTemplate                             : function () {
    if (!this.eventAllDayTpl) {
        var b, a = this.getEventBodyMarkup();
        b = !(Ext.isIE || Ext.isOpera) ? Ext.create("Ext.XTemplate", '<div class="{_extraCls} {spanCls} ext-cal-evt ext-cal-evr" ', 'style="left: {_left}%; width: {_width}%; top: {_top}px; height: {_height}px;">', a, "</div>") : Ext.create("Ext.XTemplate", '<div class="ext-cal-evt" ', 'style="left: {_left}%; width: {_width}%; top: {_top}px; height: {_height}px;">', '<div class="{_extraCls} {spanCls} ext-cal-evo">', '<div class="ext-cal-evm">', '<div class="ext-cal-evi">', a, "</div>", "</div>", "</div>", "</div>");
        b.compile();
        this.eventAllDayTpl = b
    }
    return this.eventAllDayTpl
}, getTemplateEventData                               : function (i) {
    var g = Extensible.calendar.data.EventMappings, e = [this.getEventSelectorCls(i[g.EventId.name])], f = {}, a = "x-cal-default", h = i[g.Title.name], c = Extensible.Date.use24HourTime ? "G:i " : "g:ia ", b = i[g.RRule.name] !== "", d;
    this.getTemplateEventBox(i);
    if (this.calendarStore && i[g.CalendarId.name]) {
        d = this.calendarStore.findRecord(Extensible.calendar.data.CalendarMappings.CalendarId.name, i[g.CalendarId.name]);
        if (d) {
            a = "x-cal-" + d.data[Extensible.calendar.data.CalendarMappings.ColorId.name]
        }
    }
    a += (i._renderAsAllDay ? "-ad" : "") + (Ext.isIE || Ext.isOpera ? "-x" : "");
    e.push(a);
    e.push("ext-evt-block");
    if (this.getEventClass) {
        d = this.getEventRecord(i[g.EventId.name]);
        var j = this.getEventClass(d, !!i._renderAsAllDay, f, this.store);
        e.push(j)
    }
    f._extraCls = e.join(" ");
    f._isRecurring = i[g.RRule.name] && i[g.RRule.name] !== "";
    f._isReminder = i[g.Reminder.name] && i[g.Reminder.name] !== "";
    f.Title = (i[g.IsAllDay.name] ? "" : Ext.Date.format(i[g.StartDate.name], c)) + (!h || h.length === 0 ? this.defaultEventTitleText : h);
    return Ext.applyIf(f, i)
}, getEventPositionOffsets                            : function () {
    return{top: 0, height: -1}
}, getTemplateEventBox                                : function (i) {
    var c = this.hourHeight / this.hourIncrement, b = i[Extensible.calendar.data.EventMappings.StartDate.name], d = i[Extensible.calendar.data.EventMappings.EndDate.name], g = Math.max(b.getHours() - this.viewStartHour, 0), h = Math.min(d.getHours() - this.viewStartHour, this.viewEndHour - this.viewStartHour), a = g * this.hourIncrement, e = h * this.hourIncrement, j = Extensible.Date.add(Ext.Date.clone(d), {hours: this.viewEndHour, clearTime: true}), f = this.getEventPositionOffsets();
    if (b.getHours() >= this.viewStartHour) {
        a += b.getMinutes()
    }
    if (d <= j) {
        e += d.getMinutes()
    }
    i._left = 0;
    i._width = 100;
    i._top = a * c + f.top;
    i._height = Math.max(((e - a) * c), this.minEventHeight) + f.height
}, renderItems                                        : function () {
    var q = 0, k, e = [];
    for (; q < this.dayCount; q++) {
        var v = 0, a = 0, y = 0, w = this.eventGrid[0][q], c = w ? w.length : 0;
        for (; v < c; v++) {
            k = w[v];
            if (!k) {
                continue
            }
            var u = k.data || k.event.data, f = Extensible.calendar.data.EventMappings, x = u[f.IsAllDay.name] === true, p = this.isEventSpanning(k.event || k), g = x || p;
            if (g) {
                continue
            }
            Ext.apply(u, {cls: "ext-cal-ev", _positioned: true});
            e.push({data: this.getTemplateEventData(u), date: Extensible.Date.add(this.viewStart, {days: q})})
        }
    }
    var r = 0, o = 0, s = [], m = e.length, b, n, h;
    for (; r < m; r++) {
        k = e[r].data;
        n = null;
        h = k[Extensible.calendar.data.EventMappings.StartDate.name].getDate();
        for (o = 0; o < m; o++) {
            if (r === o) {
                continue
            }
            n = e[o].data;
            if (this.isOverlapping(k, n)) {
                k._overlap = k._overlap === undefined ? 1 : k._overlap + 1;
                if (r < o) {
                    if (k._overcol === undefined) {
                        k._overcol = 0
                    }
                    n._overcol = k._overcol + 1;
                    s[h] = s[h] ? Math.max(s[h], n._overcol) : n._overcol
                }
            }
        }
    }
    for (r = 0; r < m; r++) {
        k = e[r].data;
        h = k[Extensible.calendar.data.EventMappings.StartDate.name].getDate();
        if (k._overlap !== undefined) {
            var z = 100 / (s[h] + 1), B = 100 - (z * k._overlap);
            k._width = z;
            k._left = z * k._overcol
        }
        var t = this.getEventTemplate().apply(k), A = this.id + "-day-col-" + Ext.Date.format(e[r].date, "Ymd");
        Ext.core.DomHelper.append(A, t)
    }
    this.fireEvent("eventsrendered", this)
}, getDayEl                                           : function (a) {
    return Ext.get(this.getDayId(a))
}, getDayId                                           : function (a) {
    if (Ext.isDate(a)) {
        a = Ext.Date.format(a, "Ymd")
    }
    return this.id + this.dayColumnElIdDelimiter + a
}, getDaySize                                         : function () {
    var a = this.el.down(".ext-cal-day-col-inner").getBox();
    return{height: a.height, width: a.width}
}, getDayAt                                           : function (m, i) {
    var e = ".ext-cal-body-ct", g = this.el.down(".ext-cal-day-times").getWidth(), q = this.el.getBox(), l = this.getDaySize(false), n = m - q.x - g, a = Math.floor(n / l.width), k = this.el.getScroll(), p = this.el.down(".ext-cal-bg-row"), o = p.getHeight() / this.incrementsPerHour, j = i - q.y - o + k.top, h = Math.max(0, Math.ceil(j / o)), b = h * (this.hourIncrement / this.incrementsPerHour), d = Extensible.Date.add(this.viewStart, {days: a, minutes: b, hours: this.viewStartHour}), c = this.getDayEl(d), f = m;
    if (c) {
        f = c.getLeft()
    }
    return{date: d, el: c, timeBox: {x: f, y: (h * this.hourHeight / this.incrementsPerHour) + q.y - k.top, width: l.width, height: o}}
}, onClick                                            : function (f, b) {
    if (this.dragPending || Extensible.calendar.view.DayBody.superclass.onClick.apply(this, arguments)) {
        return
    }
    if (f.getTarget(".ext-cal-day-times", 3) !== null) {
        return
    }
    var c = f.getTarget("td", 3);
    if (c) {
        if (c.id && c.id.indexOf(this.dayElIdDelimiter) > -1) {
            var d = this.getDateFromId(c.id, this.dayElIdDelimiter);
            this.onDayClick(Ext.Date.parseDate(d, "Ymd"), true, Ext.get(this.getDayId(d)));
            return
        }
    }
    var a = this.getDayAt(f.getX(), f.getY());
    if (a && a.date) {
        this.onDayClick(a.date, false, null)
    }
}, isActiveView                                       : function () {
    var a = this.ownerCalendarPanel;
    return(a && a.getActiveView().isDayView)
}});
Ext.define("Extensible.calendar.view.Day", {extend: "Ext.Container", alias: "widget.extensible.dayview", requires: ["Extensible.calendar.view.AbstractCalendar", "Extensible.calendar.view.DayHeader", "Extensible.calendar.view.DayBody"], showTime: true, showTodayText: true, dayCount: 1, enableEventResize: true, ddIncrement: 30, minEventDisplayMinutes: 30, showHourSeparator: true, viewStartHour: 0, viewEndHour: 24, scrollStartHour: 7, hourHeight: 42, hideMode: "offsets", minBodyHeight: 150, isDayView: true, initComponent: function () {
    this.ddCreateEventText = this.ddCreateEventText || Extensible.calendar.view.AbstractCalendar.prototype.ddCreateEventText;
    this.ddMoveEventText = this.ddMoveEventText || Extensible.calendar.view.AbstractCalendar.prototype.ddMoveEventText;
    this.dayCount = this.dayCount > 7 ? 7 : (this.dayCount < 1 ? 1 : this.dayCount);
    var b = Ext.apply({}, this.initialConfig);
    b.showTime = this.showTime;
    b.showTodayText = this.showTodayText;
    b.todayText = this.todayText;
    b.dayCount = this.dayCount;
    b.weekCount = 1;
    b.readOnly = this.readOnly;
    b.ddIncrement = this.ddIncrement;
    b.minEventDisplayMinutes = this.minEventDisplayMinutes;
    var c = Ext.applyIf({xtype: "extensible.dayheaderview", id: this.id + "-hd", ownerCalendarPanel: this.ownerCalendarPanel}, b);
    var a = Ext.applyIf({xtype: "extensible.daybodyview", enableEventResize: this.enableEventResize, showHourSeparator: this.showHourSeparator, viewStartHour: this.viewStartHour, viewEndHour: this.viewEndHour, scrollStartHour: this.scrollStartHour, hourHeight: this.hourHeight, id: this.id + "-bd", ownerCalendarPanel: this.ownerCalendarPanel}, b);
    this.items = [c, a];
    this.addCls("ext-cal-dayview ext-cal-ct");
    this.callParent(arguments)
}, afterRender                                    : function () {
    this.callParent(arguments);
    this.header = Ext.getCmp(this.id + "-hd");
    this.body = Ext.getCmp(this.id + "-bd");
    this.body.on("eventsrendered", this.forceSize, this);
    this.on("resize", this.onResize, this)
}, refresh                                        : function (a) {
    Extensible.log("refresh (DayView)");
    if (a === undefined) {
        a = false
    }
    this.header.refresh(a);
    this.body.refresh(a)
}, forceSize                                      : function () {
    var a = this;
    Ext.defer(function () {
        var b = a.el.up(".x-panel-body"), d = a.el.down(".ext-cal-day-header"), c = b ? b.getHeight() - d.getHeight() : false;
        if (c) {
            if (c < a.minBodyHeight) {
                c = a.minBodyHeight;
                a.addCls("ext-cal-overflow-y")
            } else {
                a.removeCls("ext-cal-overflow-y")
            }
            a.el.down(".ext-cal-body-ct").setHeight(c - 1)
        }
    }, Ext.isIE ? 1 : 0, a)
}, onResize                                       : function () {
    this.forceSize();
    Ext.defer(this.refresh, Ext.isIE ? 1 : 0, this)
}, doHide                                         : function () {
    this.header.doHide.apply(this, arguments);
    this.body.doHide.apply(this, arguments)
}, getViewBounds                                  : function () {
    return this.header.getViewBounds()
}, getStartDate                                   : function () {
    return this.header.getStartDate()
}, setStartDate                                   : function (a) {
    this.header.setStartDate(a, false);
    this.body.setStartDate(a, true)
}, renderItems                                    : function () {
    this.header.renderItems();
    this.body.renderItems()
}, isToday                                        : function () {
    return this.header.isToday()
}, moveTo                                         : function (a) {
    var a = this.header.moveTo(a, false);
    this.body.moveTo(a, true);
    this.forceSize();
    return a
}, moveNext                                       : function () {
    var a = this.header.moveNext(false);
    this.body.moveNext(true);
    this.forceSize();
    return a
}, movePrev                                       : function (b) {
    var a = this.header.movePrev(false);
    this.body.movePrev(true);
    this.forceSize();
    return a
}, moveDays                                       : function (b) {
    var a = this.header.moveDays(b, false);
    this.body.moveDays(b, true);
    this.forceSize();
    return a
}, moveToday                                      : function () {
    var a = this.header.moveToday(false);
    this.body.moveToday(true);
    this.forceSize();
    return a
}, showEventEditor                                : function (b, a) {
    return Extensible.calendar.view.AbstractCalendar.prototype.showEventEditor.apply(this, arguments)
}, dismissEventEditor                             : function (a) {
    return Extensible.calendar.view.AbstractCalendar.prototype.dismissEventEditor.apply(this, arguments)
}});
Ext.define("Extensible.calendar.view.MultiDay", {extend: "Extensible.calendar.view.Day", alias: "widget.extensible.multidayview", dayCount: 3, startDayIsStatic: false, moveNext: function (a) {
    return this.moveDays(this.startDayIsStatic ? 7 : this.dayCount, a)
}, movePrev                                            : function (a) {
    return this.moveDays(this.startDayIsStatic ? -7 : -this.dayCount, a)
}});
Ext.define("Extensible.calendar.view.Week", {extend: "Extensible.calendar.view.MultiDay", alias: "widget.extensible.weekview", dayCount: 7});
Ext.define("Extensible.calendar.view.MultiWeek", {extend: "Extensible.calendar.view.Month", alias: "widget.extensible.multiweekview", weekCount: 2, moveNext: function () {
    return this.moveWeeks(this.weekCount, true)
}, movePrev                                             : function () {
    return this.moveWeeks(-this.weekCount, true)
}});
Ext.define("Extensible.calendar.CalendarPanel", {extend: "Ext.panel.Panel", alias: "widget.extensible.calendarpanel", requires: ["Ext.layout.container.Card", "Extensible.calendar.view.Day", "Extensible.calendar.view.Week", "Extensible.calendar.view.Month", "Extensible.calendar.view.MultiDay", "Extensible.calendar.view.MultiWeek"], recurrence: false, showDayView: true, showMultiDayView: false, showWeekView: true, showMultiWeekView: true, showMonthView: true, showNavBar: true, todayText: "Today", showTodayText: true, showTime: true, readOnly: false, showNavToday: true, showNavJump: true, showNavNextPrev: true, jumpToText: "Jump to:", goText: "Go", dayText: "Day", multiDayText: "{0} Days", weekText: "Week", multiWeekText: "{0} Weeks", monthText: "Month", editModal: false, enableEditDetails: true, layout: {type: "card", deferredRender: true}, startDate: new Date(), initComponent: function () {
    this.tbar = {cls: "ext-cal-toolbar", border: true, items: []};
    this.viewCount = 0;
    var h, b = (this.multiDayViewCfg && this.multiDayViewCfg.dayCount) || 3, f = (this.multiWeekViewCfg && this.multiWeekViewCfg.weekCount) || 2;
    if (this.showNavToday) {
        this.tbar.items.push({id: this.id + "-tb-today", text: this.todayText, handler: this.onTodayClick, scope: this})
    }
    if (this.showNavNextPrev) {
        this.tbar.items.push({id: this.id + "-tb-prev", handler: this.onPrevClick, scope: this, iconCls: "x-tbar-page-prev"});
        this.tbar.items.push({id: this.id + "-tb-next", handler: this.onNextClick, scope: this, iconCls: "x-tbar-page-next"})
    }
    if (this.showNavJump) {
        this.tbar.items.push(this.jumpToText);
        this.tbar.items.push({id: this.id + "-tb-jump-dt", xtype: "datefield", width: 120, showToday: false});
        this.tbar.items.push({id: this.id + "-tb-jump", text: this.goText, handler: this.onJumpClick, scope: this})
    }
    this.tbar.items.push("->");
    if (this.showDayView) {
        this.tbar.items.push({id: this.id + "-tb-day", text: this.dayText, handler: this.onDayNavClick, scope: this, toggleGroup: this.id + "-tb-views"});
        this.viewCount++
    }
    if (this.showMultiDayView) {
        h = Ext.String.format(this.getMultiDayText(b), b);
        this.tbar.items.push({id: this.id + "-tb-multiday", text: h, handler: this.onMultiDayNavClick, scope: this, toggleGroup: this.id + "-tb-views"});
        this.viewCount++
    }
    if (this.showWeekView) {
        this.tbar.items.push({id: this.id + "-tb-week", text: this.weekText, handler: this.onWeekNavClick, scope: this, toggleGroup: this.id + "-tb-views"});
        this.viewCount++
    }
    if (this.showMultiWeekView) {
        h = Ext.String.format(this.getMultiWeekText(f), f);
        this.tbar.items.push({id: this.id + "-tb-multiweek", text: h, handler: this.onMultiWeekNavClick, scope: this, toggleGroup: this.id + "-tb-views"});
        this.viewCount++
    }
    if (this.showMonthView || this.viewCount === 0) {
        this.tbar.items.push({id: this.id + "-tb-month", text: this.monthText, handler: this.onMonthNavClick, scope: this, toggleGroup: this.id + "-tb-views"});
        this.viewCount++;
        this.showMonthView = true
    }
    var g = this.viewCount - 1;
    this.activeItem = (this.activeItem === undefined ? g : (this.activeItem > g ? g : this.activeItem));
    if (this.showNavBar === false) {
        delete this.tbar;
        this.addCls("x-calendar-nonav")
    }
    this.callParent(arguments);
    this.addEvents({eventadd: true, eventupdate: true, beforeeventdelete: true, eventdelete: true, eventcancel: true, viewchange: true, editdetails: true});
    this.addCls("x-cal-panel");
    if (this.eventStore) {
        this.store = this.eventStore;
        delete this.eventStore
    }
    this.setStore(this.store);
    var i = {showToday: this.showToday, todayText: this.todayText, showTodayText: this.showTodayText, showTime: this.showTime, readOnly: this.readOnly, recurrence: this.recurrence, store: this.store, calendarStore: this.calendarStore, editModal: this.editModal, enableEditDetails: this.enableEditDetails, ownerCalendarPanel: this};
    if (this.showDayView) {
        var e = Ext.apply({xtype: "extensible.dayview", title: this.dayText}, i);
        e = Ext.apply(Ext.apply(e, this.viewConfig), this.dayViewCfg);
        e.id = this.id + "-day";
        this.initEventRelay(e);
        this.add(e)
    }
    if (this.showMultiDayView) {
        var a = Ext.apply({xtype: "extensible.multidayview", title: this.getMultiDayText(b)}, i);
        a = Ext.apply(Ext.apply(a, this.viewConfig), this.multiDayViewCfg);
        a.id = this.id + "-multiday";
        this.initEventRelay(a);
        this.add(a)
    }
    if (this.showWeekView) {
        var j = Ext.applyIf({xtype: "extensible.weekview", title: this.weekText}, i);
        j = Ext.apply(Ext.apply(j, this.viewConfig), this.weekViewCfg);
        j.id = this.id + "-week";
        this.initEventRelay(j);
        this.add(j)
    }
    if (this.showMultiWeekView) {
        var d = Ext.applyIf({xtype: "extensible.multiweekview", title: this.getMultiWeekText(f)}, i);
        d = Ext.apply(Ext.apply(d, this.viewConfig), this.multiWeekViewCfg);
        d.id = this.id + "-multiweek";
        this.initEventRelay(d);
        this.add(d)
    }
    if (this.showMonthView) {
        var c = Ext.applyIf({xtype: "extensible.monthview", title: this.monthText, listeners: {weekclick: {fn: function (l, k) {
            this.showWeek(k)
        }, scope                                                                                             : this}}}, i);
        c = Ext.apply(Ext.apply(c, this.viewConfig), this.monthViewCfg);
        c.id = this.id + "-month";
        this.initEventRelay(c);
        this.add(c)
    }
    this.add(Ext.applyIf({xtype: "extensible.eventeditform", id: this.id + "-edit", calendarStore: this.calendarStore, recurrence: this.recurrence, listeners: {eventadd: {scope: this, fn: this.onEventAdd}, eventupdate: {scope: this, fn: this.onEventUpdate}, eventdelete: {scope: this, fn: this.onEventDelete}, eventcancel: {scope: this, fn: this.onEventCancel}}}, this.editViewCfg))
}, initEventRelay                                      : function (a) {
    a.listeners = a.listeners || {};
    a.listeners.afterrender = {fn: function (b) {
        this.relayEvents(b, ["eventsrendered", "eventclick", "dayclick", "eventover", "eventout", "beforedatechange", "datechange", "rangeselect", "beforeeventcopy", "eventcopy", "beforeeventmove", "eventmove", "initdrag", "dayover", "dayout", "beforeeventresize", "eventresize", "eventadd", "eventupdate", "beforeeventdelete", "eventdelete", "eventcancel", "eventexception"]);
        b.on("editdetails", this.onEditDetails, this)
    }, scope                     : this, single: true}
}, afterRender                                         : function () {
    this.callParent(arguments);
    this.body.addCls("x-cal-body");
    this.updateNavState();
    this.setActiveView()
}, getMultiDayText                                     : function (a) {
    return this.multiDayText
}, getMultiWeekText                                    : function (a) {
    return this.multiWeekText
}, setStore                                            : function (a, b) {
    var c = this.store;
    if (!b && c) {
        c.un("write", this.onWrite, this)
    }
    if (a) {
        a.on("write", this.onWrite, this)
    }
    this.store = a
}, onStoreAdd                                          : function (c, b, a) {
    this.hideEditForm()
}, onStoreUpdate                                       : function (b, c, a) {
    if (a === Ext.data.Record.COMMIT) {
        this.hideEditForm()
    }
}, onStoreRemove                                       : function (a, b) {
    this.hideEditForm()
}, onWrite                                             : function (b, a) {
    var c = a.records[0];
    switch (a.action) {
        case"create":
            this.onStoreAdd(b, c);
            break;
        case"update":
            this.onStoreUpdate(b, c, Ext.data.Record.COMMIT);
            break;
        case"destroy":
            this.onStoreRemove(b, c);
            break
    }
}, onEditDetails                                       : function (b, c, a) {
    if (this.fireEvent("editdetails", this, b, c, a) !== false) {
        this.showEditForm(c)
    }
}, save                                                : function () {
    if (!this.store.autoSync) {
        this.store.sync()
    }
}, onEventAdd                                          : function (a, b) {
    if (!b.store) {
        this.store.add(b);
        this.save()
    }
    this.fireEvent("eventadd", this, b)
}, onEventUpdate                                       : function (a, b) {
    this.save();
    this.fireEvent("eventupdate", this, b)
}, onEventDelete                                       : function (a, b) {
    this.store.remove(b);
    this.save();
    this.fireEvent("eventdelete", this, b)
}, onEventCancel                                       : function (a, b) {
    this.hideEditForm();
    this.fireEvent("eventcancel", this, b)
}, showEditForm                                        : function (a) {
    this.preEditView = this.layout.getActiveItem().id;
    this.setActiveView(this.id + "-edit");
    this.layout.getActiveItem().loadRecord(a);
    return this
}, hideEditForm                                        : function () {
    if (this.preEditView) {
        this.setActiveView(this.preEditView);
        delete this.preEditView
    }
    return this
}, setActiveView                                       : function (f, a) {
    var e = this, d = e.layout, b = e.id + "-edit", c;
    if (a) {
        e.startDate = a
    }
    if (f !== d.getActiveItem().id) {
        c = e.getDockedItems("toolbar")[0];
        if (c) {
            c[f === b ? "hide" : "show"]()
        }
        d.setActiveItem(f || e.activeItem);
        e.doComponentLayout();
        e.activeView = d.getActiveItem();
        if (f !== b) {
            if (f && f !== e.preEditView) {
                d.activeItem.setStartDate(e.startDate, true)
            }
            e.updateNavState()
        }
        e.fireViewChange()
    }
}, fireViewChange                                      : function () {
    if (this.layout && this.layout.getActiveItem) {
        var a = this.layout.getActiveItem(), b = Ext.Date.clone;
        if (a) {
            var d;
            if (a.getViewBounds) {
                var c = a.getViewBounds();
                d = {viewStart: b(c.start), viewEnd: b(c.end), activeDate: b(a.getStartDate())}
            }
            if (a.dismissEventEditor) {
                a.dismissEventEditor()
            }
            this.fireEvent("viewchange", this, a, d)
        }
    }
}, updateNavState                                      : function () {
    var b = this, d = b.layout.activeItem;
    if (d && b.showNavBar !== false) {
        var c = d.id.split(b.id + "-")[1], a = Ext.getCmp(b.id + "-tb-" + c);
        if (b.showNavToday) {
            Ext.getCmp(b.id + "-tb-today").setDisabled(d.isToday())
        }
        a.toggle(true)
    }
}, setStartDate                                        : function (a) {
    Extensible.log("setStartDate (CalendarPanel");
    this.startDate = a;
    this.layout.activeItem.setStartDate(a, true);
    this.updateNavState();
    this.fireViewChange();
    return this
}, showWeek                                            : function (a) {
    this.setActiveView(this.id + "-week", a)
}, onTodayClick                                        : function () {
    this.startDate = this.layout.activeItem.moveToday(true);
    this.updateNavState();
    this.fireViewChange()
}, onJumpClick                                         : function () {
    var a = Ext.getCmp(this.id + "-tb-jump-dt").getValue();
    if (a !== "") {
        this.startDate = this.layout.activeItem.moveTo(a, true);
        this.updateNavState();
        this.fireViewChange()
    }
}, onPrevClick                                         : function () {
    this.startDate = this.layout.activeItem.movePrev(true);
    this.updateNavState();
    this.fireViewChange()
}, onNextClick                                         : function () {
    this.startDate = this.layout.activeItem.moveNext(true);
    this.updateNavState();
    this.fireViewChange()
}, onDayNavClick                                       : function () {
    this.setActiveView(this.id + "-day")
}, onMultiDayNavClick                                  : function () {
    this.setActiveView(this.id + "-multiday")
}, onWeekNavClick                                      : function () {
    this.setActiveView(this.id + "-week")
}, onMultiWeekNavClick                                 : function () {
    this.setActiveView(this.id + "-multiweek")
}, onMonthNavClick                                     : function () {
    this.setActiveView(this.id + "-month")
}, getActiveView                                       : function () {
    return this.layout.activeItem
}});