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

package org.agatom.springatom.server.model.beans.appointment;

import com.google.common.collect.Lists;
import org.agatom.springatom.server.model.beans.activity.SAssignedActivity;
import org.agatom.springatom.server.model.beans.car.SCar;
import org.hibernate.annotations.Index;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.joda.time.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

/**
 * {@code SAppointment} is the business object describing the event.
 * <b>Appointment</b> is an object that can be placed in time and in particular assigned to the {@link SCar}.
 * The business requirement dictates that it also holds the list od tasks ({@link SAppointmentTask}).
 *
 * @author kornicamaister
 * @version 0.0.2
 * @since 0.0.1
 */
@Table(name = SAppointment.TABLE_NAME)
@Entity(name = SAppointment.ENTITY_NAME)
@AttributeOverride(name = "id", column = @Column(name = "idSAppointment", nullable = false, insertable = true, updatable = false, length = 19, precision = 0))
public class SAppointment
        extends SAssignedActivity<Long>
        implements Iterable<SAppointmentTask> {
    public static final  String TABLE_NAME       = "appointment";
    public static final  String ENTITY_NAME      = "SAppointment";
    private static final String DATE_TIME_TYPE   = "org.jadira.usertype.dateandtime.joda.PersistentDateTime";
    private static final long   serialVersionUID = -3158182089097228777L;
    @Index(name = "sa_begin")
    @Type(type = DATE_TIME_TYPE)
    @Column(name = "begin", nullable = false)
    @NotNull(message = MSG.BEGIN_NULL_MSG)
    private DateTime               begin;
    @Index(name = "sa_end")
    @Type(type = DATE_TIME_TYPE)
    @Column(name = "end", nullable = false)
    @NotNull(message = MSG.END_NULL_MSG)
    private DateTime               end;
    @Size(min = 1, message = MSG.NO_TASK_MSG)
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "appointment", cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<SAppointmentTask> tasks;
    @NotNull(message = MSG.CAR_NULL_MSG)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "car", referencedColumnName = "idScar")
    private SCar                   car;

    public List<SAppointmentTask> getTasks() {
        this.requireTaskList();
        return tasks;
    }

    public SAppointment setTasks(final Collection<SAppointmentTask> tasks) {
        this.tasks = Lists.newArrayList(tasks);
        return this;
    }

    public SAppointment addTask(final Collection<SAppointmentTask> tasks) {
        this.requireTaskList();
        for (final SAppointmentTask task : tasks) {
            if (!this.tasks.contains(task)) {
                this.tasks.add(task.setAppointment(this));
            }
        }
        return this;
    }

    private void requireTaskList() {
        if (this.tasks == null) {
            this.tasks = Lists.newLinkedList();
        }
    }

    public SAppointment removeTask(final SAppointmentTask... tasks) {
        if (this.tasks == null) {
            return this;
        }
        this.tasks.removeAll(Lists.newArrayList(tasks));
        return this;
    }

    public DateTime getBegin() {
        this.requireBeginDate();
        return this.begin.toDateTime();
    }

    public SAppointment setBegin(final DateTime begin) {
        this.begin = begin;
        return this;
    }

    public DateTime getEnd() {
        this.requireEndDate();
        return this.end.toDateTime();
    }

    public SAppointment setEnd(final DateTime end) {
        this.end = end;
        return this;
    }

    public Interval getInterval() {
        return new Interval(this.begin, this.end);
    }

    public SAppointment setInterval(final ReadableInterval duration) {
        this.setBegin(duration.getStart());
        this.setEnd(duration.getEnd());
        return this;
    }

    public boolean postpone(final ReadableDuration duration, final boolean toFuture) {
        if (this.begin != null && this.end != null) {
            final int scalar = toFuture ? 1 : -1;
            this.begin = this.begin.withDurationAdded(duration, scalar);
            this.end = this.end.withDurationAdded(duration, scalar);
            return true;
        }
        return false;
    }

    public SCar getCar() {
        if (this.car == null) {
            this.car = new SCar();
        }
        return this.car;
    }

    public SAppointment setCar(final SCar car) {
        this.car = car;
        return this;
    }

    public LocalTime getBeginTime() {
        this.requireBeginDate();
        return this.begin.toLocalTime();
    }

    public SAppointment setBeginTime(final LocalTime localTime) {
        this.requireBeginDate();
        final MutableDateTime mutableDateTime = this.begin.toMutableDateTime();
        mutableDateTime.setTime(localTime.toDateTimeToday());
        this.begin = mutableDateTime.toDateTime();
        return this;
    }

    public LocalTime getEndTime() {
        this.requireEndDate();
        return this.end.toLocalTime();
    }

    public SAppointment setEndTime(final LocalTime localTime) {
        this.requireEndDate();
        final MutableDateTime mutableDateTime = this.end.toMutableDateTime();
        mutableDateTime.setTime(localTime.toDateTimeToday());
        this.end = mutableDateTime.toDateTime();
        return this;
    }

    public LocalDate getBeginDate() {
        return this.getBegin().toLocalDate();
    }

    public SAppointment setBeginDate(final LocalDate localDate) {
        this.requireBeginDate();
        final MutableDateTime mutableDateTime = this.begin.toMutableDateTime();
        mutableDateTime.setDate(localDate.getYear(), localDate.getMonthOfYear(), localDate.getDayOfMonth());
        this.begin = mutableDateTime.toDateTime();
        return this;
    }

    public LocalDate getEndDate() {
        return this.getEnd().toLocalDate();
    }

    public SAppointment setEndDate(final LocalDate localDate) {
        this.requireEndDate();
        final MutableDateTime mutableDateTime = this.end.toMutableDateTime();
        mutableDateTime.setDate(localDate.getYear(), localDate.getMonthOfYear(), localDate.getDayOfMonth());
        this.end = mutableDateTime.toDateTime();
        return this;
    }

    private void requireEndDate() {
        if (this.end == null) {
            this.end = DateTime.now();
        }
    }

    private void requireBeginDate() {
        if (this.begin == null) {
            this.begin = DateTime.now();
        }
    }

    @Override
    public Iterator<SAppointmentTask> iterator() {
        return this.tasks.iterator();
    }

    private static class MSG {
        static final String BEGIN_NULL_MSG = "Begin dateTime for event must not be null";
        static final String END_NULL_MSG   = "End dateTime for event must not be null";
        static final String CAR_NULL_MSG   = "Car for event must not be null";
        static final String NO_TASK_MSG    = "SAppointment must contain at least one task [SAppointmentTask]";
    }
}
