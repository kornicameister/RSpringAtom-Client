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

package org.agatom.springatom.server.service.domain.impl;

import com.google.common.collect.ImmutableList;
import org.agatom.springatom.server.model.beans.person.QSPersonContact;
import org.agatom.springatom.server.model.beans.person.SPersonContact;
import org.agatom.springatom.server.service.domain.SPersonContactService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <p>SPersonContactServiceImpl class.</p>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */

@Service(value = SPersonContactServiceImpl.SERVICE_NAME)
@Transactional(readOnly = true, isolation = Isolation.SERIALIZABLE, propagation = Propagation.SUPPORTS)
public class SPersonContactServiceImpl
		extends SBasicServiceImpl<SPersonContact, Long>
		implements SPersonContactService {

	/** Constant <code>SERVICE_NAME="PersonContactService"</code> */
	public static final String SERVICE_NAME = "PersonContactService";

	/** {@inheritDoc} */
	@Override
	public List<SPersonContact> findByAssigned(final long idAssigned) {
		return ImmutableList.copyOf(this.repository.findAll(QSPersonContact.sPersonContact.assigned.id.eq(idAssigned)));
	}
}
