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

package org.agatom.springatom.webmvc.wizard;

import org.agatom.springatom.web.wizard.SVDefaultWizard;
import org.agatom.springatom.web.wizard.data.SVBInput;
import org.agatom.springatom.web.wizard.data.SVBWizardSubmit;
import org.agatom.springatom.web.wizard.data.SVStep;
import org.apache.log4j.Logger;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
@Controller(value = SVAppointmentWizard.CMP_VIEW)
@RequestMapping(value = SVAppointmentWizard.CMP_URL)
public class SVAppointmentWizard
        extends SVDefaultWizard {
    public static final  String CMP_URL          = "/sa/wizard/NewAppointment";
    public static final  String CMP_VIEW         = "ui.wizard.NewAppointment";
    private static final long   serialVersionUID = -4593317700429293435L;
    private static final Logger LOGGER           = Logger.getLogger(SVAppointmentWizard.class);

    public SVAppointmentWizard() {
        super(CMP_URL, CMP_VIEW);
    }

    @ResponseBody
    @RequestMapping(value = "/submit", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Boolean submit(@RequestBody final SVBWizardSubmit submit) {
        LOGGER.debug(String.format("Receiving wizard submission = %s", submit));
        for (final SVStep step : submit) {

            LOGGER.trace(String.format("Step=%s with data=%s", step.getName(), step.getData()));

            for (final SVBInput input : step.getData()) {
                LOGGER.trace(String.format("Processing input = %s", input));
            }
        }
        return true;
    }

    @Override
    protected String getWizardSubmitUrl() {
        return String.format("%s/%s", CMP_URL, "submit");
    }
}
