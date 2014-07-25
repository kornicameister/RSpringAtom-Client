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

package org.agatom.springatom.webmvc.data;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.common.base.Objects;
import org.agatom.springatom.web.beans.WebBean;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.util.ClassUtils;
import org.springframework.util.StringUtils;

/**
 * {@code DataResource} is as a {@link org.springframework.hateoas.Resource} used to carry the information
 * for the client with additional properties like: {@link #size}, {@link #success} for example;
 *
 * <small>Class is a part of <b>SpringAtom</b> and was created at 20.07.14</small>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_EMPTY)
abstract public class DataResource<T>
		extends Resource<T>
		implements WebBean {
	private static final long      serialVersionUID = 86334676091414943L;
	private              int       size             = 0;
	private              long      time             = 0;
	private              boolean   success          = false;
	private              String    message          = null;
	private              Throwable error            = null;

	public DataResource(final T content, final Link... links) {
		super(content, links);
	}

	public DataResource(final T content, final Iterable<Link> links) {
		super(content, links);
	}

	public long getSize() {
		return size;
	}

	public DataResource setSize(final int size) {
		this.size = size;
		return this;
	}

	public long getTime() {
		return time;
	}

	public DataResource setTime(final long time) {
		this.time = time;
		return this;
	}

	public boolean isSuccess() {
		return success;
	}

	public DataResource setSuccess(final boolean success) {
		this.success = success;
		return this;
	}

	public String getMessage() {
		return message;
	}

	public DataResource setMessage(final String message) {
		this.message = message;
		return this;
	}

	public Throwable getError() {
		return error;
	}

	public DataResource setError(final Throwable error) {
		this.error = error;
		return this;
	}

	@Override
	public final String getBeanId() {
		return StringUtils.uncapitalize(ClassUtils.getShortName(this.getClass()));
	}

	@Override
	public String toString() {
		return Objects.toStringHelper(this)
				.add("time", time)
				.add("success", success)
				.add("message", message)
				.add("content", ClassUtils.getShortName(this.getContent().getClass()))
				.add("links", this.getLinks().size())
				.toString();
	}
}