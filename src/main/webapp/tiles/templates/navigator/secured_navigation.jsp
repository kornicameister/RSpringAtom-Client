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

<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<security:authentication property="principal.username" var="userName"/>

<security:authorize access="hasRole('ROLE_CLIENT')" var="isClient"/>
<security:authorize access="hasRole('ROLE_MECHANIC')" var="isMechanic"/>
<security:authorize access="hasRole('ROLE_BOSS')" var="isBoss"/>
<security:authorize access="hasRole('ROLE_ADMIN')" var="isAdmin"/>

<c:if test="${isClient}">
    <tiles:insertAttribute name="dashboard"/>
</c:if>
<c:if test="${isMechanic}">
    <tiles:insertAttribute name="garage"/>
</c:if>
<c:if test="${isBoss}">
    <tiles:insertAttribute name="boss"/>
</c:if>
<c:if test="${isAdmin}">
    <tiles:insertAttribute name="admin"/>
</c:if>