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

package org.agatom.springatom.webmvc.converters.du.component.core;

import org.agatom.springatom.webmvc.converters.du.component.WebDataUITyped;

/**
 * <small>Class is a part of <b>SpringAtom</b> and was created at 31.05.14</small>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public class IconComponent
		extends DefaultWebDataComponent<String>
		implements WebDataUITyped {
	private static final long    serialVersionUID = -1035402964649329298L;
	private              boolean isPathSet        = false;

	/**
	 * <p>setIconPath.</p>
	 *
	 * @param iconPath a {@link java.lang.String} object.
	 *
	 * @return a {@link org.agatom.springatom.webmvc.converters.du.component.core.IconComponent} object.
	 */
	public IconComponent setIconPath(final String iconPath) {
		this.isPathSet = true;
		return (IconComponent) this.setData(iconPath);
	}

	/**
	 * <p>setIconClass.</p>
	 *
	 * @param iconClass a {@link java.lang.String} object.
	 *
	 * @return a {@link org.agatom.springatom.webmvc.converters.du.component.core.IconComponent} object.
	 */
	public IconComponent setIconClass(final String iconClass) {
		return (IconComponent) this.setData(iconClass);
	}

	public boolean isPathSet() {
		return this.isPathSet;
	}
}
