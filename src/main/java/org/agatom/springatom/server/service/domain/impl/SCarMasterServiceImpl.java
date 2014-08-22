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

import com.google.common.base.Function;
import com.google.common.collect.FluentIterable;
import com.mysema.query.types.expr.BooleanExpression;
import org.agatom.springatom.server.model.beans.car.QSCar;
import org.agatom.springatom.server.model.beans.car.QSCarMaster;
import org.agatom.springatom.server.model.beans.car.SCar;
import org.agatom.springatom.server.model.beans.car.SCarMaster;
import org.agatom.springatom.server.model.beans.car.embeddable.QSCarMasterManufacturingData;
import org.agatom.springatom.server.repository.repositories.car.SCarRepository;
import org.agatom.springatom.server.service.domain.SCarMasterService;
import org.apache.log4j.Logger;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Nullable;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * <p>SCarMasterServiceImpl class.</p>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
@Service(value = SCarMasterServiceImpl.SERVICE_NAME)
@Transactional(readOnly = true, isolation = Isolation.SERIALIZABLE, propagation = Propagation.SUPPORTS)
public class SCarMasterServiceImpl
        extends SBasicServiceImpl<SCarMaster, Long>
        implements SCarMasterService {
    /** Constant <code>SERVICE_NAME="CarMasterService"</code> */
    public static final  String             SERVICE_NAME    = "CarMasterService";
    private static final Logger             LOGGER          = Logger.getLogger(SCarMasterServiceImpl.class);
    private static final Comparator<String> BRAND_MODEL_CMP = new Comparator<String>() {
        @Override
        public int compare(final String o1, final String o2) {
            return o1.compareTo(o2);
        }
    };
    @Autowired
    private SCarRepository carRepository;

    /** {@inheritDoc} */
    @Override
    public SCarMaster withFullLoad(final SCarMaster obj) {
        final BooleanExpression predicate = QSCar.sCar.carMaster.id.eq(obj.getId());
        final List<SCar> sCars = (List<SCar>) this.carRepository.findAll(predicate);
        obj.setChildren(sCars);
        return obj;
    }

    /** {@inheritDoc} */
    @Override
    public List<SCarMaster> findByBrand(final String... brand) {
        return (List<SCarMaster>) this.repository.findAll(QSCarMaster.sCarMaster.manufacturingData.brand.in(brand));
    }

    /** {@inheritDoc} */
    @Override
    public List<SCarMaster> findByModel(final String... model) {
        return (List<SCarMaster>) this.repository.findAll(QSCarMaster.sCarMaster.manufacturingData.model.in(model));
    }

    /** {@inheritDoc} */
    @Override
    public SCarMaster findOne(final String brand, final String model) {
        final QSCarMasterManufacturingData manufacturingData = QSCarMaster.sCarMaster.manufacturingData;
        final BooleanExpression brandEq = manufacturingData.brand.eq(brand);
        final BooleanExpression modelEq = manufacturingData.model.eq(model);
        return this.repository.findOne(brandEq.and(modelEq));
    }

    /** {@inheritDoc} */
    @Override
    public List<SCar> findChildren(final Long... masterId) {
        return (List<SCar>) this.carRepository.findAll(QSCar.sCar.carMaster.id.in(masterId));
    }

    @Override
    public Collection<String> getAllBrands() {
        final long starTime = System.nanoTime();
        final Collection<String> data = this.getPropertyFromModel(this.findAll(), "brand");
        LOGGER.trace(String.format("Collected %d brands in %d ms", data.size(), TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - starTime)));
        return data;
    }

    @Override
    public Collection<String> getAllModels() {
        final long starTime = System.nanoTime();
        final Collection<String> data = this.getPropertyFromModel(this.findAll(), "model");
        LOGGER.trace(String.format("Collected %d models in %d ms", data.size(), TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - starTime)));
        return data;
    }

    private Collection<String> getPropertyFromModel(final List<SCarMaster> all, final String property) {
        return FluentIterable.from(all).transform(new Function<SCarMaster, String>() {
            @Nullable
            @Override
            public String apply(@Nullable final SCarMaster input) {
                assert input != null;
                return (String) new BeanWrapperImpl(input).getPropertyValue(property);
            }
        }).toSortedSet(BRAND_MODEL_CMP);
    }
}
