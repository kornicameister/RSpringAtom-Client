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

package org.agatom.springatom.server.service.support.exceptions;

import org.springframework.data.domain.Persistable;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public class UnambiguousResultServiceException
        extends ServiceException {
    private static final long serialVersionUID = 4848594143713366276L;

    public UnambiguousResultServiceException(final Class<? extends Persistable> target,
                                             final Object attribute,
                                             final Object value,
                                             final Integer expected,
                                             final Integer was) {
        super(target, String
                .format("For %s=%s query returned unambiguous findBetween, expected=%d, was=%s", attribute, value, expected, was));
    }
}