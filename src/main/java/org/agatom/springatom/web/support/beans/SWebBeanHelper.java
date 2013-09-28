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

package org.agatom.springatom.web.support.beans;

import org.springframework.ui.ModelMap;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public abstract class SWebBeanHelper {
    public static void addToModelMap(final ModelMap modelMap, final WebBean webBean) {
        final String beanId = webBean.getBeanId();
        if (beanId == null) {
            modelMap.addAttribute(webBean);
        }
        modelMap.addAttribute(beanId, webBean);
    }
}