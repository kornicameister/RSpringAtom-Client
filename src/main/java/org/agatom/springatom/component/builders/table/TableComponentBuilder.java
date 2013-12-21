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

package org.agatom.springatom.component.builders.table;

import org.agatom.springatom.component.builders.DefaultComponentBuilder;
import org.agatom.springatom.component.elements.table.TableComponent;
import org.agatom.springatom.component.helper.TableComponentHelper;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * {@code TableComponentBuilder} provides generic functionality for all the implementing classes
 * that eases and helps to build a table component {@link org.agatom.springatom.component.elements.table.TableComponent}.
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
abstract public class TableComponentBuilder<COMP extends TableComponent>
        extends DefaultComponentBuilder<COMP> {

    @Autowired
    protected TableComponentHelper helper;
}
