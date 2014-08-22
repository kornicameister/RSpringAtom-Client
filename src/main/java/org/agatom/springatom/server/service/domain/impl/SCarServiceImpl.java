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

package org.agatom.springatom.server.service.domain.impl;

import com.google.common.collect.Sets;
import com.mysema.query.types.expr.BooleanExpression;
import com.mysema.query.types.path.EnumPath;
import org.agatom.springatom.server.model.beans.car.QSCar;
import org.agatom.springatom.server.model.beans.car.QSCarMaster;
import org.agatom.springatom.server.model.beans.car.SCar;
import org.agatom.springatom.server.model.beans.car.SCarMaster;
import org.agatom.springatom.server.model.beans.car.embeddable.QSCarMasterManufacturingData;
import org.agatom.springatom.server.model.beans.car.embeddable.SCarMasterManufacturingData;
import org.agatom.springatom.server.model.beans.user.QSUser;
import org.agatom.springatom.server.model.beans.user.SUser;
import org.agatom.springatom.server.model.types.car.FuelType;
import org.agatom.springatom.server.model.types.user.SRole;
import org.agatom.springatom.server.repository.repositories.car.SCarMasterRepository;
import org.agatom.springatom.server.repository.repositories.user.SUserRepository;
import org.agatom.springatom.server.service.domain.SCarService;
import org.agatom.springatom.server.service.support.exceptions.EntityDoesNotExistsServiceException;
import org.agatom.springatom.server.service.support.exceptions.UnambiguousResultServiceException;
import org.agatom.springatom.web.locale.SMessageSource;
import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Set;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */

