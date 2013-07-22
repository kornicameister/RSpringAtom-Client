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

package org.agatom.springatom.mvc.model.service.impl;

import com.google.common.base.Preconditions;
import org.agatom.springatom.mvc.model.service.Service;
import org.springframework.data.domain.Persistable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

/**
 * {@code DefaultService} is the base class for all services
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */

@SuppressWarnings("unchecked")
@Transactional(readOnly = true, isolation = Isolation.SERIALIZABLE, propagation = Propagation.SUPPORTS)
abstract class DefaultService<T extends Persistable, ID extends Serializable, R extends JpaRepository>
        implements Service<T, ID, R> {
    protected JpaRepository jpaRepository;

    @Override
    public T findOne(@NotNull final ID id) {
        return (T) this.jpaRepository.findOne(id);
    }

    @Override
    public List<T> findAll() {
        return this.jpaRepository.findAll();
    }

    @Override
    @Transactional(readOnly = false, rollbackFor = IllegalArgumentException.class)
    public T save(@NotNull final T persistable) {
        Preconditions
                .checkArgument(persistable != null, "Persistable must not be null");
        return (T) this.jpaRepository.save(persistable);
    }

    @Override
    public Long count() {
        return this.jpaRepository.count();
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteOne(@NotNull final ID pk) {
        this.jpaRepository.delete(pk);
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteAll() {
        this.jpaRepository.deleteAll();
    }
}
