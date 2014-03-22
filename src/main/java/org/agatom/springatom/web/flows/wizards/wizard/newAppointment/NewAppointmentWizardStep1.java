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

package org.agatom.springatom.web.flows.wizards.wizard.newAppointment;

import org.agatom.springatom.server.model.beans.appointment.SAppointment;
import org.agatom.springatom.server.service.domain.SAppointmentService;
import org.agatom.springatom.server.service.domain.SCarService;
import org.agatom.springatom.web.flows.wizards.actions.WizardAction;
import org.agatom.springatom.web.flows.wizards.wizard.WizardFormAction;
import org.agatom.springatom.web.locale.SMessageSource;
import org.apache.log4j.Logger;
import org.joda.time.DateTime;
import org.joda.time.MutableDateTime;
import org.joda.time.ReadableInstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.format.support.FormattingConversionService;
import org.springframework.util.Assert;
import org.springframework.util.ClassUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.webflow.core.collection.AttributeMap;
import org.springframework.webflow.core.collection.MutableAttributeMap;
import org.springframework.webflow.execution.Event;
import org.springframework.webflow.execution.RequestContext;

import java.io.Serializable;

/**
 * <small>Class is a part of <b>SpringAtom</b> and was created at 17.03.14</small>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
@WizardAction("newAppointmentStep1")
public class NewAppointmentWizardStep1
		extends WizardFormAction<SAppointment> {
	private static final Logger              LOGGER             = Logger.getLogger(NewAppointmentWizardStep1.class);
	private static final String              CARS               = "cars";
	private static final String              ASSIGNEES          = "assignees";
	private static final String              REPORTERS          = "reporters";
	private static final String              CALENDAR_INPUTS    = "calendarInputs";
	private static final String[]            REQUIRED_FIELDS    = new String[]{
			"car", "assignee", "reporter", "beginDate", "endDate", "beginTime", "endTime"
	};
	private static final String              FORM_OBJECT_NAME   = "appointment";
	private              String              dataPattern        = null;
	private              String              timePattern        = null;
	@Autowired
	private              SAppointmentService appointmentService = null;
	@Autowired
	private              SCarService         carService         = null;
	@Autowired
	private              SMessageSource      messageSource      = null;
	@Value(value = "#{applicationPropertiesBean['component.calendar.minTime']}")
	private              Integer             minTime            = 0;
	@Value(value = "#{applicationPropertiesBean['component.calendar.maxTime']}")
	private              Integer             maxTime            = 0;

	public NewAppointmentWizardStep1() {
		super();
		this.setFormObjectName(FORM_OBJECT_NAME);
		this.setValidator(new SAppointmentValidator());
	}

	@Override
	protected void initAction() {
		super.initAction();
		this.dataPattern = this.messageSource.getMessage("data.format.value", LocaleContextHolder.getLocale());
		this.timePattern = this.messageSource.getMessage("date.format.hours", LocaleContextHolder.getLocale());
	}

	@Override
	public Event setupForm(final RequestContext context) throws Exception {

		final MutableAttributeMap<Object> viewScope = context.getViewScope();
		viewScope.put(CARS, this.carService.findAll());
		viewScope.put(ASSIGNEES, this.appointmentService.findAssignees());
		viewScope.put(REPORTERS, this.appointmentService.findReporters());

		final AttributeMap<Object> attributes = context.getFlowScope();
		viewScope.put(CALENDAR_INPUTS, this.populateCalendarComponentInputs(attributes));

		return super.setupForm(context);
	}

	private CalendarComponentInputs populateCalendarComponentInputs(final AttributeMap<Object> attributes) {
		final Boolean allDay = attributes.getBoolean("allDay");
		final DateTime begin = this.convertToDateTime(attributes.getLong("begin"), allDay, true);
		final DateTime end = this.convertToDateTime(attributes.getLong("end"), allDay, false);
		final String action = attributes.getString("action");
		final Boolean calendar = attributes.getBoolean("calendar", false);
		return new CalendarComponentInputs(begin, end, allDay, action, calendar);
	}

	private DateTime convertToDateTime(final Long milliseconds, final boolean allDay, final boolean isBeginDate) {
		final DateTime convert = (DateTime) this.conversionService.convert(milliseconds, ReadableInstant.class);
		if (allDay) {
			final MutableDateTime dateTime = convert.toMutableDateTime();
			if (isBeginDate) {
				dateTime.setHourOfDay(this.minTime);
			} else {
				dateTime.setHourOfDay(this.maxTime);
			}
			dateTime.setMinuteOfHour(0);
			return dateTime.toDateTime();
		}
		return convert;
	}

	@Override
	protected WebDataBinder doInitBinder(final WebDataBinder binder, final FormattingConversionService conversionService) {
		binder.setRequiredFields(REQUIRED_FIELDS);
		return super.doInitBinder(binder, conversionService);
	}

	private class SAppointmentValidator
			implements Validator {

		@Override
		public boolean supports(final Class<?> clazz) {
			return ClassUtils.isAssignable(SAppointment.class, clazz);
		}

		@Override
		public void validate(final Object target, final Errors errors) {
			Assert.notNull(target, "Target must not be null");
			Assert.isAssignable(SAppointment.class, target.getClass());
			final SAppointment appointment = (SAppointment) target;

			appointmentService.isValid(appointment, errors);

			if (!errors.hasErrors()) {
				LOGGER.debug(String.format("%s validated without errors", target));
			} else {
				LOGGER.error(String.format("%s validated wit errors => %s", target, errors));
			}
		}
	}

	public class CalendarComponentInputs implements Serializable {
		private final Boolean  calendar;
		private       DateTime begin;
		private       DateTime end;
		private       boolean  allDay;
		private       String   action;

		public CalendarComponentInputs(final DateTime begin, final DateTime end, final boolean allDay, final String action, final Boolean calendar) {
			this.begin = begin;
			this.end = end;
			this.allDay = allDay;
			this.action = action;
			this.calendar = calendar;
		}

		public boolean isCalendar() {
			return calendar;
		}

		public String getBeginDate() {
			return this.begin.toString(dataPattern);
		}

		public String getEndDate() {
			return this.end.toString(dataPattern);
		}

		public String getBeginTime() {
			return this.begin.toString(timePattern);
		}

		public String getEndTime() {
			return this.end.toString(timePattern);
		}

		public boolean isAllDay() {
			return allDay;
		}

		public String getAction() {
			return action;
		}
	}
}
