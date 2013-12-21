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

package org.agatom.springatom.component.helper;

import org.agatom.springatom.component.elements.table.DandelionTableComponent;
import org.agatom.springatom.component.elements.table.TableColumnComponent;
import org.agatom.springatom.component.elements.table.TableComponent;
import org.springframework.hateoas.Link;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public interface TableComponentHelper
        extends ComponentHelper {
    Link getInfoPageLink(String path, Long id);

    DandelionTableComponent newDandelionTable(final String tableId, final String builderId);

    Link getTableLink(final String tableId, final String builderId);

    TableColumnComponent newTableColumn(final TableComponent cmp, final String path, final String rbKey);
}