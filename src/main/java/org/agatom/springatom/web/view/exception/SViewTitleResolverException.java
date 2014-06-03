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

package org.agatom.springatom.web.view.exception;

/**
 * <p>SViewTitleResolverException class.</p>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public class SViewTitleResolverException
		extends Exception {
	private static final long serialVersionUID = -3476065773118826585L;

	/**
	 * <p>Constructor for SViewTitleResolverException.</p>
	 *
	 * @param message a {@link java.lang.String} object.
	 */
	public SViewTitleResolverException(final String message) {
		super("Key must contain character *");
	}

	/**
	 * <p>Constructor for SViewTitleResolverException.</p>
	 *
	 * @param message a {@link java.lang.String} object.
	 * @param cause   a {@link java.lang.Throwable} object.
	 */
	public SViewTitleResolverException(final String message, final Throwable cause) {
		super(message, cause);
	}
}
