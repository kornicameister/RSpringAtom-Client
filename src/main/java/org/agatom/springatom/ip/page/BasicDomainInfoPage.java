/**************************************************************************************************
 * This file is part of [SpringAtom] Copyright [kornicameister@gmail.com][2013]                   *
 *                                                                                                *
 * [SpringAtom] is free software: you can redistribute it and/or modify                           *
 * it under the terms of the GNU General Public License as published by                           *
 * the Free Software Foundation, either version 3 of the License, or                              *
 * (at your option) any later version.                                                            *
 *                                                                                                *
 * [SpringAtom] is distributed in the hope that it will be useful,                                *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of                                 *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                                  *
 * GNU General Public License for more details.                                                   *
 *                                                                                                *
 * You should have received a copy of the GNU General Public License                              *
 * along with [SpringAtom].  If not, see <http://www.gnu.org/licenses/gpl.html>.                  *
 **************************************************************************************************/

package org.agatom.springatom.ip.page;

import org.agatom.springatom.ip.DomainInfoPage;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public abstract class BasicDomainInfoPage
        extends BasicInfoPage
        implements DomainInfoPage {
    private Class<?> domainClass;
    private Class<?> repositoryClass;

    @Override
    public Class<?> getDomainClass() {
        return this.domainClass;
    }

    @Override
    public void setDomainClass(final Class<?> domain) {
        this.domainClass = domain;
    }

    @Override
    public Class<?> getRepositoryClass() {
        return this.repositoryClass;
    }

    @Override
    public void setRepositoryClass(final Class<?> repository) {
        this.repositoryClass = repository;
    }
}