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

package org.agatom.springatom.server.service.domain;

import org.agatom.springatom.server.model.beans.person.SPerson;
import org.agatom.springatom.server.model.types.contact.SContact;
import org.agatom.springatom.server.service.support.exceptions.EntityDoesNotExistsServiceException;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public interface SPersonService<T extends SPerson, R extends JpaRepository>
        extends SService<T, Long, Integer, R> {

    SContact newContactData(
            @NotNull
            final String contact,
            final long assignTo,
            @NotNull
            final SContact assignToContact) throws EntityDoesNotExistsServiceException;

    <X extends SContact> List<X> findAllContacts(final Long idClient);

    List<T> findByFirstName(
            @NotNull
            final String firstName);

    List<T> findByLastName(
            @NotNull
            final String lastName);

    T findByEmail(
            @NotNull
            final String email);
}