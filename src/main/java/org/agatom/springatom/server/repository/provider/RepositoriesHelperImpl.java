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

package org.agatom.springatom.server.repository.provider;

import org.agatom.springatom.server.repository.SBasicRepository;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Description;
import org.springframework.context.annotation.Role;
import org.springframework.context.annotation.Scope;
import org.springframework.data.mapping.PersistentEntity;
import org.springframework.data.repository.core.CrudInvoker;
import org.springframework.data.repository.core.EntityInformation;
import org.springframework.data.repository.core.RepositoryInformation;
import org.springframework.data.repository.query.QueryMethod;
import org.springframework.data.repository.support.Repositories;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.ClassUtils;

import java.io.Serializable;
import java.util.List;

/**
 * <p>
 * <small>Class is a part of <b>SpringAtom</b> and was created at 2014-09-19</small>
 * </p>
 *
 * @author trebskit
 * @version 0.0.1
 * @since 0.0.1
 */
@Service
@Role(BeanDefinition.ROLE_SUPPORT)
@Scope(BeanDefinition.SCOPE_SINGLETON)
@Description("RepositoryProvider allows to retrieve repositories")
class RepositoriesHelperImpl
        implements RepositoriesHelper {

    @Autowired
    private ListableBeanFactory beanFactory  = null;
    private Repositories        repositories = null;

    @Override
    public <T> Object getRepositoryFor(final Class<T> clazz) {
        return this.getRepositories().getRepositoryFor(clazz);
    }

    @Override
    public <T, S extends Serializable> EntityInformation<T, S> getEntityInformationFor(final Class<?> domainClass) {
        return this.getRepositories().getEntityInformationFor(domainClass);
    }

    @Override
    public RepositoryInformation getRepositoryInformationFor(final Class<?> domainClass) {
        return this.getRepositories().getRepositoryInformationFor(domainClass);
    }

    @Override
    public PersistentEntity<?, ?> getPersistentEntity(final Class<?> domainClass) {
        return this.getRepositories().getPersistentEntity(domainClass);
    }

    @Override
    public List<QueryMethod> getQueryMethodsFor(final Class<?> domainClass) {
        return this.getRepositories().getQueryMethodsFor(domainClass);
    }

    @Override
    public <T> CrudInvoker<T> getCrudInvoker(final Class<T> domainClass) {
        return this.getRepositories().getCrudInvoker(domainClass);
    }

    @Override
    @SuppressWarnings("unchecked")
    public Object refreshRead(final Object persistable) {
        final Repositories repositories = this.getRepositories();
        final Class<?> userClass = ClassUtils.getUserClass(persistable);
        final Object repositoryFor = repositories.getRepositoryFor(userClass);
        Assert.isInstanceOf(SBasicRepository.class, repositoryFor);
        return ((SBasicRepository) repositoryFor).refreshToRead(persistable);
    }

    private Repositories getRepositories() {
        if (this.repositories == null) {
            this.repositories = new Repositories(this.beanFactory);
        }
        return this.repositories;
    }
}