package org.agatom.springatom.mvc.model.dao;

import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;


@Repository(value = "DaoSupport")
abstract public class DaoSupport {
    private static final Logger LOGGER = Logger.getLogger(DaoSupport.class);
    @Resource
    SessionFactory sessionFactory;

    @Autowired(required = true)
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
        if (LOGGER.isTraceEnabled()) {
            LOGGER.trace(String.format("Initialized sessionFactory=%s", this.sessionFactory));
        }
    }

    public Session getSession() {
        if (LOGGER.isTraceEnabled()) {
            LOGGER.trace(String.format("Getting session factory, sessionFactory=%s", this.sessionFactory));
        }
        return this.sessionFactory.getCurrentSession();
    }
}
