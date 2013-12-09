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

package org.agatom.springatom.server.model.descriptors.properties;

import org.agatom.springatom.server.model.descriptors.EntityPropertyDescriptor;

import javax.persistence.metamodel.Attribute;
import javax.persistence.metamodel.ManagedType;
import java.lang.reflect.Member;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
abstract class AbstractPropertyDescriptor
        implements EntityPropertyDescriptor {

    private final Attribute<?, ?> attribute;

    protected AbstractPropertyDescriptor(final Attribute<?, ?> attribute) {
        this.attribute = attribute;
    }

    @Override
    public String getName() {
        return this.attribute.getName();
    }

    @Override
    public Attribute.PersistentAttributeType getPersistentAttributeType() {
        return this.attribute.getPersistentAttributeType();
    }

    @Override
    public Class<?> getJavaType() {
        return this.attribute.getJavaType();
    }

    @Override
    public Member getJavaMember() {
        return this.attribute.getJavaMember();
    }

    @Override
    public ManagedType<?> getDeclaringType() {
        return this.attribute.getDeclaringType();
    }

    @Override
    public boolean isAssociation() {
        return this.attribute.isAssociation();
    }

    @Override
    public boolean isCollection() {
        return this.attribute.isCollection();
    }

    @Override
    public final Attribute<?, ?> getAttribute() {
        return this.attribute;
    }
}