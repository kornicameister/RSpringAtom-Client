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

package org.agatom.springatom.web.flows.tags;

import com.google.common.base.Objects;
import org.json.JSONArray;
import org.springframework.web.servlet.tags.RequestContextAwareTag;
import org.springframework.webflow.definition.StateDefinition;
import org.springframework.webflow.engine.Transition;
import org.springframework.webflow.engine.TransitionSet;
import org.springframework.webflow.engine.TransitionableState;
import org.springframework.webflow.engine.support.DefaultTransitionCriteria;

/**
 * <p>PossibleTransitionsTag class.</p>
 *
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
public class PossibleTransitionsTag
		extends RequestContextAwareTag {

	/** Constant <code>EVENT_ID_S="_eventId_%s"</code> */
	public static final  String EVENT_ID_S       = "_eventId_%s";
	private static final long   serialVersionUID = -6092379285742740242L;
	protected String          var;
	protected StateDefinition state;

	/**
	 * <p>Setter for the field <code>state</code>.</p>
	 *
	 * @param state a {@link org.springframework.webflow.definition.StateDefinition} object.
	 */
	public void setState(final StateDefinition state) {
		this.state = state;
	}

	/**
	 * <p>Setter for the field <code>var</code>.</p>
	 *
	 * @param var a {@link java.lang.String} object.
	 */
	public void setVar(final String var) {
		this.var = var;
	}

	/** {@inheritDoc} */
	@Override
	protected int doStartTagInternal() throws Exception {
		if (this.state instanceof TransitionableState) {
			final TransitionableState transitionableState = (TransitionableState) this.state;
			final TransitionSet set = transitionableState.getTransitionSet();

			final String[] ccs = new String[set.size()];
			int i = 0;

			for (final Transition ts : set) {
				final DefaultTransitionCriteria criteria = (DefaultTransitionCriteria) ts.getMatchingCriteria();
				ccs[i++] = String.format(EVENT_ID_S, criteria.toString());
			}

			this.pageContext.setAttribute(this.var, new JSONArray(ccs).toString());
		}
		return EVAL_BODY_INCLUDE;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return Objects.toStringHelper(this)
				.addValue(var)
				.addValue(state)
				.toString();
	}
}
