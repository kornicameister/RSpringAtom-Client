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

package org.agatom.springatom.web.flows.wizards.wizard;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.core.GenericTypeResolver;
import org.springframework.core.convert.converter.ConditionalConverter;
import org.springframework.format.support.FormattingConversionService;
import org.springframework.util.Assert;
import org.springframework.validation.DataBinder;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.webflow.action.FormAction;
import org.springframework.webflow.execution.Event;
import org.springframework.webflow.execution.RequestContext;

import java.io.Serializable;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public abstract class WizardFormAction<T extends Serializable>
		extends FormAction {

	private static final Logger                      LOGGER             = Logger.getLogger(WizardFormAction.class);
	public static final  String                      COMMAND_BEAN_NAME  = "commandBean";
	@Autowired
	@Qualifier(value = "springAtomConversionService")
	protected            FormattingConversionService conversionService  = null;
	@Autowired
	protected            LocalValidatorFactoryBean   delegatedValidator = null;
	@Autowired
	protected            ApplicationContext          applicationContext = null;

	protected WizardFormAction() {
		this.setFormObjectName(COMMAND_BEAN_NAME);
		this.setFormObjectClass(GenericTypeResolver.resolveTypeArgument(this.getClass(), WizardFormAction.class));
	}

	@Override
	protected void initBinder(final RequestContext context, final DataBinder binder) {
		LOGGER.trace("initBinder not set...setting");

		binder.setIgnoreUnknownFields(true);
		binder.setAutoGrowNestedPaths(true);
		binder.setConversionService(this.conversionService);
		binder.setValidator(this.delegatedValidator);

		this.doInitBinder(((WebDataBinder) binder), this.conversionService);
	}

	/**
	 * TypeSafe version of {@link org.springframework.webflow.action.FormAction#getFormObject(org.springframework.webflow.execution.RequestContext)}.
	 *
	 * @param context current webflow context
	 *
	 * @return this step form object instance
	 *
	 * @throws Exception if any, most likely it can be {@link java.lang.ClassCastException}
	 */
	@SuppressWarnings("unchecked")
	protected T getCommandBean(final RequestContext context) throws Exception {
		final Object formObject = this.getFormObject(context);
		Assert.isInstanceOf(this.getFormObjectClass(), formObject);
		return (T) formObject;
	}

	protected boolean isSuccessEvent(final Event event) {
		return event.getId().equals(this.success().getId());
	}

	protected WebDataBinder doInitBinder(final WebDataBinder binder, final FormattingConversionService conversionService) {
		return binder;
	}

	protected abstract static class MatcherConverter
			implements ConditionalConverter {
	}
}
