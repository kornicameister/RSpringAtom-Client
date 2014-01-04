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

package org.agatom.springatom.webmvc.controllers.rbuilder;

import org.agatom.springatom.server.service.support.exceptions.ServiceException;
import org.agatom.springatom.web.rbuilder.service.ReportBuilderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
@Controller(value = ReportBuilderController.CONTROLLER_NAME)
@RequestMapping(value = "/reportBuilder")
public class ReportBuilderController {
    public static final  String CONTROLLER_NAME = "reportBuilderController";
    private static final String VIEW_NAME       = "springatom.tiles.dashboard.reports.Generate";

    @Autowired
    private ReportBuilderService service;

    @RequestMapping(value = "/generate/{reportId}")
    public ModelAndView generateReport(@PathVariable("reportId") final Long reportId, final HttpServletResponse response) throws ServiceException {
        this.service.getAvailableRepresentations();
        this.service.generateReport(reportId, response);
        return new ModelAndView(VIEW_NAME, new ModelMap());
    }

}
