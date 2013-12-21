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

package org.agatom.springatom.component.elements.table;

import com.google.common.base.Objects;
import org.agatom.springatom.component.elements.ContentComponent;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public class TableComponent
        extends ContentComponent<TableColumnComponent> {
    protected String  tableId    = null;
    protected int     rowsOnPage = 10;
    protected boolean filterable = true;

    public String getTableId() {
        return tableId;
    }

    public TableComponent setTableId(final String tableId) {
        this.tableId = tableId;
        return this;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(tableId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TableComponent that = (TableComponent) o;

        return Objects.equal(this.tableId, that.tableId);
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
                      .addValue(tableId)
                      .addValue(rowsOnPage)
                      .addValue(filterable)
                      .addValue(content)
                      .addValue(title)
                      .toString();
    }
}
