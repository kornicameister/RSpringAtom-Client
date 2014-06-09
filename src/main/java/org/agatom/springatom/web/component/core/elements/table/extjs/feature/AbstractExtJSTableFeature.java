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

package org.agatom.springatom.web.component.core.elements.table.extjs.feature;

import com.google.common.base.Objects;

/**
 * <small>Class is a part of <b>SpringAtom</b> and was created at 03.06.14</small>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
abstract class AbstractExtJSTableFeature
		implements ExtJSTableFeature {
	private static final long   serialVersionUID = 8485389573075863861L;
	private              String ftype            = null;

	/**
	 * <p>Constructor for AbstractExtJSTableFeature.</p>
	 *
	 * @param feature a {@link org.agatom.springatom.web.component.core.elements.table.extjs.feature.AbstractExtJSTableFeature.Feature} object.
	 */
	protected AbstractExtJSTableFeature(final Feature feature) {
		this.ftype = feature.name().toLowerCase().replaceAll("_", "");
	}

	/** {@inheritDoc} */
	@Override
	public final String getFtype() {
		return ftype;
	}

	/** {@inheritDoc} */
	@Override
	public final int hashCode() {
		return Objects.hashCode(ftype);
	}

	/** {@inheritDoc} */
	@Override
	public final boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		AbstractExtJSTableFeature that = (AbstractExtJSTableFeature) o;

		return Objects.equal(this.ftype, that.ftype);
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return Objects.toStringHelper(this)
				.add("ftype", ftype)
				.toString();
	}

	protected static enum Feature {
		GROUPING,
		SUMMARY
	}
}
