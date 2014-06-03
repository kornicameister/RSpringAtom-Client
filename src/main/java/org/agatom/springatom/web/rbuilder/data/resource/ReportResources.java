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

package org.agatom.springatom.web.rbuilder.data.resource;

import org.springframework.core.io.Resource;

/**
 * {@link org.agatom.springatom.web.rbuilder.data.resource.ReportResources} in a pair of {@link org.springframework.core.io.Resource}s
 * where the {@link org.agatom.springatom.web.rbuilder.data.resource.ReportResources#jasperResource} points to a file with compiled instance
 * of {@link net.sf.jasperreports.engine.JasperReport} and on the other side {@link org.agatom.springatom.web.rbuilder.data.resource.ReportResources#configurationResource}
 * pointing to the file with serialized {@link org.agatom.springatom.web.rbuilder.ReportConfiguration}
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public class ReportResources {
	private Resource jasperResource;
	private Resource configurationResource;

	/**
	 * <p>newReportResources.</p>
	 *
	 * @param jasperResource        a {@link org.springframework.core.io.Resource} object.
	 * @param configurationResource a {@link org.springframework.core.io.Resource} object.
	 *
	 * @return a {@link org.agatom.springatom.web.rbuilder.data.resource.ReportResources} object.
	 */
	public static ReportResources newReportResources(final Resource jasperResource, final Resource configurationResource) {
		final ReportResources reportResources = new ReportResources();
		reportResources.configurationResource = configurationResource;
		reportResources.jasperResource = jasperResource;
		return reportResources;
	}

	/**
	 * <p>Getter for the field <code>jasperResource</code>.</p>
	 *
	 * @return a {@link org.springframework.core.io.Resource} object.
	 */
	public Resource getJasperResource() {
		return jasperResource;
	}

	/**
	 * <p>Getter for the field <code>configurationResource</code>.</p>
	 *
	 * @return a {@link org.springframework.core.io.Resource} object.
	 */
	public Resource getConfigurationResource() {
		return configurationResource;
	}

}
