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

package org.agatom.springatom.web.component.infopages.builder;

import com.google.common.base.Objects;
import org.springframework.data.domain.Persistable;

import java.util.Map;

/**
 * {@code InfoPageResponseWrapper} carries data returned by {@link org.agatom.springatom.web.component.infopages.builder.InfoPageComponentBuilder}
 * <p/>
 * <small>Class is a part of <b>SpringAtom</b> and was created at 30.05.14</small>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public class InfoPageResponseWrapper {
	private Map<String, Object> data   = null;
	private Persistable<?>      source = null;

	public Map<String, Object> getData() {
		return data;
	}

	public InfoPageResponseWrapper setData(final Map<String, Object> data) {
		this.data = data;
		return this;
	}

	public Persistable<?> getSource() {
		return source;
	}

	public InfoPageResponseWrapper setSource(final Persistable<?> source) {
		this.source = source;
		return this;
	}

	@Override
	public String toString() {
		return Objects.toStringHelper(this)
				.add("data", data)
				.add("convert", source)
				.toString();
	}
}