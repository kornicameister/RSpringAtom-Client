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

package org.agatom.springatom.mvc.model.service;

import org.agatom.springatom.jpa.repositories.SAppointmentRepository;
import org.agatom.springatom.model.beans.appointment.SAppointment;
import org.agatom.springatom.model.beans.appointment.SAppointmentTask;
import org.agatom.springatom.model.dto.SAppointmentTaskDTO;
import org.agatom.springatom.mvc.model.exceptions.SEntityDoesNotExists;
import org.agatom.springatom.mvc.model.exceptions.SException;
import org.agatom.springatom.mvc.model.service.base.SBasicService;
import org.joda.time.DateTime;
import org.joda.time.ReadableDuration;
import org.joda.time.ReadableInterval;

import java.util.List;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public interface SAppointmentService
        extends SBasicService<SAppointment, Long, SAppointmentRepository> {
    SAppointment newAppointment(final ReadableInterval interval,
                                final long carId,
                                final long assigneeId,
                                final long reporterId,
                                final SAppointmentTaskDTO... tasks) throws SException;

    SAppointment addTask(final long idAppointment,
                         final SAppointmentTaskDTO... tasks) throws SEntityDoesNotExists;

    List<SAppointmentTask> findTasks(final long idAppointment);

    SAppointment removeTask(final long idAppointment, final long... tasksId) throws SEntityDoesNotExists;

    SAppointment findByTask(final long... tasks);

    List<SAppointment> findByCar(final long carId);

    List<SAppointment> findBetween(final DateTime startDate, final DateTime endDate);

    List<SAppointment> findLater(final DateTime dateTime);

    List<SAppointment> findEarlier(final DateTime dateTime);

    SAppointment postponeToFuture(final long idAppointment, final ReadableDuration duration) throws
            SException;

    SAppointment postponeToPast(final long idAppointment, final ReadableDuration duration) throws
            SException;
}
