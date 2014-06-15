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

package org.agatom.springatom.webmvc.converters.du.converters;

import com.google.common.base.Optional;
import com.google.common.base.Predicate;
import com.google.common.collect.FluentIterable;
import com.google.common.collect.Sets;
import org.agatom.springatom.server.model.descriptors.EntityDescriptor;
import org.agatom.springatom.web.component.core.EmbeddableComponent;
import org.agatom.springatom.web.component.core.builders.ComponentProduces;
import org.agatom.springatom.web.component.core.context.ComponentContext;
import org.agatom.springatom.web.component.core.context.ComponentContextFactory;
import org.agatom.springatom.web.component.core.data.ComponentDataRequest;
import org.agatom.springatom.web.component.core.elements.ContentComponent;
import org.agatom.springatom.web.component.core.repository.ComponentBuilderRepository;
import org.agatom.springatom.web.component.infopages.elements.InfoPageAttributeComponent;
import org.agatom.springatom.web.component.infopages.elements.InfoPagePanelComponent;
import org.agatom.springatom.webmvc.controllers.components.SVComponentsDataController;
import org.agatom.springatom.webmvc.controllers.components.SVComponentsDefinitionController;
import org.agatom.springatom.webmvc.converters.du.annotation.WebConverter;
import org.agatom.springatom.webmvc.converters.du.component.core.DefaultWebDataComponent;
import org.agatom.springatom.webmvc.converters.du.exception.WebConverterException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Persistable;
import org.springframework.hateoas.Link;
import org.springframework.util.ClassUtils;
import org.springframework.util.StringUtils;

import javax.annotation.Nullable;
import javax.persistence.metamodel.Attribute;
import javax.persistence.metamodel.PluralAttribute;
import java.io.Serializable;
import java.util.Map;
import java.util.Set;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

/**
 * {@link org.agatom.springatom.webmvc.converters.du.converters.ToTableRequestWebConverter}
 * crates instance of {@link org.agatom.springatom.webmvc.converters.du.converters.ToTableRequestWebConverter.TableRequest} component.
 * Provides information required to make a request to retrieve table configuration and data.
 * <small>Class is a part of <b>SpringAtom</b> and was created at 01.06.14</small>
 *
 * @author kornicameister
 * @version 0.0.2
 * @since 0.0.1
 */
