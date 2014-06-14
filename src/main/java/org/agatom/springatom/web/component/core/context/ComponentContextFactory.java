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

package org.agatom.springatom.web.component.core.context;

import org.agatom.springatom.core.annotations.LazyComponent;
import org.agatom.springatom.server.model.types.PersistentVersionedBean;
import org.agatom.springatom.server.repository.SRepository;
import org.apache.log4j.Logger;
import org.hibernate.envers.Audited;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.data.domain.Persistable;
import org.springframework.data.history.Revision;
import org.springframework.data.mapping.PersistentEntity;
import org.springframework.data.mapping.PersistentProperty;
import org.springframework.data.repository.support.Repositories;
import org.springframework.util.Assert;
import org.springframework.util.ClassUtils;

import javax.annotation.PostConstruct;

/**
 * {@code ComponentContextFactory} enables populating the context from {@link org.springframework.data.domain.Persistable}
 * object, by resolving information like {@link org.agatom.springatom.web.component.core.context.ComponentContext#version}
 * and {@link org.agatom.springatom.web.component.core.context.ComponentContext#revision}
 *
 * <small>Class is a part of <b>SpringAtom</b> and was created at 12.06.14</small>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
@LazyComponent
public class ComponentContextFactory
		implements BeanFactoryAware {
	private static final Logger              LOGGER       = Logger.getLogger(ComponentContextFactory.class);
	private              Repositories        repositories = null;
	private              ListableBeanFactory beanFactory  = null;

	@PostConstruct
	private void setRepositories() {
		this.repositories = new Repositories(this.beanFactory);
	}

	public ComponentContext buildContext(final Persistable<?> persistable) throws Exception {
		Assert.notNull(persistable, "Persistable can not be null");
		LOGGER.debug(String.format("buildContext(persistable=%s)", persistable));

		final ComponentContext componentContext = new ComponentContext(persistable);
		if (ClassUtils.isAssignableValue(PersistentVersionedBean.class, persistable)) {
			componentContext.setVersion(((PersistentVersionedBean) persistable).getVersion());
		} else {
			componentContext.setVersion((long) -1);
		}
		componentContext.setRevision(this.getLatestRevision(persistable));
		return componentContext;
	}

	@SuppressWarnings("unchecked")
	private Long getLatestRevision(final Persistable persistable) {
		if (this.isVersioned(persistable)) {
			final SRepository repo = (SRepository) this.repositories.getRepositoryFor(ClassUtils.getUserClass(persistable));
			if (repo != null) {
				final Revision revision = repo.findLastChangeRevision(persistable.getId());
				return (Long) revision.getRevisionNumber();
			}
		}
		return (long) -1;
	}

	private boolean isVersioned(final Persistable<?> persistable) {
		final PersistentEntity<?, ?> entity = this.repositories.getPersistentEntity(ClassUtils.getUserClass(persistable));
		final Audited audited = entity.findAnnotation(Audited.class);
		final PersistentProperty<?> persistentProperty = entity.getPersistentProperty(Audited.class);
		return audited != null || persistentProperty != null;
	}

	@Override
	public void setBeanFactory(final BeanFactory beanFactory) throws BeansException {
		this.beanFactory = (ListableBeanFactory) beanFactory;
	}
}