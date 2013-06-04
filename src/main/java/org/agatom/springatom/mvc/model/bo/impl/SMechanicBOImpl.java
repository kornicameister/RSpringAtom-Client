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

package org.agatom.springatom.mvc.model.bo.impl;

import org.agatom.springatom.model.beans.mechanic.SMechanic;
import org.agatom.springatom.mvc.model.bo.SMechanicBO;
import org.agatom.springatom.mvc.model.dao.SMechanicDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
@Service(value = "SMechanicBO")
public class SMechanicBOImpl
        implements SMechanicBO {

    @Autowired
    SMechanicDAO sMechanicDAO;

    @Override
    public SMechanic findOne(@NotNull final Long id) {
        return this.sMechanicDAO.findOne(id);
    }

    @Override
    public Iterable<SMechanic> findAll() {
        return this.sMechanicDAO.findAll();
    }

    @Override
    public SMechanic save(@NotNull final SMechanic persistable) {
        return this.sMechanicDAO.save(persistable);
    }

    @Override
    public Long count() {
        return this.sMechanicDAO.count();
    }

    @Override
    public void deleteOne(@NotNull final Long pk) {
        this.sMechanicDAO.delete(pk);
    }

    @Override
    public void deleteAll() {
        this.sMechanicDAO.deleteAll();
    }
}
