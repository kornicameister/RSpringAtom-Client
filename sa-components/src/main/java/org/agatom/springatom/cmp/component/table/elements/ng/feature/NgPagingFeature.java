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

package org.agatom.springatom.cmp.component.table.elements.ng.feature;

import com.google.common.base.Objects;

/**
 * <small>Class is a part of <b>SpringAtom</b> and was created at 2014-07-25</small>
 *
 * @author trebskit
 * @version 0.0.1
 * @since 0.0.1
 */
public class NgPagingFeature
        extends AbstractNgTableFeature {
    private static final long  serialVersionUID = 3782728265240676167L;
    private              short pageSize         = 0;

    /**
     * <p>Constructor for AbstractNgTableFeature.</p>
     */
    public NgPagingFeature() {
        super(NgFeatures.PAGING);
    }

    public short getPageSize() {
        return pageSize;
    }

    public NgPagingFeature setPageSize(final short pageSize) {
        this.pageSize = pageSize;
        return this;
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
                .add("pageSize", pageSize)
                .add("ftype", ftype)
                .toString();
    }
}
