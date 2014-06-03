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

package org.agatom.springatom.web.component.table.request;

import com.github.dandelion.datatables.core.ajax.ColumnDef;
import com.github.dandelion.datatables.core.ajax.DatatablesCriterias;
import com.google.common.base.Objects;
import org.agatom.springatom.web.component.core.request.AbstractComponentRequest;

import java.util.List;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public class TableComponentRequest
		extends AbstractComponentRequest {
	private static final long                serialVersionUID = 8662629050407736443L;
	private              DatatablesCriterias criterias        = null;

	public DatatablesCriterias getCriterias() {
		return criterias;
	}

	public TableComponentRequest setCriterias(final DatatablesCriterias criterias) {
		this.criterias = criterias;
		return this;
	}

	public Integer getPageStart() {
		return criterias.getDisplayStart();
	}

	public Integer getPageSize() {
		return criterias.getDisplaySize();
	}

	public String getSearchQuery() {
		return criterias.getSearch();
	}

	public List<ColumnDef> getColumnDefs() {
		return criterias.getColumnDefs();
	}

	public List<ColumnDef> getSortingColumnDefs() {
		return criterias.getSortingColumnDefs();
	}

	public Boolean hasOneFilterableColumn() {
		return criterias.hasOneFilterableColumn();
	}

	public Boolean hasOneFilteredColumn() {
		return criterias.hasOneFilteredColumn();
	}

	public Boolean hasOneSortedColumn() {
		return criterias.hasOneSortedColumn();
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		TableComponentRequest that = (TableComponentRequest) o;

		return Objects.equal(this.criterias, that.criterias) &&
				Objects.equal(this.attributes, that.attributes) &&
				Objects.equal(this.domain, that.domain) &&
				Objects.equal(this.id, that.id) &&
				Objects.equal(this.version, that.version);
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(criterias, attributes, domain, id, version);
	}
}