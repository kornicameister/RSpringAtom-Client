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

package org.agatom.springatom.webmvc.core;

import org.springframework.stereotype.Component;
import org.springframework.web.context.support.WebApplicationObjectSupport;

/**
 * <p>Abstract SVDefaultController class.</p>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
@Component(value = "SDefaultController")
public abstract class SVDefaultController
		extends WebApplicationObjectSupport
		implements SController {

	private final String controllerName;

	/**
	 * <p>Constructor for SVDefaultController.</p>
	 *
	 * @param controllerName a {@link java.lang.String} object.
	 */
	protected SVDefaultController(final String controllerName) {
		this.controllerName = controllerName;
	}

	/** {@inheritDoc} */
	@Override
	public final String getControllerName() {
		return this.controllerName;
	}

}
