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

package org.agatom.springatom.web.action.model.actions;

import org.agatom.springatom.web.action.model.AbstractAction;
import org.springframework.hateoas.Link;

/**
 * <p>LinkAction class.</p>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public class LinkAction
		extends AbstractAction {
	private static final long   serialVersionUID = 4352983525547169705L;
	protected            String url              = null;

	/**
	 * <p>Getter for the field <code>url</code>.</p>
	 *
	 * @return a {@link java.lang.String} object.
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * <p>Setter for the field <code>url</code>.</p>
	 *
	 * @param link a {@link org.springframework.hateoas.Link} object.
	 *
	 * @return a {@link org.agatom.springatom.web.action.model.actions.LinkAction} object.
	 */
	public LinkAction setUrl(final Link link) {
		return this.setUrl(link.getHref());
	}

	/**
	 * <p>Setter for the field <code>url</code>.</p>
	 *
	 * @param url a {@link java.lang.String} object.
	 *
	 * @return a {@link org.agatom.springatom.web.action.model.actions.LinkAction} object.
	 */
	public LinkAction setUrl(final String url) {
		this.url = url;
		return this;
	}

}
