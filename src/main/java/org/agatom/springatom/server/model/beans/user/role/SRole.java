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

package org.agatom.springatom.server.model.beans.user.role;

import org.agatom.springatom.server.model.beans.PersistentObject;
import org.agatom.springatom.server.model.types.user.SSecurityRoleEnum;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.Type;

import javax.persistence.*;

/**
 * @author kornicamaister
 * @version 0.0.1
 * @since 0.0.1
 */
@Entity(name = "SRole")
@Table(name = "SRole")
@AttributeOverride(
        name = "id",
        column = @Column(
                name = "idSRole",
                updatable = false,
                nullable = false)
)
public class SRole
        extends PersistentObject<Long> {
    @Type(type = "org.hibernate.type.EnumType")
    @Column(name = "role", updatable = false, unique = true, length = 50, nullable = false)
    @NaturalId(mutable = false)
    @Enumerated(value = EnumType.STRING)
    private SSecurityRoleEnum role;

    public SSecurityRoleEnum getRole() {
        return role;
    }

    public void setRole(final String role) {
        this.role = SSecurityRoleEnum.valueOf(role);
    }

    public void setRole(final SSecurityRoleEnum role) {
        this.role = role;
    }
}
