/**************************************************************************************************
 * This file is part of [SpringAtom] Copyright [kornicameister@gmail.com][2014]                   *
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

package org.agatom.springatom.cmp.component.infopages.mapping;

import org.agatom.springatom.cmp.component.infopages.InfoPageNotFoundException;
import org.springframework.data.domain.Persistable;

import java.util.Collection;

/**
 * {@code InfoPageMappingService} provides information about registered {@link org.agatom.springatom.cmp.component.infopages.provider.structure.InfoPage}
 * <p/>
 * <small>Class is a part of <b>SpringAtom</b> and was created at 18.05.14</small>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public interface InfoPageMappingService {
    Collection<InfoPageMapping> getInfoPageMappings();

    /**
     * <p>hasInfoPage.</p>
     *
     * @param rel a {@link String} object.
     *
     * @return a boolean.
     */
    boolean hasInfoPage(final String rel);

    /**
     * <p>hasInfoPage.</p>
     *
     * @param persistableClass a {@link Class} object.
     * @param <T>              a T object.
     *
     * @return a boolean.
     */
    <T extends Persistable<?>> boolean hasInfoPage(final Class<T> persistableClass);

    /**
     * <p>hasInfoPage.</p>
     *
     * @param persistable a T object.
     * @param <T>         a T object.
     *
     * @return a boolean.
     */
    <T extends Persistable<?>> boolean hasInfoPage(final T persistable);

    /**
     * Retrieves mapped {@link org.springframework.data.domain.Persistable} class associated with registered {@code rel}
     *
     * @param rel mapping key
     *
     * @return mapped {@link org.springframework.data.domain.Persistable} class
     *
     * @throws org.agatom.springatom.cmp.component.infopages.InfoPageNotFoundException if any.
     */
    <T extends Persistable<?>> Class<T> getMappedClass(final String rel) throws InfoPageNotFoundException;

    /**
     * Retrieves mapped <b>rel</b> from {@link org.springframework.data.domain.Persistable} class
     *
     * @param clazz {@link org.springframework.data.domain.Persistable} class
     *
     * @return <b>rel</b>
     *
     * @throws org.agatom.springatom.cmp.component.infopages.InfoPageNotFoundException if any.
     */
    <T extends Persistable<?>> String getMappedRel(final Class<T> clazz) throws InfoPageNotFoundException;
}