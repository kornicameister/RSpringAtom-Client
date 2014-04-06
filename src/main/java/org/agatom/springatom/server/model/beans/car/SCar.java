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

package org.agatom.springatom.server.model.beans.car;

import org.agatom.springatom.server.model.beans.PersistentVersionedObject;
import org.agatom.springatom.server.model.beans.car.embeddable.SCarMasterManufacturingData;
import org.agatom.springatom.server.model.beans.user.SUser;
import org.agatom.springatom.server.model.types.ReportableEntity;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * @author kornicamaister
 * @version 0.0.1
 * @since 0.0.1
 */
@Table(name = SCar.TABLE_NAME)
@Entity(name = SCar.ENTITY_NAME)
@ReportableEntity
@AttributeOverride(name = "id", column = @Column(name = "idSCar", nullable = false, insertable = true, updatable = false, length = 19, precision = 0))
public class SCar
		extends PersistentVersionedObject {
	public static final  String TABLE_NAME       = "cars";
	public static final  String ENTITY_NAME      = "SCar";
	private static final long   serialVersionUID = -1473162805427581686L;
	@NotNull
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "carMaster", referencedColumnName = "idSCarMaster", updatable = false)
	private SCarMaster carMaster;
	@NotNull
	@Audited(targetAuditMode = RelationTargetAuditMode.AUDITED)
	@ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.REFRESH})
	@JoinColumn(name = "owner", referencedColumnName = "idSUser", updatable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private SUser      owner;
	@Column(nullable = false, length = 45, name = "licencePlate", unique = true)
	@NaturalId(mutable = true)
	private String     licencePlate;
	@Column(nullable = false, length = 17, name = "vinNumber", unique = true)
	@NaturalId(mutable = true)
	private String     vinNumber;


	public SCarMaster getCarMaster() {
		return carMaster;
	}

	public SCar setCarMaster(final SCarMaster carMaster) {
		this.carMaster = carMaster;
		return this;
	}

	public String getLicencePlate() {
		return licencePlate;
	}

	public SCar setLicencePlate(final String registrationNumber) {
		this.licencePlate = registrationNumber;
		return this;
	}

	public String getVinNumber() {
		return vinNumber;
	}

	public SCar setVinNumber(final String vinNumber) {
		this.vinNumber = vinNumber;
		return this;
	}

	public SUser getOwner() {
		return owner;
	}

	public SCar setOwner(final SUser client) {
		this.owner = client;
		return this;
	}

	public String getBrand() {
		return this.carMaster.getBrand();
	}

	public SCarMasterManufacturingData setBrand(final String brand) {
		return this.carMaster.setBrand(brand);
	}

	public String getModel() {
		return this.carMaster.getModel();
	}

	public SCarMasterManufacturingData setModel(final String model) {
		return this.carMaster.setModel(model);
	}
}
