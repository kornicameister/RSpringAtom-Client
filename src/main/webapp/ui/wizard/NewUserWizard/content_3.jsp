<%@ page import="org.springframework.web.bind.annotation.RequestMethod" %>
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

<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="swf" tagdir="/WEB-INF/tags/swf" %>

<div id="sa-wizard-step-body" class="x-wizard-content">
    <swf:renderStepTitle forState="${flowRequestContext.currentState}" cssClass="stepTitle"/>
    <s:eval expression="newUserWizardStep3.formObjectName" var="modelAttribute" scope="page"/>

    <form:form id="${requestScope.formID}"
               action="${flowExecutionUrl}"
               modelAttribute="${modelAttribute}"
               method="<%=RequestMethod.POST.toString().toLowerCase()%>"
               cssClass="x-form">
        <fieldset>
            <legend><s:message code="sperson.contacts"/></legend>
            <div class="x-multiple-input">
                <div class="x-inputs">
                    <ul id="contacts-container">
                        <s:message code="wizard.NewAppointmentWizard.tl.taskType.placeholder" var="placeholder"/>
                        <c:forEach items="contacts" var="contact" varStatus="it">
                            <li id="${it.index}">
                                    <%-- fixed list of available values to be localized --%>
                                <form:select id="${requestScope.formID}-contacts-type"
                                             items="${requestScope.localizedContactsTypes}"
                                             placeholder="${placeholder}"
                                             cssClass="x-input x-input-select"
                                             itemLabel="label"
                                             itemValue="contactType"
                                             path="contacts[${it.index}].type"/>
                                <form:input id="${requestScope.formID}-contacts-contact"
                                            htmlEscape="true"
                                            cssClass="x-input"
                                            path="contacts[${it.index}].contact"/>
                                <a id="mv-add" name="${it.index}" class="x-button x-button-add" href="#">
                                    <i class="fa fa-plus fa-color-black"></i>
                                </a>
                                <a id="mv-remove" name="${it.index}" class="x-button x-button-remove" href="#">
                                    <i class="fa fa-minus fa-color-black"></i>
                                </a>
                            </li>
                        </c:forEach>
                    </ul>
                    <script type="text/javascript" id="mv-multiple-tasks">
                        $(function () {
                            SA.wizard.Helpers.NewAppointmentWizard.handleAddRemoveTask($('ul#contacts-container'));
                        })
                    </script>
                </div>
            </div>
        </fieldset>
        <swf:notificationsBox context="${flowRequestContext}" command="currentFormObject"/>
    </form:form>
</div>
<swf:getDynamicActions forState="${flowRequestContext.currentState}"/>
<swf:getActions forState="${flowRequestContext.currentState}"/>
<swf:applyStepsState forState="${flowRequestContext.currentState}"/>