@WebConverter(key = ToTableRequestWebConverter.SELECTOR)
public class ToTableRequestWebConverter
		extends AbstractWebConverter {
	/** Constant <code>SELECTOR="tableRequestInitMaker"</code> */
	public static final  String                     SELECTOR                = "tableRequestInitMaker";
	private static final Logger                     LOGGER                  = Logger.getLogger(ToTableRequestWebConverter.class);
	@Autowired
	private              ComponentBuilderRepository builderRepository       = null;
	@Autowired
	private              ComponentContextFactory    componentContextFactory = null;

	/** {@inheritDoc} */
	@Override
	protected Serializable doConvert(final String key, final Object value, final Persistable<?> persistable, final ComponentDataRequest webRequest) throws Exception {
		LOGGER.trace(String.format("doConverter(key=%s,value=%s)", key, value));

		String builderId = this.getExplicitlyDefinedBuilderId(key, webRequest);
		if (!StringUtils.hasText(builderId)) {
			builderId = this.getBuilderIdFromTableDataType(key, persistable);
		}

		if (StringUtils.hasText(builderId)) {
			final TableRequest request = new TableRequest();

			request.setLabel(this.getLabel(key, persistable));
			request.setBuilderId(builderId)
					.setConfigurationUrl(linkTo(methodOn(SVComponentsDefinitionController.class).onTableConfigRequest(builderId, null)).withRel("configuration"))
					.setDataUrl(linkTo(methodOn(SVComponentsDataController.class).onTableDataRequest(builderId, null, null)).withSelfRel().withRel("data"))
					.setData(this.componentContextFactory.buildContext(persistable))
					.setId(key);

			return request;
		}

		return null;
	}

	/**
	 * Resolves {@code builderId} using {@code key} and {@link org.springframework.data.domain.Persistable}.
	 * If {@code key} is a property of {@code persistable} therefore {@link javax.persistence.metamodel.EntityType#getAttribute(String)} returns
	 * valid {@link javax.persistence.metamodel.PluralAttribute} for {@code key}, this method is able to determine {@code builderId} by calling
	 * {@link org.agatom.springatom.web.component.core.repository.ComponentBuilderRepository#getBuilderId(Class, org.agatom.springatom.web.component.core.builders.ComponentProduces)}
	 * where:
	 * <ol>
	 * <li>{@code class} corresponds to attribute type</li>
	 * <li>{@link org.agatom.springatom.web.component.core.builders.ComponentProduces} is {@link org.agatom.springatom.web.component.core.builders.ComponentProduces#TABLE_COMPONENT}</li>
	 * </ol>
	 *
	 * <b>Note</b>
	 * This method will throw {@link org.agatom.springatom.webmvc.converters.du.exception.WebConverterException} if found {@link javax.persistence.metamodel.Attribute} is neither {@link javax.persistence.metamodel.Attribute#isCollection()}
	 * nor {@link javax.persistence.metamodel.Attribute#isAssociation()}
	 *
	 * @param key         property path
	 * @param persistable persistable to get {@link javax.persistence.metamodel.Attribute} definition for {@code path}
	 *
	 * @return builderId
	 */
	private String getBuilderIdFromTableDataType(final String key, final Persistable<?> persistable) {
		String builderId = null;

		final EntityDescriptor<? extends Persistable> descriptor = this.entityDescriptors.getDescriptor(persistable.getClass());

		final Attribute<?, ?> attribute = descriptor.getEntityType().getAttribute(key);
		if (!attribute.isAssociation() || !attribute.isCollection()) {
			throw new WebConverterException(String.format("Requested to convert %s as table request, but %s was not recognized as association for %s", key, key, ClassUtils.getUserClass(persistable.getClass())));
		}

		final PluralAttribute<?, ?, ?> pluralAttribute = (PluralAttribute<?, ?, ?>) attribute;
		final Class<?> associatedType = ClassUtils.getUserClass(pluralAttribute.getElementType().getJavaType());

		LOGGER.trace(String.format("%s corresponds to %s", key, ClassUtils.getUserClass(associatedType)));

		final boolean hasBuilder = this.builderRepository.hasBuilder(associatedType, ComponentProduces.TABLE_COMPONENT);
		if (hasBuilder) {
			builderId = this.builderRepository.getBuilderId(associatedType, ComponentProduces.TABLE_COMPONENT);
		}

		LOGGER.trace(String.format("%s %s to existing %s builder", associatedType, (hasBuilder ? "corresponds" : "does not corresponds"), ComponentProduces.TABLE_COMPONENT));
		return builderId;
	}

	/**
	 * Tries to locate explicitly defined {@code builderId} if such was set in {@link org.agatom.springatom.web.component.infopages.elements.InfoPageAttributeComponent}
	 * during compile time for {@link org.agatom.springatom.web.component.infopages.elements.InfoPageComponent} template
	 *
	 * @param key        property path
	 * @param webRequest web request to get {@link org.agatom.springatom.web.component.infopages.elements.InfoPageComponent} from
	 *
	 * @return builderId if found or null
	 *
	 * @see org.agatom.springatom.web.component.infopages.provider.builder.InfoPageComponentBuilderService
	 * @see org.agatom.springatom.web.component.infopages.elements.InfoPageAttributeComponent#dynamicProperties
	 */
	private String getExplicitlyDefinedBuilderId(final String key, final ComponentDataRequest webRequest) {
		String builderId = null;

		final ContentComponent<?> component = (ContentComponent<?>) webRequest.getComponent();
		final Optional<? extends EmbeddableComponent> match = FluentIterable.from(component).firstMatch(new Predicate<EmbeddableComponent>() {
			@Override
			public boolean apply(@Nullable final EmbeddableComponent input) {
				if (input == null) {
					return false;
				}
				if (ClassUtils.isAssignableValue(InfoPagePanelComponent.class, input)) {
					final InfoPagePanelComponent panelComponent = (InfoPagePanelComponent) input;
					return panelComponent.containsAttributeForPath(key);
				}
				return false;
			}
		});
		if (match.isPresent()) {
			final InfoPagePanelComponent tmp = (InfoPagePanelComponent) match.get();
			final InfoPageAttributeComponent forPath = tmp.getAttributeForPath(key);
			final Map<String, Object> dynamicProperties = forPath.getDynamicProperties();
			builderId = (String) dynamicProperties.get("builderId");
		}
		return builderId;
	}

	/**
	 * Internal class. Carries information required to request for config and data for {@link org.agatom.springatom.web.component.table.elements.TableComponent}
	 */
	protected static class TableRequest
			extends DefaultWebDataComponent<ComponentContext> {
		private static final long      serialVersionUID = 4160071560623816868L;
		private              String    builderId        = null;
		private              Set<Link> urls             = Sets.newHashSet();

		public String getBuilderId() {
			return builderId;
		}

		public TableRequest setBuilderId(final String builderId) {
			this.builderId = builderId;
			return this;
		}

		public Set<Link> getUrls() {
			return urls;
		}

		public TableRequest setUrls(final Set<Link> urls) {
			this.urls = urls;
			return this;
		}

		public TableRequest setDataUrl(final Link url) {
			this.urls.add(url);
			return this;
		}

		public TableRequest setConfigurationUrl(final Link url) {
			this.urls.add(url);
			return this;
		}

		@Override
		public String getUiType() {
			return "tableRequest";
		}

	}

}
