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

package org.agatom.springatom.web.action.model.actions;

/**
 * <small>Class is a part of <b>SpringAtom</b> and was created at 29.03.14</small>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public class WizardAction extends LinkAction {
	private static final long     serialVersionUID = 4681017930494233352L;
	private              String   wizardName       = null;
	private              Class<?> type             = null;

	public WizardAction setWizardName(final String wizardName) {
		this.wizardName = wizardName;
		return this;
	}

	public String getWizardName() {
		return wizardName;
	}

	public WizardAction setType(final Class<?> type) {
		this.type = type;
		return this;
	}

	public Class<?> getType() {
		return type;
	}
}