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

package org.agatom.springatom.mvc.model.service;

import org.agatom.springatom.jpa.repositories.SPersonContactRepository;
import org.agatom.springatom.model.beans.person.contact.SPersonContact;
import org.agatom.springatom.model.types.contact.SContact;
import org.agatom.springatom.mvc.model.service.base.SBasicService;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public interface SPersonContactService
        extends SBasicService<SPersonContact, Long, SPersonContactRepository> {
    /**
     * Returns all {@link SContact} entities for the given {@link org.agatom.springatom.model.types.contact.SMultiContactable#getId()}
     *
     * @param idAssigned
     *         id of the {@link org.agatom.springatom.model.types.contact.SMultiContactable}
     *
     * @return the list of all {@link SContact}s for given {@code SMultiContactable}
     */
    @NotNull
    List<SPersonContact> findByAssigned(final long idAssigned);
}