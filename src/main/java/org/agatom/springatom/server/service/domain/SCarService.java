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

package org.agatom.springatom.server.service.domain;

import com.mysema.query.types.Path;
import com.mysema.query.types.expr.BooleanExpression;
import com.mysema.query.types.path.NumberPath;
import com.mysema.query.types.path.StringPath;
import org.agatom.springatom.server.model.beans.car.QSCar;
import org.agatom.springatom.server.model.beans.car.SCar;
import org.agatom.springatom.server.model.beans.car.SCarMaster;
import org.agatom.springatom.server.repository.repositories.car.SCarRepository;
import org.agatom.springatom.server.service.domain.impl.SCarServiceImpl;
import org.agatom.springatom.server.service.support.constraints.BrandOrModel;
import org.agatom.springatom.server.service.support.constraints.LicencePlatePL;
import org.agatom.springatom.server.service.support.constraints.VinNumber;
import org.agatom.springatom.server.service.support.exceptions.EntityDoesNotExistsServiceException;
import org.agatom.springatom.server.service.support.exceptions.UnambiguousResultServiceException;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */

public interface SCarService
        extends SService<SCar, Long, Integer, SCarRepository> {
    @NotNull List<SCar> findByMaster(
            @BrandOrModel
            final String brand,
            @BrandOrModel
            final String model);

    @NotNull List<SCar> findByMaster(
            @NotNull
            @NotEmpty
            final Long... masterId);

    @NotNull SCarMaster findMaster(final long carId);

    @NotNull List<SCar> findBy(
            @NotNull
            final SCarAttribute attribute,
            @NotNull
            final Object value) throws
            UnambiguousResultServiceException;

    @NotNull SCar newCar(
            @BrandOrModel
            final String brand,
            @BrandOrModel
            final String model,
            @LicencePlatePL
            final String licencePlate,
            @VinNumber
            final String vinNumber,
            final long ownerId) throws EntityDoesNotExistsServiceException;

    @NotNull SCar newOwner(
            final long idCar,
            final long idClient) throws EntityDoesNotExistsServiceException, SCarServiceImpl.InvalidOwnerException;

    public static enum SCarAttribute {
        LICENCE_PLATE(QSCar.sCar.licencePlate),
        OWNER(QSCar.sCar.owner.id),
        VIN_NUMBER(QSCar.sCar.vinNumber);
        private final Path expression;

        SCarAttribute(final Path expression) {
            this.expression = expression;
        }

        @SuppressWarnings("unchecked")
        public BooleanExpression eq(final Object value) {
            if (value instanceof String) {
                final StringPath path = (StringPath) this.expression;
                return path.eq((String) value);
            } else if (value instanceof Long) {
                final NumberPath<Long> path = (NumberPath<Long>) this.expression;
                return path.eq((Long) value);
            }
            return null;
        }
    }
}