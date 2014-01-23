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

package org.agatom.springatom.web.rbuilder;

import com.google.common.base.Objects;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Role;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;
import org.springframework.web.context.WebApplicationContext;

import java.io.Serializable;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
@Component
@Scope(value = WebApplicationContext.SCOPE_REQUEST)
@Role(value = BeanDefinition.ROLE_APPLICATION)
public class ReportViewDescriptor
        implements Serializable {
    private static final long serialVersionUID = -15235355484985353L;
    private String   format;
    private String   viewName;
    private ModelMap parameters;

    public ReportViewDescriptor setFormat(final String format) {
        this.format = format;
        return this;
    }

    public ReportViewDescriptor setViewName(final String viewName) {
        this.viewName = viewName;
        return this;
    }

    public ReportViewDescriptor setParameters(final ModelMap parameters) {
        this.parameters = parameters;
        return this;
    }

    public String getViewName() {
        return viewName;
    }

    public ModelMap getParameters() {
        return parameters;
    }

    public String getFormat() {
        return format;
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
                      .addValue(viewName)
                      .addValue(format)
                      .addValue(parameters)
                      .toString();
    }
}