@Service(value = SCarServiceImpl.SERVICE_NAME)
@Transactional(readOnly = true, isolation = Isolation.SERIALIZABLE, propagation = Propagation.SUPPORTS)
class SCarServiceImpl
        extends SServiceImpl<SCar, Long, Integer>
        implements SCarService {
    /** Constant <code>SERVICE_NAME="SCarService"</code> */
    public static final  String               SERVICE_NAME   = "SCarService";
    private static final Logger               LOGGER         = Logger.getLogger(SCarServiceImpl.class);
    @Autowired
    private              SCarMasterRepository masterService  = null;
    @Autowired
    private              SUserRepository      userRepository = null;
    @Autowired
    private              SMessageSource       messageSource  = null;

    /** {@inheritDoc} */
    @Override
    public SCar save(final SCar car) {
        try {
            final SCarMaster carMaster = this.getOrPersistMaster(car.getCarMaster());
            car.setCarMaster(carMaster);
            return super.save(car);
        } catch (Exception exp) {
            LOGGER.error(String.format("save(car=%s) failed...", car), exp);
            throw exp;
        }
    }

    private SCarMaster getOrPersistMaster(final SCarMaster carMaster) {
        if (carMaster.isNew()) {
            final SCarMaster master = this.getOrPersistMaster(carMaster.getBrand(), carMaster.getModel());
            BeanUtils.copyProperties(carMaster, master);
            return master;
        }
        return carMaster;
    }

    private SCarMaster getOrPersistMaster(final String brand, final String model) {
        SCarMaster sCarMaster = this.getMaster(brand, model);
        if (sCarMaster == null) {
            LOGGER.warn(String
                    .format("No %s for brand=%s and service=%s", SCarMaster.class.getSimpleName(), brand, model));
            sCarMaster = new SCarMaster();
            sCarMaster.setManufacturingData(new SCarMasterManufacturingData(brand, model));
            sCarMaster = this.masterService.save(sCarMaster);
        }
        if (LOGGER.isTraceEnabled()) {
            LOGGER.trace(String.format("SCarMaster >>> %s", sCarMaster));
        }
        return sCarMaster;
    }

    private SCarMaster getMaster(final String brand, final String model) {
        final QSCarMasterManufacturingData manufacturingData = QSCarMaster.sCarMaster.manufacturingData;
        final BooleanExpression brandEq = manufacturingData.brand.eq(brand);
        final BooleanExpression modelEq = manufacturingData.model.eq(model);
        return this.masterService.findOne(brandEq.and(modelEq));
    }

    /** {@inheritDoc} */
    @Override
    @CacheEvict(value = "cars", allEntries = true, beforeInvocation = true)
    public List<SCar> findByMaster(final String brand, final String model) {
        return (List<SCar>) this.repository.findAll(QSCar.sCar.carMaster.eq(this.getMaster(brand, model)));
    }

    /** {@inheritDoc} */
    @Override
    @CacheEvict(value = "cars", allEntries = true, beforeInvocation = true)
    public List<SCar> findByMaster(final Long... masterId) {
        return (List<SCar>) this.repository.findAll(QSCar.sCar.carMaster.id.in(masterId));
    }

    /** {@inheritDoc} */
    @Override
    @Cacheable(value = "cars", key = "#carId")
    public SCarMaster findMaster(final long carId) {
        return this.masterService.findOne(QSCarMaster.sCarMaster.children.any().id.eq(carId));
    }

    /** {@inheritDoc} */
    @Override
    @Cacheable(value = "cars")
    @Transactional(
            readOnly = true,
            isolation = Isolation.SERIALIZABLE,
            propagation = Propagation.SUPPORTS,
            rollbackFor = UnambiguousResultServiceException.class
    )
    public List<SCar> findBy(final SCarAttribute attribute, final Object value) throws
            UnambiguousResultServiceException {
        final List<SCar> cars = (List<SCar>) this.repository.findAll(attribute.eq(value));
        switch (attribute) {
            case LICENCE_PLATE:
            case VIN_NUMBER:
                if (cars.size() > 1) {
                    throw new UnambiguousResultServiceException(SCar.class, attribute, value, 1, cars.size());
                }
                break;
            case OWNER:
                if (LOGGER.isDebugEnabled()) {
                    LOGGER.debug(String.format("More than one row has been returned for attribute=%s", attribute));
                }
                break;
        }
        return cars;
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = false, rollbackFor = EntityDoesNotExistsServiceException.class)
    public SCar newCar(final String brand,
                       final String model,
                       final String licencePlate,
                       final String vinNumber,
                       final long ownerId) throws
            EntityDoesNotExistsServiceException {

        final SUser owner = this.getOwner(ownerId);
        final SCarMaster sCarMaster = this.getOrPersistMaster(brand, model);

        if (owner == null) {
            throw new EntityDoesNotExistsServiceException(SUser.class, ownerId);
        }
        if (sCarMaster == null) {
            throw new EntityDoesNotExistsServiceException(SCarMaster.class, brand, model);
        }
        final SCar sCar = this.persistCar(licencePlate, vinNumber, sCarMaster, owner);
        LOGGER.info(String.format("Created SCar >> %s", sCar));
        return sCar;
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = false,
            rollbackFor = EntityDoesNotExistsServiceException.class,
            isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW)
    @Cacheable(key = "#idCar",
            value = "cars",
            condition = "#idCar.compareTo(1) > 1")
    @CacheEvict(key = "#idClient",
            value = "clients",
            beforeInvocation = true)
    public SCar newOwner(final long idCar, final long idClient) throws
            EntityDoesNotExistsServiceException {
        final SCar car = this.findOne(idCar);
        final SUser owner = this.getOwner(idClient);
        if (car == null) {
            throw new EntityDoesNotExistsServiceException(SCar.class, idCar);
        }
        if (owner == null) {
            throw new EntityDoesNotExistsServiceException(SUser.class, idClient);
        }

        car.setOwner(owner);
        final SCar updatedCar = this.repository.saveAndFlush(car);

        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug(String.format("Changed owner of %s from %s to %s", updatedCar, car.getOwner(), owner));
        }

        return updatedCar;
    }

    /** {@inheritDoc} */
    @Override
    public Collection<Owner> getOwners() {
        final Set<Owner> ownerSet = Sets.newHashSet();

        final QSUser user = QSUser.sUser;
        final QSCar car = QSCar.sCar;

        final EnumPath<SRole> role = user.roles.any().pk.authority.role;
        BooleanExpression predicate = role.in(SRole.ROLE_CLIENT, SRole.ROLE_MECHANIC);
        predicate = predicate.and(user.credentials.username.ne("SYSTEM"));
        predicate = predicate.and(user.accountNonLocked.eq(true)).and(user.accountNonExpired.eq(true).and(user.enabled.eq(true)));
        try {
            final Iterable<SUser> users = this.userRepository.findAll(predicate);

            for (final SUser userFound : users) {
                final Iterable<SCar> all = this.repository.findAll(QSCar.sCar.owner.eq(userFound));
                final Owner owner = new Owner()
                        .setOwner(userFound)
                        .setCars(Sets.newHashSet(all));
                ownerSet.add(owner);
            }

            return ownerSet;
        } catch (Exception exp) {
            LOGGER.fatal("Failure in retrieving possible owners", exp);
        }

        return null;
    }

    @Override
    public Collection<FuelType> getFuelTypes() {
        return Sets.newHashSet(FuelType.values());
    }

    private SUser getOwner(final Long ownerId) {
        final SUser owner = this.userRepository.findOne(ownerId);
        if (LOGGER.isTraceEnabled()) {
            LOGGER.trace(String.format("SClient#Owner >>> %s", owner));
        }
        return owner;
    }

    private SCar persistCar(final String licencePlate,
                            final String vinNumber,
                            final SCarMaster sCarMaster,
                            final SUser owner) {
        SCar sCar = new SCar();
        sCar.setCarMaster(sCarMaster);
        sCar.setLicencePlate(licencePlate);
        sCar.setVinNumber(vinNumber);
        sCar.setOwner(owner);
        sCar = super.save(sCar);
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug(String.format("SCar >>> %s", sCar));
        }
        return sCar;
    }
}
