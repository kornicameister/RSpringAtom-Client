<%--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~ This file is part of [SpringAtom] Copyright [kornicameister@gmail.com][2013]                 ~
  ~                                                                                              ~
  ~ [SpringAtom] is free software: you can redistribute it and/or modify                         ~
  ~ it under the terms of the GNU General Public License as published by                         ~
  ~ the Free Software Foundation, either version 3 of the License, or                            ~
  ~ (at your option) any later version.                                                          ~
  ~                                                                                              ~
  ~ [SpringAtom] is distributed in the hope that it will be useful,                              ~
  ~ but WITHOUT ANY WARRANTY; without even the implied warranty of                               ~
  ~ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                                ~
  ~ GNU General Public License for more details.                                                 ~
  ~                                                                                              ~
  ~ You should have received a copy of the GNU General Public License                            ~
  ~ along with [SpringAtom].  If not, see <http://www.gnu.org/licenses/gpl.html>.                ~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--%>

<section class="x-calendar">
    <div id="calendar"></div>
    <div id="x-new-event" class="x-modal">
        <%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
        <s:message code="form.new-event.title" var="formTitle"/>
        <s:url value="/a/d/new/event" var="formURL"/>
        <form id="x-new-event-form"
              action="${formURL}"
              method="post"
              title="${formTitle}"
              class="x-form"
              autocomplete="on">
            <fieldset>
                <legend>Time frame</legend>
                <fieldset>
                    <legend>Begin</legend>
                    <label title="Date"><input type="date" autofocus required></label>
                    <label title="Time"><input type="time" required></label>
                </fieldset>
                <fieldset>
                    <legend>End</legend>
                    <label title="Date"><input type="date" required></label>
                    <label title="Time"><input type="time" required></label>
                </fieldset>
            </fieldset>
            <fieldset>
                <legend>Mechanic</legend>
                <label title="Reporter"><input type="text" placeholder="Reported by..." required/></label>
                <label title="Assignee"><input type="text" placeholder="Assigned to..." required/></label>
            </fieldset>
            <fieldset>
                <legend>Car</legend>
                <label title="Car"><input list="cars" placeholder="Appointment for car..." required/></label>
                <datalist id="cars">
                    <option value="Fiat Panda [E0KRZ]">
                </datalist>
                <label title="Owner"><input type="text" placeholder="Car owned by..." readonly/></label>
            </fieldset>
            <fieldset>
                <legend>Todo list</legend>
                <table class="x-table">
                    <thead class="x-table-header">
                    <tr class="x-table-header-row">
                        <th>ID</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody class="x-table-body">

                    </tbody>
                </table>
            </fieldset>
            <fieldset class="x-form-actions">
                <input type="submit" value="Submit">
                <input type="reset" value="Reset">
            </fieldset>
        </form>
    </div>
</section>
<script>
    $(document).ready(function () {
        function onAjaxSuccess(opt) {
            var $calendar = $('#calendar'),
                    parent = $calendar.parent('.x-calendar'),
                    pHeight = parent.height();
            opt = $.extend({
                header      : {
                    left  : 'prev,next today',
                    center: 'title',
                    right : 'month,agendaWeek,agendaDay'
                },
                weekends    : false,
                weekNumbers : true,
                firstDay    : 1,
                height      : pHeight,
                aspectRatio : 2.2,
                firstHour   : 8,
                minTime     : 7,
                maxTime     : 21,
                selectHelper: true,
                selectable  : true,
                editable    : true,
                dayClick    : function (date, allDay, jsEvent, view) {
                    SA.core.openModal('#x-ew-event');
                },
                eventClick  : function (calEvent, jsEvent, view) {
                    console.log('Event: ' + calEvent.title);
                    console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                    console.log('View: ' + view.name);
                }
            }, opt);
            $calendar.fullCalendar(opt);
        }

        function loadCalendarAjaxly() {
            SA.core.ajax.loadLocalizedPreferences({
                keys    : {
                    'monthNames'     : 'date.months',
                    'dayNames'       : 'date.days',
                    'dayNamesShort'  : 'date.days.short',
                    'monthNamesShort': 'date.months.short'
                },
                pattern : false,
                reversed: true,
                callback: onAjaxSuccess,
                scope   : this
            });
        }

        loadCalendarAjaxly();
    });
</script>