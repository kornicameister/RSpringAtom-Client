package org.agatom.springatom.model.meta;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * @author kornicameister
 * @version 0.0.1
 * @since 0.0.1
 */
@Entity
@DiscriminatorValue(value = "SNT")
public class SNotificationType extends SMetaData {

    public SNotificationType() {
        super();
    }

    public SNotificationType(final String type) {
        super(type);
    }
}
