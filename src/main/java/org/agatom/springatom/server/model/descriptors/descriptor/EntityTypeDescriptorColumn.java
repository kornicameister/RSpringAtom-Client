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

package org.agatom.springatom.server.model.descriptors.descriptor;

import com.google.common.base.Objects;
import org.agatom.springatom.server.model.descriptors.EntityDescriptorColumn;
import org.agatom.springatom.server.model.descriptors.SlimEntityDescriptor;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public class EntityTypeDescriptorColumn<X>
        implements EntityDescriptorColumn<X> {
    private static final long serialVersionUID = 955310404047484434L;
    private String                  name;
    private Class<?>                columnClass;
    private SlimEntityDescriptor<X> entityDescriptor;

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public Class<?> getColumnClass() {
        return this.columnClass;
    }

    @Override
    public SlimEntityDescriptor<X> getEntityDescriptor() {
        return this.entityDescriptor;
    }

    public EntityTypeDescriptorColumn<X> setEntityDescriptor(final SlimEntityDescriptor<X> entityDescriptor) {
        this.entityDescriptor = entityDescriptor;
        return this;
    }

    public EntityTypeDescriptorColumn<X> setColumnClass(final Class<?> columnClass) {
        this.columnClass = columnClass;
        return this;
    }

    public EntityTypeDescriptorColumn<X> setName(final String name) {
        this.name = name;
        return this;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(name, columnClass, entityDescriptor);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EntityTypeDescriptorColumn<?> that = (EntityTypeDescriptorColumn<?>) o;

        return Objects.equal(this.name, that.name) &&
                Objects.equal(this.columnClass, that.columnClass) &&
                Objects.equal(this.entityDescriptor, that.entityDescriptor);
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
                      .addValue(name)
                      .addValue(columnClass)
                      .addValue(entityDescriptor)
                      .toString();
    }
}
