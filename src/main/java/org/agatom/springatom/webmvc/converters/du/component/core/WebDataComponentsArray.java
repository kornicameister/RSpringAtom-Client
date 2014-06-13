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

import org.agatom.springatom.web.component.core.elements.ContentComponent;
import org.agatom.springatom.webmvc.converters.du.component.WebDataComponent;
import org.agatom.springatom.webmvc.converters.du.component.WebDataComponentSet;
import org.springframework.util.ClassUtils;

import java.util.Map;

/**
 * <small>Class is a part of <b>SpringAtom</b> and was created at 01.06.14</small>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public class WebDataComponentsArray
		extends ContentComponent<WebDataComponent<?>>
		implements WebDataComponentSet<WebDataComponent<?>> {
	private static final long serialVersionUID = -145702440703847256L;

	public boolean addWDC(final Object data) {
		return ClassUtils.isAssignableValue(WebDataComponent.class, data) && super.addContent((WebDataComponent<?>) data);
	}

	/** {@inheritDoc} */
	@Override
	public Map<String, Object> getDynamicProperties() {
		final Map<String, Object> properties = super.getDynamicProperties();
		properties.put("size", this.getContent().size());
		return properties;
	}

	/** {@inheritDoc} */
	@Override
	public String getUiType() {
		return "multiObjects";
	}
}
