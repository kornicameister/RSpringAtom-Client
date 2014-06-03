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

package org.agatom.springatom.web.rbuilder.data.model;

import org.agatom.springatom.web.rbuilder.bean.RBuilderColumn;
import org.agatom.springatom.web.rbuilder.bean.RBuilderEntity;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

/**
 * <p>ReportableColumnResolver interface.</p>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
@Validated
public interface ReportableColumnResolver {

	/** Constant <code>CACHE_NAME="org.agatom.springatom.cache.ReportableB"{trunked}</code> */
	static String CACHE_NAME = "org.agatom.springatom.cache.ReportableBeanResolver";

	/**
	 * <p>getReportableColumns.</p>
	 *
	 * @param entity a {@link org.agatom.springatom.web.rbuilder.bean.RBuilderEntity} object.
	 *
	 * @return a {@link java.util.Set} object.
	 */
	@NotNull
	@Size(min = 1)
	@Cacheable(value = CACHE_NAME, key = "#entity.javaClass.name + '_columns'")
	Set<RBuilderColumn> getReportableColumns(@NotNull final RBuilderEntity entity);

}
