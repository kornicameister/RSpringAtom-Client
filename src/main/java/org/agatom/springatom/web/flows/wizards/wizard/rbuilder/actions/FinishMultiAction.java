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

package org.agatom.springatom.web.flows.wizards.wizard.rbuilder.actions;

import org.agatom.springatom.server.service.domain.ReportBuilderService;
import org.agatom.springatom.web.flows.wizards.wizard.rbuilder.ReportWizard;
import org.agatom.springatom.web.rbuilder.exception.ReportBuilderServiceException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Role;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.webflow.action.EventFactorySupport;
import org.springframework.webflow.execution.Action;
import org.springframework.webflow.execution.Event;
import org.springframework.webflow.execution.RequestContext;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */

@Lazy
@Role(BeanDefinition.ROLE_INFRASTRUCTURE)
@Scope(WebApplicationContext.SCOPE_SESSION)
@Component(value = "finishReportAction")
public class FinishMultiAction
        implements Action {
    private static final Logger LOGGER = Logger.getLogger(FinishMultiAction.class);

    @Autowired
    private ReportWizard         reportWizard;
    @Autowired
    private ReportBuilderService builderService;

    @Override
    public Event execute(final RequestContext context) throws Exception {
        LOGGER.debug(String.format("/saveReport reportWizard=%s,context=%s", this, context));
        final EventFactorySupport eventFactorySupport = new EventFactorySupport();

        try {
            final Object reports = this.builderService.save(this.reportWizard.getReportConfiguration());
            LOGGER.info(String.format("Persisted new report => %s", reports));
            return eventFactorySupport.success(this, reports);
        } catch (Exception persistException) {
            LOGGER.fatal(persistException);
            return eventFactorySupport.error(this, new ReportBuilderServiceException(persistException));
        }
    }
}
