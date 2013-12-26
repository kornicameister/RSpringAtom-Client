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

package org.agatom.springatom.webmvc.pages.builders;

import com.mysema.query.types.Predicate;
import org.agatom.springatom.component.builders.annotation.ComponentBuilds;
import org.agatom.springatom.component.builders.annotation.EntityBased;
import org.agatom.springatom.component.builders.table.TableComponentBuilder;
import org.agatom.springatom.component.elements.table.DandelionTableComponent;
import org.agatom.springatom.component.elements.value.DelegatedLink;
import org.agatom.springatom.ip.SEntityInfoPage;
import org.agatom.springatom.ip.mapping.InfoPageMappings;
import org.agatom.springatom.server.model.beans.car.QSCar;
import org.agatom.springatom.server.model.beans.car.SCar;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.util.ClassUtils;
import org.springframework.util.StringUtils;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
@EntityBased(entity = SCar.class)
@ComponentBuilds(
        id = CarsTableBuilder.BUILDER_ID,
        builds = SCar.class,
        produces = ComponentBuilds.Produces.TABLE_COMPONENT
)
public class CarsTableBuilder
        extends TableComponentBuilder<DandelionTableComponent, SCar> {

    protected static final String BUILDER_ID = "carsTableBuilder";
    private static final   String TABLE_ID   = String.format("%s%s", "table", StringUtils.uncapitalize(SCar.ENTITY_NAME));
    private static final   Logger LOGGER     = Logger.getLogger(CarsTableBuilder.class);
    @Autowired
    private InfoPageMappings pageMappings;

    @Override
    protected Object handleColumnConversion(final SCar object, final Object value, final String path) {
        switch (path) {
            case "owner": {
                return object.getOwner().getPerson().getIdentity();
            }
        }
        return super.handleColumnConversion(object, value, path);
    }

    @Override
    protected Object handleDynamicColumn(final SCar object, final String path) {
        switch (path) {
            case "infopage": {
                final SEntityInfoPage domain = this.pageMappings.getInfoPageForEntity(SCar.class);
                if (domain != null) {
                    final Link link = helper.getInfoPageLink(
                            domain.getPath(),
                            Long.parseLong(String.valueOf(object.getId()))
                    );
                    return new DelegatedLink(link).withLabel(ClassUtils.getShortName(SCar.class));
                }
            }
            break;
        }
        return null;
    }

    @Override
    protected Predicate getPredicate(final Long id, final Class<?> contextClass) {
        return QSCar.sCar.carMaster.id.eq(id);
    }

    @Override
    protected Logger getLogger() {
        return LOGGER;
    }

    @Override
    protected DandelionTableComponent buildDefinition() {
        final DandelionTableComponent component = this.helper.newDandelionTable(TABLE_ID, BUILDER_ID);
        this.helper.newTableColumn(component, "id", "persistentobject.id");
        this.helper.newTableColumn(component, "infopage", "persistentobject.infopage").setRenderFunctionName("renderInfoPageLink").setSortable(false);
        this.helper.newTableColumn(component, "owner", "scar.owner");
        this.helper.newTableColumn(component, "licencePlate", "scar.licenceplate");
        this.helper.newTableColumn(component, "vinNumber", "scar.vinnumber");
        return component;
    }
}